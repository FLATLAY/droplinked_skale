import { HardhatUserConfig } from "hardhat/config";
require('@openzeppelin/hardhat-upgrades');
import "@nomicfoundation/hardhat-toolbox";
import env from 'dotenv';
env.config();
const { API_URL, PRIVATE_KEY, PRIVATE_KEY2, PRIVATE_KEY_SAKLE } = process.env;


const config: HardhatUserConfig = {
  solidity: "0.8.18",
  defaultNetwork: "local",
  networks: {
    skale_testnet: {
      url: API_URL,
      gas: "auto",
      gasPrice: "auto",
      accounts: [`0x${PRIVATE_KEY_SAKLE}`]
    },
    local: {
      url: "http://127.0.0.1:7545",
      gas: "auto",
      gasPrice: "auto",
      accounts: [`0x${PRIVATE_KEY}`, `0x${PRIVATE_KEY2}`]
    }
  }
};

export default config;
