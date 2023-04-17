import React, { useState, useEffect } from 'react'
import Page from '../../components/Page/Page'
import { Helmet } from 'react-helmet';
import HomeImage from '../../assets/img/background.jpg';
import { createGlobalStyle } from 'styled-components';
import FinanceSummary from './components/FinanceSummary';
import useBombFinance from '../../hooks/useBombFinance';
import { roundAndFormatNumber } from '../../0x';
import metamask from "../../assets/img/metamask-fox.svg";
import bomb from "../../assets/img/bomb-512.png";
import bond from "../../assets/img/bbond-512.png";
import bshare from "../../assets/img/bshare-512.png";
import InvestMent from './components/InvestMent';
import useTokenBalance from '../../hooks/useTokenBalance';
import useBank from "../../hooks/useBank";
import useBanks from "../../hooks/useBanks";
import useWithdraw from "../../hooks/useWithdraw";
import useStake from '../../hooks/useStake';
import useHarvest from '../../hooks/useHarvest';
import { ethers } from 'ethers';
import BombFarms from './components/BombFarms';
import Bonds from './components/Bonds';

const Dashboard = () => {

  const TITLE = ' bomb.money | Dashboard';

  const [epochData, setEpochData] = useState({});
  const [tokensData, setTokensData] = useState([
    {
      "coinImg": "/static/media/bomb-512.53fb849902c83e56c299.png",
      "tokenName": "BOMB",
      "currntSupply": "---",
      "totalSupply": "---",
      "price": {
        "dollar": "---",
        "btcb": "---"
      },
      "wallet": "/static/media/metamask-fox.7db94670ec6dc4d4c6c9e18af96281d8.svg"
    },
    {
      "coinImg": "/static/media/bshare-512.ce954e620aa9e7fbe2a6.png",
      "tokenName": "BSHARE",
      "currntSupply": "---",
      "totalSupply": "---",
      "price": {
        "dollar": "---",
        "btcb": "---"
      },
      "wallet": "/static/media/metamask-fox.7db94670ec6dc4d4c6c9e18af96281d8.svg"
    },
    {
      "coinImg": "/static/media/bbond-512.66d5cf4e3112625d66ae.png",
      "tokenName": "BBOND",
      "currntSupply": "---",
      "totalSupply": "---",
      "price": {
        "dollar": "---",
        "btcb": "---"
      },
      "wallet": "/static/media/metamask-fox.7db94670ec6dc4d4c6c9e18af96281d8.svg"
    }
  ]);
  const [boardRoomData, setBoardRoomData] = useState({});
  const bombFinance = useBombFinance();
  const [banks] = useBanks();




  /* token details 
    const estimatedTwap = await bombFinance.getBombStatInEstimatedTWAP(); */
  function shortenNumber(number) {
    const abbreviations = ['', 'K', 'M', 'B', 'T'];
    let index = 0;
    while (Math.abs(number) >= 1000 && index < abbreviations.length - 1) {
      number /= 1000;
      index++;
    }
    const formattedNumber = number.toFixed(2);
    return formattedNumber + abbreviations[index];
  }


  const fetchEpoachData = async () => {
    var CurrentEpoch = await bombFinance.getCurrentEpoch();

    var { to: nextEpoch } = await bombFinance.getTreasuryNextAllocationTime();
    var { tokenInFtm: currentTWAP } = await bombFinance.getBombStatInEstimatedTWAP();

    var LastTwap = await bombFinance.getBombPriceInLastTWAP();

    const BOMBData = await bombFinance.getBombStat();

    var tvl = roundAndFormatNumber((Number(BOMBData.priceInDollars || 0) * Number(BOMBData.totalSupply || 0)), 2);

    CurrentEpoch = Number(CurrentEpoch);
    LastTwap = Number(LastTwap);
    currentTWAP = Number(currentTWAP);

    await setEpochData({ CurrentEpoch, nextEpoch, LastTwap, currentTWAP, tvl });
  }


  const fetchTokenData = async () => {
    const data = [];
    var Bombstat = await bombFinance.getBombStat();
    var SharesStat = await bombFinance.getShareStat();

    var BondStat = await bombFinance.getBondStat();
    data[0] = {
      coinImg: bomb,
      tokenName: 'BOMB',
      currntSupply: shortenNumber(Bombstat.circulatingSupply),
      totalSupply: shortenNumber(Bombstat.totalSupply),
      price: {
        dollar: String(Bombstat.priceInDollars).slice(0, 4),
        btcb: Bombstat.tokenInFtm
      },
      wallet: metamask
    }
    data[1] = {
      coinImg: bshare,
      tokenName: 'BSHARE',
      currntSupply: shortenNumber(SharesStat.circulatingSupply),
      totalSupply: shortenNumber(SharesStat.totalSupply),
      price: {
        dollar: String(SharesStat.priceInDollars).slice(0, 4),
        btcb: SharesStat.tokenInFtm
      },
      wallet: metamask
    }
    data[2] = {
      coinImg: bond,
      tokenName: 'BBOND',
      currntSupply: shortenNumber(BondStat.circulatingSupply),
      totalSupply: shortenNumber(BondStat.totalSupply),
      price: {
        dollar: String(BondStat.priceInDollars).slice(0, 4),
        btcb: BondStat.tokenInFtm
      },
      wallet: metamask
    }

    await setTokensData(data);
  }

  const investData = async () => {
    const BShareData = await bombFinance.getShareStat();

    const BOMBData = await bombFinance.getBombStat();

    const bombPrice = Number(BOMBData.priceInDollars);

    const bshareTVL = roundAndFormatNumber(Number(BShareData?.totalSupply || 0) * Number(BShareData?.priceInDollars || 0), 2);

    const bsharePrice = roundAndFormatNumber(Number(BShareData.priceInDollars), 2);

    const totalStaked = roundAndFormatNumber(ethers.utils.formatEther(ethers.BigNumber.from(await bombFinance.getTotalStakedInBoardroom()).toString()), 2);

    const userStake = roundAndFormatNumber((await bombFinance.getStakedSharesOnBoardroom()).toString(), 2);

    // earnings are in from of dollars, so to calculate the total amount of BOMB earned, we need to divide userEarnings by bombPrice.
    const userEarnings = roundAndFormatNumber((await bombFinance.getEarningsOnBoardroom()).toString(), 2);

    setBoardRoomData({ bshareTVL, totalStaked, userStake, userEarnings, bsharePrice, bombPrice });
  }

  useEffect(() => {
    fetchTokenData();
    fetchEpoachData();
    investData();
    console.log({banks});
  }, []);

  const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;


  return (
    <Page>
      <BackgroundImage />
      <Helmet >
        <title>{TITLE}</title>
      </Helmet>
      <FinanceSummary epochData={epochData} tokensData={tokensData} />
      <InvestMent
        boardRoomData={boardRoomData}
      />
      <BombFarms bsharePrice={boardRoomData.bsharePrice}/> 
      <Bonds />
    </Page>
  )
}

export default Dashboard