import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { chains, projectId } from './config/web3';

const queryClient = new QueryClient();

// Verificar que projectId no esté vacío antes de usarlo
if (!projectId) {
  console.error("Error: VITE_WALLET_CONNECT_PROJECT_ID no está configurado en las variables de entorno (.env).");
  // Podrías renderizar un mensaje de error aquí en lugar de la app
}

// Setup RainbowKit config with projectId
const config = getDefaultConfig({
  appName: 'BlockHommie',
  projectId: projectId || 'YOUR_PROJECT_ID', // Usar el projectId importado o un placeholder si está vacío
  chains: chains as any, // Usar 'as any' temporalmente para el error de tipo
  ssr: false,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
