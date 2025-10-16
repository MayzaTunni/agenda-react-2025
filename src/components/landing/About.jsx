import React from 'react';

import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const About = () => {
  const [imageRef, isImageVisible] = useIntersectionObserver();
  const [contentRef, isContentVisible] = useIntersectionObserver();
  const features = [
    {
      title: 'Profissionais Experientes',
      description:
        'Nossa equipe é formada por profissionais altamente qualificados e experientes.',
      icon: '👩‍💼',
    },
    {
      title: 'Ambiente Acolhedor',
      description:
        'Um espaço pensado para seu conforto e bem-estar durante os procedimentos.',
      icon: '🏠',
    },
    {
      title: 'Produtos Premium',
      description:
        'Utilizamos apenas produtos de alta qualidade das melhores marcas do mercado.',
      icon: '✨',
    },
    {
      title: 'Atendimento Personalizado',
      description:
        'Cada cliente recebe um atendimento único, baseado em suas necessidades.',
      icon: '🤝',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Imagem */}
          <div
            ref={imageRef}
            className={`relative ${
              isImageVisible ? 'animate-slide-left' : 'opacity-0'
            }`}
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/salon-interior.jpg"
                alt="Interior do salão"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Destaque flutuante */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg max-w-xs">
              <p className="text-lg font-semibold text-gray-800 mb-2">
                10+ Anos de Experiência
              </p>
              <p className="text-sm text-gray-600">
                Transformando vidas através da beleza desde 2014
              </p>
            </div>
          </div>

          {/* Conteúdo */}
          <div
            ref={contentRef}
            className={`${isContentVisible ? 'animate-slide-right' : 'opacity-0'}`}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Sobre o Corte Style Shine
            </h2>
            <p className="text-gray-600 mb-8">
              O Corte Style Shine nasceu da paixão pela beleza e do desejo de
              oferecer serviços de alta qualidade em um ambiente acolhedor e
              sofisticado. Nossa missão é realçar a beleza única de cada
              cliente, proporcionando uma experiência memorável.
            </p>

            {/* Grid de características */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="text-2xl">{feature.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
