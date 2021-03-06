import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';
import Dropdown from '../Dropdown';
import Input from '../Input';
import { ReactComponent as IconArrowWhite } from '../../assets/icons/arrow-right-white.svg';
import { ReactComponent as IconError } from '../../assets/icons/error.svg';
import { ReactComponent as IconInfo } from '../../assets/icons/info.svg';
import { ReactComponent as IconLink } from '../../assets/icons/link.svg';
import { ReactComponent as IconMetamask } from '../../assets/icons/wallets/metamask.svg';
import { ReactComponent as IconBinance } from '../../assets/icons/wallets/binance.svg';
import { ReactComponent as IconTronLink } from '../../assets/icons/wallets/tronlink.svg';
import config from '../../config';
import {
  userActions,
  modalActions,
  walletActions,
  formActions,
} from '../../redux/actions';
import { useContractContext } from '../../contexts/contractContext';
import {
  BackendService,
  setToStorage,
  getTokenSymbol,
  getTokenLink,
} from '../../utils';
import Web3 from 'web3';
const web3 = new Web3(window.ethereum);
const backendService = new BackendService();

const networksMetamask = [
  {
    id: 2,
    key: 'Ethereum',
    text: 'Ethereum',
    image: require('../../assets/icons/crypto/eth-circle.svg').default,
  },
  {
    id: 1,
    key: 'Binance-Smart-Chain',
    text: 'Binance-Smart-Chain',
    image: require('../../assets/icons/crypto/bnb-circle.svg').default,
  },
  {
    id: 3,
    key: 'Matic',
    text: 'Polygon',
    image: require('../../assets/icons/crypto/polygon.svg').default,
  },
  {
    id: 4,
    key: 'Tron',
    text: 'Tron',
    image: require('../../assets/icons/crypto/tron.svg').default,
  },
  {
    id: 8,
    key: 'Fantom',
    text: 'Fantom',
    image: require('../../assets/icons/crypto/fantom.svg').default,
  },
  {
    id: 7,
    key: 'Avalanche',
    text: 'Avalanche',
    image: require('../../assets/icons/crypto/avalanche.svg').default,
  },
];

const networksMetamaskFrom = [
  {
    id: 2,
    key: 'Ethereum',
    text: 'Ethereum',
    image: require('../../assets/icons/crypto/eth-circle.svg').default,
  },
  {
    id: 1,
    key: 'Binance-Smart-Chain',
    text: 'Binance-Smart-Chain',
    image: require('../../assets/icons/crypto/bnb-circle.svg').default,
  },
  {
    id: 3,
    key: 'Matic',
    text: 'Polygon',
    image: require('../../assets/icons/crypto/polygon.svg').default,
  },
  {
    id: 4,
    key: 'Tron',
    text: 'Tron',
    image: require('../../assets/icons/crypto/tron.svg').default,
  },
  {
    id: 8,
    key: 'Fantom',
    text: 'Fantom',
    image: require('../../assets/icons/crypto/fantom.svg').default,
  },
  {
    id: 7,
    key: 'Avalanche',
    text: 'Avalanche',
    image: require('../../assets/icons/crypto/avalanche.svg').default,
  },
];

const networksMetamaskTo = [
  {
    id: 2,
    key: 'Ethereum',
    text: 'Ethereum',
    image: require('../../assets/icons/crypto/eth-circle.svg').default,
  },
  {
    id: 1,
    key: 'Binance-Smart-Chain',
    text: 'Binance-Smart-Chain',
    image: require('../../assets/icons/crypto/bnb-circle.svg').default,
  },
  {
    id: 3,
    key: 'Matic',
    text: 'Matic',
    image: require('../../assets/icons/crypto/bnb-circle.svg').default,
  },
  {
    id: 4,
    key: 'Tron',
    text: 'Tron',
    image: require('../../assets/icons/crypto/tron.svg').default,
  },
  {
    id: 8,
    key: 'Fantom',
    text: 'Fantom',
    image: require('../../assets/icons/crypto/fantom.svg').default,
  },
  {
    id: 7,
    key: 'Avalanche',
    text: 'Avalanche',
    image: require('../../assets/icons/crypto/avalanche.svg').default,
  },
];

