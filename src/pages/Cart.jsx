import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/shopify/api';

const Cart = () => {
    const { cart, removeItem, updateQty, loading, checkoutUrl } = useCart();
    const lines = cart?.lines?.edges?.map((e) => e.node) ?? [];

    const goToCheckout = () => {
        if (checkoutUrl) window.location.href = checkoutUrl;
    };

    return (
        <div className="bg-background min-h-screen">
            <Navbar />

            <main className="max-w-5xl mx-auto px-6 pt-40 pb-24">
                <h1 className="font-heading font-bold text-5xl text-primary mb-12">
                    Twój <span className="font-drama italic font-normal">koszyk</span>
                </h1>

                {lines.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="font-mono text-sm text-dark/50 mb-6">Koszyk jest pusty.</p>
                        <Link
                            to="/sklep"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-semibold"
                        >
                            Przejdź do sklepu <ArrowRight size={16} />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <ul className="lg:col-span-2 space-y-4">
                            {lines.map((line) => {
                                const m = line.merchandise;
                                return (
                                    <li
                                        key={line.id}
                                        className="flex gap-4 bg-white rounded-[1.5rem] border border-primary/5 p-4"
                                    >
                                        <div className="w-24 h-24 bg-soft rounded-2xl overflow-hidden flex-shrink-0">
                                            {m.image?.url && (
                                                <img
                                                    src={m.image.url}
                                                    alt={m.image.altText || m.product.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-heading font-semibold text-dark truncate">
                                                {m.product.title}
                                            </h3>
                                            {m.title !== 'Default Title' && (
                                                <p className="text-xs text-dark/50">{m.title}</p>
                                            )}
                                            <p className="font-mono text-sm text-accent mt-1">
                                                {formatPrice(m.price)}
                                            </p>
                                            <div className="mt-3 flex items-center gap-3">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={line.quantity}
                                                    onChange={(e) =>
                                                        updateQty(line.id, parseInt(e.target.value, 10) || 1)
                                                    }
                                                    disabled={loading}
                                                    className="w-16 rounded-xl border border-primary/10 px-3 py-1 text-sm"
                                                />
                                                <button
                                                    onClick={() => removeItem(line.id)}
                                                    disabled={loading}
                                                    className="text-dark/40 hover:text-red-600 transition-colors"
                                                    aria-label="Usuń"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                        <aside className="bg-white rounded-[2rem] border border-primary/5 p-6 h-fit sticky top-32">
                            <h2 className="font-heading font-bold text-xl text-primary mb-4">Podsumowanie</h2>
                            <div className="flex justify-between text-sm text-dark/70 mb-2">
                                <span>Wartość produktów</span>
                                <span className="font-mono">
                                    {formatPrice(cart?.cost?.subtotalAmount)}
                                </span>
                            </div>
                            <div className="flex justify-between font-bold text-dark border-t border-primary/10 pt-3 mt-3">
                                <span>Razem</span>
                                <span className="font-mono text-accent">
                                    {formatPrice(cart?.cost?.totalAmount)}
                                </span>
                            </div>
                            <button
                                onClick={goToCheckout}
                                disabled={!checkoutUrl || loading}
                                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-accent text-white font-semibold transition-transform hover:scale-[1.02] disabled:opacity-50"
                            >
                                Przejdź do kasy <ArrowRight size={16} />
                            </button>
                            <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-dark/40 text-center">
                                BLIK · Paczkomat InPost · Karta
                            </p>
                        </aside>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Cart;
