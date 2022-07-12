import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "@typechain/hardhat";
import "hardhat-deploy";
import "./tasks";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const {
  ALCHEMY_API_KEY_KOVAN,
  ALCHEMY_API_KEY_RINKEBY,
  PRIVATE_KEY,
  ETHERSCAN_API_KEY,
  ALCHEMY_API_KEY_MAINNET,
} = process.env;

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.7" }, { version: "0.6.6" }],
  },
  networks: {
    // kovan: {
    //   url: `https://eth-kovan.alchemyapi.io/v2/${ALCHEMY_API_KEY_KOVAN}`,
    //   accounts: [`0x${PRIVATE_KEY}`],
    // },
    // rinkeby: {
    //   url: `https://eth-kovan.alchemyapi.io/v2/${ALCHEMY_API_KEY_RINKEBY}`,
    //   accounts: [`0x${PRIVATE_KEY}`],
    // },
    // hardhat: {
    //   forking: {
    //     url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY_MAINNET}`,
    //   },
    // },
    localhost: {
      chainId: 31337,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
      // 1: 0,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;
