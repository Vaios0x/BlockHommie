import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { demoProperties } from '../components/PropertyList'; // Asumiendo que exportas demoProperties
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/react';
import { arbitrumSepolia, baseSepolia, optimismSepolia, polygonAmoy } from 'wagmi/chains';

// Tasas de conversión ficticias (MXN por unidad de cripto)
const exchangeRates = {
  ARBETH: 60000, // 1 ETH en Arbitrum Sepolia = 60,000 MXN
  BASEETH: 60000, // 1 ETH en Base Sepolia = 60,000 MXN
  OPETH: 60000,   // 1 ETH en Optimism Sepolia = 60,000 MXN
  AMOYMATIC: 15, // 1 MATIC en Polygon Amoy = 15 MXN
};

// Mapeo de claves de moneda a nombres para mostrar en detalle
const currencyDetails: Record<string, { name: string; symbol: string; decimals: number }> = {
  ARBETH: { name: 'Arbitrum Sepolia', symbol: 'ETH', decimals: 4 },
  BASEETH: { name: 'Base Sepolia', symbol: 'ETH', decimals: 4 },
  OPETH: { name: 'Optimism Sepolia', symbol: 'ETH', decimals: 4 },
  AMOYMATIC: { name: 'Polygon Amoy', symbol: 'MATIC', decimals: 2 },
};

// Mapeo de nombres de moneda a IDs de cadena
const currencyToChainId: Record<string, number> = {
  ARBETH: arbitrumSepolia.id,
  BASEETH: baseSepolia.id,
  OPETH: optimismSepolia.id,
  AMOYMATIC: polygonAmoy.id,
};

const PropertyDetail = () => {
  const { idPropiedad } = useParams<{ idPropiedad: string }>();
  const propertyId = parseInt(idPropiedad || '0', 10);
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Buscar la propiedad en los datos de demostración
  // TODO: Reemplazar con la lógica para obtener datos reales (contrato o API)
  const property = demoProperties.find(p => p.id === propertyId);

  if (!property) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500">Propiedad no encontrada.</div>;
  }

  const priceInMXN = property.price;

  const handleInitiateAgreement = async () => {
    setError(null);
    setSuccess(null);

    if (!isConnected) {
      await open();
      return;
    }

    // TODO: Aquí iría la lógica para interactuar con el contrato
    setSuccess('¡Wallet conectada! La lógica para iniciar el acuerdo con el contrato se implementará próximamente.');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-1">
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="p-6 md:flex-1">
            <h1 className="text-3xl font-bold text-primary-100 mb-4">{property.name}</h1>
            <p className="text-primary-200 mb-6">{property.description}</p>
            
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-primary-100 mb-2">Detalles</h2>
                <ul className="space-y-2 text-primary-200">
                  <li>Ubicación: {property.location}</li>
                  <li>Precio: ${property.price.toLocaleString()} MXN</li>
                  <li>Estado: {property.status}</li>
                </ul>
              </div>

              {error && (
                <div className="bg-red-500 bg-opacity-20 text-red-300 p-4 rounded-md">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-500 bg-opacity-20 text-green-300 p-4 rounded-md">
                  {success}
                </div>
              )}

              <div className="pt-4">
                <button
                  onClick={handleInitiateAgreement}
                  className="w-full px-6 py-3 bg-accent-500 text-white font-semibold rounded-md hover:bg-accent-600 transition duration-300"
                >
                  {isConnected ? 'Iniciar Acuerdo' : 'Conectar Wallet'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail; 