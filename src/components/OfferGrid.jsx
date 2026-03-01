import React from 'react';
import { Home, Car, Fan, Droplets } from 'lucide-react';

const OfferGrid = () => {
    const offers = [
        {
            id: 1,
            title: 'Klimatyzacja Stacjonarna',
            price: 'od 150 zł',
            desc: 'Montaż, serwis i przeglądy klimatyzacji split dla domów, mieszkań i biur.',
            icon: <Home size={32} strokeWidth={1.5} />,
            features: ['Odgrzybianie', 'Kontrola pracy', 'Uzupełnienie czynnika']
        },
        {
            id: 2,
            title: 'Auto Klimatyzacja',
            price: '200 zł',
            desc: 'Kompleksowa obsługa aut osobowych, busów, ciężarówek i maszyn rolniczych.',
            icon: <Car size={32} strokeWidth={1.5} />,
            features: ['Do 1KG czynnika R134a', 'Osuszanie i szczelność', 'Ozonowanie wnętrza'],
            popular: true
        },
        {
            id: 3,
            title: 'Klimatyzacja Przenośna',
            price: 'od 150 zł',
            desc: 'Czyszczenie, naprawa i serwis mobilnych klimatyzatorów bez ingerencji w budynek.',
            icon: <Fan size={32} strokeWidth={1.5} />,
            features: ['Czyszczenie filtrów', 'Kontrola wydajności', 'Konserwacja']
        },
        {
            id: 4,
            title: 'Osuszanie Pomieszczeń',
            price: 'Indywidualnie',
            desc: 'Wynajem osuszaczy kondensacyjnych i nagrzewnic. Usuwanie wilgoci po zalaniach.',
            icon: <Droplets size={32} strokeWidth={1.5} />,
            features: ['Osuszanie tynków', 'Po zalaniach', 'Osuszanie posadzek']
        }
    ];

    return (
        <section id="uslugi" className="py-24 px-6 lg:px-20 bg-soft border-y border-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-4">
                        Kompleksowa Oferta
                    </h2>
                    <p className="font-mono text-gray-500 max-w-2xl mx-auto">
                        Najtaniej w Łodzi i całym województwie łódzkim. Przystępne ceny, certyfikowany sprzęt.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {offers.map((offer) => (
                        <div
                            key={offer.id}
                            className={`relative bg-white rounded-3xl p-8 flex flex-col transition-transform hover:-translate-y-2 duration-300 shadow-xl shadow-primary/5 ${offer.popular ? 'border-2 border-accent' : 'border border-gray-100'}`}
                        >
                            {offer.popular && (
                                <div className="absolute top-0 right-8 -translate-y-1/2 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                                    Najczęściej Wybierane
                                </div>
                            )}

                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${offer.popular ? 'bg-primary text-white' : 'bg-soft text-primary'}`}>
                                {offer.icon}
                            </div>

                            <h3 className="font-heading font-bold text-xl text-dark mb-2">{offer.title}</h3>
                            <p className="font-mono text-accent font-bold mb-4">{offer.price}</p>
                            <p className="text-sm text-gray-500 mb-6 leading-relaxed flex-grow">{offer.desc}</p>

                            <ul className="space-y-2 mb-8 border-t border-gray-50 pt-6">
                                {offer.features.map((feature, i) => (
                                    <li key={i} className="text-xs font-medium text-dark flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <a href="#kontakt" className={`mt-auto w-full py-3 rounded-xl font-bold text-sm text-center transition-colors ${offer.popular ? 'bg-primary text-white hover:bg-primary/90' : 'bg-soft text-primary hover:bg-gray-200'}`}>
                                Zamów Usługę
                            </a>
                        </div>
                    ))}
                </div>

                {/* Devices / Brands Marquee */}
                <div className="mt-24 text-center">
                    <p className="text-xs font-mono text-gray-400 mb-8 tracking-widest uppercase">Zaufane Technologie i Partnerzy</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <span className="font-bold text-xl font-heading">Panasonic</span>
                        <span className="font-bold text-xl font-heading">LG</span>
                        <span className="font-bold text-xl font-heading">Sinclair</span>
                        <span className="font-bold text-xl font-heading">MDV</span>
                        <span className="font-bold text-xl font-heading">Bosch</span>
                        <span className="font-bold text-xl font-heading">Valeo</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OfferGrid;
