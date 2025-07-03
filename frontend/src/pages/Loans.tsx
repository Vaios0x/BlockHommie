import React, { useState, useEffect } from 'react';
import { useAccount, useContractWrite, useTransaction } from 'wagmi';
import { readContract } from '@wagmi/core';
import { parseEther, formatEther, type Abi } from 'viem';
import { useLoans, loanContractABI } from '../hooks/useLoans';
import { useUserProperties } from '../hooks/useUserProperties';
import { chains } from '../config/web3';

// ABI del contrato de préstamos
// ELIMINADO - AHORA SE IMPORTA DESDE useLoans.ts

const LOAN_CONTRACT_ADDRESS = '0x...' as `0x${string}`; // Reemplazar con la dirección real del contrato

// Tipo para los parámetros de la función de escritura del contrato
type ExecuteWriteParams = {
    address: `0x${string}`;
    abi: typeof loanContractABI;
    functionName: Extract<(typeof loanContractABI)[number], { type: "function", stateMutability: "nonpayable" | "payable" }>["name"];
    args?: readonly unknown[];
    value?: bigint;
};

export default function Loans() {
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState<'borrow' | 'lend'>('borrow');
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);

  const { userLoans, availableLoans, isLoadingLoans } = useLoans(LOAN_CONTRACT_ADDRESS);
  const { properties: userProperties, isLoading: isLoadingProperties } = useUserProperties();

  const [pendingTx, setPendingTx] = useState<{ hash: `0x${string}`; loanId?: number; action?: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { write: writeContract } = useContractWrite({
    address: LOAN_CONTRACT_ADDRESS,
    abi: loanContractABI,
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed, error: confirmationError } = useTransaction({
    hash: pendingTx?.hash,
  });

  useEffect(() => {
    if (isConfirmed || confirmationError) {
      if (confirmationError) {
        console.error("Error de confirmación:", confirmationError);
      }
      setPendingTx(null);
      setIsSubmitting(false);
    }
  }, [isConfirmed, confirmationError]);

  const executeWrite = async (params: ExecuteWriteParams, loanId?: number, action?: string) => {
    setIsSubmitting(true);
    try {
      const result = await writeContract({
        ...params,
        value: params.value,
      });
      
      if (result?.hash) {
        setPendingTx({ hash: result.hash, loanId, action });
      } else {
        console.warn(`La acción '${action}' no produjo un hash de transacción.`);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(`Error al ${action || 'enviar'} transacción (catch):`, error);
      setPendingTx(null);
      setIsSubmitting(false);
    }
  };

  const handleCreateLoan = () => {
    if (!selectedProperty || !loanAmount || !interestRate || !duration) return;
    executeWrite({
      address: LOAN_CONTRACT_ADDRESS,
      abi: loanContractABI,
      functionName: 'createLoanRequest',
      args: [
        BigInt(selectedProperty),
        parseEther(loanAmount),
        BigInt(interestRate),
        BigInt(duration)
      ],
    }, undefined, 'crear');
  };

  const handleFundLoan = (loanId: number, amount: bigint) => {
    executeWrite({
      address: LOAN_CONTRACT_ADDRESS,
      abi: loanContractABI,
      functionName: 'fundLoan',
      args: [BigInt(loanId)],
      value: amount,
    }, loanId, 'financiar');
  };

  const handleRepayLoan = async (loanId: number) => {
    setIsSubmitting(true);
    try {
      const repaymentAmount = await readContract({
        address: LOAN_CONTRACT_ADDRESS,
        abi: loanContractABI,
        functionName: 'calculateRepayment',
        args: [BigInt(loanId)],
      });

      if (typeof repaymentAmount !== 'bigint' || repaymentAmount <= 0n) {
        console.error("No se pudo calcular el monto del repago o es inválido:", repaymentAmount);
        setIsSubmitting(false);
        return;
      }
      
      await executeWrite({
        address: LOAN_CONTRACT_ADDRESS,
        abi: loanContractABI,
        functionName: 'repayLoan',
        args: [BigInt(loanId)],
        value: repaymentAmount,
      }, loanId, 'pagar');
    } catch (error) {
      console.error("Error al procesar el repago del préstamo:", error);
      setIsSubmitting(false);
    }
  };

  const handleLiquidateLoan = (loanId: number) => {
    executeWrite({
      address: LOAN_CONTRACT_ADDRESS,
      abi: loanContractABI,
      functionName: 'liquidateLoan',
      args: [BigInt(loanId)],
    }, loanId, 'liquidar');
  };

  const isProcessing = isSubmitting || isConfirming;
  const isPageLoading = isLoadingLoans || isLoadingProperties;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Préstamos DeFi</h1>

      {isPageLoading && !isLoadingLoans && <p className="text-center text-gray-600">Cargando propiedades del usuario...</p>}
      {isLoadingLoans && <p className="text-center text-gray-600">Cargando datos de préstamos...</p>}
      {isSubmitting && !pendingTx?.hash && <p className="text-center text-yellow-600">Enviando transacción...</p>}
      {isConfirming && pendingTx?.hash && <p className="text-center text-blue-600">Esperando confirmación para la acción: {pendingTx.action} {pendingTx.loanId ? `(Préstamo #${pendingTx.loanId})` : ''}...</p>}

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
              {isSubmitting && !pendingTx?.hash && pendingTx?.action === 'crear' ? 'Enviando...' : 
               isConfirming && pendingTx?.action === 'crear' ? 'Confirmando...' : 'Solicitar Préstamo'}
            </button>
            {isConfirmed && !pendingTx && <p className="text-green-600 text-center mt-2">¡Transacción confirmada!</p>}
          </div>
        </div>
      )}

      {activeTab === 'lend' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Préstamos Disponibles para Financiar</h2>
            {isLoadingLoans && <p>Cargando préstamos disponibles...</p>}
            {!isLoadingLoans && availableLoans.length === 0 && <p>No hay préstamos disponibles para financiar en este momento.</p>}
            <div className="space-y-4">
              {availableLoans.map((loan) => {
                const isCurrentActionSubmitting = isSubmitting && pendingTx?.action === 'financiar' && pendingTx?.loanId === loan.loanId && !pendingTx.hash;
                const isCurrentActionConfirming = isConfirming && pendingTx?.action === 'financiar' && pendingTx?.loanId === loan.loanId;
                const currentActionText = isCurrentActionSubmitting ? 'Enviando...' :
                                        isCurrentActionConfirming ? 'Confirmando...' : 'Financiar';
                return (
                  <div key={loan.loanId} className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Préstamo ID: {loan.loanId}</p>
                      <p className="text-sm text-gray-600">Propiedad ID: {loan.propertyId}</p>
                      <p className="text-sm text-gray-600">Monto: {formatEther(loan.amount)} ETH</p>
                      <p className="text-sm text-gray-600">Tasa: {loan.interestRate}%</p>
                      <p className="text-sm text-gray-600">Duración: {loan.duration} días</p>
                    </div>
                    <button
                      className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50"
                      onClick={() => handleFundLoan(loan.loanId, loan.amount)}
                      disabled={isProcessing}
                    >
                      {currentActionText}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Mis Préstamos</h2>
            {isLoadingLoans && <p>Cargando mis préstamos...</p>}
            {!isLoadingLoans && userLoans.length === 0 && <p>No tienes préstamos activos o pendientes.</p>}
            <div className="space-y-4">
              {userLoans.map((loan) => {
                const isBorrower = loan.borrower === address;
                const isLender = loan.lender === address;
                const canRepay = isBorrower && loan.isActive && !loan.isRepaid;
                const canLiquidate = isLender && loan.isActive && !loan.isRepaid; // TODO: Añadir condición de vencimiento

                const isRepaySubmitting = isSubmitting && pendingTx?.action === 'pagar' && pendingTx?.loanId === loan.loanId && !pendingTx.hash;
                const isRepayConfirming = isConfirming && pendingTx?.action === 'pagar' && pendingTx?.loanId === loan.loanId;
                const actionRepayText = isRepaySubmitting ? 'Enviando...' : isRepayConfirming ? 'Confirmando...' : 'Pagar';

                const isLiquidateSubmitting = isSubmitting && pendingTx?.action === 'liquidar' && pendingTx?.loanId === loan.loanId && !pendingTx.hash;
                const isLiquidateConfirming = isConfirming && pendingTx?.action === 'liquidar' && pendingTx?.loanId === loan.loanId;
                const actionLiquidateText = isLiquidateSubmitting ? 'Enviando...' : isLiquidateConfirming ? 'Liquidando...' : 'Liquidar';
                
                return (
                  <div key={loan.loanId} className="border rounded-lg p-4">
                    <p className="font-medium">Préstamo ID: {loan.loanId}</p>
                    <p className="text-sm text-gray-600">Rol: {isBorrower ? 'Prestatario' : isLender ? 'Prestamista' : 'N/A'}</p>
                    <p className="text-sm text-gray-600">Monto: {formatEther(loan.amount)} ETH</p>
                    <p className="text-sm text-gray-600">Tasa: {loan.interestRate}%</p>
                    <p className="text-sm text-gray-600">Estado: {loan.isRepaid ? 'Pagado' : loan.isActive ? 'Activo' : 'Pendiente de financiación'}</p>
                    <div className="mt-2 space-x-2">
                      {canRepay && (
                        <button
                          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
                          onClick={() => handleRepayLoan(loan.loanId)}
                          disabled={isProcessing}
                        >
                          {actionRepayText}
                        </button>
                      )}
                      {canLiquidate && (
                        <button
                          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 disabled:opacity-50"
                          onClick={() => handleLiquidateLoan(loan.loanId)}
                          disabled={isProcessing} // TODO: Habilitar solo si está vencido
                        >
                          {actionLiquidateText}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 