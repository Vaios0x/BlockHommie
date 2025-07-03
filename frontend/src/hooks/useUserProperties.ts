import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useReadContracts, useChainId } from 'wagmi';
import { blockHommiePropertyAbi, getContractAddress } from '../utils/contractConfig';
import { loanContractABI } from './useLoans'; // Reutilizar ABI si está definido ahí o importarlo

// Necesitaremos la dirección del contrato de préstamos también
// Asumiendo que se define de manera similar o es una constante conocida
const LOAN_CONTRACT_ADDRESS = '0x...' as `0x${string}`; // Reemplazar o importar

// Interfaz para la propiedad del usuario
export interface UserProperty {
  id: number;
  uri: string;
  // Podríamos añadir más datos de los metadatos si los leemos
}

export const useUserProperties = () => {
  const { address: userAddress } = useAccount();
  const chainId = useChainId();
  const propertyContractAddress = getContractAddress(chainId);
  const loanContractAddress = LOAN_CONTRACT_ADDRESS; // Usar la dirección correcta

  const [properties, setProperties] = useState<UserProperty[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Leer el balance de NFTs del usuario
  const { data: balanceData, isLoading: isLoadingBalance } = useReadContract({
    address: propertyContractAddress,
    abi: blockHommiePropertyAbi, // Asegurarse que este ABI contenga balanceOf
    functionName: 'balanceOf',
    args: [userAddress!],
    query: {
      enabled: !!userAddress, // Solo ejecutar si el usuario está conectado
    },
  });

  const balance = balanceData ? Number(balanceData) : 0;

  // 2. Preparar llamadas para obtener los token IDs del usuario
  // ASUME que el contrato implementa ERC721Enumerable o equivalente
  // *** SI NO, ESTA LÓGICA NO FUNCIONARÁ ***
  const ownerTokenIndexCalls = balance > 0 && userAddress ? Array.from({ length: balance }, (_, i) => ({
    address: propertyContractAddress,
    // *** NECESITA tokenOfOwnerByIndex EN blockHommiePropertyAbi ***
    abi: blockHommiePropertyAbi, // Usar el ABI importado que ahora incluye la función
    functionName: 'tokenOfOwnerByIndex',
    args: [userAddress, BigInt(i)],
  })) : [];

  const { data: tokenIdsData, isLoading: isLoadingTokenIds } = useReadContracts({
    contracts: ownerTokenIndexCalls,
    query: {
      enabled: balance > 0 && !!userAddress,
    },
  });

  // 3. Una vez tenemos los IDs, preparar llamadas para obtener sus URIs y si están en préstamo
  const propertyDetailContracts: any[] = [];
  const propertyIds: bigint[] = [];
  if (tokenIdsData) {
    tokenIdsData.forEach(result => {
      if (result.status === 'success' && result.result != null) { // Verificar que no sea null/undefined
        const tokenId = result.result as bigint;
        propertyIds.push(tokenId);
        // Llamada para obtener tokenURI
        propertyDetailContracts.push({
          address: propertyContractAddress,
          abi: blockHommiePropertyAbi, // Ya debería tener tokenURI
          functionName: 'tokenURI',
          args: [tokenId],
        });
        // Llamada para verificar si está en préstamo
        propertyDetailContracts.push({
          address: loanContractAddress,
          abi: loanContractABI, // Usar el ABI del contrato de préstamos
          functionName: 'propertyToLoanId',
          args: [tokenId],
        });
      }
    });
  }

  // 4. Leer detalles de las propiedades (URI y estado de préstamo)
  const { data: propertyDetailsData, isLoading: isLoadingDetails } = useReadContracts({
    contracts: propertyDetailContracts,
    query: {
      enabled: propertyIds.length > 0,
    },
  });

  useEffect(() => {
    const loading = isLoadingBalance || isLoadingTokenIds || isLoadingDetails;
    setIsLoading(loading);

    if (loading || !propertyDetailsData || propertyIds.length === 0) {
        if (!loading) setProperties([]); // Limpiar si terminó de cargar y no hay datos
      return;
    }

    const userProperties: UserProperty[] = [];
    for (let i = 0; i < propertyIds.length; i++) {
      const uriResult = propertyDetailsData[i * 2];
      const loanIdResult = propertyDetailsData[i * 2 + 1];

      // Verificar que la propiedad no esté en préstamo
      if (uriResult.status === 'success' && loanIdResult.status === 'success') {
        // Asegurarse que loanIdResult.result no sea undefined antes de comparar
        const loanId = loanIdResult.result != null ? (loanIdResult.result as bigint) : undefined;
        if (loanId === 0n) { 
           userProperties.push({
             id: Number(propertyIds[i]),
             uri: uriResult.result as string,
           });
        }
      }
    }
    setProperties(userProperties);

  }, [isLoadingBalance, isLoadingTokenIds, isLoadingDetails, propertyDetailsData, propertyIds]);

  return { properties, isLoading };
}; 