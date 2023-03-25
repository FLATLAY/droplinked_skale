// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract DroplinkedProductsNFT is ERC1155, Ownable, ERC1155Burnable, ERC1155Supply {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    string TokenURI;
    mapping (uint256 => string) public _tokenURIs;
    mapping (uint256 => address) public _ownerTokens;

    constructor(string memory _uri) ERC1155(_uri) {
        TokenURI = _uri;
    }

    modifier onlyOwnerToken(uint256 _tokenID) {
        require(_ownerTokens[_tokenID] == msg.sender, "you can't set URI for this token id");
        _;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address account, uint256 amount,string memory _uri, bytes memory data)
        public
        returns(uint256 tokenID)
    {
        uint256 id = _tokenIdCounter.current();
        _mint(account, id, amount, data);
        _ownerTokens[id] = account;
        _setTokenURI(id, _uri);
        tokenID = id;
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    function _setTokenURI(uint256 tokenId, string memory _uri) internal {
        _tokenURIs[tokenId] = _uri;
        emit URI(uri(tokenId), tokenId);
    }

    function setTokenURI(uint256 _tokenID, string memory _uri) onlyOwnerToken(_tokenID) public {
        _setTokenURI(_tokenID, _uri);
    }

    function ownerOfToken(uint256 _tokenID, address _owner) public view returns(bool){
        return balanceOf(_owner, _tokenID) != 0;
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

}