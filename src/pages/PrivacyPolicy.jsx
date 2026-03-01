import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
    return (
        <div className="bg-background min-h-screen text-dark font-sans flex flex-col pt-12">
            <div className="max-w-4xl mx-auto px-6 lg:px-20 flex-grow w-full">
                <Link to="/" className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors mb-12">
                    <ArrowLeft size={20} /> Wróć do strony głównej
                </Link>

                <article className="prose prose-lg max-w-none text-gray-600 prose-headings:font-heading prose-headings:text-primary">
                    <h1 className="text-4xl md:text-5xl font-black mb-8">Polityka Prywatności i RODO</h1>

                    <p className="lead text-xl text-gray-500 mb-8">
                        Poniższa polityka prywatności określa zasady przetwarzania i ochrony danych osobowych przekazanych przez Użytkowników w związku z korzystaniem przez nich z usług firmy Walas Klimatyzacja.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-4">1. Administrator Danych Osobowych</h2>
                    <p>
                        Administratorem danych osobowych zawartych w serwisie jest Marcin Walas, prowadzący działalność gospodarczą pod nazwą Marcin Walas Klimatyzacja z siedzibą przy ul. Beskidzka 170a, 91-610 Łódź, NIP: 728-254-75-80, REGON: 101292958.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-4">2. Cel Zbierania Danych</h2>
                    <p>
                        Dane osobowe przetwarzane są w celu:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>Nawiązania, ukształtowania treści, zmiany lub rozwiązania umowy o świadczenie usług drogą elektroniczną (formularz, wycena).</li>
                        <li>Realizacji usług serwisowych i montażowych.</li>
                        <li>Odpowiedzi na zapytania w formularzu kontaktowym (art. 6 ust. 1 lit. f RODO).</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-12 mb-4">3. Prawa Użytkownika (RODO)</h2>
                    <p>
                        Każdej osobie, której dane dotyczą, przysługuje prawo dostępu do treści swoich danych oraz prawo ich sprostowania, usunięcia, ograniczenia przetwarzania, prawo do przenoszenia danych, prawo wniesienia sprzeciwu, prawo do cofnięcia zgody w dowolnym momencie bez wpływu na zgodność z prawem przetwarzania, którego dokonano na podstawie zgody przed jej cofnięciem.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-4">4. Udostępnianie Danych</h2>
                    <p>
                        Dane osobowe pozostawione w serwisie nie zostaną sprzedane ani udostępnione osobom trzecim, zgodnie z przepisami Ustawy o ochronie danych osobowych.
                    </p>

                    <div className="mt-16 p-6 bg-soft rounded-2xl border border-gray-100">
                        <p className="font-bold text-dark mb-2">Kontakt w sprawach związanych z RODO:</p>
                        <a href="mailto:klimatyzacja.mwalas@gmail.com" className="text-accent hover:underline break-all">
                            klimatyzacja.mwalas@gmail.com
                        </a>
                    </div>
                </article>
            </div>
            <div className="mt-20">
                <Footer />
            </div>
        </div>
    );
};

export default PrivacyPolicy;
