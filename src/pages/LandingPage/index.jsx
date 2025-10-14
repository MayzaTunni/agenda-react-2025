import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-500 via-pink-600 to-rose-600">
      {/* Decorative circles */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-pink-400/30 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-rose-400/30 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
      />
      <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-pink-300/20 rounded-full blur-2xl" />

      {/* Main card container with animation */}
      <div className="relative z-10 w-full max-w-5xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden flex min-h-[600px] animate-fadeIn">
        {/* Left side - Welcome Panel */}
        <div className="w-2/5 bg-gradient-to-br from-pink-500 to-rose-500 p-12 flex flex-col justify-center relative overflow-hidden transition-all duration-700 ease-in-out animate-slideInFromLeft">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-white rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-white rounded-full" />
          </div>

          <div className="relative z-10">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-8">
                <img src="/logo-barbie.png" alt="Logo" className="w-[20%]" />
              </div>
            </div>

            <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
              Bem-vindo(a)!
            </h1>
            <div className="w-16 h-1 bg-white rounded-full" />
          </div>
        </div>

        {/* Right side - Action Panel */}
        <div className="w-3/5 p-12 flex flex-col justify-center items-center text-center transition-all duration-700 ease-in-out animate-slideInFromRight">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Sua Agenda Pessoal
          </h2>
          <p className="text-gray-600 mb-8 max-w-md">
            Organize suas tarefas, gerencie seus compromissos e nunca mais perca
            um prazo importante.
          </p>
          <div className="flex gap-4">
            <Button
              variant="primary"
              size="large"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button
              variant="secondary"
              size="large"
              onClick={() => navigate('/register')}
            >
              Cadastre-se
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-slideInFromLeft {
          animation: slideInFromLeft 0.7s ease-in-out;
        }

        .animate-slideInFromRight {
          animation: slideInFromRight 0.7s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
