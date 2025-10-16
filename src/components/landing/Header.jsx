import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/corte-style-shine" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            CSS
          </span>
          <span className="hidden md:inline text-gray-600">
            Corte Style Shine
          </span>
        </Link>

        {/* Menu de Navegação */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="#services"
            className="text-gray-600 hover:text-primary-600 transition-colors"
          >
            Serviços
          </Link>
          <Link
            to="#about"
            className="text-gray-600 hover:text-primary-600 transition-colors"
          >
            Sobre
          </Link>
          <Link
            to="#gallery"
            className="text-gray-600 hover:text-primary-600 transition-colors"
          >
            Galeria
          </Link>
          <Link
            to="#contact"
            className="text-gray-600 hover:text-primary-600 transition-colors"
          >
            Contato
          </Link>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center space-x-4">
          <Button
            variant="secondary"
            size="small"
            onClick={() => (window.location.href = '#schedule')}
          >
            Agendar
          </Button>
          <Link to="/login">
            <Button variant="primary" size="small">
              Login
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
