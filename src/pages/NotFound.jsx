import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8 text-center">
        <div className="text-6xl mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Página Não Encontrada
        </h1>
        <p className="text-gray-600 mb-6">
          A página que você está procurando não existe ou foi removida.
        </p>
        <Link
          to="/dashboard"
          className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-medium"
        >
          Voltar ao Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

