import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ icon, title, description, price }) => (
  <div className="bg-[#FFBFBC] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 duration-300">
    <div className="w-12 h-12 bg-[#FEF4F4] text-[#282828] rounded-lg flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-[#282828] mb-2">{title}</h3>
    <p className="text-[#5F5F5F] mb-4">{description}</p>
    <p className="text-[#282828] font-semibold">A partir de R$ {price}</p>
  </div>
);

import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import Button from '../Button';

const Services = () => {
  const [headerRef, isHeaderVisible] = useIntersectionObserver();
  const [servicesRef, isServicesVisible] = useIntersectionObserver();
  const services = [
    {
      icon: <i className="ri-scissors-2-line" />,
      title: 'Cortes',
      description:
        'Cortes modernos e personalizados para realçar sua beleza natural.',
      price: '60',
    },
    {
      icon: <i className="ri-brush-ai-fill" />,
      title: 'Coloração',
      description:
        'Transforme seu visual com nossas técnicas profissionais de coloração.',
      price: '150',
    },
    {
      icon: <i className="ri-ink-bottle-fill" />,
      title: 'Tratamentos',
      description:
        'Hidratação, reconstrução e tratamentos especializados para seus cabelos.',
      price: '120',
    },
    {
      icon: <i className="ri-hand" />,
      title: 'Manicure',
      description:
        'Cuidados completos para suas unhas com produtos de primeira linha.',
      price: '45',
    },
  ];

  return (
    <section id="services" className="py-20 bg-[#EFE0DA]/30">
      <div className="container mx-auto px-4">
        {/* Cabeçalho da seção */}
        <div
          ref={headerRef}
          className={`text-center mb-16 ${
            isHeaderVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          <h2 className="text-4xl font-bold mb-4 text-black">
            Nossos Serviços
          </h2>
          <p className="text-[#5F5F5F] max-w-2xl mx-auto">
            Oferecemos uma variedade de serviços de beleza para realçar sua
            beleza natural. Todos os tratamentos são realizados por
            profissionais experientes.
          </p>
        </div>

        {/* Grid de serviços */}
        <div
          ref={servicesRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${
            isServicesVisible ? 'animate-fade-in delay-200' : 'opacity-0'
          }`}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <Button variant="secondary">
            <Link to="#schedule">Ver todos os serviços</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
