import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

// Carga variables de entorno
dotenv.config();

async function main() {
  try {
    const [deployer] = await ethers.getSigners();
    
    console.log("Desplegando contratos con la cuenta:", deployer.address);
    console.log("Balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH");
    
    // Despliega BlockHommieProperty
    const BlockHommieProperty = await ethers.getContractFactory("BlockHommieProperty");
    console.log("Desplegando BlockHommieProperty...");
    const blockHommieProperty = await BlockHommieProperty.deploy();
    await blockHommieProperty.waitForDeployment();
    
    const blockHommiePropertyAddress = await blockHommieProperty.getAddress();
    console.log("BlockHommieProperty desplegado en:", blockHommiePropertyAddress);
    
    // Verifica la red donde se desplegó
    const network = await ethers.provider.getNetwork();
    console.log("Red:", network.name, "chainId:", network.chainId.toString());
    
    // Guarda la dirección en frontend/.env para que la use el frontend
    try {
      const frontendEnvPath = path.join(__dirname, "..", "frontend", ".env");
      
      // Lee el archivo .env actual o inicializa uno vacío si no existe
      let envContent = "";
      try {
        if (fs.existsSync(frontendEnvPath)) {
          envContent = fs.readFileSync(frontendEnvPath, "utf8");
        }
      } catch (error) {
        console.error("Error al leer el archivo .env del frontend:", error);
      }
      
      // Define la variable según la red
      let envVar = "";
      if (network.chainId === 421614n) {
        envVar = "VITE_ARBITRUM_SEPOLIA_CONTRACT_ADDRESS";
      } else if (network.chainId === 84532n) {
        envVar = "VITE_BASE_SEPOLIA_CONTRACT_ADDRESS";
      } else if (network.chainId === 11155420n) {
        envVar = "VITE_OPTIMISM_SEPOLIA_CONTRACT_ADDRESS";
      } else if (network.chainId === 80002n) {
        envVar = "VITE_POLYGON_AMOY_CONTRACT_ADDRESS";
      } else {
        envVar = "VITE_CONTRACT_ADDRESS"; // Default
      }
      
      // Reemplaza o añade la variable de entorno
      const envVarRegex = new RegExp(`^${envVar}=.*$`, "m");
      if (envContent.match(envVarRegex)) {
        envContent = envContent.replace(envVarRegex, `${envVar}=${blockHommiePropertyAddress}`);
      } else {
        envContent += `\n${envVar}=${blockHommiePropertyAddress}`;
      }
      
      // Actualiza también la variable general para compatibilidad
      const generalVarRegex = /^VITE_CONTRACT_ADDRESS=.*$/m;
      if (envContent.match(generalVarRegex)) {
        envContent = envContent.replace(generalVarRegex, `VITE_CONTRACT_ADDRESS=${blockHommiePropertyAddress}`);
      } else {
        envContent += `\nVITE_CONTRACT_ADDRESS=${blockHommiePropertyAddress}`;
      }
      
      // Guarda el archivo .env
      fs.writeFileSync(frontendEnvPath, envContent);
      console.log(`Dirección del contrato guardada en ${frontendEnvPath}`);

    } catch (error) {
      console.error("Error al guardar la dirección del contrato en el archivo .env del frontend:", error);
      console.log("Por favor, añade manualmente esta línea al archivo frontend/.env:");
      console.log(`VITE_CONTRACT_ADDRESS=${blockHommiePropertyAddress}`);
    }
    
    console.log("");
    console.log("Para verificar el contrato:");
    console.log(`npx hardhat verify --network ${network.name} ${blockHommiePropertyAddress}`);
    
    return { contractAddress: blockHommiePropertyAddress, network };
  } catch (error) {
    console.error("Error en el despliegue:", error);
    throw error;
  }
}

// Si el script se ejecuta directamente (no es importado)
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { main }; 