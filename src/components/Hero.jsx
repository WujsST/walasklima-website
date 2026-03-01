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
            className="relative min-h-[100dvh] w-full flex flex-col justify-center overflow-hidden px-6 lg:px-20 pt-32 pb-8"
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
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-between h-full pt-4 md:pt-14">

                <div className="max-w-3xl">
                    {/* Google Reviews Badge */}
                    <div className="hero-text-anim flex items-center gap-3 sm:gap-4 bg-white rounded-lg p-2.5 pr-4 w-fit mb-6 sm:mb-8 shadow-2xl">
                        <div className="flex flex-col items-center justify-center bg-gray-50 rounded px-2 sm:px-3 py-1 border border-gray-100">
                            <span className="text-dark font-black text-base sm:text-lg leading-tight">5.0</span>
                            <div className="flex text-yellow-400">
                                <Star size={10} fill="currentColor" />
                                <Star size={10} fill="currentColor" />
                                <Star size={10} fill="currentColor" />
                                <Star size={10} fill="currentColor" />
                                <Star size={10} fill="currentColor" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-dark font-bold text-xs sm:text-sm">248 opinii w Google</span>
                            <span className="text-gray-500 text-[10px] sm:text-xs">Klimatyzacja Marcin Walas</span>
                        </div>
                        <div className="ml-2 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-blue-50 shrink-0">
                            <span className="font-bold text-lg" style={{ color: '#4285F4' }}>G</span>
                        </div>
                    </div>

                    <h1 className="hero-text-anim text-[2.75rem] sm:text-6xl lg:text-[5.5rem] leading-[1.05] text-white">
                        <span className="block font-heading font-extrabold tracking-tight">Klimatyzacja bez</span>
                        <span className="block font-heading font-extrabold text-accent mt-1 lg:mt-3">Kompromisów.</span>
                    </h1>

                    <p className="hero-text-anim text-base sm:text-lg lg:text-xl text-white/90 mt-6 lg:mt-8 max-w-2xl font-regular leading-relaxed">
                        Ciesz się idealną temperaturą w domu, biurze i samochodzie. Gwarantujemy błyskawiczny montaż, sterylność po pracy i niezawodny serwis na terenie Łodzi.
                    </p>

                    <div className="hero-text-anim mt-8 lg:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <Link to="/quiz" className="w-full sm:w-auto relative group overflow-hidden bg-accent text-white px-8 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg text-center shadow-lg shadow-accent/20">
                            <span className="relative z-10 block transition-transform group-hover:scale-105 duration-300">NATYCHMIASTOWA WYCENA</span>
                            <div className="absolute inset-0 bg-[#4ea632] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                        </Link>

                        <a href="tel:+48604099876" className="w-full sm:w-auto relative bg-[#0C3261] border border-white/10 text-white px-8 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg text-center hover:bg-[#164b91] transition-colors shadow-lg shadow-primary/30">
                            ZADZWOŃ: 604 099 876
                        </a>
                    </div>

                    {/* Checkmarks / Benefits */}
                    <div className="hero-text-anim mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 text-white/90 font-medium text-sm md:text-base">
                        <div className="flex items-center gap-2"><Check size={20} className="text-accent shrink-0" /> Szybka realizacja i naprawy</div>
                        <div className="flex items-center gap-2"><Check size={20} className="text-accent shrink-0" /> Certyfikat F-GAZ</div>
                        <div className="flex items-center gap-2"><Check size={20} className="text-accent shrink-0" /> Gwarancja bezawaryjności</div>
                    </div>
                </div>

                {/* Brands/Trust section at the bottom */}
                <div className="hero-text-anim w-full mt-12 lg:mt-24 pt-6 lg:pt-8 border-t border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                    <div className="flex items-center gap-4 shrink-0">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                            <Star size={20} className="text-accent lg:w-6 lg:h-6" fill="currentColor" />
                        </div>
                        <div>
                            <span className="block text-white font-bold tracking-wide text-xs lg:text-sm uppercase">Autoryzowany Serwis</span>
                            <span className="block text-white/60 text-xs lg:text-sm">Pracujemy na sprzęcie najwyższej klasy</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-start lg:justify-end gap-6 md:gap-12 opacity-50 hover:opacity-90 transition-opacity duration-500 w-full lg:w-auto">
                        <span className="text-xl md:text-2xl font-black font-heading text-white tracking-widest">LG</span>
                        <span className="text-xl md:text-2xl font-black font-heading text-white tracking-widest">DAIKIN</span>
                        <span className="text-xl md:text-2xl font-black font-heading text-white tracking-widest">GREE</span>
                        <span className="text-xl md:text-2xl font-black font-heading text-white tracking-widest italic">Sinclair</span>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
