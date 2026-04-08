import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../lib/shopify/api';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const list = await getProducts(24);
                if (!cancelled) setProducts(list);
            } catch (e) {
                if (!cancelled) setError(e.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div className="bg-background min-h-screen">
            <Navbar />
            <header className="pt-40 pb-16 px-6 text-center">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">Sklep</p>
                <h1 className="font-heading font-bold text-5xl md:text-7xl text-primary">
                    Klimatyzacja <span className="font-drama italic font-normal">na wyciągnięcie ręki</span>
                </h1>
                <p className="mt-6 text-dark/70 max-w-xl mx-auto">
                    Wybrane modele i akcesoria. Płatność BLIK, dostawa do Paczkomatu InPost.
                </p>
            </header>

            <main className="max-w-7xl mx-auto px-6 pb-24">
                {loading && (
                    <p className="text-center font-mono text-sm text-dark/50">Ładowanie produktów…</p>
                )}
                {error && (
                    <div className="max-w-xl mx-auto bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 text-sm">
                        Nie udało się załadować produktów: {error}
                    </div>
                )}
                {!loading && !error && products.length === 0 && (
                    <p className="text-center font-mono text-sm text-dark/50">
                        Brak produktów w sklepie. Dodaj produkty w panelu Shopify.
                    </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Shop;
