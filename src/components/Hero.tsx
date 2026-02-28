'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const container = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text-anim', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2,
      });

      gsap.from('.hero-badge', {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)',
        delay: 1,
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative h-[100dvh] w-full flex items-end overflow-hidden pb-20 md:pb-32 px-6 lg:px-20"
    >
      {/* Background Image & Gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1620803511195-207ea3ea6b0e?auto=format&fit=crop&q=80&w=2000"
          alt="Modern clean airflow macro photography"
          className="w-full h-full object-cover origin-center scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#091522] via-[#091522]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
      </div>

      {/* Content Content - Bottom Left Third */}
      <div className="relative z-10 w-full max-w-4xl pt-32">
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-8">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          <span className="text-white/90 text-sm font-mono tracking-wide uppercase">
            Certyfikowany Serwis F-GAZ
          </span>
        </div>

        <h1 className="hero-text-anim text-5xl md:text-7xl lg:text-[7rem] leading-[1.1] text-white">
          <span className="block font-heading font-extrabold tracking-tight">Zapanuj nad</span>
          <span className="block font-drama italic text-accent font-light mt-2 -ml-2">Klimatem.</span>
        </h1>

        <p className="hero-text-anim text-lg md:text-2xl text-white/80 mt-8 max-w-2xl font-light leading-relaxed">
          Profesjonalny serwis, montaż i odgrzybianie klimatyzacji dla domów, firm oraz pojazdów w Łodzi i całym
          województwie łódzkim.
        </p>

        <div className="hero-text-anim mt-12 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/quiz"
            className="w-full sm:w-auto relative group overflow-hidden bg-accent text-white px-8 py-4 rounded-full font-bold text-lg text-center"
          >
            <span className="relative z-10 block transition-transform group-hover:scale-105 duration-300">
              Natychmiastowa Wycena
            </span>
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
          </Link>

          <a
            href="#kontakt"
            className="w-full sm:w-auto relative group overflow-hidden bg-white/10 border border-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-medium text-lg text-center hover:bg-white/20 transition-colors"
          >
            Zamów Serwis - 150 zł
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
