import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const storeDomain = import.meta.env.SHOPIFY_STORE_DOMAIN;
const publicAccessToken = import.meta.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export const shopify = createStorefrontApiClient({
    storeDomain,
    apiVersion: '2025-10',
    publicAccessToken,
});