function Form() {
  const { walletService, contractService } = useContractContext();

  const dispatch = useDispatch();
  const { address: userAddress } = useSelector(({ user }) => user);
  const form = useSelector(({ form }) => form);
  const wallet = useSelector(({ wallet }) => wallet);
  const { dex } = useSelector(({ wallet }) => wallet);

  const [networks, setNetworks] = React.useState(networksMetamask);
  const [networksFrom, setNetworksFrom] = React.useState(networksMetamaskFrom);
  const [networksTo, setNetworksTo] = React.useState(networksMetamaskTo);
  const [networkFrom, setNetworkFrom] = React.useState(wallet.networkFrom);
  const [networkTo, setNetworkTo] = React.useState('Binance-Smart-Chain');
  const [amount, setAmount] = React.useState('0');
  const [receive, setReceive] = React.useState('0');
  const [receiver, setReceiver] = React.useState('');
  const [fee, setFee] = React.useState(0);
  const [tokenAddressFrom, setTokenAddressFrom] = React.useState();
  const [tokenAddressTo, setTokenAddressTo] = React.useState();
  const [approved, setApproved] = React.useState(false);
  const [approving, setApproving] = React.useState(false);
  const [waiting, setWaiting] = React.useState(false);
  const [minimumAmount, setMinimumAmount] = React.useState(0);

  const isNetworkFromBinanceChain = networkFrom === 'Binance-Chain';
  const isNetworkFromBinanceSmartChain = networkFrom === 'Binance-Smart-Chain';
  const isNetworkFromEthereum = networkFrom === 'Ethereum';
  const isNetworkToBinanceChain = networkTo === 'Binance-Chain';
  const isNetworkToBinanceSmartChain = networkTo === 'Binance-Smart-Chain';
  const isNetworkToEthereum = networkTo === 'Ethereum';

  const toggleModal = ({ isOpen, text, header }) =>
    dispatch(modalActions.toggleModal({ isOpen, text, header }));
  const showFormError = (data) => dispatch(formActions.showFormError(data));

  const getMinimumAmount = () => {
    try {
      const minimumAmount = dex.filter(
        (token) => token.network === networkFrom,
      )[0].min_amount;
      setMinimumAmount(minimumAmount);
      return minimumAmount;
    } catch (e) {
      console.error(e);
    }
  };

  const getFee = () => {
    try {
      const network = networks.filter((item) => item.key === networkTo)[0];
      const networkName = network && network.key;
      const token =
        dex && dex.filter((item) => item.network === networkName)[0];
      const fee = dex ? token && token.fee : 0;
      setFee(fee);
      return fee;
    } catch (e) {
      console.error(e);
      toggleModal({ isOpen: true, text: 'Server is offline' });
    }
  };

  const getAddresses = () => {
    try {
      if (!dex) return;
      const dexFrom = dex.filter((item) => item.network === networkFrom)[0];
      const dexTo = dex.filter((item) => item.network === networkTo)[0];
      // console.log('getAddresses',dexFrom,dexTo)
      setTokenAddressFrom(dexFrom.token_address);
      setTokenAddressTo(dexTo.token_address);
    } catch (e) {
      console.error(e);
      toggleModal({ isOpen: true, text: 'Server is offline' });
    }
  };

  const handleChangeAmount = (value) => {
    try {
      showFormError({ amount: null });
      let newValue = value;
      if (+newValue < 0) newValue = '0';
      if (
        newValue.length > 1 &&
        Number(newValue) >= 1 &&
        newValue.slice(0, 1)[0] === '0'
      )
        newValue = newValue.slice(1);
      newValue = String(newValue).replace(',', '.');
      // get swap address
      if (!dex) newValue = '0';
      const network = networks.filter((item) => item.key === networkFrom)[0];
      const networkName = network && network.key;
      const token =
        dex && dex.filter((item) => item.network === networkName)[0];
      // console.log(networks,networkFrom,networkName,wallet,dex)
      if (!token) return setReceive('0');
      const fee = getFee();
      let newReceive = +newValue - fee;
      if (newReceive < 0) newReceive = '0';
      if (isNaN(newReceive)) newReceive = '0';
      setReceive(newReceive);
      setAmount(newValue);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendMax = async () => {
    try {
      // console.log('handleSendMax')
      const balance = await contractService.balanceOf(userAddress);
      // console.log(balance)
      handleChangeAmount(balance);
    } catch (e) {
      console.error(e);
    }
  };

  const handleFocusAmount = (e) => {
    let newValue = e.target.value;
    if (newValue === '0') {
      setAmount('');
    }
  };

  const handleChangeNetworkFrom = (e) => {
    try {
      dispatch(walletActions.setWalletType(null));
      dispatch(userActions.setUserData({ address: null }));
      setNetworkFrom(e);
      setToStorage('defaultNetworkFrom', e);
      dispatch(walletActions.setWalletNetFrom(e));
    } catch (e) {
      console.error(e);
    }
  };

  const getNetworksTo = () => {
    const networksTo = networks.filter((item) => item.key !== networkFrom);
    setNetworksTo(networksTo);
    if (networkFrom === networkTo) handleChangeNetworkTo(null);
    if (networkFrom === 'Ethereum')
      handleChangeNetworkTo('Binance-Smart-Chain');
    if (networkFrom === 'Binance-Smart-Chain')
      handleChangeNetworkTo('Ethereum');
  };

  const handleChangeNetworkTo = (e) => {
    try {
      showFormError({ receiver: null });
      setNetworkTo(e);
    } catch (e) {
      console.error(e);
    }
  };

  const checkGas = async (swap) => {
    try {
      const resultGetGas = await backendService.getGas({ network: networkTo });
      const gas = resultGetGas.data;
      console.log('resultGetGas', gas);
      if (gas && gas.status !== 'OK') {
        toggleModal({
          isOpen: true,
          text: (
            <div>
              <div className="modal-gas-text">
                <div>
                  Gas price in the {networkTo.split('-').join(' ')} network is
                  too high.
                </div>
                <div>The swap can take longer than usual.</div>
              </div>
              <div className="modal-gas-buttons">
                <div className="button mh10 mt20" onClick={cancelSwap}>
                  Close
                </div>
                <div className="button mh10 mt20" onClick={swap}>
                  Proceed
                </div>
              </div>
            </div>
          ),
        });
        return false;
      } else {
        return true;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const checkFields = async ({ txType }) => {
    try {
      if (txType === 'approve') return true;
      const balance = await contractService.balanceOf(userAddress);
      const isAmountNaN = isNaN(+amount);
      const isAmountLessThanMinimum = amount < minimumAmount;
      const isBalanceLessThanAmount = +balance < amount;
      if (isAmountNaN)
        showFormError({ amount: { text: `Amount is not valid` } });
      if (isBalanceLessThanAmount)
        showFormError({ amount: { text: `Insufficient balance: ${balance}` } });
      if (isAmountLessThanMinimum)
        showFormError({ amount: { text: `Minimum amount: ${minimumAmount}` } });
      if (isAmountLessThanMinimum || isAmountNaN || isBalanceLessThanAmount)
        return false; // ?????????? ?????????? ?????? ???????????????????????????? ??????????????????
      return true;
    } catch (e) {
      console.error(e);
    }
  };

  const checkAllowance = async (intervalCheckAllowance) => {
    try {
      const balance = await contractService.balanceOf(userAddress);
      console.log('balanceOf', balance);
      const allowance = await contractService.allowance(userAddress);
      console.log('allowance', allowance);
      if (!intervalCheckAllowance) setApproving(false);
      if (allowance > 0 && amount <= allowance) {
        setApproved(true);
        clearInterval(intervalCheckAllowance);
        return true;
      }
      return false;
    } catch (e) {
      clearInterval(intervalCheckAllowance);
      console.error(e);
    }
  };

  const approve = async () => {
    try {
      const areAllFieldsOk = await checkFields({ txType: 'approve' });
      if (!areAllFieldsOk) return;
      setApproving(true);
      await contractService.approveToken(userAddress, async (res) => {
        console.log('approveToken', res);
        if (res && res.status === 'ERROR') return setApproving(false);
        const intervalCheckAllowance = setInterval(async () => {
          await checkAllowance(intervalCheckAllowance);
        }, 500);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const cancelSwap = async () => {
    return toggleModal({ isOpen: false, text: null });
  };

  const setTransactionUrl = (networkId) => {
    console.log(networkId);
    switch (networkId) {
      case 1:
      case 42:
        return 'ethereum';
      case 56:
      case 97:
        return 'binanceSmartChain';
      case ['0x89']:
      case ['0x13881']:
        return 'matic';
      case ['https://api.tronstack.io']:
      case ['https://event.nileex.io']:
      case 4:
        return 'tron';
      case ['0xfa2']:
      case ['0xfa']:
        return 'fantom';
      case ['0xa86a']:
      case ['0xa869']:
        return 'avalanche';

      default:
        break;
    }
  };

  const swap = async () => {
    setWaiting(true);
    try {
      toggleModal({ isOpen: false, text: null });
      const areAllFieldsOk = await checkFields({ txType: 'swap' });
      if (!areAllFieldsOk) {
        setWaiting(false);
        return;
      }
      if (isNetworkFromBinanceChain) {
        const blockchain =
          networks && networks.filter((item) => item.key === networkTo)[0].id;
        const balance = await contractService.transferFromBinanceChain({
          userAddress,
          blockchain,
          amount,
          receiver: userAddress,
        });
        console.log(balance);
        return;
      }
      const blockchain =
        networks && networks.filter((item) => item.key === networkTo)[0].id;
      const blockchainFrom =
        networks && networks.filter((item) => item.key === networkFrom)[0].id;
      await contractService.transferToOtherBlockchain({
        userAddress,
        blockchain,
        amount,
        receiver: userAddress,
        callback: async (res) => {
          console.log('transferToOtherBlockchain', res);
          if (res.status === 'SUCCESS') {
            let timerId = setInterval(async () => {
              let result;
              if (contractService.wallet.name === 'tronlink') {
                result = await window.tronWeb.trx.getTransaction(res.data);
              } else {
                result = await web3.eth.getTransactionReceipt(res.data);
              }
              if (
                (contractService.wallet.name === 'tronlink' &&
                  result.ret[0].contractRet === 'SUCCESS') ||
                (result && result.status)
              ) {
                toggleModal({
                  isOpen: true,
                  text: (
                    <>
                      <a
                        className="link link-transaction"
                        target="_blank"
                        href={
                          config.transactionLinks(
                            contractService.wallet.name === 'tronlink'
                              ? result.txID
                              : result.transactionHash,
                          )[setTransactionUrl(blockchainFrom)]
                        }>
                        View transaction
                        <IconLink />
                      </a>
                    </>
                  ),
                  header: (
                    <>
                      <p className="text-gradient">Transaction complete</p>
                    </>
                  ),
                });
                clearInterval(timerId);
                setAmount('0');
                setReceive('0');
                setWaiting(false);
              }
            }, 1000);
          } else {
            setWaiting(false);
          }
        },
      });
    } catch (e) {
      console.error(e, 'test');
      setWaiting(false);
    }
  };

  const handleSwap = async () => {
    try {
      if (isNetworkToBinanceChain) return swap();
      if (networkTo === 'Tron') return swap();
      const isGasOk = await checkGas(swap);
      if (isGasOk) swap();
    } catch (e) {
      console.error(e);
    }
  };

  const chooseWalletToConnect = () => {
    toggleModal({
      isOpen: true,
      text: (
        <div>
          {networkFrom === 'Ethereum' && (
            <>
              <div
                className="button m10"
                onClick={() => {
                  dispatch(walletActions.setWalletType('metamask'));
                  toggleModal({ isOpen: false });
                }}>
                <IconMetamask />
                <span className="text-gradient">MetaMask</span>
              </div>

              <div
                className="button m10"
                onClick={() => {
                  dispatch(walletActions.setWalletType('binance'));
                  toggleModal({ isOpen: false });
                }}>
                <IconBinance />
                <span className="text-gradient">Binance Chain Wallet</span>
              </div>
            </>
          )}

          {['Binance-Chain', 'Binance-Smart-Chain'].includes(networkFrom) && (
            <>
              <div
                className="button m10"
                onClick={() => {
                  dispatch(walletActions.setWalletType('metamask'));
                  toggleModal({ isOpen: false });
                }}>
                <IconMetamask />
                <span className="text-gradient">Metamask</span>
              </div>

              <div
                className="button m10"
                onClick={() => {
                  dispatch(walletActions.setWalletType('binance'));
                  toggleModal({ isOpen: false });
                }}>
                <IconBinance />
                <span className="text-gradient">Binance Chain Wallet</span>
              </div>
            </>
          )}
          {networkFrom === 'Matic' ? (
            <div
              className="button m10"
              onClick={() => {
                dispatch(walletActions.setWalletType('matic'));
                toggleModal({ isOpen: false });
              }}>
              <IconMetamask />
              <span className="text-gradient">Metamask</span>
            </div>
          ) : (
            ''
          )}
          {networkFrom === 'Tron' ? (
            <div
              className="button m10"
              onClick={() => {
                dispatch(walletActions.setWalletType('tron'));
                toggleModal({ isOpen: false });
              }}>
              <IconTronLink />
              <span className="text-gradient">TronLink</span>
            </div>
          ) : (
            ''
          )}
          {networkFrom === 'Fantom' ? (
            <div
              className="button m10"
              onClick={() => {
                dispatch(walletActions.setWalletType('fantom'));
                toggleModal({ isOpen: false });
              }}>
              <IconMetamask />
              <span className="text-gradient">Metamask</span>
            </div>
          ) : (
            ''
          )}
          {networkFrom === 'Avalanche' ? (
            <div
              className="button m10"
              onClick={() => {
                dispatch(walletActions.setWalletType('avalanche'));
                toggleModal({ isOpen: false });
              }}>
              <IconMetamask />
              <span className="text-gradient">Metamask</span>
            </div>
          ) : (
            ''
          )}
        </div>
      ),
    });
  };

  React.useEffect(() => {
    if (!networkFrom) return;
    getNetworksTo();
    getAddresses();
  }, [networkFrom]);

  React.useEffect(() => {
    if (!networkTo) return;
    amount && handleChangeAmount(amount);
    if (!dex) return;
    getMinimumAmount();
    getFee();
    getAddresses();
  }, [networkTo, dex]);

  React.useEffect(() => {
    if (!userAddress) return;
    if (!contractService) return;
    setApproving(true);
    !isNetworkFromBinanceChain && checkAllowance();
  }, [amount, userAddress, contractService]);

  return (
    <form className="form" type="submit">
      <div className="form-label-uppercase">From</div>

      <Dropdown
        label="Choose network"
        items={networksFrom}
        value={networkFrom}
        onChange={handleChangeNetworkFrom}
      />

      <div className="form-label-uppercase">To</div>

      <Dropdown
        label="Choose destination network"
        items={networksTo}
        value={networkTo}
        onChange={handleChangeNetworkTo}
      />

      <div className="form-label-uppercase">
        <div>Amount</div>
        <a
          className="form-label-link-right"
          href={getTokenLink(networkFrom, tokenAddressFrom)}
          target="_blank">
          <div className="link">{getTokenSymbol(networkFrom)}</div>
          <IconLink className="input-label-inner-image" />
        </a>
      </div>

      <Input
        name="amount"
        medium
        formatNumber
        error={form.amount}
        type="text"
        placeholder="Enter Amount"
        value={amount}
        onChange={handleChangeAmount}
        onFocus={handleFocusAmount}
        label={
          userAddress &&
          !isNetworkFromBinanceChain && (
            <>
              <div></div>
              <div className="pointer" onClick={handleSendMax}>
                Send max
              </div>
            </>
          )
        }
      />

      <div className="form-label-under">
        <div className="form-label-left">Fee: {fee}</div>
        <div
          className={
            form.amount && form.amount.text.includes('Minimum')
              ? 'form-label-right-error'
              : 'form-label-right'
          }>
          {form.amount && form.amount.text.includes('Minimum') && (
            <IconError className="form-label-error-icon" />
          )}
          Minimum amount: {minimumAmount} {getTokenSymbol(networkFrom)}
        </div>
      </div>

      {form.amount &&
        (form.amount.text.includes('Amount') ||
          form.amount.text.includes('balance')) && (
          <div className="form-label-error">
            <IconError className="form-label-error-icon" />
            {form.amount.text}
          </div>
        )}

      <div className="form-label-uppercase">
        <div>You will receive</div>
        <a
          className="form-label-link-right"
          href={getTokenLink(networkTo, tokenAddressTo)}
          target="_blank">
          <div className="link">{getTokenSymbol(networkTo)}</div>
          <IconLink className="input-label-inner-image" />
        </a>
      </div>

      <Input
        customClass="input-container-receive"
        name="receive"
        medium
        disabled
        formatNumber
        type="text"
        placeholder="0.00"
        value={receive}
      />

      <div className="form-label-note">
        <IconInfo className="form-label-error-icon" />
        Note: The tokens will be sent to the same address they were sent from
      </div>

      <div
        className={
          isNetworkFromBinanceChain ? 'form-buttons' : 'form-buttons-one'
        }>
        {!userAddress ? (
          <div className="button-big mt40" onClick={chooseWalletToConnect}>
            Connect wallet
          </div>
        ) : approved || isNetworkFromBinanceChain ? (
          waiting ? (
            <div className="button-big button-disabled mt40">Waiting...</div>
          ) : (
            <div className="button-big mt40" onClick={handleSwap}>
              Swap
            </div>
          )
        ) : (
          <div
            className={`button-big ${
              approving || !amount || amount === '0' ? 'button-disabled' : ''
            } mt40`}
            onClick={
              !approving && !!amount && amount !== '0' ? approve : () => {}
            }>
            {console.log(amount)}
            {approving || waiting ? 'Waiting...' : 'Approve'}
          </div>
        )}
      </div>
    </form>
  );
}

export default Form;
