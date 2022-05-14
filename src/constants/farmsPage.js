import plentyXtz from '../assets/images/farms/plenty-xtz.png';
import kalamXtz from '../assets/images/farms/kalam-xtz.png';
import plentyToken from '../assets/images/logo_small.png';
import plentyWUSDC from '../assets/images/farms/PLENTY-wUSDC.png';
import plentyWBUSD from '../assets/images/farms/PLENTY-wBUSD.png';
import plentyWWBTC from '../assets/images/farms/PLENTY-wWBTC.png';
import plentyUsdtz from '../assets/images/plenty-usdtz.png';
import plentyWmatic from '../assets/images/plenty-wmatic.png';
import plentyWlink from '../assets/images/plenty-wlink.png';
import hdaoLpFarm from '../assets/images/farms/hdaoLpFarm.png';
import ethtzLpFarm from '../assets/images/farms/ethtzLpFarm.png';
import wwethLpFarm from '../assets/images/farms/wwethLpFarm.png';
import kusdLpFarm from '../assets/images/farms/kusdLpFarm.png';
import quipuLpFarm from '../assets/images/farms/quipuLpFarm.png';
import kalamLpFarm from '../assets/images/farms/plenty-kalam.png';
import smakLpFarm from '../assets/images/farms/plenty-smak.png';
import tzbtcLpFarm from '../assets/images/farms/plenty-tzbtc.png';
import unoLpFarm from '../assets/images/farms/plenty-uno.png';
import wrapLpFarm from '../assets/images/farms/plenty-wrap.png';
import uusdLpFarm from '../assets/images/farms/uusdLpFarm.png';
import gifDualLpFarm from '../assets/images/plenty-gif-dual-lp.png';
import gifIcon from '../assets/images/gif-dao-token.png';
import wdaiLpFarm from '../assets/images/farms/wdaiLpFarm.png';
import wusdtLpFarm from '../assets/images/farms/wusdtLpFarm.png';
import tez from '../assets/images/farms/tez.png';
import cteztezlpFarm from '../assets/images/farms/ctez-tez.png';
import ctezdogalpFarm from '../assets/images/farms/ctez-doga.png';
import youLpFarm from '../assets/images/farms/youLpFarm.png';
import ctezFarmLpIcon from '../assets/images/farms/ctezFarmLpIcon.png';
import uUSDYOULp from '../assets/images/farms/uUSDYOULp.png';
import uUSDwUSDC from '../assets/images/farms/uUSDwUSDCLp.png';
import uUSDuDEFI from '../assets/images/farms/uUSDuDEFILp.png';

import wbusd from '../assets/images/busd.png';
import YOU from '../assets/images/you-gov.png';

import PropTypes from 'prop-types';

import ctezCRUNCH from '../assets/images/farms/ctez-CRUNCH.png';
import ctezGIF from '../assets/images/farms/ctez-GIF.png';
import ctezkUSD from '../assets/images/farms/ctez-kUSD.png';
import ctezUSDtz from '../assets/images/farms/ctez-USDtz.png';
import ctezwDAI from '../assets/images/farms/ctez-wDAI.png';
import ctezWRAP from '../assets/images/farms/ctez-WRAP.png';
import ctezwUSDT from '../assets/images/farms/ctez-wUSDT.png';
import ctezETHtz from '../assets/images/farms/ctez-ETHtz.png';
import ctezINSTA from '../assets/images/farms/ctez-INSTA.png';
import ctezPAUL from '../assets/images/farms/ctez-PAUL.png';
import ctezPXL from '../assets/images/farms/ctez-PXL.png';
import ctezQUIPU from '../assets/images/farms/ctez-QUIPU.png';
import ctezUNO from '../assets/images/farms/ctez-UNO.png';
import ctezwBUSD from '../assets/images/farms/ctez-wBUSD.png';
import ctezwUSDC from '../assets/images/farms/ctez-wUSDC.png';
import ctezwWBTC from '../assets/images/farms/ctez-wWBTC.png';
import ctezFLAME from '../assets/images/farms/ctez-FLAME.png';
import ctezkDAO from '../assets/images/farms/ctez-kDAO.png';
import ctezuUSD from '../assets/images/farms/ctez-uUSD.png';
import ctezwWETH from '../assets/images/farms/ctez-wWETH.png';
import ctezcrDAO from '../assets/images/farms/ctez-crDAO.png';
import ctezhDAO from '../assets/images/farms/ctez-hDAO.png';
import ctezKALAM from '../assets/images/farms/ctez-KALAM.png';
import cteztzBTC from '../assets/images/farms/ctez-tzBTC.png';
import ctezSMAK from '../assets/images/farms/ctez-SMAK.png';

