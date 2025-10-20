import React from 'react';
import Header from '../../components/landing/Header';
import Hero from '../../components/landing/Hero';
import Services from '../../components/landing/Services';
import About from '../../components/landing/About';
import Gallery from '../../components/landing/Gallery';
import Footer from '../../components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full bg-[FEF4F4]">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
