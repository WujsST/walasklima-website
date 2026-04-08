import { shopify } from './client';
import { PRODUCTS_QUERY, PRODUCT_BY_HANDLE_QUERY, CART_QUERY } from './queries';
import {
    CART_CREATE_MUTATION,
    CART_LINES_ADD_MUTATION,
    CART_LINES_REMOVE_MUTATION,
    CART_LINES_UPDATE_MUTATION,
} from './mutations';

async function request(operation, variables) {
    const { data, errors } = await shopify.request(operation, { variables });
    if (errors) {
        const message =
            errors.message ||
            (Array.isArray(errors.graphQLErrors) && errors.graphQLErrors.map((e) => e.message).join('; ')) ||
            'Shopify request failed';
        throw new Error(message);
    }
    return data;
}

const edgesToNodes = (connection) => (connection?.edges ?? []).map((e) => e.node);

export async function getProducts(first = 20) {
    const data = await request(PRODUCTS_QUERY, { first });
    return edgesToNodes(data.products);
}

export async function getProduct(handle) {
    const data = await request(PRODUCT_BY_HANDLE_QUERY, { handle });
    if (!data.product) return null;
    return {
        ...data.product,
        images: edgesToNodes(data.product.images),
        variants: edgesToNodes(data.product.variants),
    };
}

export async function getCart(cartId) {
    const data = await request(CART_QUERY, { id: cartId });
    return data.cart;
}

export async function createCart() {
    const data = await request(CART_CREATE_MUTATION, { input: {} });
    if (data.cartCreate.userErrors.length) {
        throw new Error(data.cartCreate.userErrors[0].message);
    }
    return data.cartCreate.cart;
}

export async function addToCart(cartId, merchandiseId, quantity = 1) {
    const data = await request(CART_LINES_ADD_MUTATION, {
        cartId,
        lines: [{ merchandiseId, quantity }],
    });
    if (data.cartLinesAdd.userErrors.length) {
        throw new Error(data.cartLinesAdd.userErrors[0].message);
    }
    return data.cartLinesAdd.cart;
}

export async function removeFromCart(cartId, lineId) {
    const data = await request(CART_LINES_REMOVE_MUTATION, {
        cartId,
        lineIds: [lineId],
    });
    if (data.cartLinesRemove.userErrors.length) {
        throw new Error(data.cartLinesRemove.userErrors[0].message);
    }
    return data.cartLinesRemove.cart;
}

export async function updateCartLine(cartId, lineId, quantity) {
    const data = await request(CART_LINES_UPDATE_MUTATION, {
        cartId,
        lines: [{ id: lineId, quantity }],
    });
    if (data.cartLinesUpdate.userErrors.length) {
        throw new Error(data.cartLinesUpdate.userErrors[0].message);
    }
    return data.cartLinesUpdate.cart;
}

export function formatPrice(money) {
    if (!money) return '';
    const amount = parseFloat(money.amount);
    return new Intl.NumberFormat('pl-PL', {
        style: 'currency',
        currency: money.currencyCode || 'PLN',
        maximumFractionDigits: 0,
    }).format(amount);
}
