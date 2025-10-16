import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ icon, title, description, price }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
    <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <p className="text-primary-600 font-semibold">A partir de R$ {price}</p>
  </div>
);

import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const Services = () => {
  const [headerRef, isHeaderVisible] = useIntersectionObserver();
  const [servicesRef, isServicesVisible] = useIntersectionObserver();
  const services = [
    {
      icon: '✂️',
      title: 'Cortes',
      description:
        'Cortes modernos e personalizados para realçar sua beleza natural.',
      price: '60',
    },
    {
      icon: '💇‍♀️',
      title: 'Coloração',
      description:
        'Transforme seu visual com nossas técnicas profissionais de coloração.',
      price: '150',
    },
    {
      icon: '💆‍♀️',
      title: 'Tratamentos',
      description:
        'Hidratação, reconstrução e tratamentos especializados para seus cabelos.',
      price: '120',
    },
    {
      icon: '💅',
      title: 'Manicure',
      description:
        'Cuidados completos para suas unhas com produtos de primeira linha.',
      price: '45',
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Cabeçalho da seção */}
        <div
          ref={headerRef}
          className={`text-center mb-16 ${
            isHeaderVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Nossos Serviços
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
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
          <Link
            to="#schedule"
            className="inline-block px-8 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
          >
            Ver todos os serviços
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
