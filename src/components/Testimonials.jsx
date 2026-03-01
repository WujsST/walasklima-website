import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

const Testimonials = () => {
    const reviews = [
        {
            author: 'Michał Kowalski',
            rating: 5,
            date: 'tydzień temu',
            text: 'Szybko, sprawnie i w rozsądnej cenie. Pan Marcin z łatwością znalazł nieszczelność w mojej klimatyzacji samochodowej, którą inni "fachowcy" omijali. Polecam z czystym sumieniem!',
            service: 'Auto klimatyzacja'
        },
        {
            author: 'Agnieszka Nowak',
            rating: 5,
            date: '2 miesiące temu',
            text: 'Montaż klimatyzacji split w mieszkaniu przebiegł wzorowo. Bardzo czysta praca, żadnego bałaganu po wierceniu. Sprzęt Panasonic sprawuje się idealnie.',
            service: 'Klimatyzacja stacjonarna'
        },
        {
            author: 'Tomasz Wiśniewski',
            rating: 5,
            date: '3 miesiące temu',
            text: 'Wynajmowałem osuszacze po zalaniu piwnicy. Maszyny podstawione tego samego dnia, pełen profesjonalizm i doradztwo. Dziękuję za uratowanie sytuacji!',
            service: 'Osuszanie'
        }
    ];

    return (
        <section id="opinie" className="py-24 px-6 lg:px-20 bg-white overflow-hidden border-y border-gray-100">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

                {/* Left: Summary */}
                <div className="flex-1 w-full text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        </div>
                        <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Google Reviews</h2>
                    </div>

                    <div className="flex items-end justify-center lg:justify-start gap-4 mb-4">
                        <span className="font-heading font-extrabold text-6xl text-dark">4.9</span>
                        <div className="flex flex-col mb-2">
                            <div className="flex text-yellow-400 gap-1 mb-1">
                                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                            </div>
                            <span className="text-sm font-medium text-gray-500">Na podstawie setek zadowolonych klientów</span>
                        </div>
                    </div>

                    <p className="text-gray-500 font-sans max-w-md mx-auto lg:mx-0">
                        Z dumą obsługujemy Łódź i okolice od lat. Naszym priorytetem jest uczciwość, terminowość i najwyższa jakość chłodzenia.
                    </p>

                    <a href="#kontakt" className="inline-flex mt-8 bg-dark text-white px-6 py-3 rounded-xl font-bold hover:bg-primary transition-colors">
                        Zostaw nam opinię
                    </a>
                </div>

                {/* Right: Review Cards (Manual Marquee or Grid) */}
                <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                    {reviews.map((review, i) => (
                        <div key={i} className={`bg-background p-6 rounded-3xl border border-gray-100 shadow-sm relative ${i === 2 ? 'hidden sm:block lg:hidden xl:block' : ''}`}>
                            <Quote className="absolute top-6 right-6 text-gray-200" size={32} />
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold font-heading">
                                    {review.author.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-dark text-sm">{review.author}</h4>
                                    <p className="text-xs text-gray-500">{review.date}</p>
                                </div>
                            </div>
                            <div className="flex text-yellow-400 gap-1 mb-3">
                                {[...Array(review.rating)].map((_, idx) => <Star key={idx} size={14} fill="currentColor" />)}
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed mb-4">"{review.text}"</p>
                            <div className="flex items-center gap-1 text-xs font-semibold text-accent/80 bg-accent/10 w-fit px-2 py-1 rounded-md">
                                <CheckCircle size={12} />
                                <span>Zapytanie: {review.service}</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Testimonials;
