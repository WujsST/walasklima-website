import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import GuaranteeMicro from '../components/GuaranteeMicro';
import OfferGrid from '../components/OfferGrid';
import BenefitsFeatures from '../components/BenefitsFeatures';
import CustomerCare from '../components/CustomerCare';
import Testimonials from '../components/Testimonials';
import FAQMap from '../components/FAQMap';
import Footer from '../components/Footer';

const Home = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div className="min-h-screen bg-background text-dark font-sans relative">
            <Navbar />
            <Hero />
            <GuaranteeMicro />
            <OfferGrid />
            <CustomerCare />
            <BenefitsFeatures />
            <Testimonials />
            <FAQMap />
            <Footer />
        </div>
    );
};

export default Home;
