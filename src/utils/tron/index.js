import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import config from '../../config';

export default class MetamaskService {
  constructor({ networkFrom, contractDetails }) {
    this.name = 'tron';
    this.wallet = window.tronWeb;
    this.networkFrom = networkFrom;
    this.net = config.IS_PRODUCTION ? 'mainnet' : 'https://event.nileex.io';
    this.Web3Provider = new Web3(this.wallet);

    window.addEventListener('message', function (e) {
      if (e.data.message && e.data.message.action == 'setAccount') {
        localStorage.setItem('walletTypeOnReload', 'tron');
        window.location.reload();
      }
    });

    this.contractAddressToken = contractDetails.ADDRESS.TOKEN[networkFrom];
    this.contractAddressSwap = contractDetails.ADDRESS.SWAP[networkFrom];
    this.contractAbiToken = contractDetails.ABI.TOKEN[networkFrom];
    this.contractAbiSwap = contractDetails.ABI.SWAP[networkFrom];
    this.contractDecimals = contractDetails.DECIMALS.TOKEN[networkFrom];
  }

  getContractAddressToken() {
    return this.contractAddressToken;
  }

  async getAccount() {
    if (!this.wallet)
      return { errorMsg: `${this.name} wallet is not injected` };
    return new Promise((resolve, reject) => {
      if (!config.IS_PRODUCTION && this.wallet.eventServer.host !== this.net) {
        reject({
          errorMsg: 'Please choose nile testnet in TronLink wallet',
        });
      }
      resolve(this.wallet.defaultAddress);
    });
  }

  getContract(abi, address) {
    return this.wallet.contract(abi, address);
  }

  transferToOtherBlockchain = async ({
    userAddress,
    blockchain,
    amount,
    receiver,
    callback,
  }) => {
    try {
      await this.sendTronTx({
        method: 'transferToOtherBlockchain(uint128,uint256,string)',
        params: [
          {
            type: 'uint128',
            value: `0x${blockchain}`,
          },
          {
            type: 'uint256',
            value: new BigNumber(+amount)
              .times(Math.pow(10, this.contractDecimals))
              .toString(10),
          },
          {
            type: 'string',
            value: receiver,
          },
        ],
        walletAddr: userAddress,
        contractAddress: this.contractAddressSwap,
        callback,
      });
    } catch (err) {
      console.log();
    }
  };

  approveToken = async (walletAddress, tokenAddress, amount, callback) => {
    try {
      const contract = this.getContract(
        this.contractAbiToken,
        this.contractAddressToken,
      );

      await contract
        .approve(
          tokenAddress,
          new BigNumber(amount)
            .times(Math.pow(10, this.contractDecimals))
            .toString(10),
        )
        .send({
          from: walletAddress,
        });
      callback();
    } catch (err) {
      throw new Error('approve error', err);
    }
  };

  encodeFunctionCall(abi, data) {
    return this.Web3Provider.eth.abi.encodeFunctionCall(abi, data);
  }

  getMethodInterface(methodName, abi) {
    return abi.filter((m) => {
      return m.name === methodName;
    })[0];
  }

  async sendTronTx({
    method,
    params,
    walletAddr,
    options = {},
    contractAddress,
    callback,
  }) {
    try {
      const txObj = await this.wallet.transactionBuilder.triggerSmartContract(
        this.wallet.address.toHex(contractAddress),
        method,
        options,
        params,
        this.wallet.address.toHex(walletAddr),
      );

      const signedTransaction = await this.wallet.trx.sign(txObj.transaction);

      const broadcast = await this.wallet.trx.sendRawTransaction(
        signedTransaction,
      );
      console.log(broadcast);
      callback({ status: broadcast.result ? 'SUCCESS' : 'ERROR' });
    } catch (err) {
      console.log(err, 'sendTx');
      throw Error;
    }
  }
}
