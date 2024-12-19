// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import '@layerzerolabs/onft-evm/contracts/onft721/ONFT721.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/token/common/ERC2981.sol';
import '@openzeppelin/contracts/security/Pausable.sol';

contract CultBearsV2 is ONFT721, ERC2981, Pausable {
    using Strings for uint256;

    enum TokenRarityType { 
        COMMON, 
        RARE, 
        ULTRA_RARE, 
        LEGENDARY, 
        MYTHIC 
    }

    string public baseURI;
    string public fileExtension = '.json';
    uint256 public constant maxSupply = 2000;

    event URIUpdated(string newBaseURI);
    event FileExtensionUpdated(string newExtension);
    event RoyaltySet(address indexed receiver, uint96 feeNumerator);

    constructor(
        string memory _name,
        string memory _symbol,
        address _lzEndpoint,
        address _delegate,
        string memory initialBaseURI
    ) ONFT721(_name, _symbol, _lzEndpoint, _delegate) {
        baseURI = initialBaseURI;
        _setDefaultRoyalty(msg.sender, 500); // 5% default royalty
    }

    function setFileExtension(string memory extension) external onlyOwner whenNotPaused {
        require(bytes(extension).length > 0, "File extension cannot be empty");
        fileExtension = extension;
        emit FileExtensionUpdated(extension);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_existsToken(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return string(abi.encodePacked(baseURI, "cult-bear-", tokenId.toString(), fileExtension));
    }

    function _existsToken(uint256 tokenId) internal view returns (bool) {
        try this.ownerOf(tokenId) returns (address owner) {
            return owner != address(0);
        } catch {
            return false;
        }
    }

    function getRarity(uint256 tokenId) public pure returns (TokenRarityType) {
        require(tokenId > 0 && tokenId <= 2000, "Token ID out of range");

        if (tokenId <= 2 || (tokenId >= 1001 && tokenId <= 1002)) return TokenRarityType.MYTHIC;
        if ((tokenId >= 3 && tokenId <= 15) || (tokenId >= 1003 && tokenId <= 1015)) return TokenRarityType.LEGENDARY;
        if ((tokenId >= 16 && tokenId <= 40) || (tokenId >= 1016 && tokenId <= 1040)) return TokenRarityType.ULTRA_RARE;
        if ((tokenId >= 41 && tokenId <= 90) || (tokenId >= 1041 && tokenId <= 1090)) return TokenRarityType.RARE;
        return TokenRarityType.COMMON;
    }

    function setTokenRoyalty(uint256 tokenId, address receiver, uint96 feeNumerator) external onlyOwner whenNotPaused {
        _setTokenRoyalty(tokenId, receiver, feeNumerator);
        emit RoyaltySet(receiver, feeNumerator);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC2981) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}