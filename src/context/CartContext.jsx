import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
    createCart,
    getCart,
    addToCart as apiAddToCart,
    removeFromCart as apiRemoveFromCart,
    updateCartLine as apiUpdateCartLine,
} from '../lib/shopify/api';

const STORAGE_KEY = 'walas_cart_id';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Restore cart on mount
    useEffect(() => {
        const cartId = localStorage.getItem(STORAGE_KEY);
        if (!cartId) return;
        let cancelled = false;
        (async () => {
            try {
                const restored = await getCart(cartId);
                if (cancelled) return;
                if (restored) setCart(restored);
                else localStorage.removeItem(STORAGE_KEY);
            } catch (e) {
                if (!cancelled) {
                    console.error('[cart] restore failed', e);
                    localStorage.removeItem(STORAGE_KEY);
                }
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    const ensureCart = useCallback(async () => {
        if (cart) return cart;
        const fresh = await createCart();
        localStorage.setItem(STORAGE_KEY, fresh.id);
        setCart(fresh);
        return fresh;
    }, [cart]);

    const addItem = useCallback(
        async (variantId, quantity = 1) => {
            setLoading(true);
            setError(null);
            try {
                const current = await ensureCart();
                const updated = await apiAddToCart(current.id, variantId, quantity);
                setCart(updated);
            } catch (e) {
                setError(e.message);
                console.error('[cart] addItem failed', e);
            } finally {
                setLoading(false);
            }
        },
        [ensureCart]
    );

    const removeItem = useCallback(
        async (lineId) => {
            if (!cart) return;
            setLoading(true);
            try {
                const updated = await apiRemoveFromCart(cart.id, lineId);
                setCart(updated);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        },
        [cart]
    );

    const updateQty = useCallback(
        async (lineId, quantity) => {
            if (!cart) return;
            setLoading(true);
            try {
                const updated = await apiUpdateCartLine(cart.id, lineId, quantity);
                setCart(updated);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        },
        [cart]
    );

    const value = {
        cart,
        loading,
        error,
        itemCount: cart?.totalQuantity ?? 0,
        checkoutUrl: cart?.checkoutUrl ?? null,
        addItem,
        removeItem,
        updateQty,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within <CartProvider>');
    return ctx;
}
