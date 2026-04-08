#!/usr/bin/env node
/**
 * Create products in Shopify from offer JSON files.
 * Usage: node scripts/shop-add.mjs ./oferty/file1.json [./oferty/file2.json ...]
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { adminFetch, ok, die } from './shopify-admin.mjs';

const files = process.argv.slice(2);
if (!files.length) die('Usage: node scripts/shop-add.mjs <offer.json> [...]');

const PRODUCT_CREATE = `#graphql
  mutation ProductCreate($product: ProductCreateInput!) {
    productCreate(product: $product) {
      product {
        id handle title
        variants(first: 1) { edges { node { id } } }
      }
      userErrors { field message }
    }
  }
`;

const VARIANT_UPDATE = `#graphql
  mutation VariantsUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
    productVariantsBulkUpdate(productId: $productId, variants: $variants) {
      productVariants { id price sku inventoryItem { id } }
      userErrors { field message }
    }
  }
`;

const MEDIA_CREATE = `#graphql
  mutation MediaCreate($productId: ID!, $media: [CreateMediaInput!]!) {
    productCreateMedia(productId: $productId, media: $media) {
      media { alt mediaContentType status }
      mediaUserErrors { field message }
    }
  }
`;

const PUBLICATIONS = `#graphql
  query { publications(first: 20) { edges { node { id name } } } }
`;

async function getHeadlessPublicationId() {
    if (process.env.SHOPIFY_HEADLESS_PUBLICATION_ID) return process.env.SHOPIFY_HEADLESS_PUBLICATION_ID;
    try {
        const data = await adminFetch(PUBLICATIONS);
        const pubs = data.publications.edges.map((e) => e.node);
        const headless = pubs.find((p) => /headless/i.test(p.name)) || pubs.find((p) => /storefront/i.test(p.name));
        return headless?.id || null;
    } catch {
        return null;
    }
}

const PUBLISH = `#graphql
  mutation Publish($id: ID!, $input: [PublicationInput!]!) {
    publishablePublish(id: $id, input: $input) {
      userErrors { field message }
    }
  }
`;

async function addOne(file) {
    const path = resolve(process.cwd(), file);
    const offer = JSON.parse(readFileSync(path, 'utf8'));
    console.log(`\n→ ${offer.handle}  (${offer.title})`);

    // 1. Create product
    const productInput = {
        title: offer.title,
        handle: offer.handle,
        descriptionHtml: offer.descriptionHtml,
        vendor: offer.vendor,
        productType: offer.productType,
        tags: offer.tags,
        status: offer.status || 'ACTIVE',
        seo: offer.seo,
    };
    const { productCreate } = await adminFetch(PRODUCT_CREATE, { product: productInput });
    if (productCreate.userErrors.length) {
        throw new Error(`productCreate: ${JSON.stringify(productCreate.userErrors)}`);
    }
    const product = productCreate.product;
    const variantId = product.variants.edges[0]?.node.id;
    ok(`created ${product.id}`);

    // 2. Update default variant (price, sku)
    if (variantId) {
        const { productVariantsBulkUpdate } = await adminFetch(VARIANT_UPDATE, {
            productId: product.id,
            variants: [{ id: variantId, price: offer.price, inventoryItem: { sku: offer.sku, tracked: true } }],
        });
        if (productVariantsBulkUpdate.userErrors.length) {
            console.warn('  variant update warnings:', productVariantsBulkUpdate.userErrors);
        } else {
            ok(`variant: ${offer.price} PLN  sku=${offer.sku}`);
        }
    }

    // 3. Attach media
    if (offer.images?.length) {
        const media = offer.images.map((url) => ({
            originalSource: url,
            mediaContentType: 'IMAGE',
            alt: offer.title,
        }));
        const { productCreateMedia } = await adminFetch(MEDIA_CREATE, { productId: product.id, media });
        if (productCreateMedia.mediaUserErrors.length) {
            console.warn('  media errors:', productCreateMedia.mediaUserErrors);
        } else {
            ok(`media: ${offer.images.length} images enqueued`);
        }
    }

    // 4. Publish to Headless channel
    const pubId = await getHeadlessPublicationId();
    if (pubId) {
        const { publishablePublish } = await adminFetch(PUBLISH, {
            id: product.id,
            input: [{ publicationId: pubId }],
        });
        if (publishablePublish.userErrors.length) {
            console.warn('  publish warnings:', publishablePublish.userErrors);
        } else {
            ok(`published to ${pubId}`);
        }
    } else {
        console.warn('  (no Headless publication found — publish manually in Admin)');
    }

    return product;
}

let fail = 0;
for (const f of files) {
    try {
        await addOne(f);
    } catch (e) {
        fail++;
        console.error(`✗ ${f}: ${e.message}`);
    }
}
console.log(`\nDone. ${files.length - fail}/${files.length} ok.`);
process.exit(fail ? 1 : 0);
