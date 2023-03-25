import { ethers } from "hardhat";

async function main() {

  const droplinkedProductsNFT = await ethers.getContractFactory("DroplinkedProductsNFT");
  const droplinked = await ethers.getContractFactory("Droplinked");
  const deployNFT = await droplinkedProductsNFT.deploy("https://storage.droplinked.com"); // the link is for test 
  const deployDroplinked = await droplinked.deploy();
  // it sets the contract address NFT
  await deployDroplinked.setNFTContract(deployNFT.address);
  const txHashDroplinkedNFT = deployNFT.deployTransaction.hash; 
  const txHashDroplinked = deployDroplinked.deployTransaction.hash; 

  console.log(
    `the contract deployed with ${deployNFT.address} and txhash => ${txHashDroplinkedNFT} successfully.`
  );
  console.log(
    `the contract deployed with ${deployDroplinked.address} and txhash => ${txHashDroplinked} successfully.`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
