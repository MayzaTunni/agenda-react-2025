import React from 'react';
import Button from '../Button';

import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const Hero = () => {
  const [contentRef, isContentVisible] = useIntersectionObserver();
  return (
    <section className="relative min-h-[90vh] max-h-[90vh] flex items-center pt-16 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Elementos decorativos */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary-200/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Conteúdo */}
          <div
            ref={contentRef}
            className={`text-center md:text-left relative z-10 ${
              isContentVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-[#282828] bg-clip-text text-transparent">
              Realce sua <br /> beleza natural
            </h1>
            <p className="text-lg font-normal text-[#5F5F5F] mb-8">
              Descubra o poder da transformação em <br /> nosso salão.
              Oferecemos serviços <br /> premium de beleza para realçar sua
              beleza <br /> única e natural.
            </p>
            <div className="flex flex-col lg:flex-row gap-4 justify-center md:justify-start">
              <Button
                variant="primary"
                size="large"
                onClick={() => (window.location.href = '#schedule')}
              >
                Agende Agora
              </Button>
              <Button
                variant="secondary"
                size="large"
                onClick={() => (window.location.href = '#services')}
              >
                Nossos Serviços
              </Button>
            </div>
          </div>

          <div className="hidden md:block absolute right-0 top-0 z-0 w-full h-full">
            <img
              src="public/bg.png"
              alt="Mulher sorrindo após tratamento"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:hidden absolute left-0 top-0 z-0 w-full h-full">
            <img
              src="public/bg-mobile.png"
              alt="Mulher sorrindo após tratamento"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
