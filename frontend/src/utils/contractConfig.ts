import { parseAbi } from 'viem';

// ABI del contrato BlockHommieProperty
// Este ABI fue generado a partir de la compilación del contrato
export const blockHommiePropertyAbi = parseAbi([
  // Constructor y Funciones básicas ERC721
  "constructor()",
  
  // Eventos ERC721 estándar
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
  "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
  "event ApprovalForAll(address indexed owner, address indexed operator, bool approved)",
  
  // Eventos del contrato
  "event Paused(address account)",
  "event Unpaused(address account)",
  "event PropertyMinted(address indexed owner, uint256 indexed tokenId, string uri)",
  "event PropertyBurned(uint256 indexed tokenId)",
  "event PropertyListed(uint256 indexed tokenId, address indexed owner, uint256 price)",
  "event PropertyUnlisted(uint256 indexed tokenId)",
  "event PropertySold(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price)",
  
  // Funciones ERC721 estándar
  "function balanceOf(address owner) view returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function approve(address to, uint256 tokenId)",
  "function getApproved(uint256 tokenId) view returns (address)",
  "function setApprovalForAll(address operator, bool approved)",
  "function isApprovedForAll(address owner, address operator) view returns (bool)",
  "function transferFrom(address from, address to, uint256 tokenId)",
  "function safeTransferFrom(address from, address to, uint256 tokenId)",
  "function safeTransferFrom(address from, address to, uint256 tokenId, bytes data)",
  
  // Funciones ERC721 Enumerable (si existen en el contrato)
  "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
  
  // Funciones específicas de BlockHommieProperty
  "function nextTokenId() view returns (uint256)",
  "function mintProperty(string uri) returns (uint256)",
  "function burnProperty(uint256 tokenId)",
  "function prices(uint256 tokenId) view returns (uint256)",
  "function isForSale(uint256 tokenId) view returns (bool)",
  "function listProperty(uint256 tokenId, uint256 price)",
  "function unlistProperty(uint256 tokenId)",
  "function buyProperty(uint256 tokenId) payable",
  "function pause()",
  "function unpause()",
  "function paused() view returns (bool)",
  "function owner() view returns (address)"
]);

// Direcciones de los contratos según la red
export const getContractAddress = (chainId?: number): `0x${string}` => {
  // Si no hay chainId, intenta obtenerlo de las variables de entorno
  const defaultAddress = import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`;
  
  if (!chainId) {
    return defaultAddress;
  }
  
  // Asigna direcciones específicas según la red
  switch (chainId) {
    case 421614: // Arbitrum Sepolia
      return (import.meta.env.VITE_ARBITRUM_SEPOLIA_CONTRACT_ADDRESS || defaultAddress) as `0x${string}`;
    case 84532: // Base Sepolia 
      return (import.meta.env.VITE_BASE_SEPOLIA_CONTRACT_ADDRESS || defaultAddress) as `0x${string}`;
    case 11155420: // Optimism Sepolia
      return (import.meta.env.VITE_OPTIMISM_SEPOLIA_CONTRACT_ADDRESS || defaultAddress) as `0x${string}`;
    case 80002: // Polygon Amoy
      return (import.meta.env.VITE_POLYGON_AMOY_CONTRACT_ADDRESS || defaultAddress) as `0x${string}`;
    default:
      return defaultAddress;
  }
}; 