import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import GuaranteeMicro from '@/components/GuaranteeMicro';
import OfferGrid from '@/components/OfferGrid';
import CustomerCare from '@/components/CustomerCare';
import BenefitsFeatures from '@/components/BenefitsFeatures';
import Testimonials from '@/components/Testimonials';
import FAQMap from '@/components/FAQMap';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Walas Klimatyzacja - Profesjonalny Montaż i Serwis Klimatyzacji w Łodzi',
  description: 'Kompleksowy montaż i serwis klimatyzacji w Łodzi. Klimatyzacja domowa, auto klimatyzacja, urządzenia przenośne i osuszanie pomieszczeń. Gwarancja satysfakcji i profesjonalna obsługa.',
  keywords: 'klimatyzacja Łódź, montaż klimatyzacji, serwis klimatyzacji, auto klimatyzacja, klimatyzacja domowa, osuszanie pomieszczeń',
  openGraph: {
    title: 'Walas Klimatyzacja - Profesjonalny Montaż i Serwis w Łodzi',
    description: 'Kompleksowy montaż i serwis klimatyzacji w Łodzi. Gwarancja satysfakcji i profesjonalna obsługa.',
    type: 'website',
    locale: 'pl_PL',
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <GuaranteeMicro />
      <OfferGrid />
      <CustomerCare />
      <BenefitsFeatures />
      <Testimonials />
      <FAQMap />
      <Footer />
    </>
  );
}
