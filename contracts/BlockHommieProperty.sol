// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract BlockHommieProperty is ERC721, Ownable, Pausable, ReentrancyGuard {
    using Strings for uint256;

    uint256 public nextTokenId;
    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => uint256) public prices; // Precio de listado (en wei)
    mapping(uint256 => bool) public isForSale;  // Si está listado para la venta

    // Eventos - sin Paused y Unpaused (heredados)
    event PropertyMinted(address indexed owner, uint256 indexed tokenId, string uri);
    event PropertyBurned(uint256 indexed tokenId);
    event PropertyListed(uint256 indexed tokenId, address indexed owner, uint256 price);
    event PropertyUnlisted(uint256 indexed tokenId);
    event PropertySold(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price);

    constructor() ERC721("BlockHommie Property", "BHP") {}

    // --- Funciones de Minting y Burning ---

    // Ahora cualquiera puede mintear, se asigna a msg.sender
    function mintProperty(string memory uri) external whenNotPaused nonReentrant returns (uint256) {
        uint256 tokenId = nextTokenId;
        address owner = msg.sender; // El minter es el dueño inicial
        _safeMint(owner, tokenId);
        _setTokenURI(tokenId, uri);
        emit PropertyMinted(owner, tokenId, uri);
        nextTokenId++;
        return tokenId;
    }

    // Quemar sigue siendo solo para el Owner del contrato
    function burnProperty(uint256 tokenId) external onlyOwner whenNotPaused nonReentrant {
        address owner = ownerOf(tokenId); // Verificar existencia antes de obtener owner
        require(owner != address(0), "Token does not exist or already burned");
        _burn(tokenId);
        delete _tokenURIs[tokenId];
        delete prices[tokenId];     // Limpiar datos asociados
        delete isForSale[tokenId];  // Limpiar datos asociados
        emit PropertyBurned(tokenId);
    }

    // --- Funciones de Marketplace ---

    function listProperty(uint256 tokenId, uint256 price) external whenNotPaused nonReentrant {
        address owner = ownerOf(tokenId);
        require(msg.sender == owner, "Only owner can list");
        require(price > 0, "Price must be greater than zero");

        prices[tokenId] = price;
        isForSale[tokenId] = true;
        emit PropertyListed(tokenId, owner, price);
    }

    function unlistProperty(uint256 tokenId) external whenNotPaused nonReentrant {
        address owner = ownerOf(tokenId);
        require(msg.sender == owner, "Only owner can unlist");
        require(isForSale[tokenId], "Property not listed for sale");

        isForSale[tokenId] = false;
        delete prices[tokenId]; // Opcional: limpiar precio al deslistar
        emit PropertyUnlisted(tokenId);
    }

    function buyProperty(uint256 tokenId) external payable whenNotPaused nonReentrant {
        require(isForSale[tokenId], "Property not listed for sale");
        uint256 price = prices[tokenId];
        address seller = ownerOf(tokenId);

        require(price > 0, "Price not set"); // Doble check
        require(msg.value == price, "Incorrect payment amount");
        require(msg.sender != seller, "Cannot buy your own property");

        // Transferir pago al vendedor
        (bool success, ) = seller.call{value: msg.value}("");
        require(success, "Payment transfer failed");

        // Transferir NFT al comprador
        isForSale[tokenId] = false; // Marcar como no en venta ANTES de transferir
        delete prices[tokenId];
        _safeTransfer(seller, msg.sender, tokenId, ""); // Usar _safeTransfer

        emit PropertySold(tokenId, seller, msg.sender, price);
    }

    // Función para deslistar al transferir manualmente (alternativa a _beforeTokenTransfer)
    function transferFrom(address from, address to, uint256 tokenId) public override {
        // Si está en venta y se transfiere, lo deslista
        if (isForSale[tokenId]) {
            isForSale[tokenId] = false;
            delete prices[tokenId];
            emit PropertyUnlisted(tokenId);
        }
        
        // Llamar a la implementación original
        super.transferFrom(from, to, tokenId);
    }

    // Lo mismo para safeTransferFrom
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public override {
        // Si está en venta y se transfiere, lo deslista
        if (isForSale[tokenId]) {
            isForSale[tokenId] = false;
            delete prices[tokenId];
            emit PropertyUnlisted(tokenId);
        }
        
        // Llamar a la implementación original
        super.safeTransferFrom(from, to, tokenId, data);
    }

    // --- Funciones de URI ---

    function _setTokenURI(uint256 tokenId, string memory uri) internal {
        require(_exists(tokenId), "ERC721Metadata: URI set for nonexistent token");
        _tokenURIs[tokenId] = uri;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        string memory uri = _tokenURIs[tokenId];
        return uri;
    }

    // --- Funciones de Pausa ---

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    // Ya no usamos _beforeTokenTransfer para evitar problemas de compatibilidad
    // En su lugar, sobrecargamos transferFrom y safeTransferFrom directamente
} 