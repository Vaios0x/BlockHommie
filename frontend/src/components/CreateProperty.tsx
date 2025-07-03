import { useState, useEffect } from 'react'
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { parseEther } from 'viem'
import { blockHommiePropertyAbi, getContractAddress } from '../utils/contractConfig'

const CreateProperty = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    location: '',
    image: null as File | null,
  })
  const [imageUri, setImageUri] = useState<string | null>(null)
  const { chain } = useAccount()
  const contractAddress = getContractAddress(chain?.id)
  const { isConnected } = useAccount()

  const { data: hash, error: writeError, writeContract } = useWriteContract()
  const { address } = useAccount()

  const { isLoading: isConfirming, isSuccess: isConfirmed, error: confirmationError } = useWaitForTransactionReceipt({
    hash,
  })

  // Simulación de subida a IPFS
  const uploadToIPFS = async (file: File): Promise<string> => {
    console.log("Subiendo imagen a IPFS (simulado):", file.name)
    return new Promise(resolve => setTimeout(() => resolve(`ipfs://simulated-hash-for-${file.name}`), 1000))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.image) {
      alert("Por favor, selecciona una imagen.")
      return
    }
    if (!isConnected) {
      alert("Por favor, conecta tu wallet para crear una propiedad.")
      return
    }
    if (!contractAddress) {
      alert("La dirección del contrato no está configurada correctamente.")
      return
    }

    try {
      const uploadedImageUri = await uploadToIPFS(formData.image)
      setImageUri(uploadedImageUri)
      console.log("URI de la imagen subida:", uploadedImageUri)

      const metadata = {
        name: formData.name,
        description: formData.description,
        image: uploadedImageUri,
        location: formData.location,
        price: formData.price
      }
      
      const metadataUri = `data:application/json;base64,${btoa(JSON.stringify(metadata))}`
      
      writeContract({
        address: contractAddress,
        abi: blockHommiePropertyAbi,
        functionName: 'mintProperty',
        args: [metadataUri],
      })

    } catch (err) {
      console.error("Error durante el proceso de creación:", err)
      alert(`Error: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-primary-100 mb-8">Tokenizar Propiedad</h1>
        
        {!isConnected && (
          <div className="bg-primary-800/30 border border-primary-700 text-primary-200 px-4 py-3 rounded relative mb-8" role="alert">
            <strong className="font-bold">Billetera no conectada.</strong>
            <span className="block sm:inline"> Conecta tu billetera para tokenizar una propiedad.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-primary-200">
              Nombre de la Propiedad
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-primary-100 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-primary-200">
              Descripción
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-primary-100 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-primary-200">
              Precio (MXN)
            </label>
            <input
              type="number"
              id="price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-primary-100 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-primary-200">
              Ubicación
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-primary-100 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-primary-200">
              Imagen de la Propiedad
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
              className="mt-1 block w-full text-primary-200
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-primary-600 file:text-white
                hover:file:bg-primary-700"
              required
            />
          </div>

          <div className="mt-6 pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-400 mb-6">
              Al crear una propiedad, la estás minteando como un NFT en la blockchain.
              <br/> 
              Esto tendrá un costo de gas en la red {chain?.name || 'actual'}.
            </p>
            <button
              type="submit"
              disabled={isConfirming || !isConnected}
              className="w-full px-6 py-3 bg-primary-600 text-white font-semibold rounded-md shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 disabled:opacity-60 disabled:cursor-not-allowed transition duration-150 ease-in-out"
            >
              {isConfirming ? 'Confirmando transacción...' : 'Crear Propiedad'}
            </button>
          </div>
        </form>

        {isConfirmed && (
          <div className="mt-6 p-4 bg-green-600 bg-opacity-20 text-green-300 border border-green-500 rounded-md shadow-lg">
            <p className="font-semibold">¡Propiedad creada exitosamente!</p>
            <p className="text-sm">Hash de la transacción: 
              <a 
                href={`${chain?.blockExplorers?.default.url || 'https://sepolia.etherscan.io'}/tx/${hash}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="underline hover:text-green-200 ml-1"
              >
                {hash?.substring(0, 10)}...{hash?.substring(hash.length - 8)}
              </a>
            </p>
            {imageUri && <p className="text-sm mt-2">URI de la imagen (IPFS): {imageUri}</p>}
          </div>
        )}

        {(writeError || confirmationError) && (
          <div className="mt-6 p-4 bg-red-600 bg-opacity-20 text-red-300 border border-red-500 rounded-md shadow-lg">
            <p className="font-semibold">Error al crear la propiedad:</p>
            {writeError && <p className="text-sm">Error de Wallet/Escritura: {writeError.message}</p>}
            {confirmationError && <p className="text-sm">Error de Confirmación: {confirmationError.message}</p>}
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateProperty 