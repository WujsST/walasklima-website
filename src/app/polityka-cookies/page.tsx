import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Polityka Plików Cookies - Walas Klimatyzacja',
  description: 'Polityka wykorzystywania plików cookies na stronie Walas Klimatyzacja. Informacje o celu i rodzajach używanych ciasteczek.',
};

export default function Cookies() {
    return (
        <div className="bg-background min-h-screen text-dark font-sans flex flex-col pt-12">
            <div className="max-w-4xl mx-auto px-6 lg:px-20 flex-grow w-full">
                <Link href="/" className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors mb-12">
                    <ArrowLeft size={20} /> Wróć do strony głównej
                </Link>

                <article className="prose prose-lg max-w-none text-gray-600 prose-headings:font-heading prose-headings:text-primary">
                    <h1 className="text-4xl md:text-5xl font-black mb-8">Polityka Plików Cookies</h1>

                    <p className="lead text-xl text-gray-500 mb-8">
                        Dbamy o Twoją prywatność. Poniżej przedstawiamy zasady wykorzystywania plików cookies na stronie Walas Klimatyzacja.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-4">Czym są pliki "cookies"?</h2>
                    <p>
                        Poprzez pliki "cookies" (ciasteczka) należy rozumieć dane informatyczne, w szczególności pliki tekstowe, przechowywane w urządzeniach końcowych użytkowników przeznaczone do korzystania ze stron internetowych. Pliki te pozwalają rozpoznać urządzenie użytkownika i odpowiednio wyświetlić stronę internetową dostosowaną do jego indywidualnych preferencji.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-4">Do czego używamy plików "cookies"?</h2>
                    <p>
                        Pliki cookies używane są w celu:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>Dostosowania zawartości stron internetowych do preferencji użytkownika oraz optymalizacji korzystania ze stron internetowych.</li>
                        <li>Tworzenia anonimowych statystyk, które pomagają zrozumieć w jaki sposób użytkownik korzysta ze stron internetowych, co umożliwia ulepszanie ich struktury i zawartości (np. Google Analytics).</li>
                        <li>Utrzymania sesji użytkownika.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-12 mb-4">Rodzaje plików cookies</h2>
                    <p>
                        Stosujemy dwa zasadnicze rodzaje plików (cookies) - sesyjne oraz stałe. Cookies sesyjne są plikami tymczasowymi, które przechowywane są w urządzeniu końcowym Użytkownika do czasu wylogowania, opuszczenia strony internetowej lub wyłączenia oprogramowania (przeglądarki internetowej). Stałe pliki cookies przechowywane są w urządzeniu końcowym Użytkownika przez czas określony w parametrach plików cookies lub do czasu ich ręcznego usunięcia przez Użytkownika.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-4">Zarządzanie plikami cookies</h2>
                    <p>
                        Standardowo oprogramowanie służące do przeglądania stron internetowych domyślnie dopuszcza umieszczanie plików cookies. Ustawienia te mogą zostać zmienione w taki sposób, aby blokować automatyczną obsługę plików cookies. Szczegółowe informacje o możliwości i sposobach obsługi plików cookies dostępne są w ustawieniach oprogramowania przeglądarki.
                    </p>
                </article>
            </div>
            <div className="mt-20">
                <Footer />
            </div>
        </div>
    );
}
