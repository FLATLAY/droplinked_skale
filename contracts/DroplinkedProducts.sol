// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract DroplinkedProducts is ERC1155, Ownable, ERC1155Burnable, ERC1155Supply {
    using Counters for Counters.Counter;

    struct Product {
        uint256 product_id;
        address OwnerID;
        uint256 quantity;
        bytes data;
    }

    Counters.Counter private _tokenIdCounter;
    string TokenURI;
    mapping (uint256 => string) public _tokenURIs;
    mapping (uint256 => Product) public _products;

    constructor(string memory _uri) ERC1155(_uri) {
        TokenURI = _uri;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount,string memory _uri, bytes memory data)
        public
    {
        _mint(account, id, amount, data);
        setTokenURI(id, _uri);
        Product memory product;
        product.OwnerID = account;
        product.product_id = id;
        product.data = data;
        storeProducts(product, id);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    function setTokenURI(uint256 tokenId, string memory _uri) public onlyOwner {
        _tokenURIs[tokenId] = _uri;
        emit URI(uri(tokenId), tokenId);
    }

    function storeProducts(Product memory product, uint256 _id) private {
        _products[_id] = product;
    }

    function getProduct(uint256 _productid) public view returns(Product memory products){
        return _products[_productid];
    }   

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

}