import React, { useEffect, useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'O nas', href: '#o-nas' },
        { name: 'Usługi', href: '#uslugi' },
        { name: 'Opinie', href: '#opinie' },
        { name: 'FAQ', href: '#faq' },
    ];

    return (
        <nav className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-500 rounded-full px-6 py-4 flex items-center justify-between ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg border border-primary/10' : 'bg-transparent text-white'
            }`}>
            {/* Brand */}
            <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Walas Klimatyzacja" className="h-8 w-auto object-contain" />
                <span className={`font-heading font-bold text-lg hidden sm:block ${scrolled ? 'text-primary' : 'text-white'}`}>
                    Walas Klimatyzacja
                </span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className={`font-medium text-sm transition-transform hover:-translate-y-0.5 ${scrolled ? 'text-dark hover:text-accent' : 'text-white/90 hover:text-white'
                            }`}
                    >
                        {link.name}
                    </a>
                ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
                <Link
                    to="/quiz"
                    className="group relative overflow-hidden inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-accent text-white font-semibold text-sm transition-transform hover:scale-105"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <Phone size={16} />
                        Wycena
                    </span>
                    <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? (
                    <X size={24} className={scrolled ? 'text-primary' : 'text-white'} />
                ) : (
                    <Menu size={24} className={scrolled ? 'text-primary' : 'text-white'} />
                )}
            </button>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 mt-4 w-full bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 flex flex-col gap-4 text-dark md:hidden">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="font-medium text-lg py-2 border-b border-gray-100"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <Link
                        to="/quiz"
                        className="mt-4 flex items-center justify-center gap-2 bg-accent text-white py-3 rounded-xl font-bold"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <Phone size={20} />
                        Szybka Wycena
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
