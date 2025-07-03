import { create } from '@web3-storage/w3up-client'
import { encode } from '@ipld/dag-json'

export interface PropertyMetadata {
  name: string;
  description: string;
  image: string;
  attributes: {
    location: string;
    size: number;
    price: number;
    type: string;
    features: string[];
    legalStatus: string;
    documents: string[];
  };
}

export async function uploadMetadata(metadata: PropertyMetadata): Promise<string> {
  try {
    const client = await create()
    
    // Configurar la API key de Web3.Storage
    await client.login(process.env.WEB3_STORAGE_API_KEY || '')
    
    const encoded = encode(metadata)
    const cid = await client.uploadBlob(encoded)
    
    return `ipfs://${cid}`
  } catch (error) {
    console.error('Error uploading metadata to IPFS:', error)
    throw error
  }
}

// Ejemplo de uso
async function main() {
  const metadata: PropertyMetadata = {
    name: "Casa Ejemplo",
    description: "Hermosa casa en el centro de la ciudad",
    image: "ipfs://Qm...", // Aquí iría el CID de la imagen
    attributes: {
      location: "Ciudad de México",
      size: 150, // metros cuadrados
      price: 2500000, // en pesos mexicanos
      type: "Residencial",
      features: ["3 habitaciones", "2 baños", "cocina integral"],
      legalStatus: "Título de propiedad",
      documents: ["ipfs://Qm..."] // CIDs de documentos legales
    }
  }

  try {
    const ipfsUri = await uploadMetadata(metadata)
    console.log('Metadata uploaded to IPFS:', ipfsUri)
  } catch (error) {
    console.error('Failed to upload metadata:', error)
  }
}

if (require.main === module) {
  main()
} 