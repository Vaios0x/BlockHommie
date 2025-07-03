import { http } from 'viem';
import {
  arbitrumSepolia,
  baseSepolia,
  optimismSepolia,
  polygonAmoy,
} from 'wagmi/chains';

// Obtener el projectId de las variables de entorno
// Asegúrate de tener VITE_WALLET_CONNECT_PROJECT_ID definido en tu archivo .env
export const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

if (!projectId) {
  console.warn("VITE_WALLET_CONNECT_PROJECT_ID no está definido en .env. Usando placeholder.");
  // Considera lanzar un error o usar un valor por defecto MÁS explícito si es crítico
  // throw new Error("VITE_WALLET_CONNECT_PROJECT_ID must be set in .env");
}

// Define y exporta las cadenas que soportará tu dApp
const chains = [arbitrumSepolia, baseSepolia, optimismSepolia, polygonAmoy] as const; // Usar 'as const' puede ayudar con los tipos
export { chains };

// Ya no necesitamos exportar wagmiConfig ni transports desde aquí.
// La configuración se centraliza en main.tsx usando getDefaultConfig. 