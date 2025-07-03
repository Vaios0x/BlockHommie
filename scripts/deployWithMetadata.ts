import { ethers } from "hardhat";
import { uploadMetadata, PropertyMetadata } from "./uploadMetadata";

async function main() {
  // 1. Desplegar el contrato
  const BlockHommieProperty = await ethers.getContractFactory("BlockHommieProperty");
  const blockHommieProperty = await BlockHommieProperty.deploy();
  await blockHommieProperty.deployed();
  console.log("BlockHommieProperty deployed to:", blockHommieProperty.address);

  // 2. Crear metadata de ejemplo
  const metadata: PropertyMetadata = {
    name: "Casa Ejemplo",
    description: "Hermosa casa en el centro de la ciudad",
    image: "ipfs://Qm...", // Reemplazar con CID real de la imagen
    attributes: {
      location: "Ciudad de México",
      size: 150,
      price: 2500000,
      type: "Residencial",
      features: ["3 habitaciones", "2 baños", "cocina integral"],
      legalStatus: "Título de propiedad",
      documents: ["ipfs://Qm..."] // Reemplazar con CIDs reales
    }
  };

  // 3. Subir metadata a IPFS
  const ipfsUri = await uploadMetadata(metadata);
  console.log("Metadata uploaded to IPFS:", ipfsUri);

  // 4. Mintear el NFT con la metadata
  const [signer] = await ethers.getSigners();
  const tx = await blockHommieProperty.mintProperty(
    signer.address,
    ipfsUri
  );
  await tx.wait();
  console.log("Property NFT minted with metadata!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 