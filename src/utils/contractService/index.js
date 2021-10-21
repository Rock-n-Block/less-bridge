import React from 'react';
import BigNumber from 'bignumber.js';
import config from '../../config';

export default class ContractService {
  constructor({ wallet, networkFrom, contractDetails }) {
    console.log('ContractService:', networkFrom, contractDetails);
    this.wallet = wallet;
    this.net = config.IS_PRODUCTION ? 'mainnet' : 'testnet';
    this.contractAddressToken = contractDetails.ADDRESS.TOKEN[networkFrom];
    this.contractAddressSwap = contractDetails.ADDRESS.SWAP[networkFrom];
    this.contractAbiToken = contractDetails.ABI.TOKEN[networkFrom];
    this.contractAbiSwap = contractDetails.ABI.SWAP[networkFrom];
    this.decimals = contractDetails.DECIMALS.TOKEN[networkFrom];
    if (networkFrom === 'Binance-Chain') return;
    this.contractToken = this.wallet.getContract(
      this.contractAbiToken,
      this.contractAddressToken,
    );
    this.contractSwap = this.wallet.getContract(
      this.contractAbiSwap,
      this.contractAddressSwap,
    );
  }

  balanceOf = async (address) => {
    // console.log('balanceOf',this.contractAddressToken,address,this.contractToken)
    try {
      const balance = await this.contractToken.methods
        .balanceOf(address)
        .call();
      return +new BigNumber(
        balance.balance ? parseInt(balance.balance._hex) : balance,
      )
        .dividedBy(new BigNumber(10).pow(this.decimals))
        .toFixed();
    } catch (error) {
      console.log(error, 'get balance');
    }
  };

  allowance = async (address) => {
    // console.log('allowance',address,this.contractAddressSwap)
    let allowance = await this.contractToken.methods
      .allowance(address, this.contractAddressSwap)
      .call();
    if (allowance._hex) {
      allowance = parseInt(allowance._hex);
    }
    return +new BigNumber(allowance)
      .dividedBy(new BigNumber(10).pow(this.decimals))
      .toString(10);
  };

  totalSupply = async () => {
    let totalSupply = await this.contractToken.methods.totalSupply().call();
    if (totalSupply._hex) {
      totalSupply = parseInt(totalSupply._hex);
    }
    return +new BigNumber(totalSupply)
      .dividedBy(new BigNumber(10).pow(this.decimals))
      .toString(10);
  };

  approveToken = async (address, callback) => {
    const totalSupply = await this.totalSupply();
    this.wallet.approveToken(
      address,
      this.contractAddressSwap,
      totalSupply,
      callback,
    );
  };

  transferFromBinanceChain = async ({
    userAddress,
    blockchain,
    amount,
    receiver,
  }) => {
    try {
      const data = `${blockchain}${receiver}`;
      return await this.wallet.sendPlainTx({
        addressFrom: userAddress,
        amount,
        data,
      });
    } catch (e) {
      console.error(e);
    }
  };

  transferToOtherBlockchain = async ({
    userAddress,
    blockchain,
    amount,
    receiver,
    callback,
  }) => {
    this.wallet.transferToOtherBlockchain({
      userAddress,
      blockchain,
      amount,
      receiver,
      callback,
    });
  };
}
