import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import env from 'dotenv';
const { API_URL, PRIVATE_KEY } = process.env;

env.config();
const config: HardhatUserConfig = {
  solidity: "0.8.18",
  defaultNetwork: "testnet",
  networks: {

    testnet: {
      url: "http://127.0.0.1:8545",
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};

export default config;
