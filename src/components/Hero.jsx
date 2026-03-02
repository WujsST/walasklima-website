import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Star, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const container = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.hero-text-anim', {
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.2
            });
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={container}
            className="relative min-h-[100dvh] w-full flex flex-col justify-end overflow-hidden px-6 lg:px-20 pt-24 pb-6 lg:pb-8"
        >
            {/* Background Image & Gradient overlays for optimal readability */}
            <div className="absolute inset-0 z-0 bg-[#091522]">
                <img
                    src="/hero-bg.png"
                    alt="Klimatyzacja Marcin Walas - serwis z dojazdem"
                    className="w-full h-full object-cover object-center md:object-right scale-[1.02] opacity-80 md:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#091522] via-[#091522]/90 to-transparent w-full md:w-[70%] z-0"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#091522] via-transparent to-transparent z-0"></div>
                {/* Extra subtle overlay for text contrast globally */}
                <div className="absolute inset-0 bg-primary/30 mix-blend-multiply z-0"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-end h-full mt-auto">

                <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                    {/* Google Reviews Badge - Clickable */}
                    <a
                        href="https://search.google.com/local/reviews?placeid=ChIJsU_o2oDLG0cR7pVof1AXm4Q"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-text-anim flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-md rounded-xl p-2.5 pr-4 sm:pr-5 w-fit mb-6 sm:mb-8 border border-white/10 shadow-2xl scale-95 sm:scale-100 origin-center cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:bg-white/15 group"
                    >
                        <div className="flex flex-col items-center justify-center px-2 py-0.5">
                            <span className="text-white font-black text-base sm:text-lg leading-tight">4.8</span>
                            <div className="flex text-yellow-400 mt-1">
                                <Star size={10} fill="currentColor" />
                                <Star size={10} fill="currentColor" />
                                <Star size={10} fill="currentColor" />
                                <Star size={10} fill="currentColor" />
                                <Star size={10} fill="currentColor" className="opacity-70" />
                            </div>
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-white font-bold text-xs sm:text-sm leading-tight">Zweryfikowane w Google</span>
                            <span className="text-white/50 text-[10px] sm:text-xs leading-tight mt-0.5">Zobacz opinie naszych klientów</span>
                        </div>
                        <div className="ml-1 sm:ml-2 font-bold text-base sm:text-lg text-blue-400 shrink-0">
                            G
                        </div>
                    </a>

                    <h1 className="hero-text-anim text-4xl sm:text-5xl lg:text-7xl leading-[1.05] text-white">
                        <span className="block font-heading font-extrabold tracking-tight">Klimatyzacja bez</span>
                        <span className="block font-heading font-extrabold text-accent mt-1 lg:mt-2">Kompromisów.</span>
                    </h1>

                    <p className="hero-text-anim text-sm sm:text-base lg:text-lg text-white/90 mt-4 lg:mt-6 max-w-2xl mx-auto font-regular leading-relaxed">
                        Ciesz się idealną temperaturą w domu, biurze i samochodzie. Gwarantujemy błyskawiczny montaż i niezawodny serwis na terenie Łodzi.
                    </p>

                    <div className="hero-text-anim mt-6 lg:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
                        <Link to="/quiz" className="w-full sm:w-auto min-w-[240px] relative group overflow-hidden bg-accent text-white px-6 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base text-center shadow-lg shadow-accent/20">
                            <span className="relative z-10 block transition-transform group-hover:scale-105 duration-300">NATYCHMIASTOWA WYCENA</span>
                            <div className="absolute inset-0 bg-[#4ea632] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                        </Link>

                        <a href="tel:+48604099876" className="w-full sm:w-auto min-w-[240px] relative bg-[#0C3261] border border-white/10 text-white px-6 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base text-center hover:bg-[#164b91] transition-colors shadow-lg shadow-primary/30">
                            ZADZWOŃ: 604 099 876
                        </a>
                    </div>

                    {/* Checkmarks / Benefits */}
                    <div className="hero-text-anim mt-5 sm:mt-6 flex flex-row flex-wrap justify-center gap-x-4 gap-y-2 text-white/90 font-medium text-xs md:text-sm">
                        <div className="flex items-center gap-1.5"><Check size={16} className="text-accent shrink-0" /> Szybka realizacja i naprawy</div>
                        <div className="flex items-center gap-1.5"><Check size={16} className="text-accent shrink-0" /> Certyfikat F-GAZ</div>
                        <div className="flex items-center gap-1.5"><Check size={16} className="text-accent shrink-0" /> Gwarancja bezawaryjności</div>
                    </div>
                </div>

                {/* Brands/Trust section at the bottom */}
                <div className="hero-text-anim w-full mt-8 lg:mt-16 pt-4 lg:pt-6 border-t border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                            <Star size={14} className="text-accent lg:w-5 lg:h-5" fill="currentColor" />
                        </div>
                        <div>
                            <span className="block text-white font-bold tracking-wide text-[10px] lg:text-xs uppercase leading-tight">Autoryzowany Serwis</span>
                            <span className="block text-white/60 text-[10px] lg:text-xs leading-tight">Sprzęt najwyższej klasy</span>
                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-start lg:justify-end gap-5 md:gap-8 opacity-50 w-full lg:w-auto overflow-x-auto pb-1 no-scrollbar">
                        <span className="text-lg md:text-xl font-black font-heading text-white tracking-widest shrink-0">LG</span>
                        <span className="text-lg md:text-xl font-black font-heading text-white tracking-widest shrink-0">DAIKIN</span>
                        <span className="text-lg md:text-xl font-black font-heading text-white tracking-widest shrink-0">GREE</span>
                        <span className="text-lg md:text-xl font-black font-heading text-white tracking-widest italic shrink-0">Sinclair</span>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
