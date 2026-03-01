import React, { useState } from 'react';
import { Plus, Minus, MapPin, Clock } from 'lucide-react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

const FAQMap = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            q: 'Ile kosztuje serwis auto klimatyzacji?',
            a: 'Płacisz jedynie 200 zł za kompletną obsługę (do 1KG czynnika R134a, osuszanie, szczelność, kontrast UV, olej do sprężarki).'
        },
        {
            q: 'Czy dojeżdżacie do klienta?',
            a: 'Tak! Świadczymy usługi z dojazdem bezpośrednio do klienta na terenie Łodzi i całego województwa łódzkiego. Naprawiamy w terenie maszyny rolnicze i budowlane.'
        },
        {
            q: 'Czy zajmujecie się klimatyzacją w mieszkaniach?',
            a: 'Tak, wykonujemy profesjonalny montaż oraz serwis klimatyzacji stacjonarnej typu split w domach, biurach i firmach.'
        },
        {
            q: 'Od czego zależy cena montażu klimatyzacji w domu?',
            a: 'Ceny zaczynają się od 1800 zł netto z urządzeniem i montażem. Zależy to m.in. od mocy urządzenia, marki (Panasonic, Sinclair, LG) oraz długości i stopnia skomplikowania instalacji miedzianej.'
        },
        {
            q: 'Jak często należy odgrzybiać klimatyzację?',
            a: 'Zalecamy pełen serwis z odgrzybianiem minimum raz w roku, przed sezonem letnim. Dla alergików lub w mocno eksploatowanych pomieszczeniach / autach, warto to robić co pół roku.'
        }
    ];

    const toggleFaq = (idx) => {
        if (openIndex === idx) return;
        setOpenIndex(idx);
    };

    return (
        <section id="faq" className="py-24 px-6 lg:px-20 bg-background flex flex-col items-center">

            {/* Final CTA Banner */}
            <div id="kontakt" className="w-full max-w-7xl bg-primary rounded-[3rem] p-12 lg:p-20 relative overflow-hidden mb-24 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl">
                <div className="absolute inset-0 bg-accent/20 mix-blend-overlay"></div>
                <div className="relative z-10 lg:max-w-xl">
                    <h2 className="font-heading font-black text-4xl lg:text-5xl text-white mb-6">Gotowy na idealną temperaturę?</h2>
                    <p className="text-white/80 font-sans text-lg mb-8">Zadzwoń do nas lub zamów błyskawiczny audyt online. Oddzwonimy w ciągu 15 minut z gotową propozycją.</p>
                </div>
                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                    <a href="tel:+48604099876" className="w-full sm:w-auto bg-white text-primary px-8 py-4 rounded-xl font-bold text-center hover:bg-soft transition-colors shadow-lg">
                        Zadzwoń: 604 099 876
                    </a>
                    <Link to="/quiz" className="w-full sm:w-auto bg-accent text-white px-8 py-4 rounded-xl font-bold text-center hover:bg-[#549E39] transition-colors shadow-lg shadow-accent/20">
                        Formularz Online
                    </Link>
                </div>
            </div>

            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                {/* FAQ */}
                <div className="flex-1 w-full">
                    <h2 className="font-heading font-bold text-4xl text-dark mb-10">Pytania & Odpowiedzi</h2>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className={`border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === i ? 'bg-white shadow-md' : 'bg-transparent hover:bg-white'}`}
                            >
                                <button
                                    onClick={() => toggleFaq(i)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                                >
                                    <span className={`font-bold font-heading text-lg ${openIndex === i ? 'text-primary' : 'text-dark'}`}>{faq.q}</span>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === i ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400'}`}>
                                        {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                                    </div>
                                </button>
                                <div
                                    className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${openIndex === i ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <p className="text-gray-500 leading-relaxed text-sm">
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Map & Contact Info */}
                <div className="flex-1 w-full flex flex-col">
                    <h2 className="font-heading font-bold text-4xl text-dark mb-10">Lokalizacja</h2>

                    <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100 flex-1 flex flex-col relative overflow-hidden">
                        <div className="flex flex-col sm:flex-row gap-6 mb-6 z-10 relative">
                            <div className="flex items-start gap-3">
                                <div className="p-3 bg-soft text-primary rounded-xl"><MapPin size={20} /></div>
                                <div>
                                    <h4 className="font-bold text-dark mb-1">Baza Operacyjna</h4>
                                    <p className="text-sm text-gray-500">91-610 Łódź<br />ul. Beskidzka 170a</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-3 bg-soft text-accent rounded-xl"><Clock size={20} /></div>
                                <div>
                                    <h4 className="font-bold text-dark mb-1">Dostępność</h4>
                                    <p className="text-sm text-gray-500">Pon - Sob: 8:00 - 18:00<br />Awarie 24/7 po tel.</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex-1 rounded-xl overflow-hidden min-h-[300px] border border-gray-100 z-10 relative bg-gray-100 flex items-center justify-center">
                            {/* Fallback map if iframe fails, but iframe is better */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2466.7029314948743!2d19.4678233766795!3d51.81156637188737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471bcb80ad09592f%3A0xe5eb6cba4c1b9b18!2sBeskidzka%20170a%2C%2091-610%20%C5%81%C3%B3d%C5%BA!5e0!3m2!1spl!2spl!4v1714420000000!5m2!1spl!2spl"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale opacity-90 mix-blend-multiply hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                            ></iframe>
                        </div>

                        {/* Design flair */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FAQMap;
