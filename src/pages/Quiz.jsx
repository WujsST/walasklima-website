import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ArrowLeft, Home, Car, CheckCircle, Fan, Droplets, Check, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Quiz = () => {
    const [step, setStep] = useState(1);
    const [quizType, setQuizType] = useState(null); // 'home' | 'auto' | 'portable' | 'dehumidify'
    const [answers, setAnswers] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const formRef = useRef(null);

    // Dynamic questions with condition function
    const allHomeQuestions = [
        {
            id: 'buildingType',
            question: 'Jaki to rodzaj zabudowy?',
            options: ['Bliźniak', 'Dom jednorodzinny', 'Bungalow (dom parterowy)', 'Mieszkanie w bloku', 'Biuro / Lokal usługowy'],
            condition: () => true
        },
        {
            id: 'area',
            question: 'Jaka jest powierzchnia pomieszczenia/pomieszczeń do klimatyzacji?',
            options: ['Do 25 m²', '25-40 m²', '40-60 m²', '60-100 m²', 'Powyżej 100 m²'],
            condition: () => true
        },
        {
            id: 'rooms',
            question: 'Jakie pomieszczenia wymagają chłodzenia?',
            options: ['Salon', 'Sypialnia', 'Kuchnia', 'Biuro', 'Wiele pomieszczeń / Cały projekt'],
            condition: () => true
        },
        {
            id: 'sunExposure',
            question: 'Jak pomieszczenie jest nasłonecznione?',
            options: ['Silne nasłonecznienie (południe/zachód)', 'Umiarkowane (wschód)', 'Słabe (północ)', 'Mieszane / Nie wiem'],
            condition: () => true
        },
        {
            id: 'floors',
            question: 'Ile pięter ma budynek?',
            options: ['Tylko parter (Brak pięter)', '1 piętro', '2 piętra', '3 piętra lub więcej'],
            condition: () => true
        },
        {
            id: 'floorLevel',
            question: 'Na którym piętrze ma być montaż urządzenia zew. (agregatu)?',
            options: ['Na parterze / na ziemi', '1. piętro (balkon/elewacja)', '2. piętro lub wyżej', 'Na dachu'],
            condition: (ans) => ans.floors && ans.floors !== 'Tylko parter (Brak pięter)'
        },
        {
            id: 'heightPreferences',
            question: 'Preferowana lokalizacja jednostki wewnętrznej?',
            options: ['Standardowo pod sufitem (Ścienna)', 'Nad drzwiami', 'Przy podłodze (Konsola)', 'Ukryta w suficie (Kaseton / Kanałowa)'],
            condition: () => true
        },
        {
            id: 'heating',
            question: 'Czy klimatyzacja ma również ogrzewać pomieszczenie?',
            options: ['Tak, chcę grzanie i chłodzenie', 'Tylko chłodzenie', 'Nie wiem, potrzebuję doradztwa'],
            condition: () => true
        },
        {
            id: 'budget',
            question: 'Jaki jest Twój orientacyjny budżet?',
            options: ['Do 3 000 zł', '3 000 - 5 000 zł', '5 000 - 8 000 zł', 'Powyżej 8 000 zł', 'Potrzebuję wyceny'],
            condition: () => true
        }
    ];

    const allAutoQuestions = [
        {
            id: 'vehicleType',
            question: 'Jaki to rodzaj pojazdu?',
            options: ['Samochód Osobowy', 'Bus / Autokar', 'Ciężarówka', 'Maszyna Rolnicza / Budowlana'],
            condition: () => true
        },
        {
            id: 'serviceType',
            question: 'Jakiej usługi potrzebujesz?',
            options: ['Pełny serwis (Nabijanie + Odgrzybianie)', 'Tylko Odgrzybianie / Ozonowanie', 'Diagnostyka usterki / Nieszczelność', 'Naprawa / Płukanie po zatarciu'],
            condition: () => true
        }
    ];

    const allPortableQuestions = [
        {
            id: 'deviceType',
            question: 'Jaki typ urządzenia posiadasz?',
            options: ['Klimatyzator przenośny (monoblock)', 'Mobilny split', 'Wentylator z funkcją chłodzenia', 'Nie wiem / Inny'],
            condition: () => true
        },
        {
            id: 'serviceNeed',
            question: 'Czego potrzebujesz?',
            options: ['Czyszczenie i konserwacja', 'Naprawa usterki', 'Przegląd okresowy', 'Doradztwo przy zakupie nowego'],
            condition: () => true
        },
        {
            id: 'devicePower',
            question: 'Jaka jest moc urządzenia (jeśli znasz)?',
            options: ['Do 2 kW (mały pokój)', '2-3.5 kW (średni pokój)', 'Powyżej 3.5 kW (duże pomieszczenie)', 'Nie znam mocy'],
            condition: () => true
        },
        {
            id: 'problem',
            question: 'Czy urządzenie wykazuje jakieś problemy?',
            options: ['Słabo chłodzi', 'Głośno pracuje', 'Wycieka woda', 'Nieprzyjemny zapach', 'Działa prawidłowo'],
            condition: (ans) => ans.serviceNeed !== 'Doradztwo przy zakupie nowego'
        }
    ];

    const allDehumidifyQuestions = [
        {
            id: 'reason',
            question: 'Jaka jest przyczyna potrzeby osuszania?',
            options: ['Zalanie / Awaria wodociągowa', 'Budowa / Remont (nowe tynki)', 'Chroniczna wilgoć w pomieszczeniu', 'Powódź / Podtopienie'],
            condition: () => true
        },
        {
            id: 'dehumidArea',
            question: 'Jaka jest powierzchnia do osuszenia?',
            options: ['Do 30 m²', '30-60 m²', '60-100 m²', '100-200 m²', 'Powyżej 200 m²'],
            condition: () => true
        },
        {
            id: 'roomType',
            question: 'Jaki typ pomieszczenia wymaga osuszania?',
            options: ['Piwnica / Garaż', 'Mieszkanie / Dom', 'Lokal usługowy / Biuro', 'Hala magazynowa / Produkcyjna'],
            condition: () => true
        },
        {
            id: 'urgency',
            question: 'Jak pilna jest potrzeba?',
            options: ['Natychmiast (awaria)', 'W ciągu 2-3 dni', 'W tym tygodniu', 'Planowane na przyszłość'],
            condition: () => true
        },
        {
            id: 'equipment',
            question: 'Czego potrzebujesz?',
            options: ['Tylko osuszacze', 'Osuszacze + nagrzewnice', 'Pełna obsługa z monitoringiem', 'Potrzebuję doradztwa'],
            condition: () => true
        }
    ];

    const handleSelectType = (type) => {
        setIsTransitioning(true);
        setTimeout(() => {
            setQuizType(type);
            setStep(2);
            setIsTransitioning(false);
        }, 300);
    };

    const getQuestionSource = () => {
        switch (quizType) {
            case 'home': return allHomeQuestions;
            case 'auto': return allAutoQuestions;
            case 'portable': return allPortableQuestions;
            case 'dehumidify': return allDehumidifyQuestions;
            default: return [];
        }
    };

    const getActiveQuestions = () => {
        if (!quizType) return [];
        return getQuestionSource().filter(q => q.condition(answers));
    };

    const activeQuestions = getActiveQuestions();
    const isComplete = step > activeQuestions.length + 1;

    // Show confetti on completion
    useEffect(() => {
        if (isComplete) {
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isComplete]);

    const handleAnswer = (questionId, answer) => {
        setSelectedOption(answer);
        setIsTransitioning(true);

        setTimeout(() => {
            const newAnswers = { ...answers, [questionId]: answer };
            setAnswers(newAnswers);

            const nextQuestions = getQuestionSource().filter(q => q.condition(newAnswers));

            if (step - 1 < nextQuestions.length) {
                setStep(step + 1);
            } else {
                setStep(nextQuestions.length + 2);
            }
            setSelectedOption(null);
            setIsTransitioning(false);
        }, 400);
    };

    const handleBack = () => {
        if (step > 1) {
            setIsTransitioning(true);
            setTimeout(() => {
                setStep(step - 1);
                setIsTransitioning(false);
            }, 200);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log("Zebrane dane do CRM:", answers);
        setIsSubmitting(false);
        alert("Formularz wysłany! Skontaktujemy się z Tobą najszybciej jak to możliwe.");
    };

    return (
        <div className="min-h-screen bg-background flex flex-col justify-center items-center p-6 relative">

            <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-dark font-medium hover:text-accent transition-colors">
                <ArrowLeft size={20} /> Wróć do strony głównej
            </Link>

            <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-xl p-8 lg:p-12 border border-gray-100 relative overflow-hidden mt-12 mb-12">

                {/* Confetti Effect */}
                {showConfetti && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(50)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-2 h-2 rounded-full animate-confetti"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: '-10px',
                                    backgroundColor: ['#65B447', '#1A365D', '#FFD700', '#FF6B6B', '#4ECDC4'][Math.floor(Math.random() * 5)],
                                    animationDelay: `${Math.random() * 2}s`,
                                    animationDuration: `${2 + Math.random() * 2}s`
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Progress bar */}
                {!isComplete && step > 1 && (
                    <div className="absolute top-0 left-0 w-full h-2 bg-gray-100 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-accent to-green-400 transition-all duration-700 ease-out relative"
                            style={{ width: `${((step - 1) / Math.max(activeQuestions.length, 1)) * 100}%` }}
                        >
                            <div className="absolute inset-0 bg-white/30 animate-shimmer" />
                        </div>
                    </div>
                )}

                <div className="relative z-10">

                    {/* STEP 1: Choose Path */}
                    {step === 1 && (
                        <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                            <div className="text-center mb-10">
                                <h1 className="font-heading font-black text-3xl md:text-4xl text-primary mb-4">
                                    Czego dotyczy zapytanie?
                                </h1>
                                <p className="text-gray-500 font-sans">
                                    Wybierz obszar, abyśmy mogli zadać Ci właściwe pytania i przygotować idealną wycenę.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => handleSelectType('home')}
                                    className="group flex flex-col items-center justify-center p-6 md:p-8 border-2 border-gray-100 rounded-2xl hover:border-accent hover:bg-soft hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/5 text-primary rounded-full flex items-center justify-center mb-3 md:mb-4 group-hover:bg-accent group-hover:text-white group-hover:scale-110 transition-all duration-300">
                                        <Home size={28} />
                                    </div>
                                    <h3 className="font-heading font-bold text-base md:text-xl text-dark text-center">Klimatyzacja<br />Stacjonarna</h3>
                                </button>

                                <button
                                    onClick={() => handleSelectType('auto')}
                                    className="group flex flex-col items-center justify-center p-6 md:p-8 border-2 border-gray-100 rounded-2xl hover:border-accent hover:bg-soft hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/5 text-primary rounded-full flex items-center justify-center mb-3 md:mb-4 group-hover:bg-accent group-hover:text-white group-hover:scale-110 transition-all duration-300">
                                        <Car size={28} />
                                    </div>
                                    <h3 className="font-heading font-bold text-base md:text-xl text-dark text-center">Auto<br />Klimatyzacja</h3>
                                </button>

                                <button
                                    onClick={() => handleSelectType('portable')}
                                    className="group flex flex-col items-center justify-center p-6 md:p-8 border-2 border-gray-100 rounded-2xl hover:border-accent hover:bg-soft hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/5 text-primary rounded-full flex items-center justify-center mb-3 md:mb-4 group-hover:bg-accent group-hover:text-white group-hover:scale-110 transition-all duration-300">
                                        <Fan size={28} />
                                    </div>
                                    <h3 className="font-heading font-bold text-base md:text-xl text-dark text-center">Klimatyzacja<br />Przenośna</h3>
                                </button>

                                <button
                                    onClick={() => handleSelectType('dehumidify')}
                                    className="group flex flex-col items-center justify-center p-6 md:p-8 border-2 border-gray-100 rounded-2xl hover:border-accent hover:bg-soft hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/5 text-primary rounded-full flex items-center justify-center mb-3 md:mb-4 group-hover:bg-accent group-hover:text-white group-hover:scale-110 transition-all duration-300">
                                        <Droplets size={28} />
                                    </div>
                                    <h3 className="font-heading font-bold text-base md:text-xl text-dark text-center">Osuszanie<br />Pomieszczeń</h3>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2+: Questions */}
                    {step > 1 && !isComplete && activeQuestions[step - 2] && (
                        <div className={`text-center transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <span className="text-xs font-mono text-gray-400">
                                    Pytanie {step - 1} z {activeQuestions.length}
                                </span>
                                <div className="flex gap-1">
                                    {activeQuestions.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                idx < step - 1 ? 'bg-accent' : idx === step - 2 ? 'bg-primary' : 'bg-gray-200'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary mb-8">
                                {activeQuestions[step - 2].question}
                            </h2>

                            <div className="flex flex-col gap-3 max-w-md mx-auto">
                                {activeQuestions[step - 2].options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswer(activeQuestions[step - 2].id, option)}
                                        disabled={isTransitioning}
                                        className={`w-full text-left px-6 py-4 rounded-xl border-2 font-medium transition-all duration-300 flex justify-between items-center group
                                            ${selectedOption === option 
                                                ? 'border-accent bg-accent/10 scale-[1.02] shadow-lg' 
                                                : 'border-gray-200 text-dark hover:border-accent hover:bg-soft hover:shadow-md hover:-translate-y-0.5'
                                            }
                                            ${isTransitioning && selectedOption !== option ? 'opacity-50' : ''}
                                        `}
                                    >
                                        <span className={selectedOption === option ? 'text-accent font-semibold' : ''}>{option}</span>
                                        {selectedOption === option ? (
                                            <Check size={18} className="text-accent animate-scale-in" />
                                        ) : (
                                            <ChevronRight size={18} className="text-gray-300 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleBack}
                                className="mt-8 text-sm font-medium text-gray-400 hover:text-dark transition-colors flex items-center gap-2 mx-auto"
                            >
                                <ArrowLeft size={16} />
                                Cofnij
                            </button>
                        </div>
                    )}

                    {/* FINAL STEP: Contact Form */}
                    {isComplete && (
                        <div className="text-center animate-fade-in">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-once">
                                <CheckCircle size={40} />
                            </div>
                            <h2 className="font-heading font-bold text-3xl text-dark mb-4">
                                Doskonale! Mamy wszystko.
                            </h2>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                Zebraliśmy Twoje odpowiedzi. Zostaw swoje dane kontaktowe poniżej, abyśmy mogli przygotować i przesłać precyzyjną wycenę z propozycją dogodnego terminu.
                            </p>

                            <form
                                ref={formRef}
                                className="max-w-md mx-auto space-y-5 text-left"
                                onSubmit={handleSubmit}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative group">
                                        <input 
                                            required 
                                            type="text" 
                                            id="name"
                                            className="peer w-full px-4 py-4 pt-6 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder-transparent" 
                                            placeholder="Jan Kowalski" 
                                        />
                                        <label 
                                            htmlFor="name"
                                            className="absolute left-4 top-2 text-xs font-medium text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent"
                                        >
                                            Imię i nazwisko
                                        </label>
                                    </div>
                                    <div className="relative group">
                                        <input 
                                            required 
                                            type="tel" 
                                            id="phone"
                                            className="peer w-full px-4 py-4 pt-6 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder-transparent" 
                                            placeholder="604 099 876" 
                                        />
                                        <label 
                                            htmlFor="phone"
                                            className="absolute left-4 top-2 text-xs font-medium text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent"
                                        >
                                            Numer telefonu
                                        </label>
                                    </div>
                                </div>

                                <div className="relative group">
                                    <input 
                                        required 
                                        type="email" 
                                        id="email"
                                        className="peer w-full px-4 py-4 pt-6 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder-transparent" 
                                        placeholder="jan@kowalski.pl" 
                                    />
                                    <label 
                                        htmlFor="email"
                                        className="absolute left-4 top-2 text-xs font-medium text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent"
                                    >
                                        Adres Email
                                    </label>
                                </div>

                                {(answers.buildingType === 'Biuro / Lokal usługowy' || answers.roomType === 'Lokal usługowy / Biuro') && (
                                    <div className="relative group animate-slide-down">
                                        <input 
                                            type="text" 
                                            id="company"
                                            className="peer w-full px-4 py-4 pt-6 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder-transparent" 
                                            placeholder="Twoja Firma Sp. z o.o." 
                                        />
                                        <label 
                                            htmlFor="company"
                                            className="absolute left-4 top-2 text-xs font-medium text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent"
                                        >
                                            Nazwa Firmy (Opcjonalnie)
                                        </label>
                                    </div>
                                )}

                                {(quizType === 'dehumidify' && answers.urgency === 'Natychmiast (awaria)') && (
                                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 animate-slide-down">
                                        <p className="text-sm text-red-700 font-medium">
                                            🚨 Pilna sprawa? Zadzwoń bezpośrednio: <a href="tel:+48604099876" className="underline font-bold">604 099 876</a>
                                        </p>
                                    </div>
                                )}

                                <div className="relative group">
                                    <textarea 
                                        id="notes"
                                        rows={3}
                                        className="peer w-full px-4 py-4 pt-6 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder-transparent resize-none" 
                                        placeholder="Dodatkowe informacje..." 
                                    />
                                    <label 
                                        htmlFor="notes"
                                        className="absolute left-4 top-2 text-xs font-medium text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent"
                                    >
                                        Uwagi (opcjonalnie)
                                    </label>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full mt-4 bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            Wysyłanie...
                                        </>
                                    ) : (
                                        'Wyślij zapytanie o Wycenę'
                                    )}
                                </button>
                                <p className="text-xs text-center text-gray-400 mt-4">
                                    Wysyłając formularz akceptujesz naszą <Link to="/polityka-prywatnosci" className="underline hover:text-dark">Politykę Prywatności</Link>.
                                </p>
                            </form>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Quiz;
