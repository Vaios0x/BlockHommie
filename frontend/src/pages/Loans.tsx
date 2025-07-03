import React, { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseEther } from 'viem';
import { useLoans, loanContractABI } from '../hooks/useLoans';
import { useUserProperties } from '../hooks/useUserProperties';

const LOAN_CONTRACT_ADDRESS = '0x...' as `0x${string}`; // Reemplazar con la dirección real del contrato

export default function Loans() {
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState<'borrow' | 'lend'>('borrow');
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);

  const { userLoans, availableLoans, isLoadingLoans } = useLoans(LOAN_CONTRACT_ADDRESS);
  const { properties: userProperties, isLoading: isLoadingProperties } = useUserProperties();

  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { writeContract } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const handleCreateLoan = () => {
    if (!selectedProperty || !loanAmount || !interestRate || !duration) return;
    setIsSubmitting(true);
    
    writeContract({
      abi: loanContractABI,
      address: LOAN_CONTRACT_ADDRESS,
      functionName: 'createLoanRequest',
      args: [
        BigInt(selectedProperty),
        parseEther(loanAmount),
        BigInt(interestRate),
        BigInt(duration)
      ],
    }, {
      onSuccess: (hash) => {
        setTxHash(hash);
        setIsSubmitting(false);
      },
      onError: (error) => {
        console.error('Error al crear préstamo:', error);
        setIsSubmitting(false);
      }
    });
  };

  const handleFundLoan = (loanId: number, amount: bigint) => {
    setIsSubmitting(true);
    
    writeContract({
      abi: loanContractABI,
      address: LOAN_CONTRACT_ADDRESS,
      functionName: 'fundLoan',
      args: [BigInt(loanId)],
      value: amount,
    }, {
      onSuccess: (hash) => {
        setTxHash(hash);
        setIsSubmitting(false);
      },
      onError: (error) => {
        console.error('Error al financiar préstamo:', error);
        setIsSubmitting(false);
      }
    });
  };

  const handleRepayLoan = async (loanId: number) => {
    setIsSubmitting(true);
    
    writeContract({
      abi: loanContractABI,
      address: LOAN_CONTRACT_ADDRESS,
      functionName: 'repayLoan',
      args: [BigInt(loanId)],
      value: parseEther('0.1'), // Valor dummy - debería calcularse dinámicamente
    }, {
      onSuccess: (hash) => {
        setTxHash(hash);
        setIsSubmitting(false);
      },
      onError: (error) => {
        console.error('Error al pagar préstamo:', error);
        setIsSubmitting(false);
      }
    });
  };

  const handleLiquidateLoan = (loanId: number) => {
    setIsSubmitting(true);
    
    writeContract({
      abi: loanContractABI,
      address: LOAN_CONTRACT_ADDRESS,
      functionName: 'liquidateLoan',
      args: [BigInt(loanId)],
    }, {
      onSuccess: (hash) => {
        setTxHash(hash);
        setIsSubmitting(false);
      },
      onError: (error) => {
        console.error('Error al liquidar préstamo:', error);
        setIsSubmitting(false);
      }
    });
  };

  const isProcessing = isSubmitting || isConfirming;
  const isPageLoading = isLoadingLoans || isLoadingProperties;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Préstamos DeFi</h1>

      {isPageLoading && !isLoadingLoans && <p className="text-center text-gray-600">Cargando propiedades del usuario...</p>}
      {isLoadingLoans && <p className="text-center text-gray-600">Cargando datos de préstamos...</p>}
      {isSubmitting && <p className="text-center text-yellow-600">Enviando transacción...</p>}
      {isConfirming && txHash && <p className="text-center text-blue-600">Esperando confirmación...</p>}
      {isConfirmed && <p className="text-center text-green-600">Transacción confirmada!</p>}

      <div className="flex space-x-4 mb-8">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'borrow' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('borrow')}
          disabled={isProcessing}
        >
          Solicitar Préstamo
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'lend' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('lend')}
          disabled={isProcessing}
        >
          Prestar
        </button>
      </div>

      {activeTab === 'borrow' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Solicitar Préstamo</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="propertyIdBorrow" className="block text-sm font-medium text-gray-700">
                Propiedad Disponible
              </label>
              <select
                id="propertyIdBorrow"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={selectedProperty || ''}
                onChange={(e) => setSelectedProperty(Number(e.target.value) || null)}
                disabled={isProcessing || isPageLoading || userProperties.length === 0}
              >
                <option value="">{isLoadingProperties ? 'Cargando...' : userProperties.length === 0 ? 'No tienes NFTs disponibles' : 'Seleccionar propiedad'}</option>
                {userProperties.map((prop) => (
                  <option key={prop.id} value={prop.id}>
                    Propiedad #{prop.id}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="loanAmountBorrow" className="block text-sm font-medium text-gray-700">
                Monto (ETH)
              </label>
              <input
                id="loanAmountBorrow"
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                disabled={isProcessing}
                placeholder="0.1"
              />
            </div>
            <div>
              <label htmlFor="interestRateBorrow" className="block text-sm font-medium text-gray-700">
                Tasa de Interés (% Anual)
              </label>
              <input
                id="interestRateBorrow"
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                disabled={isProcessing}
                placeholder="5"
              />
            </div>
            <div>
              <label htmlFor="durationBorrow" className="block text-sm font-medium text-gray-700">
                Duración (días)
              </label>
              <input
                id="durationBorrow"
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                disabled={isProcessing}
                placeholder="30"
              />
            </div>
            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
              onClick={handleCreateLoan}
              disabled={isProcessing || isPageLoading || !selectedProperty || !loanAmount || !interestRate || !duration}
            >
              {isSubmitting ? 'Enviando...' : isConfirming ? 'Confirmando...' : 'Solicitar Préstamo'}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'lend' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Préstamos Disponibles</h2>
          <div className="space-y-4">
            {availableLoans.length === 0 ? (
              <p className="text-gray-500">No hay préstamos disponibles para financiar.</p>
            ) : (
              availableLoans.map((loan, index) => (
                <div key={index} className="border rounded p-4">
                  <p>Préstamo #{index + 1}</p>
                  <p>Estado: Disponible para financiar</p>
                  <button
                    className="mt-2 bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 disabled:opacity-50"
                    onClick={() => handleFundLoan(index, parseEther('0.1'))}
                    disabled={isProcessing}
                  >
                    {isSubmitting ? 'Financiando...' : 'Financiar'}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
} 