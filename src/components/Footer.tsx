import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#0C1520] text-gray-400 py-16 px-6 lg:px-20 rounded-t-[3rem] lg:rounded-t-[4rem] relative overflow-hidden mt-20">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {/* Brand Col */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-2xl">
              W
            </div>
            <span className="font-heading font-bold text-2xl text-white">Walas Klimatyzacja</span>
          </div>
          <p className="text-sm border-l-2 border-primary/50 pl-4 py-1 italic opacity-80">
            Profesjonalny serwis klimatyzacji.
            <br /> Z dojazdem do klienta w Łodzi i województwie łódzkim.
          </p>

          <div className="flex items-center gap-2 bg-dark/50 w-fit px-4 py-2 rounded-full border border-white/5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="font-mono text-xs tracking-wider text-green-400">STATUS OPERACYJNY: ONLINE</span>
          </div>
        </div>

        {/* Contact Links */}
        <div>
          <h4 className="text-white font-heading font-semibold text-lg mb-6">Kontakt</h4>
          <ul className="space-y-4">
            <li>
              <a href="tel:+48604099876" className="flex items-center gap-3 hover:text-accent transition-colors">
                <div className="p-2 bg-white/5 rounded-lg">
                  <Phone size={16} />
                </div>
                <span>+48 604 099 876</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:klimatyzacja.mwalas@gmail.com"
                className="flex items-center gap-3 hover:text-accent transition-colors"
              >
                <div className="p-2 bg-white/5 rounded-lg">
                  <Mail size={16} />
                </div>
                <span>klimatyzacja.mwalas@gmail.com</span>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <div className="p-2 bg-white/5 rounded-lg translate-y-1">
                <MapPin size={16} />
              </div>
              <span>
                91-610 Łódź
                <br />
                ul. Beskidzka 170a
              </span>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-heading font-semibold text-lg mb-6">Usługi</h4>
          <ul className="space-y-3">
            <li>
              <a href="/#klimatyzacja-domowa" className="hover:text-white transition-colors">
                Klimatyzacja stacjonarna
              </a>
            </li>
            <li>
              <a href="/#auto-klimatyzacja" className="hover:text-white transition-colors">
                Auto klimatyzacja
              </a>
            </li>
            <li>
              <a href="/#klimatyzacja-przenosna" className="hover:text-white transition-colors">
                Klimatyzacja przenośna
              </a>
            </li>
            <li>
              <a href="/#osuszanie" className="hover:text-white transition-colors">
                Osuszanie pomieszczeń
              </a>
            </li>
          </ul>
        </div>

        {/* Legal / Bottom */}
        <div>
          <h4 className="text-white font-heading font-semibold text-lg mb-6">Informacje</h4>
          <ul className="space-y-3">
            <li>NIP: 728-254-75-80</li>
            <li>REGON: 101292958</li>
            <li>
              <Link
                href="/polityka-cookies"
                className="hover:text-white transition-colors underline decoration-white/20 underline-offset-4"
              >
                Polityka cookies
              </Link>
            </li>
            <li>
              <Link
                href="/polityka-prywatnosci"
                className="hover:text-white transition-colors underline decoration-white/20 underline-offset-4"
              >
                Polityka prywatności
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-sm opacity-60 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Walas Klimatyzacja. Wszelkie prawa zastrzeżone.</p>
        <p className="mt-2 md:mt-0 font-mono text-xs">CERTIFIED F-GAZ EXPERT</p>
      </div>
    </footer>
  );
};

export default Footer;
