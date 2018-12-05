const HDWalletProvider = require("truffle-hdwallet-provider");
const metaMaskMem =
  "sense frequent despair broom permit soup early purchase express struggle digital jelly";
const infuraKey = "f6426404cc6843a3b63abe4c1c53448f";
module.exports = {
  networks: {
    development: {
      host: "34.243.204.94",
      port: 30002,
      network_id: "2017",
      gas: 2500000
    }
  },
  mocha: {
    useColors: true,
    enableTimeouts: false
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
