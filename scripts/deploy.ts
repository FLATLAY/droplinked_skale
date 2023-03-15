import { ethers } from "hardhat";

async function main() {

  const droplinkedProducts = await ethers.getContractFactory("DroplinkedProducts");
  const deploy = await droplinkedProducts.deploy("https://storage.droplinked.com");
  const txHash = deploy.deployTransaction.hash; 

  console.log(
    `the contract deployed with ${deploy.address} and txhash => ${txHash} successfully.`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
