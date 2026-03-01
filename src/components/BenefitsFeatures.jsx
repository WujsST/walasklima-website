import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointer2, Thermometer, Wind, PlusCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// 1. Diagnostic Shuffler Card
const DiagnosticShuffler = () => {
    const [cards, setCards] = useState([
        { id: 1, title: 'Komfort termiczny', desc: 'Idealna temperatura niezależnie od upałów na zewnątrz.', icon: <Thermometer size={20} className="text-accent" /> },
        { id: 2, title: 'Czyste Powietrze', desc: 'Filtry zatrzymujące kurz, pył, bakterie i roztocza.', icon: <Wind size={20} className="text-secondary" /> },
        { id: 3, title: 'Funkcja Grzania', desc: 'Wydajna pompa ciepła w zimowe dni, tańsza niż prąd.', icon: <PlusCircle size={20} className="text-primary" /> },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCards(prev => {
                const newCards = [...prev];
                const last = newCards.pop();
                newCards.unshift(last);
                return newCards;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden h-[340px]">
            <div className="w-full mb-auto z-10">
                <h3 className="font-heading font-bold text-xl text-primary mb-1">Optymalizacja</h3>
                <p className="text-sm text-gray-500">System korzyści</p>
            </div>

            <div className="relative w-full h-40 flex justify-center mt-6">
                {cards.map((card, idx) => {
                    // Calculate positions
                    const isTop = idx === 0;
                    const isMiddle = idx === 1;
                    const isBottom = idx === 2;

                    let style = {};
                    if (isTop) {
                        style = { transform: 'translateY(0) scale(1)', zIndex: 30, opacity: 1 };
                    } else if (isMiddle) {
                        style = { transform: 'translateY(20px) scale(0.95)', zIndex: 20, opacity: 0.6 };
                    } else if (isBottom) {
                        style = { transform: 'translateY(40px) scale(0.9)', zIndex: 10, opacity: 0.3 };
                    }

                    return (
                        <div
                            key={card.id}
                            className="absolute w-full max-w-[280px] bg-soft rounded-2xl p-4 shadow-sm border border-white transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                            style={style}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    {card.icon}
                                </div>
                                <h4 className="font-sans font-bold text-dark">{card.title}</h4>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed pl-1">{card.desc}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// 2. Telemetry Typewriter Card
const TelemetryTypewriter = () => {
    const [text, setText] = useState('');
    const fullText = "DIAGNOSTYKA UKŁADU ODPALONA...\n> Analiza poziomu czynnika R134a: W NORMIE\n> Ciśnienie kompresora: OPTYMALNE\n> Odgrzybianie O3 (Ozon): ZAKOŃCZONE Pomyślnie\nSTATUS: GOTOWY DO PRACY.";

    const container = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        ScrollTrigger.create({
            trigger: container.current,
            start: 'top 80%',
            onEnter: () => setIsVisible(true)
        });
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let currentIndex = 0;
        const intervalId = setInterval(() => {
            setText(fullText.slice(0, currentIndex));
            currentIndex++;
            if (currentIndex > fullText.length) {
                clearInterval(intervalId);
            }
        }, 40);

        return () => clearInterval(intervalId);
    }, [isVisible]);

    return (
        <div ref={container} className="bg-dark rounded-[2rem] p-8 shadow-xl flex flex-col relative overflow-hidden h-[340px]">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <div>
                    <h3 className="font-heading font-bold text-xl text-white mb-1">Telemetria</h3>
                    <p className="text-sm text-gray-400">Podgląd systemu na żywo</p>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                    <span className="text-xs font-mono text-white/70">W TOKU</span>
                </div>
            </div>

            <div className="font-mono text-sm text-green-400 whitespace-pre-wrap leading-relaxed">
                {text}
                <span className="animate-pulse inline-block w-2.5 h-4 bg-accent align-middle ml-1"></span>
            </div>
        </div>
    );
};

// 3. Cursor Protocol Scheduler
const CursorScheduler = () => {
    const container = useRef(null);
    const cursorRef = useRef(null);
    const cellRef = useRef(null);
    const btnRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Create a repeating timeline
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1, paused: true });

            tl.set(cursorRef.current, { x: 0, y: 150, opacity: 0 })
                .set(cellRef.current, { backgroundColor: 'transparent' })
                .to(cursorRef.current, { opacity: 1, duration: 0.3 })
                .to(cursorRef.current, {
                    x: 120, y: 50,
                    duration: 1.2,
                    ease: 'power2.inOut'
                })
                .to(cursorRef.current, { scale: 0.8, duration: 0.1 }) // Click down
                .to(cellRef.current, { backgroundColor: '#65B447', duration: 0.1 }, "<")
                .to(cursorRef.current, { scale: 1, duration: 0.1 }) // Click up
                .to(cursorRef.current, {
                    x: 210, y: 110,
                    duration: 0.8,
                    ease: 'power2.inOut',
                    delay: 0.5
                })
                .to(cursorRef.current, { scale: 0.8, duration: 0.1 }) // Click down on button
                .to(btnRef.current, { scale: 0.95, duration: 0.1 }, "<")
                .to(cursorRef.current, { scale: 1, duration: 0.1 }) // Click up
                .to(btnRef.current, { scale: 1, duration: 0.1 }, "<")
                .to(cursorRef.current, { opacity: 0, duration: 0.3, delay: 0.5 });

            ScrollTrigger.create({
                trigger: container.current,
                start: 'top 75%',
                onEnter: () => tl.play()
            });
        }, container);

        return () => ctx.revert();
    }, []);

    const days = ['N', 'P', 'W', 'Ś', 'C', 'P', 'S'];

    return (
        <div ref={container} className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 flex flex-col relative overflow-hidden h-[340px]">
            <div className="w-full mb-6">
                <h3 className="font-heading font-bold text-xl text-primary mb-1">Harmonogram</h3>
                <p className="text-sm text-gray-500">Szybka rezerwacja terminu</p>
            </div>

            <div className="relative w-full h-full flex flex-col justify-between">
                <div className="grid grid-cols-7 gap-1">
                    {days.map((day, i) => (
                        <div key={i} className="text-center text-xs font-mono text-gray-400 mb-2">{day}</div>
                    ))}
                    {Array.from({ length: 14 }).map((_, i) => (
                        <div
                            key={i}
                            ref={i === 9 ? cellRef : null} // Target Thursday of second week
                            className="aspect-square rounded-md border border-gray-100 flex items-center justify-center text-xs text-gray-400 transition-colors"
                        >
                            {(i + 10)}
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-end pb-2">
                    <div className="text-xs text-gray-400">Dojazd Gwarantowany</div>
                    <button ref={btnRef} className="bg-primary text-white text-xs px-4 py-2 rounded-lg font-bold">
                        Potwierdź
                    </button>
                </div>

                {/* The Animated Cursor */}
                <div
                    ref={cursorRef}
                    className="absolute z-50 pointer-events-none drop-shadow-md"
                    style={{ width: '24px', height: '24px', left: 0, top: 0 }}
                >
                    <MousePointer2 fill="#1A1E24" stroke="white" strokeWidth={2} />
                </div>
            </div>
        </div>
    );
};

export const BenefitsFeatures = () => {
    return (
        <section id="korzysci" className="py-24 px-6 lg:px-20 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-4">
                        Precyzja w Każdym Detalu
                    </h2>
                    <p className="font-mono text-gray-500 max-w-2xl mx-auto">
                        Dlaczego warto polegać na certyfikowanym serwisie? Od powietrza, którym oddychasz, po mikroklimat Twojego domu.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <DiagnosticShuffler />
                    <TelemetryTypewriter />
                    <CursorScheduler />
                </div>
            </div>
        </section>
    );
};

export default BenefitsFeatures;
