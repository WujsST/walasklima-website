#!/usr/bin/env node
/**
 * Mini OAuth helper: exchanges integracja_landing Client ID/Secret
 * for an offline Admin API access token (shpat_...) and writes it to .env.local.
 *
 * Prerequisites (one-time, in Shopify Dev Dashboard → integracja_landing):
 *   1. Configuration → Redirect URLs → add: http://localhost:3456/callback
 *   2. Access scopes → Admin API → enable:
 *        write_products, read_products, write_publications,
 *        write_inventory, write_files
 *
 * .env.local must contain:
 *   SHOPIFY_STORE_DOMAIN=walas-klima-sklep.myshopify.com
 *   SHOPIFY_APP_CLIENT_ID=<Client ID from Dev Dashboard>
 *   SHOPIFY_APP_CLIENT_SECRET=<shpss_... Client Secret from Dev Dashboard>
 *
 * Run:  npm run shop:auth
 */
import { createServer } from 'node:http';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes, createHmac, timingSafeEqual } from 'node:crypto';
import { exec } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../.env.local');

const PORT = 3456;
const REDIRECT_URI = `http://localhost:${PORT}/callback`;
const SCOPES = 'write_products,read_products,write_publications,write_inventory,write_files';

function loadEnv() {
    const raw = readFileSync(envPath, 'utf8');
    const env = {};
    for (const line of raw.split('\n')) {
        const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
        if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
    return env;
}

function writeAdminToken(token) {
    const raw = readFileSync(envPath, 'utf8');
    const lines = raw.split('\n').filter((l) => !/^\s*SHOPIFY_ADMIN_TOKEN\s*=/.test(l));
    // trim trailing empty lines
    while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();
    lines.push(`SHOPIFY_ADMIN_TOKEN=${token}`, '');
    writeFileSync(envPath, lines.join('\n'), 'utf8');
}

function verifyHmac(params, secret) {
    const { hmac, signature, ...rest } = params;
    if (!hmac) return false;
    const message = Object.keys(rest)
        .sort()
        .map((k) => `${k}=${rest[k]}`)
        .join('&');
    const computed = createHmac('sha256', secret).update(message).digest('hex');
    const a = Buffer.from(computed, 'utf8');
    const b = Buffer.from(hmac, 'utf8');
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
}

const env = loadEnv();
const domain = env.SHOPIFY_STORE_DOMAIN || env.VITE_SHOPIFY_STORE_DOMAIN;
const clientId = env.SHOPIFY_APP_CLIENT_ID;
const clientSecret = env.SHOPIFY_APP_CLIENT_SECRET;

if (!domain || !clientId || !clientSecret) {
    console.error('✗ Missing SHOPIFY_STORE_DOMAIN / SHOPIFY_APP_CLIENT_ID / SHOPIFY_APP_CLIENT_SECRET in .env.local');
    process.exit(1);
}

const state = randomBytes(16).toString('hex');
const installUrl =
    `https://${domain}/admin/oauth/authorize` +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&scope=${encodeURIComponent(SCOPES)}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&state=${state}`;

const server = createServer(async (req, res) => {
    if (!req.url.startsWith('/callback')) {
        res.writeHead(404);
        res.end('not found');
        return;
    }
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const params = Object.fromEntries(url.searchParams.entries());

    if (params.state !== state) {
        res.writeHead(400);
        res.end('state mismatch');
        console.error('✗ state mismatch');
        server.close();
        process.exit(1);
    }

    if (!verifyHmac(params, clientSecret)) {
        res.writeHead(400);
        res.end('hmac verification failed');
        console.error('✗ HMAC verification failed');
        server.close();
        process.exit(1);
    }

    try {
        const tokenRes = await fetch(`https://${domain}/admin/oauth/access_token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                code: params.code,
            }),
        });
        if (!tokenRes.ok) {
            const text = await tokenRes.text();
            throw new Error(`${tokenRes.status}: ${text}`);
        }
        const { access_token, scope } = await tokenRes.json();
        if (!access_token) throw new Error('no access_token in response');

        writeAdminToken(access_token);

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(
            '<h1>✓ Done</h1><p>Token saved to .env.local. You can close this tab and return to the terminal.</p>',
        );

        console.log(`\n✓ shpat_ zapisany do .env.local`);
        console.log(`  scope: ${scope}`);
        console.log(`  prefix: ${access_token.slice(0, 10)}...`);
        console.log(`\nNastępny krok:`);
        console.log(`  node scripts/shop-add.mjs ./oferty/warmwave-21kw-basenowa.json ./oferty/warmwave-10kw-basenowa.json ./oferty/warmwave-5kw-mini-basenowa.json`);

        setTimeout(() => {
            server.close();
            process.exit(0);
        }, 500);
    } catch (e) {
        res.writeHead(500);
        res.end(`token exchange failed: ${e.message}`);
        console.error(`✗ token exchange failed: ${e.message}`);
        server.close();
        process.exit(1);
    }
});

server.listen(PORT, () => {
    console.log(`\n→ Listening on ${REDIRECT_URI}`);
    console.log(`→ Otwieram install URL w przeglądarce...`);
    console.log(`  (jeśli się nie otworzy, otwórz ręcznie:)\n  ${installUrl}\n`);
    exec(`open "${installUrl}"`, (err) => {
        if (err) console.warn(`  (open failed: ${err.message} — otwórz URL ręcznie)`);
    });
});
