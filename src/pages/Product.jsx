import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getProduct, formatPrice } from '../lib/shopify/api';
import { useCart } from '../context/CartContext';

const Product = () => {
    const { handle } = useParams();
    const [product, setProduct] = useState(null);
    const [variantId, setVariantId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [added, setAdded] = useState(false);
    const { addItem, loading: cartLoading } = useCart();

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const p = await getProduct(handle);
                if (cancelled) return;
                setProduct(p);
                if (p?.variants?.length) {
                    const firstAvailable = p.variants.find((v) => v.availableForSale) || p.variants[0];
                    setVariantId(firstAvailable.id);
                }
            } catch (e) {
                if (!cancelled) setError(e.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [handle]);

    const handleAdd = async () => {
        if (!variantId) return;
        await addItem(variantId, 1);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="bg-background min-h-screen">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 pt-40 pb-24">
                <Link
                    to="/sklep"
                    className="inline-flex items-center gap-2 text-sm text-dark/60 hover:text-primary mb-8 transition-colors"
                >
                    <ArrowLeft size={16} /> Wróć do sklepu
                </Link>

                {loading && <p className="font-mono text-sm text-dark/50">Ładowanie…</p>}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 text-sm">
                        {error}
                    </div>
                )}
                {!loading && !product && !error && (
                    <p className="font-mono text-sm text-dark/50">Nie znaleziono produktu.</p>
                )}

                {product && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="aspect-square bg-soft rounded-[2.5rem] overflow-hidden">
                            {product.featuredImage?.url && (
                                <img
                                    src={product.featuredImage.url}
                                    alt={product.featuredImage.altText || product.title}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>

                        <div className="flex flex-col">
                            <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-4">
                                {product.title}
                            </h1>
                            <p className="font-mono text-2xl text-accent mb-8">
                                {formatPrice(product.priceRange?.minVariantPrice)}
                            </p>

                            {product.descriptionHtml && (
                                <div
                                    className="prose prose-sm text-dark/70 mb-8 max-w-none"
                                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                                />
                            )}

                            {product.variants.length > 1 && (
                                <div className="mb-6">
                                    <label className="block font-mono text-xs uppercase tracking-wider text-dark/50 mb-2">
                                        Wariant
                                    </label>
                                    <select
                                        value={variantId || ''}
                                        onChange={(e) => setVariantId(e.target.value)}
                                        className="w-full rounded-2xl border border-primary/10 bg-white px-4 py-3 font-medium"
                                    >
                                        {product.variants.map((v) => (
                                            <option key={v.id} value={v.id} disabled={!v.availableForSale}>
                                                {v.title} {!v.availableForSale && '(niedostępny)'}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <button
                                onClick={handleAdd}
                                disabled={!variantId || cartLoading}
                                className="mt-4 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-semibold transition-transform hover:scale-[1.02] disabled:opacity-50"
                            >
                                {added ? (
                                    <>
                                        <Check size={18} /> Dodano do koszyka
                                    </>
                                ) : (
                                    <>Dodaj do koszyka</>
                                )}
                            </button>

                            <p className="mt-6 font-mono text-xs text-dark/40">
                                Płatność BLIK · Dostawa Paczkomat InPost
                            </p>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Product;
