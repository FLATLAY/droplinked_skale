import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import env from 'dotenv';
const { API_URL, PRIVATE_KEY } = process.env;

env.config();
const config: HardhatUserConfig = {
  solidity: "0.8.18",
  defaultNetwork: "testnet",
  networks: {
    skale: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    testnet: {
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};

export default config;
