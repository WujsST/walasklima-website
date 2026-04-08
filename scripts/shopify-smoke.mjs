#!/usr/bin/env node
/**
 * Shopify Storefront API smoke test.
 * Loads .env.local manually (no dotenv dep), pings Storefront API,
 * prints products + creates an empty cart to verify checkoutUrl works.
 *
 * Usage: node scripts/shopify-smoke.mjs
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../.env.local');

try {
    const raw = readFileSync(envPath, 'utf8');
    for (const line of raw.split('\n')) {
        const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
        if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
} catch {
    console.error(`[smoke] Cannot read ${envPath}`);
    process.exit(1);
}

const storeDomain = process.env.VITE_SHOPIFY_STORE_DOMAIN;
const publicAccessToken = process.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!storeDomain || !publicAccessToken) {
    console.error('[smoke] Missing VITE_SHOPIFY_STORE_DOMAIN / VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN');
    process.exit(1);
}

console.log(`[smoke] Store: ${storeDomain}`);

const client = createStorefrontApiClient({
    storeDomain,
    apiVersion: '2025-10',
    publicAccessToken,
});

const PRODUCTS = `#graphql
  query Smoke($first: Int!) {
    shop { name primaryDomain { url } paymentSettings { currencyCode } }
    products(first: $first) {
      edges { node {
        id handle title
        priceRange { minVariantPrice { amount currencyCode } }
        variants(first: 1) { edges { node { id availableForSale } } }
      } }
    }
  }
`;

const CART_CREATE = `#graphql
  mutation { cartCreate(input: {}) { cart { id checkoutUrl } userErrors { message } } }
`;

const CART_ADD = `#graphql
  mutation Add($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { id checkoutUrl totalQuantity cost { totalAmount { amount currencyCode } } }
      userErrors { message }
    }
  }
`;

async function run() {
    // 1. Products
    const { data: p, errors: pe } = await client.request(PRODUCTS, { variables: { first: 5 } });
    if (pe) throw new Error(JSON.stringify(pe));
    console.log(`\n[smoke] Shop: ${p.shop.name} (${p.shop.primaryDomain.url}) currency=${p.shop.paymentSettings.currencyCode}`);
    const products = p.products.edges.map((e) => e.node);
    console.log(`[smoke] Products found: ${products.length}`);
    for (const prod of products) {
        const price = prod.priceRange.minVariantPrice;
        console.log(`  - ${prod.title}  [${prod.handle}]  ${price.amount} ${price.currencyCode}`);
    }
    if (!products.length) {
        console.warn('[smoke] No products yet — dodaj produkty w Shopify Admin.');
        return;
    }

    // 2. Cart create
    const { data: cc, errors: cce } = await client.request(CART_CREATE);
    if (cce || cc.cartCreate.userErrors.length) throw new Error('cartCreate failed');
    const cartId = cc.cartCreate.cart.id;
    console.log(`\n[smoke] Cart created: ${cartId}`);
    console.log(`[smoke] checkoutUrl: ${cc.cartCreate.cart.checkoutUrl}`);

    // 3. Add first available variant
    const firstVariant = products
        .flatMap((pr) => pr.variants.edges.map((e) => e.node))
        .find((v) => v.availableForSale);
    if (!firstVariant) {
        console.warn('[smoke] No available variants — skip add.');
        return;
    }
    const { data: ad, errors: ae } = await client.request(CART_ADD, {
        variables: { cartId, lines: [{ merchandiseId: firstVariant.id, quantity: 1 }] },
    });
    if (ae || ad.cartLinesAdd.userErrors.length) throw new Error('cartLinesAdd failed');
    const cart = ad.cartLinesAdd.cart;
    console.log(`[smoke] Added variant. totalQuantity=${cart.totalQuantity} total=${cart.cost.totalAmount.amount} ${cart.cost.totalAmount.currencyCode}`);
    console.log(`[smoke] Final checkoutUrl: ${cart.checkoutUrl}`);
    console.log('\n[smoke] OK ✓');
}

run().catch((err) => {
    console.error('[smoke] FAIL:', err.message);
    process.exit(1);
});
