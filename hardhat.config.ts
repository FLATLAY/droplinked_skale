import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import env from 'dotenv';
const { API_URL, PRIVATE_KEY } = process.env;

env.config();
console.log("PRIVATE_KEY", PRIVATE_KEY)
const config: HardhatUserConfig = {
  solidity: "0.8.18",
  defaultNetwork: "testnet",
  networks: {
    skale: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    testnet: {
      url: "http://127.0.0.1:8545",
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};

export default config;
