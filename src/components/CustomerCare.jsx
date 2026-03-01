import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CustomerCare = () => {
    const philosophyContainer = useRef(null);
    const stackContainer = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Philosophy Reveal
            gsap.from('.philo-text', {
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: philosophyContainer.current,
                    start: 'top 70%'
                }
            });

            // Sticky Stacking Cards - improved version
            const cards = gsap.utils.toArray('.stack-card');
            const totalCards = cards.length;

            cards.forEach((card, index) => {
                const isLast = index === totalCards - 1;

                // Set initial state with proper stacking offset
                gsap.set(card, {
                    position: 'sticky',
                    top: 0,
                    zIndex: totalCards - index
                });

                if (!isLast) {
                    ScrollTrigger.create({
                        trigger: card,
                        start: 'top top',
                        end: () => `+=${window.innerHeight * 0.8}`,
                        scrub: 0.5,
                        animation: gsap.to(card, {
                            scale: 0.92,
                            y: -30,
                            opacity: 0,
                            boxShadow: '0 -20px 40px rgba(0,0,0,0.1)',
                            ease: 'none'
                        })
                    });
                }
            });

        });
        return () => ctx.revert();
    }, []);

    const protocolSteps = [
        { num: '01', title: 'Diagnoza & Analiza', desc: 'Precyzyjne zlokalizowanie nieszczelności i usterek z wykorzystaniem promieni UV i wywiadu technicznego.' },
        { num: '02', title: 'Czyszczenie & Ozonowanie', desc: 'Uderzenie generatorem O3 (30 000 mg/h) eliminujące do 99.9% roztoczy, pleśni i bakterii z parownika i przewodów.' },
        { num: '03', title: 'Kalibracja Czynnika', desc: 'Precyzyjne odzyskanie starego czynnika, próżnia i uzupełnienie idealnej dawki z dodatkiem oleju PAG do sprężarki.' }
    ];

    return (
        <div className="w-full">
            {/* Philosophy - The Manifesto */}
            <section ref={philosophyContainer} className="relative py-32 px-6 lg:px-20 bg-primary overflow-hidden">
                {/* Organic Parallax Texture */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <img
                        src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=2000"
                        alt="Texture"
                        className="w-full h-full object-cover mix-blend-overlay"
                    />
                </div>

                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    <p className="philo-text text-white/50 font-sans text-xl md:text-2xl mb-6">
                        Zwykły serwis skupia się jedynie na chłodzeniu powietrza.
                    </p>
                    <h2 className="philo-text text-4xl md:text-6xl lg:text-7xl font-drama text-white italic leading-tight">
                        My skupiamy się na Twoim <br /><span className="text-accent not-italic font-heading font-black">Zdrowiu</span> i  <span className="text-accent not-italic font-heading font-black">Komforcie.</span>
                    </h2>
                </div>
            </section>

            {/* Protocol Sections - Sticky Stacking Archive */}
            <section ref={stackContainer} className="relative bg-white">
                {protocolSteps.map((step, idx) => (
                    <div
                        key={idx}
                        className="stack-card h-[100dvh] w-full flex items-center justify-center p-6 lg:p-20 bg-white rounded-t-[2rem] shadow-[0_-10px_60px_-15px_rgba(0,0,0,0.15)] border-t border-gray-100"
                    >
                        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-24">

                            {/* Visual Abstract side */}
                            <div className="flex-1 w-full aspect-square md:aspect-auto md:h-96 bg-soft rounded-[3rem] p-8 relative overflow-hidden flex items-center justify-center border border-white">
                                {/* SVGs based on step */}
                                {idx === 0 && (
                                    <div className="w-48 h-48 border-4 border-dashed border-primary/20 rounded-full animate-[spin_20s_linear_infinite] flex items-center justify-center">
                                        <div className="w-24 h-24 border-4 border-accent rounded-full animate-[spin_10s_linear_infinite_reverse]"></div>
                                    </div>
                                )}
                                {idx === 1 && (
                                    <div className="w-full h-64 flex flex-col justify-between p-4">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <div key={i} className="w-full h-2 bg-primary/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-accent rounded-full w-0 animate-[pulse_2s_ease-in-out_infinite]" style={{ width: `${Math.random() * 80 + 20}%`, animationDelay: `${i * 0.2}s` }}></div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {idx === 2 && (
                                    <svg className="w-full h-32 text-primary" viewBox="0 0 100 20" preserveAspectRatio="none">
                                        <path
                                            d="M0,10 Q25,-5 50,10 T100,10"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className="animate-[dash_3s_linear_infinite] stroke-dasharray-[200] stroke-dashoffset-[200]"
                                        />
                                        <style>{`@keyframes dash { to { stroke-dashoffset: 0; } }`}</style>
                                    </svg>
                                )}
                            </div>

                            {/* Content side */}
                            <div className="flex-1 space-y-6">
                                <span className="font-mono text-5xl md:text-7xl font-light text-primary/20 block">{step.num}</span>
                                <h3 className="font-heading font-extrabold text-3xl md:text-5xl text-dark">{step.title}</h3>
                                <p className="font-sans text-lg text-gray-500 leading-relaxed max-w-lg">
                                    {step.desc}
                                </p>
                            </div>

                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default CustomerCare;
