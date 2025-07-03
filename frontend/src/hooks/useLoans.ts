import { useState, useEffect } from 'react';
import { useReadContract, useReadContracts, useAccount } from 'wagmi';
import { formatEther } from 'viem';

// ABI del contrato de préstamos
export const loanContractABI = [
  {
    "inputs": [
      { "internalType": "uint256", "name": "_propertyId", "type": "uint256" },
      { "internalType": "uint256", "name": "_amount", "type": "uint256" },
      { "internalType": "uint256", "name": "_interestRate", "type": "uint256" },
      { "internalType": "uint256", "name": "_duration", "type": "uint256" }
    ],
    "name": "createLoanRequest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_loanId", "type": "uint256" }],
    "name": "fundLoan",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_loanId", "type": "uint256" }],
    "name": "repayLoan",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_loanId", "type": "uint256" }],
    "name": "liquidateLoan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_loanId", "type": "uint256" }],
    "name": "calculateRepayment",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "loans",
    "outputs": [
      { "internalType": "uint256", "name": "loanId", "type": "uint256" },
      { "internalType": "uint256", "name": "propertyId", "type": "uint256" },
      { "internalType": "address", "name": "borrower", "type": "address" },
      { "internalType": "address", "name": "lender", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "uint256", "name": "interestRate", "type": "uint256" },
      { "internalType": "uint256", "name": "startTime", "type": "uint256" },
      { "internalType": "uint256", "name": "duration", "type": "uint256" },
      { "internalType": "bool", "name": "isActive", "type": "bool" },
      { "internalType": "bool", "name": "isRepaid", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextLoanId",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

interface Loan {
  loanId: number;
  propertyId: number;
  borrower: string;
  lender: string;
  amount: bigint;
  interestRate: number;
  startTime: number;
  duration: number;
  isActive: boolean;
  isRepaid: boolean;
}

const loanContract = (address: `0x${string}`) => ({
  address,
  abi: loanContractABI,
});

export const useLoans = (contractAddress: `0x${string}`) => {
  const { address: userAddress } = useAccount();
  const [userLoans, setUserLoans] = useState<Loan[]>([]);
  const [availableLoans, setAvailableLoans] = useState<Loan[]>([]);
  const [isLoadingLoans, setIsLoadingLoans] = useState(true);

  // 1. Leer el siguiente ID de préstamo
  const { data: nextLoanIdData, isLoading: isLoadingNextId } = useReadContract({
    ...loanContract(contractAddress),
    functionName: 'nextLoanId',
  });

  const nextLoanId = nextLoanIdData ? Number(nextLoanIdData) : 0;

  // 2. Preparar llamadas para leer todos los préstamos hasta nextLoanId
  const loanContracts = nextLoanId > 0 ? Array.from({ length: nextLoanId }, (_, i) => ({
    ...loanContract(contractAddress),
    functionName: 'loans',
    args: [BigInt(i)],
  })) : [];

  // 3. Leer todos los préstamos en batch
  const { data: loansData, isLoading: isLoadingLoansData } = useReadContracts({
    contracts: loanContracts,
    query: {
      enabled: nextLoanId > 0, // Solo ejecutar si hay préstamos para leer
    },
  });

  useEffect(() => {
    if (isLoadingNextId || isLoadingLoansData) {
      setIsLoadingLoans(true);
      return;
    }

    if (!loansData) {
        setUserLoans([]);
        setAvailableLoans([]);
        setIsLoadingLoans(false);
        return;
    }

    const fetchedLoans: Loan[] = [];
    const userLoansTemp: Loan[] = [];
    const availableLoansTemp: Loan[] = [];

    loansData.forEach((result) => {
      if (result.status === 'success' && result.result) {
        const loanData = result.result as unknown as any[]; // Castear a tipo adecuado
         if (loanData && Array.isArray(loanData) && loanData.length === 10) {
            const loan: Loan = {
                loanId: Number(loanData[0]),
                propertyId: Number(loanData[1]),
                borrower: loanData[2],
                lender: loanData[3],
                amount: loanData[4],
                interestRate: Number(loanData[5]),
                startTime: Number(loanData[6]),
                duration: Number(loanData[7]),
                isActive: loanData[8],
                isRepaid: loanData[9],
            };
            fetchedLoans.push(loan);

            // Filtrar préstamos del usuario
            if (userAddress && (loan.borrower === userAddress || loan.lender === userAddress)) {
                userLoansTemp.push(loan);
            }

            // Filtrar préstamos disponibles (activos para financiar o los propios inactivos)
            if (!loan.isActive && !loan.isRepaid) { // Préstamos esperando ser financiados
                availableLoansTemp.push(loan);
            }
         }
      }
    });

    setUserLoans(userLoansTemp);
    setAvailableLoans(availableLoansTemp);
    setIsLoadingLoans(false);

  }, [loansData, userAddress, isLoadingNextId, isLoadingLoansData]);

  return {
    userLoans,
    availableLoans,
    isLoadingLoans,
    nextLoanId, // Opcional: exponer si es necesario
  };
}; 