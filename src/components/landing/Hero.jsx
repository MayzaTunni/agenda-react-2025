import React from 'react';
import Button from '../Button';

import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const Hero = () => {
  const [contentRef, isContentVisible] = useIntersectionObserver();
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Elementos decorativos */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary-200/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Conteúdo */}
          <div
            ref={contentRef}
            className={`text-center md:text-left ${
              isContentVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Realce sua beleza natural
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Descubra o poder da transformação em nosso salão. Oferecemos
              serviços premium de beleza para realçar sua beleza única e
              natural.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
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

          {/* Imagem */}
          <div className="relative">
            <div className="aspect-square rounded-full overflow-hidden shadow-xl">
              <img
                src="/images/hero-image.jpg"
                alt="Mulher sorrindo após tratamento"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Destaque flutuante */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
              <p className="text-sm font-medium text-gray-800">
                ⭐ 4.9/5 Avaliações
              </p>
              <p className="text-xs text-gray-600">
                +1000 clientes satisfeitos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
