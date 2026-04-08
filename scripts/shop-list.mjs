#!/usr/bin/env node
/** List products in Shopify. Usage: node scripts/shop-list.mjs */
import { adminFetch } from './shopify-admin.mjs';

const QUERY = `#graphql
  query List {
    products(first: 50) {
      edges { node {
        id handle title status
        totalInventory
        variants(first: 1) { edges { node { price sku } } }
      } }
    }
  }
`;

const data = await adminFetch(QUERY);
const rows = data.products.edges.map((e) => e.node);
if (!rows.length) {
    console.log('(brak produktów)');
    process.exit(0);
}
console.log(`Produkty (${rows.length}):\n`);
for (const p of rows) {
    const v = p.variants.edges[0]?.node;
    const price = v ? `${v.price} PLN` : '—';
    const sku = v?.sku || '—';
    console.log(`  ${p.status.padEnd(8)} ${p.handle.padEnd(40)} ${price.padStart(12)}  stock=${p.totalInventory ?? 0}  sku=${sku}`);
    console.log(`           ${p.title}`);
}
