import React from 'react';

import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const Gallery = () => {
  const [headerRef, isHeaderVisible] = useIntersectionObserver();
  const [galleryRef, isGalleryVisible] = useIntersectionObserver();
  const images = [
    {
      url: 'public/modern-haircut.jpg',
      title: 'Corte Moderno',
      category: 'Cortes',
    },
    {
      url: 'public/coloring.jpg',
      title: 'Coloração',
      category: 'Coloração',
    },
    {
      url: 'public/hairstyle.jpg',
      title: 'Penteado',
      category: 'Penteados',
    },
    {
      url: 'public/treated-hair.jpg',
      title: 'Tratamento',
      category: 'Tratamentos',
    },
    {
      url: 'public/mechas.jpg',
      title: 'Mechas',
      category: 'Coloração',
    },
    {
      url: 'public/finalizacao.jpg',
      title: 'Finalização',
      category: 'Penteados',
    },
  ];

  return (
    <section id="gallery" className="py-20 bg-[#EFE0DA]/30">
      <div className="container mx-auto px-4">
        {/* Cabeçalho da seção */}
        <div
          ref={headerRef}
          className={`text-center mb-16 ${
            isHeaderVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          <h2 className="text-4xl font-bold mb-4 text-[#282828]">
            Galeria de Transformações
          </h2>
          <p className="text-[#5F5F5F] max-w-2xl mx-auto">
            Confira alguns dos nossos trabalhos mais recentes e inspire-se para
            sua próxima transformação.
          </p>
        </div>

        {/* Grid de imagens */}
        <div
          ref={galleryRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${
            isGalleryVisible ? 'animate-fade-in delay-200' : 'opacity-0'
          }`}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg aspect-[4/5]"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-sm font-medium text-[#FFBFBC] mb-1">
                    {image.category}
                  </p>
                  <h3 className="text-xl font-semibold text-white">
                    {image.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center mt-12">
          <a
            href="https://instagram.com/cortestyleshine"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-[#5F5F5F] hover:text-[#282828] transition-colors"
          >
            <span>Siga-nos no Instagram</span>
            <span className="text-xl">📸</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
