import React from 'react';
import { useAccount } from 'wagmi';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { address, isConnected } = useAccount();

  // Placeholder para las propiedades del usuario
  const userProperties = []; // Vacío por ahora

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen bg-gray-900 text-primary-100">
      <h1 className="text-3xl md:text-4xl font-bold text-primary-400 mb-8">Mi Perfil</h1>

      {isConnected && address ? (
        <div className="bg-gray-800 shadow-xl rounded-lg p-6 mb-10">
          <h2 className="text-xl font-semibold text-gray-200 mb-2">Dirección Conectada:</h2>
          <p className="text-lg text-accent-400 font-mono break-all">{address}</p>
        </div>
      ) : (
        <div className="bg-primary-800/30 border border-primary-700 text-primary-200 px-4 py-3 rounded relative mb-8" role="alert">
          <strong className="font-bold">Billetera no conectada.</strong>
          <span className="block sm:inline"> Conecta tu billetera para acceder a todas las funcionalidades.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 shadow-xl rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-200 mb-6">Mis Propiedades</h2>
          {isConnected ? (
            userProperties.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                <p className="text-gray-400 italic">Listado de propiedades irá aquí...</p>
              </div>
            ) : (
              <p className="text-gray-400 italic">
                No se encontraron propiedades para esta dirección en la red conectada.
              </p>
            )
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">Conecta tu billetera para ver tus propiedades.</p>
              <Link 
                to="/marketplace" 
                className="inline-block px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                Explorar Marketplace
              </Link>
            </div>
          )}
        </div>

        <div className="bg-gray-800 shadow-xl rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-200 mb-6">Actividad Reciente</h2>
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">Tu historial de actividad aparecerá aquí.</p>
            {!isConnected && (
              <Link 
                to="/marketplace" 
                className="inline-block px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                Explorar Marketplace
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 