# Droplinked-Skale

## Introduction
Droplinked-Skale is a protocol for registering products on the Skale blockchain and allowing 3rd party publishers to sell these products across different marketplaces, dapps, and websites, earning a commission in the process. Our platform also includes headless tooling for NFT gated store fronts on droplinked.com and other value-added NFT solutions.

Droplinked-Skale implements base functionalities of the ERC-1155 standard for Semi-Fungible Tokens (SFT). This contract allows producers to mint a base token (which contains the ID) and hold that ID alongside the number of tokens that a particular account owns. This way, we only store a single token ID (which represents the product) and a single number (which represents how many of these token IDs a person owns) for each particular account.

On Droplinked-Skale, a publisher can send a publish request to the producer with a predefined commission amount. The producer can accept or reject requests, and if a request is accepted, the publisher is then given the ability to publish the product, share it with consumers, and earn their entitled settlement portion.

## Contract Entities
Here we'll discuss the entities used:

NFTMetadata: This entity holds the metadata of a non-fungible token. It has a name, price, tokenID, tokenURI, and localization data.

NFTHolder: This struct holds the token ID and its amount for a specific account. Remaining_amount is the amount left, which is not published for a publisher.

NFTPublishRequest: This struct holds the request of a publisher to a producer to publish a token. It has an  amount, publisher address, producer address, and commission. This struct will be saved in a dictionary that maps a request ID to a PublishRequest.

NFTApproved: This struct holds the data of the approved tokens (for publishers). It has an amount, NFTowner and publisher account address, the token_id, and the amount of percentage. After approving a PublishRequest by a producer, it will be saved in a dictionary that maps every approved ID to this object.

## Methods
Here we explain each method within the contract and how they are used (some of the methods' functionalities will be updated, and other methods will be added):

- `recordData`: Records the metadata related to an NFT token
- `setNFTContract`: Sets the address of the NFT contract
- `createPublishRequestForNFT`: Creates a request to publish an NFT token linked to a drop product
- `approvedNFTs`: Approves the requests to publish an NFT token, just the owner can approve the request.

## Project Features
NFT Gating System
Producers can set a set of rules in order to sell their tokens. They can limit the buyers to accounts which have bought several other tokens by the producer (gating), or they can provide tiered discounts.

These rules (ruleset) are deployed on droplinked.com before the customer purchases the token.

## NFT Storefront
Droplinked.com provides a storefront in which the producers can upload their NFTs and set their prices and rulesets, while customers can explore the NFTs and buy them. These NFTs represent both digital and physical goods.

## Prerequisites

To use this contract, you should have a working knowledge of the Solidity, and install the Hardhat framework to use it.

- ganach, if you want to use it on local
- hardhat, to deploy and compile the codes

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

