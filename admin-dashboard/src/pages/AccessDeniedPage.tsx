
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export default function AccessDeniedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="max-w-md space-y-6 text-center">
        <ShieldAlert className="w-24 h-24 mx-auto text-red-500" />
        
        <div>
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            Acceso Denegado
          </h1>
          <p className="text-lg text-gray-600">
            No tienes permisos para acceder a esta página.
          </p>
        </div>

        <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
          <p className="text-sm text-yellow-800">
            Esta sección está restringida solo para administradores.
          </p>
        </div>

        <Link
          to="/login"
          className="inline-block px-6 py-3 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}