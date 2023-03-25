# Droplinked

This contract is a Solidity-based smart contract that utilizes the upgradeable contract feature of the Solidity language. It is designed to enable the management of NFT linked to products. 

## Prerequisites

To use this contract, you should have a working knowledge of the Solidity, and install the Hardhat framework to use it.

```shell
npm i -g hardhat or npx hardhat help
```

## Installation

To install the contract, you need to clone the repository and run it on a local blockchain network. 

```shell
npm i
```
and after that, to deploy you can use this command:
```shell
npx hardhat run scripts/deploy.ts
```

## Test
to test the contract you can use this command.

```shell
npx hardhat test --network local
```

## Usage

The contract enables the creation and management of NFT tokens linked to products. There are two counters in the contract that keep track of the list of requests and the NFTs approved. 

The contract has the following functions:

- `recordData`: Records the metadata related to an NFT token
- `setNFTContract`: Sets the address of the NFT contract
- `createPublishRequestForNFT`: Creates a request to publish an NFT token linked to a drop product
- `approvedNFTs`: Approves the requests to publish an NFT token, just the owner can approve the request.
