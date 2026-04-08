import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartIcon = ({ scrolled }) => {
    const { itemCount } = useCart();
    return (
        <Link
            to="/koszyk"
            aria-label="Koszyk"
            className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full transition-transform hover:scale-105 ${scrolled ? 'text-primary hover:bg-primary/5' : 'text-white hover:bg-white/10'
                }`}
        >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">
                    {itemCount}
                </span>
            )}
        </Link>
    );
};

export default CartIcon;