export const FARMS_CARD_DATA_PROPTYPES = PropTypes.shape({
  farmData: PropTypes.shape({
    LP_TOKEN: PropTypes.string,
    CONTRACT: PropTypes.string,
    DEX: PropTypes.string,
    TOKEN_ADDRESS: PropTypes.string,
    CARD_TYPE: PropTypes.string,
    TOKEN_DECIMAL: 6,
    TYPE: PropTypes.string,
    LP_DECIMAL: 18,
    TEMP_ADDRESS: PropTypes.string,
    DECIMAL: 18,
    withdrawalFeeType: PropTypes.array,
  }).isRequired,
  properties: PropTypes.shape({
    image: PropTypes.string,
    harvestImg: PropTypes.string,
    multi: PropTypes.string,
    title: PropTypes.string,
    apr: PropTypes.number,
    apy: PropTypes.string,
    earn: PropTypes.string,
    fee: PropTypes.string,
    earned: PropTypes.number,
    deposit: PropTypes.string,
    liquidity: PropTypes.string,
    withdrawalFee: PropTypes.string,
    balance: PropTypes.number,
    userBalance: PropTypes.number,
    URL: PropTypes.string,
    active: PropTypes.bool,
    source: PropTypes.string,
    rewards: PropTypes.string,
  }).isRequired,
  identifier: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  values: PropTypes.shape({
    identifier: PropTypes.string,
    APR: PropTypes.number,
    totalLiquidty: PropTypes.number,
    roiTable: PropTypes.arrayOf(
      PropTypes.shape({
        roi: PropTypes.number,
        PlentyPer1000dollar: PropTypes.number,
      }),
    ),
    totalSupply: PropTypes.number,
    rewardRate: PropTypes.number,
  }),
});

export const FARM_PAGE_MODAL = {
  NULL: null,
  ROI: 'roi',
  STAKE: 'stake',
  UNSTAKE: 'unstake',
  WITHDRAWAL: 'withdrawal',
  TRANSACTION_SUCCESS: 'transaction-success',
};

export const FARM_SORT_OPTIONS = {
  APR: 'APR',
  TVL: 'TVL',
  REWARDS: 'Rewards',
};

export const FARM_TAB = {
  CTEZ: '🔥 Ctez Extravaganza 🔥',
  YOU: 'My Farms',
  ALL: 'All Farms',
};

