import { useContractRead } from 'wagmi'
import { useState, useEffect } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'

// Definición de las monedas disponibles
type AcceptedCurrency = 'ARBETH' | 'BASEETH' | 'OPETH' | 'AMOYMATIC';
const allCurrencies: AcceptedCurrency[] = ['ARBETH', 'BASEETH', 'OPETH', 'AMOYMATIC'];

interface Property {
  id: number
  name: string
  description: string
  image: string
  price: number // Precio base en MXN
  location: string
  acceptedCurrencies: AcceptedCurrency[]; // Array de monedas aceptadas
}

// Función para generar un subconjunto aleatorio de monedas (al menos una)
const getRandomCurrencies = (): AcceptedCurrency[] => {
  const count = Math.floor(Math.random() * allCurrencies.length) + 1; // Al menos 1
  const shuffled = [...allCurrencies].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Propiedades de demostración con monedas aceptadas aleatoriamente
export const demoProperties: Property[] = [
  { id: 1, name: 'Loft Moderno en CDMX', description: 'Ideal para solteros o parejas, cerca de Reforma.', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fGxvZnR8ZW58MHx8fHwxNjE2NzY2MjY0&ixlib=rb-1.2.1&q=80&w=400', price: 2800000, location: 'CDMX, México', acceptedCurrencies: getRandomCurrencies() },
  { id: 2, name: 'Casa Familiar en Guadalajara', description: 'Amplia casa con jardín en zona residencial tranquila.', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGhvdXNlfGVufDB8fHx8MTYxNjc2NjM1MQ&ixlib=rb-1.2.1&q=80&w=400', price: 4500000, location: 'Guadalajara, México', acceptedCurrencies: getRandomCurrencies() },
  { id: 3, name: 'Departamento con Vista al Mar', description: 'Vive frente al mar en este lujoso departamento en Cancún.', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGFwYXJ0bWVudHxlbnwwfHx8fDE2MTY3NjY0MDg&ixlib=rb-1.2.1&q=80&w=400', price: 6200000, location: 'Cancún, México', acceptedCurrencies: getRandomCurrencies() },
  { id: 4, name: 'Cabaña Rústica en Valle de Bravo', description: 'Escápate del ruido en esta acogedora cabaña.', image: 'https://images.unsplash.com/photo-1598808521743-a4915b50075e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGNhYmlufGVufDB8fHx8MTYxNjc2NjQ4Nw&ixlib=rb-1.2.1&q=80&w=400', price: 3100000, location: 'Valle de Bravo, México', acceptedCurrencies: getRandomCurrencies() },
  { id: 5, name: 'Penthouse Exclusivo en Monterrey', description: 'Vistas panorámicas y acabados de lujo en San Pedro.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1vZGVybiUyMGhvdXNlfGVufDB8fHx8MTYxNjc2NjU2NQ&ixlib=rb-1.2.1&q=80&w=400', price: 8900000, location: 'Monterrey, México', acceptedCurrencies: getRandomCurrencies() },
  { id: 6, name: 'Estudio Céntrico en Puebla', description: 'Perfecto para estudiantes o profesionales, cerca de universidades.', image: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fHN0dWRpbyUyMGFwYXJ0bWVudHxlbnwwfHx8fDE2MTY3NjY2Mzk&ixlib=rb-1.2.1&q=80&w=400', price: 1500000, location: 'Puebla, México', acceptedCurrencies: getRandomCurrencies() },
  { id: 7, name: 'Villa Colonial en Mérida', description: 'Encanto histórico con comodidades modernas en el centro.', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGNvbG9uaWFsJTIwaG91c2V8ZW58MHx8fHwxNjE2NzY2NzA0&ixlib=rb-1.2.1&q=80&w=400', price: 5800000, location: 'Mérida, México', acceptedCurrencies: getRandomCurrencies() },
  { id: 8, name: 'Terreno Campestre en Querétaro', description: 'Construye la casa de tus sueños en un entorno natural.', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDV8fGxhbmQlMjBwbG90fGVufDB8fHx8MTYxNjc2Njc3MQ&ixlib=rb-1.2.1&q=80&w=400', price: 1200000, location: 'Querétaro, México', acceptedCurrencies: getRandomCurrencies() },
  { id: 9, name: 'Oficina Corporativa en Santa Fe', description: 'Espacio moderno y funcional para tu empresa.', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fG9mZmljZXxlbnwwfHx8fDE2MTY3NjY4MzU&ixlib=rb-1.2.1&q=80&w=400', price: 7300000, location: 'CDMX, México', acceptedCurrencies: getRandomCurrencies() },
  { id: 10, name: 'Casa de Playa en Tulum', description: 'Relájate en esta hermosa casa a pasos de la playa.', image: 'https://images.unsplash.com/photo-1585179087136-14056d034364?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJlYWNoJTIwaG91c2V8ZW58MHx8fHwxNjE2NzY2ODk4&ixlib=rb-1.2.1&q=80&w=400', price: 6900000, location: 'Tulum, México', acceptedCurrencies: getRandomCurrencies() },
  { id: 11, name: 'Hacienda Restaurada en Guanajuato', description: 'Propiedad histórica con gran potencial turístico.', image: 'https://images.unsplash.com/photo-1604709110611-190f5f4c0718?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGhhY2llbmRhfGVufDB8fHx8MTYxNjc2Njk1OA&ixlib=rb-1.2.1&q=80&w=400', price: 11500000, location: 'Guanajuato, México', acceptedCurrencies: getRandomCurrencies() },
  { id: 12, name: 'Local Comercial en Polanco', description: 'Excelente ubicación para negocio en zona exclusiva.', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHJlYWwlMjBlc3RhdGV8ZW58MHx8fHwxNjE2NzY3MDE5&ixlib=rb-1.2.1&q=80&w=400', price: 9800000, location: 'CDMX, México', acceptedCurrencies: getRandomCurrencies() },
  { id: 13, name: 'Bodega Industrial en Toluca', description: 'Amplio espacio para almacenamiento o producción.', image: 'https://images.unsplash.com/photo-1586528116311-0197c7959319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHdhcmVob3VzZXxlbnwwfHx8fDE2MTY3NjcwNzk&ixlib=rb-1.2.1&q=80&w=400', price: 5200000, location: 'Toluca, México', acceptedCurrencies: getRandomCurrencies() },
  { id: 14, name: 'Edificio de Departamentos en Roma', description: 'Oportunidad de inversión con 8 unidades rentables.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGFwYXJ0bWVudCUyMGJ1aWxkaW5nfGVufDB8fHx8MTYxNjc2NzE1MQ&ixlib=rb-1.2.1&q=80&w=400', price: 25000000, location: 'CDMX, México', acceptedCurrencies: getRandomCurrencies() },
  { id: 15, name: 'Rancho Ganadero en Chihuahua', description: 'Extenso terreno ideal para ganadería o agricultura.', image: 'https://images.unsplash.com/photo-1598941666183-a41408b7eab9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHJhbmNofGVufDB8fHx8MTYxNjc2NzIxMw&ixlib=rb-1.2.1&q=80&w=400', price: 15000000, location: 'Chihuahua, México', acceptedCurrencies: getRandomCurrencies() },
  { id: 16, name: 'Loft Artístico en Coyoacán', description: 'Espacio inspirador con techos altos y luz natural.', image: 'https://images.unsplash.com/photo-1542882294-295c6a39f121?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEwfHxsb2Z0fGVufDB8fHx8MTYxNjc2NjI2NA&ixlib=rb-1.2.1&q=80&w=400', price: 3200000, location: 'CDMX, México', acceptedCurrencies: getRandomCurrencies() },
];

// Mapeo de claves de moneda a nombres cortos para mostrar
const currencyLabels: Record<AcceptedCurrency, string> = {
  ARBETH: 'ARB',
  BASEETH: 'BASE',
  OPETH: 'OP',
  AMOYMATIC: 'AMOY'
};

const PropertyList = () => {
  const [properties, setProperties] = useState<Property[]>([])

  // TODO: Implementar lectura de propiedades desde el contrato
  const { data, isError, isLoading } = useContractRead({
    address: '0x...', // Dirección del contrato - ¡REEMPLAZAR!
    abi: [], // ABI del contrato - ¡REEMPLAZAR!
    functionName: 'getProperties', // O el nombre correcto de tu función
    // watch: true, // Descomenta si quieres que se actualice automáticamente
  })

  // Usar datos del contrato si están disponibles, si no, usar demo
  useEffect(() => {
    if (data && Array.isArray(data)) {
      // TODO: Mapear 'data' a la estructura de 'Property'
      // setProperties(mappedData)
    }
  }, [data])

  const showProperties = properties.length > 0 ? properties : demoProperties

  // Mostrar un mensaje de carga mientras se intenta leer el contrato
  if (isLoading) {
    return <div className="text-center text-primary-100 p-4">Cargando propiedades desde el contrato...</div>;
  }

  // Si hay un error, mostrar un mensaje y usar las propiedades de demo
  if (isError) {
    console.error("Error al leer del contrato, mostrando propiedades de demostración.");
    // No retornamos aquí, continuamos para mostrar las demoProperties
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {isError && (
        <div className="mb-4 text-center text-red-500 p-2 bg-red-100 rounded">
          Hubo un error al cargar desde el contrato. Mostrando datos de ejemplo.
        </div>
      )}
      <h2 className="text-3xl font-bold text-primary-100 mb-8 text-center">Propiedades Disponibles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {showProperties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 border border-transparent hover:border-accent-400 flex flex-col">
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{property.location}</p>
              <p className="text-sm text-gray-700 flex-grow mb-4">{property.description}</p>

              {/* Etiquetas de monedas aceptadas */}
              <div className="mb-3 flex flex-wrap gap-1">
                <span className="text-xs font-medium text-gray-500 mr-1">Acepta:</span>
                {property.acceptedCurrencies.map(currency => (
                  <span key={currency} className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                    {currencyLabels[currency]}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex justify-between items-center">
                <span className="text-xl font-bold text-primary-600">
                  ${property.price.toLocaleString()} MXN
                </span>
                <Link 
                  to={`/marketplace/${property.id}`} 
                  className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition duration-300 text-center"
                >
                  Ver Detalles
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PropertyList 