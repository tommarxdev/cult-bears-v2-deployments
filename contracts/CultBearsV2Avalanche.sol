// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import '@layerzerolabs/onft-evm/contracts/onft721/ONFT721.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/token/common/ERC2981.sol';
import '@openzeppelin/contracts/security/Pausable.sol';

contract CultBearsV2Avalanche is ONFT721, ReentrancyGuard, ERC2981, Pausable {
    using Strings for uint256;

    enum TokenRarityType {
        COMMON,
        RARE,
        ULTRA_RARE,
        LEGENDARY,
        MYTHIC
    }

    struct TokenIDRange {
        uint256 start;
        uint256 amount;
    }

    string public baseURI;
    string public fileExtension = '.json';
    uint256 public constant maxSupply = 2000;
    address public treasuryWallet;
    bool public isPublicMintAllowed = false;

    mapping(TokenRarityType => uint256) private privateSalePrice;
    mapping(TokenRarityType => uint256) public publicSalePrice;

    mapping(TokenRarityType => TokenIDRange) public tokenIDRange;
    mapping(TokenRarityType => uint16) public tokenIDCounter;

    mapping(address => bool) public ogWhitelist;
    mapping(address => bool) public bearlistedWhitelist;

    mapping(uint256 => bool) private airdropped;
    mapping(uint256 => bool) private mintedTokens;

    uint256 private totalMintedTokens;

    event Minted(address indexed to, uint256 tokenId);
    event TreasuryWalletChanged(address indexed oldWallet, address indexed newWallet);
    event PublicMintToggled(bool isPublicMintAllowed);
    event URIUpdated(string newBaseURI);
    event FileExtensionUpdated(string newExtension);
    event RoyaltySet(address indexed receiver, uint96 feeNumerator);
    event PrivateMintPriceUpdated(TokenRarityType rarity, uint256 newPrice);
    event PublicMintPriceUpdated(TokenRarityType rarity, uint256 newPrice);

    constructor(
        string memory _name,
        string memory _symbol,
        address _lzEndpoint,
        address _delegate,
        string memory initialBaseURI,
        address _initialTreasuryWallet
    ) ONFT721(_name, _symbol, _lzEndpoint, _delegate) {
        require(_initialTreasuryWallet != address(0), "Treasury wallet cannot be zero address");
        baseURI = initialBaseURI;
        treasuryWallet = _initialTreasuryWallet;
        _setDefaultRoyalty(treasuryWallet, 500);  // 5% royalty

        privateSalePrice[TokenRarityType.COMMON] = 78e18;
        privateSalePrice[TokenRarityType.RARE] = 155e18;
        privateSalePrice[TokenRarityType.ULTRA_RARE] = 310e18;
        privateSalePrice[TokenRarityType.LEGENDARY] = 620e18;
        privateSalePrice[TokenRarityType.MYTHIC] = 1240e18;

        publicSalePrice[TokenRarityType.COMMON] = 89e18;
        publicSalePrice[TokenRarityType.RARE] = 177e18;
        publicSalePrice[TokenRarityType.ULTRA_RARE] = 354e18;
        publicSalePrice[TokenRarityType.LEGENDARY] = 709e18;
        publicSalePrice[TokenRarityType.MYTHIC] = 1417e18;

        tokenIDRange[TokenRarityType.MYTHIC] = TokenIDRange(1, 2);
        tokenIDRange[TokenRarityType.LEGENDARY] = TokenIDRange(3, 13);
        tokenIDRange[TokenRarityType.ULTRA_RARE] = TokenIDRange(16, 25);
        tokenIDRange[TokenRarityType.RARE] = TokenIDRange(41, 50);
        tokenIDRange[TokenRarityType.COMMON] = TokenIDRange(91, 910);
    }

    fallback() external payable {}

    receive() external payable {}

    function _exists(uint256 tokenId) internal view virtual whenNotPaused returns (bool) {
        return mintedTokens[tokenId] || (tokenId > 1000); 
    }

    function tokenURI(uint256 tokenId) public view override whenNotPaused returns (string memory) {
        require(tokenId > 0 && tokenId <= 2000, "Token ID out of range");
        return string(abi.encodePacked(baseURI, "cult-bear-", tokenId.toString(), fileExtension));
    }

    function getRarity(uint256 tokenId) public pure returns (TokenRarityType) {
        require(tokenId > 0 && tokenId <= 2000, "Token ID out of range");

        if (tokenId <= 2 || (tokenId >= 1001 && tokenId <= 1002)) return TokenRarityType.MYTHIC;
        if ((tokenId >= 3 && tokenId <= 15) || (tokenId >= 1003 && tokenId <= 1015)) return TokenRarityType.LEGENDARY;
        if ((tokenId >= 16 && tokenId <= 40) || (tokenId >= 1016 && tokenId <= 1040)) return TokenRarityType.ULTRA_RARE;
        if ((tokenId >= 41 && tokenId <= 90) || (tokenId >= 1041 && tokenId <= 1090)) return TokenRarityType.RARE;
        return TokenRarityType.COMMON;
    }

    function setFileExtension(string memory extension) external onlyOwner whenNotPaused {
        require(bytes(extension).length > 0, "File extension cannot be empty");
        fileExtension = extension;
        emit FileExtensionUpdated(extension);
    }

    function togglePublicMint() external onlyOwner whenNotPaused {
        isPublicMintAllowed = !isPublicMintAllowed;
        emit PublicMintToggled(isPublicMintAllowed);
    }

    function setPrivateMintPrice(TokenRarityType rarity, uint256 price) external onlyOwner whenNotPaused {
        privateSalePrice[rarity] = price;
        emit PrivateMintPriceUpdated(rarity, price);
    }

    function setPublicMintPrice(TokenRarityType rarity, uint256 price) external onlyOwner whenNotPaused {
        publicSalePrice[rarity] = price;
        emit PublicMintPriceUpdated(rarity, price);
    }

    function getPrice(TokenRarityType rarityType) external view returns (uint256) {
        return isPublicMintAllowed ? publicSalePrice[rarityType] : privateSalePrice[rarityType];
    }

    function setTokenRoyalty(uint256 tokenId, address receiver, uint96 feeNumerator) external onlyOwner whenNotPaused {
        _setTokenRoyalty(tokenId, receiver, feeNumerator);
        emit RoyaltySet(receiver, feeNumerator);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC2981) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function mintMultiple(uint256 mintAmount, TokenRarityType rarity) external payable nonReentrant whenNotPaused {
        require(mintAmount > 0 && mintAmount <= 20, "Invalid mint amount");
        if (!isPublicMintAllowed) {
            require(mintAmount == 1, "Private sale can only mint one token at a time");
            require(ogWhitelist[msg.sender] || bearlistedWhitelist[msg.sender], "Not whitelisted for private sale");
        }

        uint256 pricePerToken = isPublicMintAllowed ? publicSalePrice[rarity] : privateSalePrice[rarity];
        uint256 totalPrice = pricePerToken * mintAmount;
        require(msg.value >= totalPrice, "Insufficient payment");

        uint256 mintedCount = 0;
        uint256 tokenIDToBeMinted = tokenIDRange[rarity].start + tokenIDCounter[rarity];
        uint256 rarityEnd = tokenIDRange[rarity].start + tokenIDRange[rarity].amount;

        while (mintedCount < mintAmount && tokenIDToBeMinted < rarityEnd) {
            while (airdropped[tokenIDToBeMinted] || mintedTokens[tokenIDToBeMinted]) {
                tokenIDToBeMinted++;
                if (tokenIDToBeMinted >= rarityEnd) break;
            }

            if (tokenIDToBeMinted >= rarityEnd) {
                break;
            }

            _safeMint(msg.sender, tokenIDToBeMinted);
            mintedTokens[tokenIDToBeMinted] = true;
            emit Minted(msg.sender, tokenIDToBeMinted);
            mintedCount++;
            unchecked {
                tokenIDCounter[rarity]++;
                totalMintedTokens++;
            }
            require(totalMintedTokens <= (maxSupply / 2), "Exceeds chain's max initial supply");
        }

        require(mintedCount == mintAmount, "Minting could not be completed for the requested amount");
    }

    function airdrop(address to, uint256 tokenID) external onlyOwner whenNotPaused {
        require(!mintedTokens[tokenID], "Token ID already minted");
        require(totalMintedTokens + 1 <= (maxSupply / 2), "Exceeds chain's max initial supply");
        require(_isValidTokenID(tokenID), "Invalid token ID");

        _safeMint(to, tokenID);
        airdropped[tokenID] = true;
        mintedTokens[tokenID] = true;
        totalMintedTokens++;
        emit Minted(to, tokenID);
    }

    function airdropMultiple(address to, uint256[] memory tokenIDs) external onlyOwner whenNotPaused {
        uint256 length = tokenIDs.length;
        require(totalMintedTokens + length <= (maxSupply / 2), "Exceeds chain's max initial supply");

        for (uint256 i = 0; i < length; i++) {
            uint256 tokenID = tokenIDs[i];
            require(!mintedTokens[tokenID], "Token ID already minted");
            require(_isValidTokenID(tokenID), "Invalid token ID");

            _safeMint(to, tokenID);
            airdropped[tokenID] = true;
            mintedTokens[tokenID] = true;
            totalMintedTokens++;
            emit Minted(to, tokenID);
        }
    }

    function withdraw() public onlyOwner nonReentrant whenNotPaused {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");

        uint256 ownerShare = (balance * 30) / 100;
        uint256 treasuryShare = balance - ownerShare;

        payable(treasuryWallet).transfer(treasuryShare);
        payable(owner()).transfer(ownerShare);
    }

    function changeTreasuryWallet(address _treasuryWallet) public onlyOwner whenNotPaused {
        require(_treasuryWallet != address(0), "New treasury wallet cannot be zero address");
        emit TreasuryWalletChanged(treasuryWallet, _treasuryWallet);
        treasuryWallet = _treasuryWallet;
    }

    function _isValidTokenID(uint256 tokenID) internal view whenNotPaused returns (bool) {
        for (uint8 i = 0; i <= uint8(TokenRarityType.MYTHIC); i++) {
            TokenIDRange memory range = tokenIDRange[TokenRarityType(i)];
            if (tokenID >= range.start && tokenID < range.start + range.amount) {
                return true;
            }
        }
        return false;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
