# NFTMatch
Find the most similar NFTs. Discover price and predict market pricing with DeFi primitives.

##  Getting started

```bash
// To run a local node:

cd protocol

npm i

npx hardhat node (will run npx hardhat compile)

// To deploy the contract on the localhost

open an other terminal (and keep the local node running in another one):

cd protocol

npx hardhat deploy --network localhost (thanks to hardhat-deploy)

npx hardhat console --network localhost

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const contract = await ethers.getContractAt("NFTFinder", contractAddress);

// verifying the contract address
console.log(contract.address) //0x5FbDB2315678afecb367f032d93F642f64180aa3
```

## Note for vscode:

Be sure to set your settings.json with those values (or @openzeppelin imports will break in contracts - see https://stackoverflow.com/questions/69453481/visual-code-studio-file-import-callback-not-supported-file-source-not-found):

![](https://i.stack.imgur.com/7UsUi.png)

