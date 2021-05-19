export default {
  IS_PRODUCTION: true,
  serverDomain() {
    return this.IS_PRODUCTION
      ? `https://swap.rubic.exchange/api/v1`
      : `https://swap.rubic.exchange/api/v1`;
  },
  links: {
    twitter: "https://twitter.com/LessToken",
    medium: "https://less-token.medium.com/",
    telegram: "https://t.me/lesstokenann",
    github: "https://github.com/lesstoken",
    reddit: "",
    discord: "",
    email: "",
    policy: "",
  },
  tokenLinks() {
    return {
      ethereum: this.IS_PRODUCTION
        ? "https://etherscan.io"
        : "https://kovan.etherscan.io",
      binanceSmartChain: this.IS_PRODUCTION
        ? "https://bscscan.com"
        : "https://testnet.bscscan.com",
      binanceChain: this.IS_PRODUCTION
        ? "https://explorer.binance.org"
        : "https://testnet-explorer.binance.org",
    };
  },
  chainIds: {
    mainnet: {
      Ethereum: {
        name: "Mainnet",
        id: [1, "0x1", "0x01"],
      },
      "Binance-Smart-Chain": {
        name: "Binance smart chain",
        id: [56, "0x38"],
      },
    },
    testnet: {
      Ethereum: {
        name: "Kovan testnet",
        id: [42, "0x2a"],
      },
      "Binance-Smart-Chain": {
        name: "Binance smart chain testnet",
        id: [97, "0x61"],
      },
    },
  },
};
