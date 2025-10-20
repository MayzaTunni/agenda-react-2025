import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const links = {
    company: [
      { text: 'Sobre', href: '#about' },
      { text: 'Serviços', href: '#services' },
      { text: 'Galeria', href: '#gallery' },
      { text: 'Contato', href: '#contact' },
    ],
    services: [
      { text: 'Cortes', href: '#' },
      { text: 'Coloração', href: '#' },
      { text: 'Tratamentos', href: '#' },
      { text: 'Penteados', href: '#' },
    ],
    social: [
      { text: 'Instagram', href: 'https://instagram.com/cortestyleshine' },
      { text: 'Facebook', href: 'https://facebook.com/cortestyleshine' },
      { text: 'WhatsApp', href: 'https://wa.me/5511999999999' },
    ],
  };

  return (
    <footer id="contact" className="bg-[#E3B8B9] text-[#EFE0DA]">
      {/* Seção principal do footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e descrição */}
          <div>
            <Link to="/corte-style-shine" className="inline-block mb-4">
              <span className="text-2xl font-bold text-[#282828]">CSS</span>
            </Link>
            <p className="text-sm text-[#5F5F5F] mb-4">
              Transformando vidas através da beleza, um corte de cada vez.
            </p>
          </div>

          {/* Links da empresa */}
          <div>
            <h3 className="text-[#282828] font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2">
              {links.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-[#5F5F5F] hover:text-[#282828] transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links de serviços */}
          <div>
            <h3 className="text-[#282828] font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2">
              {links.services.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-[#5F5F5F] hover:text-[#282828] transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informações de contato */}
          <div>
            <h3 className="text-[#282828] font-semibold mb-4">Contato</h3>
            <div className="space-y-4">
              <p className="flex items-center space-x-2">
                <span>📍</span>
                <span className="text-[#5F5F5F]">
                  Rua da Beleza, 123 - São Paulo, SP
                </span>
              </p>
              <p className="flex items-center space-x-2">
                <span>📞</span>
                <a
                  href="tel:+5511999999999"
                  className="text-[#5F5F5F] hover:text-[#282828] transition-colors"
                >
                  (11) 99999-9999
                </a>
              </p>
              <div className="flex space-x-4">
                {links.social.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5F5F5F] hover:text-[#282828] transition-colors"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#EFE0DA]/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-[#5F5F5F]">
              © {new Date().getFullYear()} Corte Style Shine. Todos os direitos
              reservados.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-sm text-[#5F5F5F] hover:text-[#282828] transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link
                to="/terms"
                className="text-sm text-[#5F5F5F] hover:text-[#282828] transition-colors"
              >
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
