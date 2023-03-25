import { ethers } from "hardhat";
import { Signer } from "ethers";
import { expect } from "chai";
import { DroplinkedProductsNFT } from '../typechain-types/contracts/DroplinkedProductsNFT';


describe("DroplinkedProductsNFT", async () => {
  let droplinkedProductsNFT: DroplinkedProductsNFT;

  const uri = "https://example.com";
  const tokenURI = "https://example.com/token";
  const [deployer] = await ethers.getSigners();

  beforeEach(async () => {
    const DroplinkedProductsNFT = await ethers.getContractFactory("DroplinkedProductsNFT");
    droplinkedProductsNFT = await DroplinkedProductsNFT.deploy(uri);

    await droplinkedProductsNFT.deployed();
  });

  it("should have set the URI correctly", async () => {
    expect(await droplinkedProductsNFT.uri(0)).to.equal(uri);
  });

  it("should mint a new token with the correct URI", async () => {
    await droplinkedProductsNFT.mint(deployer.address, 1, tokenURI, '0x');

    const balance = await droplinkedProductsNFT.balanceOf(deployer.address, 0);
    const owner = await droplinkedProductsNFT._ownerTokens(0);
    const getTokenURI = await droplinkedProductsNFT._tokenURIs(0);

    expect(balance.toString()).to.equal("1");
    expect(owner).to.equal(deployer.address);
    expect(getTokenURI).to.equal(tokenURI);
  });

  it("should update the URI correctly", async () => {
    await droplinkedProductsNFT.mint(deployer.address, 1, tokenURI, []);
    await droplinkedProductsNFT.setTokenURI(0, "https://example.com/new");
    
    const getTokenURI = await droplinkedProductsNFT._tokenURIs(0);

    expect(getTokenURI).to.equal("https://example.com/new");
  });
});
