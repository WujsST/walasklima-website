import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../lib/shopify/api';

const ProductCard = ({ product }) => {
    return (
        <Link
            to={`/sklep/${product.handle}`}
            className="group block bg-white rounded-[2rem] overflow-hidden border border-primary/5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
            <div className="aspect-square overflow-hidden bg-soft">
                {product.featuredImage?.url ? (
                    <img
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText || product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary/30 font-mono text-xs">
                        BRAK ZDJĘCIA
                    </div>
                )}
            </div>
            <div className="p-6">
                <h3 className="font-heading font-semibold text-lg text-dark mb-2 line-clamp-2">{product.title}</h3>
                <p className="font-mono text-sm text-accent">{formatPrice(product.priceRange?.minVariantPrice)}</p>
            </div>
        </Link>
    );
};

export default ProductCard;