export const FARMS_CARD_TYPE_LIST = {
  'PLENTY / XTZ LP': {
    image: plentyXtz,
    harvestImg: plentyToken,
    multi: '100',
    title: 'PLENTY / XTZ LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'PLENTY - XTZ LP',
    liquidity: '100000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Quipuswap LP',
    rewards: '1000 PLENTY / DAY',
    isDualFarm: false,
  },
  'CTEZ / DOGA LP': {
    image: ctezdogalpFarm,
    harvestImg: plentyToken,
    multi: '100',
    title: 'CTEZ / DOGA LP',
    apr: 0,
    apy: 0,
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'CTEZ / DOGA LP',
    liquidity: 0,
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
    isDualFarm: false,
  },
  'KALAM / XTZ LP': {
    image: kalamXtz,
    harvestImg: plentyToken,
    multi: '100',
    title: 'KALAM / XTZ LP',
    apr: 3,
    apy: '1111',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'KALAM - XTZ LP',
    liquidity: '100000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Quipuswap LP',
    rewards: '1000 KALAM / DAY',
    isDualFarm: false,
  },
  'hDAO / PLENTY LP': {
    image: plentyXtz,
    multi: '100',
    title: 'hDAO / PLENTY LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'PLENTY - XTZ LP',
    liquidity: '1000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
    isDualFarm: false,
  },
  'KALAM / PLENTY LP': {
    image: plentyXtz,
    harvestImg: plentyToken,
    multi: '100',
    title: 'KALAM / PLENTY LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'PLENTY - XTZ LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
    isDualFarm: false,
  },
  'PLENTY / wUSDC LP': {
    image: plentyWUSDC,
    harvestImg: plentyToken,
    harvestImg1: wbusd,
    multi: '100',
    title: 'PLENTY / wUSDC LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'PLENTY / wUSDC LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
    isDualFarm: false,
  },
  'PLENTY / wBUSD LP': {
    image: plentyWBUSD,
    harvestImg: plentyToken,
    multi: '100',
    title: 'PLENTY / wBUSD LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'PLENTY / wBUSD LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
    isDualFarm: false,
  },
  'PLENTY / wWBTC LP': {
    image: plentyWWBTC,
    harvestImg: plentyToken,
    multi: '100',
    title: 'PLENTY / wWBTC LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'PLENTY / wWBTC LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
    isDualFarm: false,
  },
  'PLENTY / wMATIC LP': {
    image: plentyWmatic,
    harvestImg: plentyToken,
    multi: '100',
    title: 'PLENTY / wMATIC LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'PLENTY / wMATIC LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
    isDualFarm: false,
  },
  'PLENTY / wLINK LP': {
    image: plentyWlink,
    harvestImg: plentyToken,
    multi: '100',
    title: 'PLENTY / wLINK LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'PLENTY / wLINK LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
    isDualFarm: false,
  },
  'PLENTY / USDtz LP': {
    image: plentyUsdtz,
    harvestImg: plentyToken,
    multi: '100',
    title: 'PLENTY / USDtz LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'PLENTY / USDtz LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
    isDualFarm: false,
  },
  'PLENTY / hDAO LP': {
    image: hdaoLpFarm,
    harvestImg: plentyToken,
    multi: '100',
    title: 'PLENTY / hDAO LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'PLENTY / hDAO LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
    isDualFarm: false,
  },
  'PLENTY / ETHtz LP': {
    image: ethtzLpFarm,
    harvestImg: plentyToken,
    multi: '100',
    title: 'PLENTY / ETHtz LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'PLENTY / ETHtz LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
    isDualFarm: false,
  },
  'PLENTY / wWETH LP': {
    image: wwethLpFarm,
    harvestImg: plentyToken,
    multi: '100',
    title: 'PLENTY / wWETH LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'PLENTY / wWETH LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
    isDualFarm: false,
  },
  'PLENTY / kUSD LP': {
    image: kusdLpFarm,
    harvestImg: plentyToken,
    multi: '100',
    title: 'PLENTY / kUSD LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'PLENTY / kUSD LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
    isDualFarm: false,
  },
  'PLENTY / QUIPU LP': {
    image: quipuLpFarm,
    harvestImg: plentyToken,
    multi: '100',
    title: 'PLENTY / QUIPU LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'PLENTY / QUIPU LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
    isDualFarm: false,
  },
  'PLENTY / WRAP LP': {
    image: wrapLpFarm,
    harvestImg: plentyToken,
    multi: '100',
    title: 'PLENTY / WRAP LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'PLENTY / WRAP LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
    isDualFarm: false,
  },
  'PLENTY / UNO LP': {
    image: unoLpFarm,
    harvestImg: plentyToken,
    multi: '100',
    title: 'PLENTY / UNO LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'PLENTY / UNO LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
    isDualFarm: false,
  },
  'PLENTY / SMAK LP': {
    image: smakLpFarm,
    harvestImg: plentyToken,
    multi: '100',
    title: 'PLENTY / SMAK LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'PLENTY / SMAK LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
    isDualFarm: false,
  },
  'PLENTY / KALAM LP': {
    image: kalamLpFarm,
    harvestImg: plentyToken,
    multi: '100',
    title: 'PLENTY / KALAM LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'PLENTY / KALAM LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
    isDualFarm: false,
  },
  'PLENTY / tzBTC LP': {
    image: tzbtcLpFarm,
    harvestImg: plentyToken,
    multi: '100',
    title: 'PLENTY / tzBTC LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'PLENTY / tzBTC LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
    isDualFarm: false,
  },
  'PLENTY / uUSD LP': {
    image: uusdLpFarm,
    harvestImg: plentyToken,
    multi: '100',
    title: 'PLENTY / uUSD LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'PLENTY / uUSD LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'PLENTY / GIF Dual LP': {
    image: gifDualLpFarm,
    harvestImg: plentyToken,
    harvestImg1: gifIcon,
    multi: '100',
    title: 'PLENTY / GIF LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'PLENTY / GIF Dual LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
    isDualFarm: true,
  },
  'CTEZ / TEZ Dual PNLP': {
    image: cteztezlpFarm,
    harvestImg: plentyToken,
    harvestImg1: tez,
    multi: '100',
    title: 'CTEZ / TEZ PNLP',
    apr: 0,
    apy: 0,
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'CTEZ / TEZ Dual LP',
    liquidity: 0,
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
    isDualFarm: true,
  },
  'PLENTY / YOU LP': {
    image: youLpFarm,
    harvestImg: plentyToken,
    multi: '100',
    title: 'PLENTY / YOU LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'PLENTY / YOU LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'PLENTY / wDAI LP': {
    image: wdaiLpFarm,
    harvestImg: plentyToken,
    multi: '100',
    title: 'PLENTY / wDAI LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'PLENTY / wDAI LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'PLENTY / wUSDT LP': {
    image: wusdtLpFarm,
    harvestImg: plentyToken,
    multi: '100',
    title: 'PLENTY / wUSDT LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'PLENTY / wUSDT LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'PLENTY / cTez LP': {
    image: ctezFarmLpIcon,
    harvestImg: plentyToken,
    multi: '100',
    title: 'PLENTY / CTEZ LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'PLENTY / ctez LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'uUSD / YOU LP': {
    image: uUSDYOULp,
    harvestImg: YOU,
    multi: '100',
    title: 'uUSD / YOU LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'uUSD / YOU LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'uUSD / wUSDC LP': {
    image: uUSDwUSDC,
    harvestImg: YOU,
    multi: '100',
    title: 'uUSD / wUSDC LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'uUSD / wUSDC LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'uUSD / uDEFI LP': {
    image: uUSDuDEFI,
    harvestImg: YOU,
    multi: '100',
    title: 'uUSD / uDEFI LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'uUSD / uDEFI LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'ctez / kUSD LP': {
    image: ctezkUSD,
    harvestImg: plentyToken,
    multi: '100',
    title: 'CTEZ / kUSD LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'ctez / kUSD LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'ctez / USDtz LP': {
    image: ctezUSDtz,
    harvestImg: plentyToken,
    multi: '100',
    title: 'CTEZ / USDtz LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'ctez / USDtz LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'ctez / wUSDC LP': {
    image: ctezwUSDC,
    harvestImg: plentyToken,
    multi: '100',
    title: 'CTEZ / wUSDC LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'ctez / wUSDC LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'ctez / wUSDT LP': {
    image: ctezwUSDT,
    harvestImg: plentyToken,
    multi: '100',
    title: 'CTEZ / wUSDT LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'ctez / wUSDT LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'ctez / wBUSD LP': {
    image: ctezwBUSD,
    harvestImg: plentyToken,
    multi: '100',
    title: 'CTEZ / wBUSD LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'ctez / wBUSD LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'ctez / wDAI LP': {
    image: ctezwDAI,
    harvestImg: plentyToken,
    multi: '100',
    title: 'CTEZ / wDAI LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'ctez / wDAI LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'ctez / KALAM LP': {
    image: ctezKALAM,
    harvestImg: plentyToken,
    multi: '100',
    title: 'CTEZ / KALAM LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'ctez / KALAM LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'ctez / GIF LP': {
    image: ctezGIF,
    harvestImg: plentyToken,
    multi: '100',
    title: 'CTEZ / GIF LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'ctez / GIF LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'ctez / ETHtz LP': {
    image: ctezETHtz,
    harvestImg: plentyToken,
    multi: '100',
    title: 'CTEZ / ETHtz LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'ctez / ETHtz LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'ctez / QUIPU LP': {
    image: ctezQUIPU,
    harvestImg: plentyToken,
    multi: '100',
    title: 'CTEZ / QUIPU LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'ctez / QUIPU LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'ctez / hDAO LP': {
    image: ctezhDAO,
    harvestImg: plentyToken,
    multi: '100',
    title: 'CTEZ / hDAO LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'ctez / hDAO LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'ctez / kDAO LP': {
    image: ctezkDAO,
    harvestImg: plentyToken,
    multi: '100',
    title: 'CTEZ / kDAO LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'ctez / kDAO LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'ctez / wWETH LP': {
    image: ctezwWETH,
    harvestImg: plentyToken,
    multi: '100',
    title: 'CTEZ / wWETH LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'ctez / wWETH LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'ctez / uUSD LP': {
    image: ctezuUSD,
    harvestImg: plentyToken,
    multi: '100',
    title: 'CTEZ / uUSD LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'ctez / uUSD LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'ctez / FLAME LP': {
    image: ctezFLAME,
    harvestImg: plentyToken,
    multi: '100',
    title: 'CTEZ / FLAME LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'ctez / FLAME LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'ctez / SMAK LP': {
    image: ctezSMAK,
    harvestImg: plentyToken,
    multi: '100',
    title: 'CTEZ / SMAK LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'ctez / SMAK LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'ctez / crDAO LP': {
    image: ctezcrDAO,
    harvestImg: plentyToken,
    multi: '100',
    title: 'CTEZ / crDAO LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'ctez / crDAO LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'ctez / PXL LP': {
    image: ctezPXL,
    harvestImg: plentyToken,
    multi: '100',
    title: 'CTEZ / PXL LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'ctez / PXL LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'ctez / UNO LP': {
    image: ctezUNO,
    harvestImg: plentyToken,
    multi: '100',
    title: 'CTEZ / UNO LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'ctez / UNO LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'ctez / WRAP LP': {
    image: ctezWRAP,
    harvestImg: plentyToken,
    multi: '100',
    title: 'CTEZ / WRAP LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'ctez / WRAP LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'ctez / wWBTC LP': {
    image: ctezwWBTC,
    harvestImg: plentyToken,
    multi: '100',
    title: 'CTEZ / wWBTC LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'ctez / wWBTC LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'ctez / tzBTC LP': {
    image: cteztzBTC,
    harvestImg: plentyToken,
    multi: '100',
    title: 'CTEZ / tzBTC LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'ctez / tzBTC LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'ctez / PAUL LP': {
    image: ctezPAUL,
    harvestImg: plentyToken,
    multi: '100',
    title: 'CTEZ / PAUL LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'ctez / PAUL LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'ctez / CRUNCH LP': {
    image: ctezCRUNCH,
    harvestImg: plentyToken,
    multi: '100',
    title: 'CTEZ / CRUNCH LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'ctez / CRUNCH LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
  'ctez / INSTA LP': {
    image: ctezINSTA,
    harvestImg: plentyToken,
    multi: '100',
    title: 'CTEZ / INSTA LP',
    apr: 0,
    apy: '2621',
    earn: 'PLENTY',
    fee: '0%',
    earned: 0,
    deposit: 'ctez / INSTA LP',
    liquidity: '5000',
    withdrawalFee: '0%',
    balance: 0,
    userBalance: 0,
    URL: '',
    active: true,
    source: 'Plenty LP',
    rewards: '1000 PLENTY / DAY',
  },
};
