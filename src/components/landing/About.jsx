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
      icon: <i class="ri-team-line text-[#E3B8B9]" />,
    },
    {
      title: 'Ambiente Acolhedor',
      description:
        'Um espaço pensado para seu conforto e bem-estar durante os procedimentos.',
      icon: <i class="ri-home-heart-line text-[#E3B8B9]" />,
    },
    {
      title: 'Produtos Premium',
      description:
        'Utilizamos apenas produtos de alta qualidade das melhores marcas do mercado.',
      icon: <i class="ri-sparkling-line text-[#E3B8B9]" />,
    },
    {
      title: 'Atendimento Personalizado',
      description:
        'Cada cliente recebe um atendimento único, baseado em suas necessidades.',
      icon: <i class="ri-shake-hands-line text-[#E3B8B9]" />,
    },
  ];

  return (
    <section id="about" className="py-20 bg-[#EFE0DA]/30">
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
                src="public/interior-salon.jpg"
                alt="Interior do salão"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Destaque flutuante */}
            <div className="absolute -bottom-6 -right-6 bg-[#EFE0DA] p-6 rounded-xl shadow-lg max-w-xs">
              <p className="text-lg font-semibold text-[#282828] mb-2">
                10+ Anos de Experiência
              </p>
              <p className="text-sm text-[#5F5F5F]">
                Transformando vidas através da beleza desde 2014
              </p>
            </div>
          </div>

          {/* Conteúdo */}
          <div
            ref={contentRef}
            className={`${isContentVisible ? 'animate-slide-right' : 'opacity-0'}`}
          >
            <h2 className="text-4xl font-bold mb-6 text-[#282828]">
              Sobre o Corte Style Shine
            </h2>
            <p className="text-[#5F5F5F] mb-8">
              O Corte Style Shine nasceu da paixão pela beleza e do desejo de
              oferecer serviços de alta qualidade em um ambiente acolhedor e
              sofisticado. Nossa missão é realçar a beleza única de cada
              cliente, proporcionando uma experiência memorável.
            </p>

            {/* Grid de características */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-[40px] h-[40px] flex flex-col items-center justify-center border border-[#E3B8B9]/20 rounded-[8px] shrink-0">
                    <div className="text-2xl">{feature.icon}</div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#282828] mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[#5F5F5F]">
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
