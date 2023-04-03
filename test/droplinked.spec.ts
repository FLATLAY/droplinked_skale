import { ethers } from 'hardhat';
import chai from 'chai';
import { Droplinked } from '../typechain-types/contracts/droplinked.sol';
import { DroplinkedProductsNFT } from '../typechain-types/contracts/DroplinkedProductsNFT';

const { expect } = chai;

describe('Droplinked', async () => {
  let droplinked: Droplinked;
  let droplinkedProductNFT: DroplinkedProductsNFT;
  const [producer, publisher] = await ethers.getSigners();
  const uri = "https://storage.droplinked.com"  

  beforeEach(async () => {
    const Droplinked = await ethers.getContractFactory('Droplinked');
    const DroplinkedNFT = await ethers.getContractFactory("DroplinkedProductsNFT");
    droplinked = await Droplinked.deploy();
    droplinkedProductNFT = await DroplinkedNFT.deploy(uri);
    await droplinked.deployed();
    await droplinkedProductNFT.deployed();

    const nftContract = droplinkedProductNFT.address;
    
    // set a nft contract to call another function on record Data
    await droplinked.setNFTContract(nftContract);

    // set record data to check on creating request
    const name = "test"
    const amount = 10;
    const price = 100000000;
    const tokenURI = 'https://example.com/nft';
    const data = '0x';
    await droplinked.recordData(name, price, amount, tokenURI, data);
  });

  it("should set a contract Address as NFT", async () => {
    const nftContract = droplinkedProductNFT.address;

    await droplinked.setNFTContract(nftContract);
    const currentContractNFT = await droplinked.NFTContract();

    expect(currentContractNFT).to.equal(nftContract);
  })
  

  it('should allow recording data', async () => {
    const name = "test"
    const amount = 10;
    const price = 100000000;
    const tokenURI = 'https://example.com/nft';
    const data = '0x';

    await droplinked.recordData(name, price,amount, tokenURI, data);

    const nftHolder = await droplinked.nftHolders(0);
    expect(nftHolder.remainingAmount).to.equal(amount);
    expect(nftHolder.amount).to.equal(amount);
    expect(nftHolder.tokenID).to.equal(0);
  });

  it('should allow creating publish request for NFT', async () => {
    const amount = 10;
    const nftOwner = producer.address;
    const percentage = 50;

    await droplinked.connect(publisher).createPublishRequestForNFT(amount, 0, nftOwner, percentage);

    const request = await droplinked.publishRequests(nftOwner, 0);
    expect(request.amount).to.equal(amount);
    expect(request.NFTOwner).to.equal(nftOwner);
    expect(request.publisher).to.equal(publisher.address);
    expect(request.tokenID).to.equal(0);
    expect(request.percentage).to.equal(percentage);
  });

  it('should allow approving NFTs', async () => {
    const amount = 10;
    const name = 'test';
    const nftOwner = producer.address;

    await droplinked.connect(publisher).createPublishRequestForNFT(amount, 0, nftOwner, 0);
    await droplinkedProductNFT.setApprovalForAll(droplinked.address, true);
    await droplinked.approvedNFTs(0, name);

    const approvedNFT = await droplinked.ApprovedNFTs(nftOwner, 0);
    const nft = await droplinkedProductNFT.connect(publisher).balanceOf(publisher.address, approvedNFT.tokenID);
    expect(nft).to.equal(amount);
    expect(approvedNFT.amount).to.equal(amount);
    expect(approvedNFT.NFTOwner).to.equal(nftOwner);
    expect(approvedNFT.publisher).to.equal(publisher.address);
    expect(approvedNFT.tokenID).to.equal(0);
    expect(approvedNFT.percentage).to.equal(0);
    expect(approvedNFT.name).to.equal(name);
  });
});
