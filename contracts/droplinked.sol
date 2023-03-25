// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./DroplinkedProductsNFT.sol";
// This contract is upgradeable.
contract Droplinked is Initializable, Ownable {
    using Counters for Counters.Counter;

    // Here, we have two counters for list of requests and the NFTs approved.
    Counters.Counter private _publishRequestID;
    Counters.Counter private _approvedNFTID;

    address public NFTContract;

    struct ApprovedNFT {
        string name;
        uint256 amount;
        address NFTOwner;
        address publisher;
        uint256 tokenID;
        uint256 percentage;
    }

    struct publishRequest {
        uint256 amount;
        address NFTOwner;
        address publisher;
        uint256 tokenID;
        uint256 percentage;
    }

    struct NFTMetaData {
        uint256 tokenID;
        uint256 price;
        string name;
        string tokenURI;
    }

    struct NFTHolder {
        uint256 remainingAmount;
        uint256 amount;
        uint256 tokenID;
    }

    mapping(address => mapping(uint256 => ApprovedNFT)) public  ApprovedNFTs;
    mapping(address => mapping(uint256 => publishRequest)) public publishRequests;
    mapping(uint256 => NFTMetaData) public NFTMetaDatas;
    mapping(uint256 => NFTHolder) public nftHolders;

    event ApprovedNFTEvent(string name, uint256 amount, address indexed NFTOwner, address indexed publisher, uint256 indexed tokenID, uint256 percentage);
    event publishRequestEvent(uint256 amount, address indexed NFTOwner, address indexed publisher, uint256 indexed tokenID, uint256 percentage);
    event recordedEvent(uint256 amount, address indexed NFTOwner, uint256 indexed tokenID, string tokenURI);

    function initialize() public initializer {}

    function recordData(uint256 _amount, string memory _tokenURI, bytes memory _data) public {
        require(_amount > 0, "The amount can't be zero");
        (uint256 tokenID) = DroplinkedProductsNFT(NFTContract).mint(msg.sender, _amount, _tokenURI, _data);
        NFTHolder storage nftHolder = nftHolders[tokenID];
        nftHolder.amount = _amount;
        nftHolder.remainingAmount = _amount;
        nftHolder.tokenID = tokenID;
        emit recordedEvent(_amount, msg.sender, tokenID, _tokenURI);
    }

    function setNFTContract(address _contract) public onlyOwner {
        NFTContract = _contract;
    }

    function createPublishRequestForNFT(uint256 _amount,uint256 _tokenID, address _nftOwner, uint256 _percentage) public{
        require(_amount > 0, "The amount can't be zero");
        require(DroplinkedProductsNFT(NFTContract).ownerOfToken(_tokenID, _nftOwner), "the owner token is wrong");
        uint256 id = _publishRequestID.current();
        publishRequests[_nftOwner][id] = publishRequest(_amount, _nftOwner, msg.sender, _tokenID, _percentage);
        emit publishRequestEvent(_amount, _nftOwner, msg.sender, _tokenID, _percentage);
    }

    function approvedNFTs(uint256 _reqID,string memory _name) public{
        publishRequest memory request = publishRequests[msg.sender][_reqID];
        require(request.NFTOwner == msg.sender, "you can't accept this request");
        uint256 id = _approvedNFTID.current();
        ApprovedNFTs[msg.sender][id] = ApprovedNFT(_name,request.amount, msg.sender, request.publisher, request.tokenID, request.percentage);
        emit ApprovedNFTEvent(_name, request.amount, msg.sender, request.publisher, request.tokenID, request.percentage);
    }

}