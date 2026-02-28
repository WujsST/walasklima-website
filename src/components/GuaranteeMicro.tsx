'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Award, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GuaranteeMicro = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.guarantee-item', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 85%',
        },
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 px-6 lg:px-20 bg-white border-y border-gray-100">
      <div
        ref={container}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-100"
      >
        <div className="guarantee-item flex flex-col items-center text-center p-6 pb-0 md:pb-6 pt-0 md:pt-6">
          <div className="w-12 h-12 bg-soft text-primary rounded-2xl flex items-center justify-center mb-4">
            <ShieldCheck size={24} />
          </div>
          <h4 className="font-heading font-bold text-lg text-dark mb-2">Certyfikaty F-GAZ</h4>
          <p className="text-sm text-gray-500 leading-relaxed">
            Świadectwa kwalifikacji zgodne z normami unijnymi. Pełne bezpieczeństwo instalacji.
          </p>
        </div>

        <div className="guarantee-item flex flex-col items-center text-center p-6 pb-0 md:pb-6">
          <div className="w-12 h-12 bg-soft text-accent rounded-2xl flex items-center justify-center mb-4">
            <Award size={24} />
          </div>
          <h4 className="font-heading font-bold text-lg text-dark mb-2">Gwarancja Satysfakcji</h4>
          <p className="text-sm text-gray-500 leading-relaxed">
            Setki zadowolonych klientów na przestrzeni lat. Najlepszy stosunek ceny do jakości w Łodzi.
          </p>
        </div>

        <div className="guarantee-item flex flex-col items-center text-center p-6">
          <div className="w-12 h-12 bg-soft text-primary rounded-2xl flex items-center justify-center mb-4">
            <Zap size={24} />
          </div>
          <h4 className="font-heading font-bold text-lg text-dark mb-2">Szybki Dojazd</h4>
          <p className="text-sm text-gray-500 leading-relaxed">
            Obsługujemy całe województwo łódzkie z dojazdem bezpośrednio na miejsce awarii lub montażu.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeMicro;
