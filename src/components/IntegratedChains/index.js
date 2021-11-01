import React from 'react';
import EthereumChain from '../../assets/icons/chains/ethereum-chain.svg';
import BinanceChain from '../../assets/icons/chains/binance-chain.svg';
import TronChain from '../../assets/icons/chains/tron-chain.svg';
import PolygonChain from '../../assets/icons/chains/polygon-chain.svg';
import FantomChain from '../../assets/icons/chains/fantom-chain.svg';
import AvalanceChain from '../../assets/icons/chains/avalanche-chain.svg';

import './style.scss';

const IntegratedChains = () => {
  return (
    <div className="integrated-chains">
      <h2 className="integrated-chains__title">Chains Integrated</h2>
      <div className="integrated-chains__items">
        <div className="integrated-chains__item">
          <img src={EthereumChain} alt="ethereum chain" />
        </div>
        <div className="integrated-chains__item">
          <img src={BinanceChain} alt="ethereum chain" />
        </div>
        <div className="integrated-chains__item">
          <img src={TronChain} alt="ethereum chain" />
        </div>
        <div className="integrated-chains__item">
          <img src={PolygonChain} alt="ethereum chain" />
        </div>
        <div className="integrated-chains__item">
          <img src={FantomChain} alt="ethereum chain" />
        </div>
        <div className="integrated-chains__item">
          <img src={AvalanceChain} alt="ethereum chain" />
        </div>
      </div>
    </div>
  );
};
export default IntegratedChains;
