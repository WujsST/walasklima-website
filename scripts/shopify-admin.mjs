#!/usr/bin/env node
/**
 * Shared Shopify Admin GraphQL helper.
 * Loads .env.local, exposes adminFetch(query, variables) + loadEnv().
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../.env.local');

export function loadEnv() {
    try {
        const raw = readFileSync(envPath, 'utf8');
        for (const line of raw.split('\n')) {
            const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
            if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
        }
    } catch {
        console.error(`[shopify-admin] Cannot read ${envPath}`);
        process.exit(1);
    }

    const domain = process.env.SHOPIFY_STORE_DOMAIN || process.env.VITE_SHOPIFY_STORE_DOMAIN;
    const token = process.env.SHOPIFY_ADMIN_TOKEN;
    if (!domain || !token) {
        console.error('[shopify-admin] Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_TOKEN in .env.local');
        process.exit(1);
    }
    return { domain, token };
}

const API_VERSION = '2025-10';

export async function adminFetch(query, variables = {}) {
    const { domain, token } = loadEnv();
    const res = await fetch(`https://${domain}/admin/api/${API_VERSION}/graphql.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': token,
        },
        body: JSON.stringify({ query, variables }),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Admin API ${res.status}: ${text.slice(0, 500)}`);
    }
    const json = await res.json();
    if (json.errors) throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
    return json.data;
}

export function die(msg) {
    console.error(`✗ ${msg}`);
    process.exit(1);
}

export function ok(msg) {
    console.log(`✓ ${msg}`);
}
