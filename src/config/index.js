export default {
  IS_PRODUCTION: false,
  serverDomain() {
    return this.IS_PRODUCTION
      ? `https://bridge.less.xyz/api/v1`
      : `https://devless.mywish.io/api/v1`;
  },
  links: {
    twitter: 'https://twitter.com/LessToken',
    medium: 'https://less-token.medium.com/',
    telegram: 'https://t.me/lesstokenann',
    github: 'https://github.com/LESS-xyz/',
    reddit: '',
    discord: '',
    email: '',
    policy: '',
  },
  tokenLinks() {
    return {
      matic: this.IS_PRODUCTION
        ? 'https://explorer-mainnet.maticvigil.com/address/'
        : 'https://explorer-mumbai.maticvigil.com/address/',
      tron: this.IS_PRODUCTION
        ? 'https://tronscan.org/#/'
        : 'https://shasta.tronscan.org/#/',
      ethereum: this.IS_PRODUCTION
        ? 'https://etherscan.io'
        : 'https://kovan.etherscan.io',
      binanceSmartChain: this.IS_PRODUCTION
        ? 'https://bscscan.com'
        : 'https://testnet.bscscan.com',
      binanceChain: this.IS_PRODUCTION
        ? 'https://explorer.binance.org'
        : 'https://testnet-explorer.binance.org',
      fantom: this.IS_PRODUCTION
        ? 'https://ftmscan.com/'
        : 'https://testnet.ftmscan.com/',
      avalanche: this.IS_PRODUCTION
        ? 'https://cchain.explorer.avax.network/token/'
        : 'https://cchain.explorer.avax-test.network/token/',
    };
  },
  transactionLinks(address) {
    return {
      matic: this.IS_PRODUCTION
        ? 'https://polygonscan.com/tx/' + address
        : 'https://mumbai.polygonscan.com/tx/' + address,
      tron: this.IS_PRODUCTION
        ? 'https://tronscan.org/#/transaction/' + address
        : 'https://shasta.tronscan.org/#/transaction/' + address,
      ethereum: this.IS_PRODUCTION
        ? 'https://etherscan.io/tx/' + address
        : 'https://kovan.etherscan.io/tx/' + address,
      binanceSmartChain: this.IS_PRODUCTION
        ? 'https://bscscan.com/tx/' + address
        : 'https://testnet.bscscan.com/tx/' + address,
      binanceChain: this.IS_PRODUCTION
        ? 'https://explorer.binance.org/tx/' + address
        : 'https://testnet-explorer.binance.org/tx/' + address,
      fantom: this.IS_PRODUCTION
        ? 'https://ftmscan.com/tx/' + address
        : 'https://testnet.ftmscan.com/tx/' + address,
      avalanche: this.IS_PRODUCTION
        ? `https://cchain.explorer.avax.network/tx/${address}/internal-transactions`
        : `https://cchain.explorer.avax-test.network/tx/${address}/internal-transactions`,
    };
  },
  chainIds: {
    mainnet: {
      Ethereum: {
        name: 'Mainnet',
        id: [1, '0x1', '0x01'],
      },
      'Binance-Smart-Chain': {
        name: 'Binance smart chain',
        id: [56, '0x38'],
      },
      Matic: {
        name: 'Mumbai Mainnet',
        id: ['0x89'],
      },
      Tron: {
        name: 'TronLink',
        id: ['https://api.tronstack.io'],
      },
      Fantom: {
        name: 'Fantom',
        id: ['0xfa'],
      },
      Avalanche: {
        name: 'Avalanche',
        id: ['0xa86a'],
      },
    },
    testnet: {
      Ethereum: {
        name: 'Kovan testnet',
        id: [42, '0x2a'],
      },
      'Binance-Smart-Chain': {
        name: 'Binance smart chain testnet',
        id: [97, '0x61'],
      },
      Matic: {
        name: 'Mumbai Testnet',
        id: ['0x13881'],
      },
      Tron: {
        name: 'TronLink',
        id: ['https://event.nileex.io'],
      },
      Fantom: {
        name: 'Fantom',
        id: ['0xfa2'],
      },
      Avalanche: {
        name: 'Avalanche',
        id: ['0xa869'],
      },
    },
  },
};
