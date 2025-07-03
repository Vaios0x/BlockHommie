// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract BlockHommieLoan is ReentrancyGuard, Ownable, Pausable {
    IERC721 public propertyNFT;
    
    struct Loan {
        uint256 loanId;
        uint256 propertyId;
        address borrower;
        address lender;
        uint256 amount;
        uint256 interestRate; // En puntos base (1% = 100)
        uint256 startTime;
        uint256 duration; // En segundos
        bool isActive;
        bool isRepaid;
    }

    // Mapeo de préstamos por ID
    mapping(uint256 => Loan) public loans;
    // Mapeo de propiedades en préstamo
    mapping(uint256 => uint256) public propertyToLoanId;
    // Contador de préstamos
    uint256 public nextLoanId;

    // Eventos
    event LoanCreated(uint256 indexed loanId, uint256 indexed propertyId, address indexed borrower, uint256 amount, uint256 interestRate);
    event LoanFunded(uint256 indexed loanId, address indexed lender);
    event LoanRepaid(uint256 indexed loanId);
    event LoanDefaulted(uint256 indexed loanId);
    event PropertySeized(uint256 indexed propertyId, address indexed lender);

    constructor(address _propertyNFT) {
        propertyNFT = IERC721(_propertyNFT);
    }

    // Crear una solicitud de préstamo
    function createLoanRequest(
        uint256 _propertyId,
        uint256 _amount,
        uint256 _interestRate,
        uint256 _duration
    ) external whenNotPaused nonReentrant {
        require(propertyNFT.ownerOf(_propertyId) == msg.sender, "No eres el dueño de la propiedad");
        require(_amount > 0, "El monto debe ser mayor a 0");
        require(_interestRate > 0 && _interestRate <= 1000, "Tasa de interés inválida"); // Máximo 10%
        require(_duration >= 30 days && _duration <= 365 days, "Duración inválida");
        require(propertyToLoanId[_propertyId] == 0, "Propiedad ya en préstamo");

        uint256 loanId = nextLoanId++;
        loans[loanId] = Loan({
            loanId: loanId,
            propertyId: _propertyId,
            borrower: msg.sender,
            lender: address(0),
            amount: _amount,
            interestRate: _interestRate,
            startTime: 0,
            duration: _duration,
            isActive: false,
            isRepaid: false
        });

        propertyToLoanId[_propertyId] = loanId;
        emit LoanCreated(loanId, _propertyId, msg.sender, _amount, _interestRate);
    }

    // Financiar un préstamo
    function fundLoan(uint256 _loanId) external payable whenNotPaused nonReentrant {
        Loan storage loan = loans[_loanId];
        require(!loan.isActive, "Préstamo ya financiado");
        require(msg.value == loan.amount, "Monto incorrecto");

        loan.lender = msg.sender;
        loan.startTime = block.timestamp;
        loan.isActive = true;

        // Transferir el NFT al contrato como colateral
        propertyNFT.transferFrom(loan.borrower, address(this), loan.propertyId);

        // Transferir el monto al prestatario
        payable(loan.borrower).transfer(msg.value);

        emit LoanFunded(_loanId, msg.sender);
    }

    // Repagar un préstamo
    function repayLoan(uint256 _loanId) external payable whenNotPaused nonReentrant {
        Loan storage loan = loans[_loanId];
        require(loan.isActive, "Préstamo no activo");
        require(!loan.isRepaid, "Préstamo ya pagado");
        require(msg.sender == loan.borrower, "No eres el prestatario");

        uint256 totalRepayment = calculateRepayment(_loanId);
        require(msg.value >= totalRepayment, "Monto insuficiente");

        loan.isRepaid = true;
        loan.isActive = false;

        // Transferir el NFT de vuelta al prestatario
        propertyNFT.transferFrom(address(this), loan.borrower, loan.propertyId);

        // Transferir el pago al prestamista
        payable(loan.lender).transfer(totalRepayment);

        // Devolver el excedente al prestatario si lo hay
        if (msg.value > totalRepayment) {
            payable(loan.borrower).transfer(msg.value - totalRepayment);
        }

        delete propertyToLoanId[loan.propertyId];
        emit LoanRepaid(_loanId);
    }

    // Calcular el monto total a repagar
    function calculateRepayment(uint256 _loanId) public view returns (uint256) {
        Loan storage loan = loans[_loanId];
        if (!loan.isActive) return 0;

        uint256 timeElapsed = block.timestamp - loan.startTime;
        uint256 interest = (loan.amount * loan.interestRate * timeElapsed) / (365 days * 10000);
        return loan.amount + interest;
    }

    // Liquidar un préstamo vencido
    function liquidateLoan(uint256 _loanId) external whenNotPaused nonReentrant {
        Loan storage loan = loans[_loanId];
        require(loan.isActive, "Préstamo no activo");
        require(!loan.isRepaid, "Préstamo ya pagado");
        require(block.timestamp > loan.startTime + loan.duration, "Préstamo no vencido");
        require(msg.sender == loan.lender, "No eres el prestamista");

        loan.isActive = false;
        loan.isRepaid = true;

        // Transferir el NFT al prestamista
        propertyNFT.transferFrom(address(this), loan.lender, loan.propertyId);

        delete propertyToLoanId[loan.propertyId];
        emit LoanDefaulted(_loanId);
        emit PropertySeized(loan.propertyId, loan.lender);
    }

    // Funciones administrativas
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    // Función de emergencia para recuperar NFTs en caso de problemas
    function emergencyWithdrawNFT(uint256 _propertyId) external onlyOwner {
        require(propertyToLoanId[_propertyId] != 0, "Propiedad no en préstamo");
        propertyNFT.transferFrom(address(this), owner(), _propertyId);
    }
} 