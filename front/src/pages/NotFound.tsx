import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-9xl font-bold text-indigo-600">404</h1>
        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-gray-900">Page Non Trouvée</h2>
          <p className="mt-2 text-gray-600">
            Désolé, nous n'avons pas trouvé la page que vous recherchez. La page a peut-être été supprimée ou le lien est peut-être cassé.
          </p>
        </div>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            <Home className="h-5 w-5 mr-2" />
            Retour à l'Accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 