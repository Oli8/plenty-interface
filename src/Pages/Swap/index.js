import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import {
  computeOutputBasedOnTokenOutAmount,
  computeTokenOutForRouteBase,
  computeTokenOutForRouteBaseByOutAmount,
  computeTokenOutput,
  getTokenPrices,
  getUserBalanceByRpc,
  fetchtzBTCBalance,
} from '../../apis/swap/swap';

import { loadSwapData } from '../../apis/swap/swap-v2';
import config from '../../config/config';

import TransactionSettings from '../../Components/TransactionSettings/TransactionSettings';
import SwapModal from '../../Components/SwapModal/SwapModal';
import SwapTab from '../../Components/SwapTabsContent/SwapTab';
import LiquidityTab from '../../Components/SwapTabsContent/LiquidityTab';
import Loader from '../../Components/loader';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import InfoModal from '../../Components/Ui/Modals/InfoModal';
import { tokens } from '../../constants/swapPage';
import { stableSwapTokens } from '../../constants/stableSwapPage';
import GraphDark from '../../assets/images/SwapModal/graph-dark.svg';
import Graph from '../../assets/images/SwapModal/graph.svg';
import { ReactComponent as Stableswap } from '../../assets/images/SwapModal/stableswap.svg';
import { useLocationStateInSwap } from './hooks';
import { getAllRoutes } from '../../apis/swap/swap-v2';
import { useLocation } from 'react-router';

const Swap = (props) => {
  const {
    activeTab,
    setActiveTab,
    tokenIn,
    setTokenIn,
    tokenOut,
    setTokenOut,
    tokenInStable,
    setTokenInStable,
    tokenOutStable,
    setTokenOutStable,
  } = useLocationStateInSwap();
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split('/');

  const [searchQuery, setSearchQuery] = useState('');
  const [show, setShow] = useState(false);
  const [showConfirmSwap, setShowConfirmSwap] = useState(false);
  const [showConfirmAddSupply, setShowConfirmAddSupply] = useState(false);
  const [showConfirmRemoveSupply, setShowConfirmRemoveSupply] = useState(false);

  const [slippage, setSlippage] = useState(0.5);
  const [recepient, setRecepient] = useState('');
  const [tokenType, setTokenType] = useState('tokenIn');

  const [firstTokenAmount, setFirstTokenAmount] = useState('');
  const [secondTokenAmount, setSecondTokenAmount] = useState('');
  const [swapData, setSwapData] = useState({});
  const [routeData, setRouteData] = useState({});
  const [computedOutDetails, setComputedOutDetails] = useState({});
  const [getTokenPrice, setGetTokenPrice] = useState({});
  const [userBalances, setUserBalances] = useState({});
  const [loading, setLoading] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState({});
  const [tokenContractInstances, setTokenContractInstances] = useState({});
  const [loaderInButton, setLoaderInButton] = useState(false);
  const [isStableSwap, setStableSwap] = useState(false);

  useEffect(() => {
    isStableSwap ? setTokenIn(tokenInStable) : setTokenIn(tokenIn);
    isStableSwap ? setTokenOut(tokenOutStable) : setTokenOut(tokenOut);
  }, [isStableSwap]);

  useEffect(() => {
    splitLocation[1] === 'stableswap' ? redirect(true) : setStableSwap(false);
    setActiveTab(splitLocation[1]);
  }, [splitLocation[1]]);

  const pairExist = useMemo(() => {
    return !!config.AMM[config.NETWORK][tokenIn.name].DEX_PAIRS[tokenOut.name];
  }, [tokenIn, tokenOut]);

  useEffect(() => {
    if (
      Object.prototype.hasOwnProperty.call(tokenIn, 'name') &&
      Object.prototype.hasOwnProperty.call(tokenOut, 'name')
    ) {
      if (tokenIn.name === tokenOut.name) {
        setTokenOut({});
      }
    }
  }, [tokenIn, tokenOut]);

  useEffect(() => {
    const updateBalance = async () => {
      setTokenContractInstances({});
      const userBalancesCopy = { ...userBalances };
      const tzBTCName = 'tzBTC';
      const balancePromises = [];
      if (!userBalancesCopy[tokenIn.name]) {
        tokenIn.name === tzBTCName
          ? balancePromises.push(fetchtzBTCBalance(props.walletAddress))
          : balancePromises.push(getUserBalanceByRpc(tokenIn.name, props.walletAddress));
      }
      if (!userBalancesCopy[tokenOut.name]) {
        tokenOut.name === tzBTCName
          ? balancePromises.push(fetchtzBTCBalance(props.walletAddress))
          : balancePromises.push(getUserBalanceByRpc(tokenOut.name, props.walletAddress));
      }
      if (config.AMM[config.NETWORK][tokenIn.name].DEX_PAIRS[tokenOut.name]) {
        const lpToken =
          config.AMM[config.NETWORK][tokenIn.name].DEX_PAIRS[tokenOut.name].liquidityToken;

        balancePromises.push(getUserBalanceByRpc(lpToken, props.walletAddress));
      }
      const balanceResponse = await Promise.all(balancePromises);

      setUserBalances((prev) => ({
        ...prev,
        ...balanceResponse.reduce(
          (acc, cur) => ({
            ...acc,
            [cur.identifier]: cur.balance,
          }),
          {},
        ),
      }));
    };
    updateBalance();
  }, [tokenIn, tokenOut]);

  useEffect(() => {
    if (activeTab === 'swap') {
      if (
        Object.prototype.hasOwnProperty.call(tokenIn, 'name') &&
        Object.prototype.hasOwnProperty.call(tokenOut, 'name')
      ) {
        getAllRoutes(tokenIn.name, tokenOut.name).then((response) => {
          if (response.success) {
            setRouteData(response);
            setSwapData(response.bestRouteUntilNoInput.swapData);
            setLoaderInButton(false);
          }
        });
      }
    }

    if (activeTab === 'liquidity') {
      if (
        Object.prototype.hasOwnProperty.call(tokenIn, 'name') &&
        Object.prototype.hasOwnProperty.call(tokenOut, 'name')
      ) {
        const pairExists = !!config.AMM[config.NETWORK][tokenIn.name].DEX_PAIRS[tokenOut.name];
        if (pairExists) {
          loadSwapData(tokenIn.name, tokenOut.name).then((data) => {
            if (data.success) {
              setSwapData(data);
              //setLoading(false);
              setLoaderInButton(false);
            }
          });
        }
      }
    }
  }, [tokenIn, tokenOut, activeTab]);

  const handleClose = () => {
    setShow(false);
    setShowConfirmSwap(false);
    setShowConfirmAddSupply(false);
    setShowConfirmRemoveSupply(false);
    //setHideContent('');
    setSearchQuery('');
    //setLoading(false);
  };

  const changeTokenLocation = () => {
    const tempTokenIn = tokenIn.name;
    const tempTokenOut = tokenOut.name;
    if (tokenOut.name) {
      setTokenIn({
        name: tokenOut.name,
        image: tokenOut.image,
      });
      setTokenOut({
        name: tokenIn.name,
        image: tokenIn.image,
      });
      isStableSwap &&
        setTokenInStable({
          name: tokenOut.name,
          image: tokenOut.image,
        });
      isStableSwap &&
        setTokenOutStable({
          name: tokenIn.name,
          image: tokenIn.image,
        });
      setSwapData({});
      setComputedOutDetails({
        tokenOut_amount: '',
      });
      setFirstTokenAmount('');
      setSecondTokenAmount('');

      loadSwapData(tempTokenOut, tempTokenIn).then((data) => {
        if (data.success) {
          setSwapData(data);
        }
      });
    }
  };

  const handleTokenType = (type) => {
    //setHideContent('content-hide');
    setShow(true);
    setTokenType(type);
    setLoading(false);
  };

  const handleTokenInput = (input) => {
    setFirstTokenAmount(input);
    setComputedOutDetails({});
    if (input === '' || isNaN(input)) {
      setFirstTokenAmount('');
      setSecondTokenAmount('');
      setComputedOutDetails({
        tokenOut_amount: '',
        fees: 0,
      });
    } else {
      let computedData;

      if (pairExist) {
        computedData = computeTokenOutput(
          parseFloat(input),
          swapData.tokenIn_supply,
          swapData.tokenOut_supply,
          swapData.exchangeFee,
          slippage,
        );
      } else {
        computedData = computeTokenOutForRouteBase(parseFloat(input), swapData, slippage);
      }

      setComputedOutDetails(computedData);
      setLoading(false);
    }
  };

  const handleOutTokenInput = (input) => {
    setSecondTokenAmount(input);
    setComputedOutDetails({});
    if (input === '' || isNaN(input)) {
      setSecondTokenAmount('');
      setFirstTokenAmount('');
      setComputedOutDetails({
        tokenOut_amount: '',
        fees: 0,
      });
    } else {
      let computedData;
      if (pairExist) {
        computedData = computeOutputBasedOnTokenOutAmount(
          parseFloat(input),
          swapData.tokenIn_supply,
          swapData.tokenOut_supply,
          swapData.exchangeFee,
          slippage,
        );
      } else {
        computedData = computeTokenOutForRouteBaseByOutAmount(
          parseFloat(input),
          swapData,
          slippage,
        );
      }
      setFirstTokenAmount(computedData.tokenIn_amount);
      setComputedOutDetails(computedData);
    }
  };

  const fetchUserWalletBalance = () => {
    setLoaderInButton(true);
  };

  useEffect(() => {
    if (!props.walletAddress) {
      return;
    }
    setLoaderInButton(true);
  }, [props.walletAddress]);

  useEffect(() => {
    //setLoading(true);
    setLoaderInButton(true);
    getTokenPrices().then((tokenPrice) => {
      setGetTokenPrice(tokenPrice);
      //setLoading(false);
    });
  }, []);

  const handleLoaderMessage = (type, message) => {
    setLoaderMessage({
      type: type,
      message: message,
    });
    setLoading(false);
  };

  const resetAllValues = () => {
    setSlippage(0.05);
    setRecepient('');
    setTokenType('tokenIn');
    setFirstTokenAmount('');
    setSecondTokenAmount('');
    setComputedOutDetails({
      tokenOut_amount: '',
    });
  };
  const [showRecepient, setShowRecepient] = useState(false);
  const handleRecepient = (elem) => {
    setRecepient(elem);
  };

  const [showTransactionSubmitModal, setShowTransactionSubmitModal] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const transactionSubmitModal = (id) => {
    setTransactionId(id);
    setShowTransactionSubmitModal(true);
  };

  const selectToken = (token) => {
    setLoaderInButton(true);
    setFirstTokenAmount('');
    setSecondTokenAmount('');
    setSwapData({});
    setComputedOutDetails({
      tokenOut_amount: '',
    });
    //setLoading(true);

    if (tokenType === 'tokenIn') {
      setTokenIn({
        name: token.name,
        image: token.image,
      });
    } else {
      setTokenOut({
        name: token.name,
        image: token.image,
      });
    }
    handleClose();
  };

  const redirect = (value) => {
    setStableSwap(value);
    value ? setActiveTab('stableswap') : setActiveTab('swap');
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={8} md={6} className="swap-content-section">
          <p
            className="redirect-label"
            style={{ cursor: 'pointer' }}
            onClick={() => redirect(!isStableSwap)}
          >
            {isStableSwap ? 'Redirect to Swap' : 'Redirect to StableSwap'}
            <span className={clsx('material-icons', 'arrow-forward', 'mt-1')}>
              arrow_forward_ios_icon
            </span>
          </p>
          <div className="border">
            <div className="bg-themed my-0 swap-content-container">
              <Tabs
                activeKey={activeTab}
                className="swap-container-tab"
                onSelect={(e) => setActiveTab(e)}
                mountOnEnter={true}
                unmountOnExit={true}
              >
                {isStableSwap ? (
                  <Tab
                    eventKey="stableswap"
                    title={
                      <span>
                        <span className="mr-2">Stableswap</span>
                        <Stableswap />
                      </span>
                    }
                  >
                    <SwapTab
                      walletAddress={props.walletAddress}
                      setFirstTokenAmount={handleTokenInput}
                      firstTokenAmount={firstTokenAmount}
                      secondTokenAmount={secondTokenAmount}
                      connecthWallet={props.connecthWallet}
                      tokenIn={tokenInStable}
                      tokenOut={tokenOutStable}
                      tokens={stableSwapTokens}
                      handleTokenType={handleTokenType}
                      swapData={swapData}
                      routeData={routeData}
                      computedOutDetails={computedOutDetails}
                      userBalances={userBalances}
                      tokenContractInstances={tokenContractInstances}
                      getTokenPrice={getTokenPrice}
                      setSlippage={setSlippage}
                      setRecepient={setRecepient}
                      recepient={recepient}
                      slippage={slippage}
                      loading={loading}
                      setLoading={setLoading}
                      handleLoaderMessage={handleLoaderMessage}
                      loaderMessage={loaderMessage}
                      setShowConfirmSwap={setShowConfirmSwap}
                      showConfirmSwap={showConfirmSwap}
                      handleClose={handleClose}
                      setLoaderMessage={setLoaderMessage}
                      resetAllValues={resetAllValues}
                      changeTokenLocation={changeTokenLocation}
                      handleOutTokenInput={handleOutTokenInput}
                      showRecepient={showRecepient}
                      transactionSubmitModal={transactionSubmitModal}
                      setSecondTokenAmount={setSecondTokenAmount}
                      fetchUserWalletBalance={fetchUserWalletBalance}
                      loaderInButton={loaderInButton}
                      setLoaderInButton={setLoaderInButton}
                      isStableSwap={isStableSwap}
                    />
                  </Tab>
                ) : (
                  <Tab eventKey="swap" title="Swap">
                    <SwapTab
                      walletAddress={props.walletAddress}
                      setFirstTokenAmount={handleTokenInput}
                      firstTokenAmount={firstTokenAmount}
                      secondTokenAmount={secondTokenAmount}
                      connecthWallet={props.connecthWallet}
                      tokenIn={tokenIn}
                      tokenOut={tokenOut}
                      tokens={tokens}
                      handleTokenType={handleTokenType}
                      swapData={swapData}
                      routeData={routeData}
                      computedOutDetails={computedOutDetails}
                      userBalances={userBalances}
                      tokenContractInstances={tokenContractInstances}
                      getTokenPrice={getTokenPrice}
                      setSlippage={setSlippage}
                      setRecepient={setRecepient}
                      recepient={recepient}
                      slippage={slippage}
                      loading={loading}
                      setLoading={setLoading}
                      handleLoaderMessage={handleLoaderMessage}
                      loaderMessage={loaderMessage}
                      setShowConfirmSwap={setShowConfirmSwap}
                      showConfirmSwap={showConfirmSwap}
                      handleClose={handleClose}
                      setLoaderMessage={setLoaderMessage}
                      resetAllValues={resetAllValues}
                      changeTokenLocation={changeTokenLocation}
                      handleOutTokenInput={handleOutTokenInput}
                      showRecepient={showRecepient}
                      transactionSubmitModal={transactionSubmitModal}
                      setSecondTokenAmount={setSecondTokenAmount}
                      fetchUserWalletBalance={fetchUserWalletBalance}
                      loaderInButton={loaderInButton}
                      setLoaderInButton={setLoaderInButton}
                      isStableSwap={isStableSwap}
                    />
                  </Tab>
                )}
                <Tab eventKey="liquidity" title="Liquidity">
                  <LiquidityTab
                    walletAddress={props.walletAddress}
                    setFirstTokenAmount={handleTokenInput}
                    firstTokenAmount={firstTokenAmount}
                    connecthWallet={props.connecthWallet}
                    tokenIn={tokenIn}
                    tokenOut={tokenOut}
                    handleTokenType={handleTokenType}
                    swapData={swapData}
                    computedOutDetails={computedOutDetails}
                    userBalances={userBalances}
                    tokenContractInstances={tokenContractInstances}
                    getTokenPrice={getTokenPrice}
                    setSlippage={setSlippage}
                    setRecepient={setRecepient}
                    recepient={recepient}
                    slippage={slippage}
                    loading={loading}
                    setLoading={setLoading}
                    handleLoaderMessage={handleLoaderMessage}
                    loaderMessage={loaderMessage}
                    handleClose={handleClose}
                    showConfirmAddSupply={showConfirmAddSupply}
                    setShowConfirmAddSupply={setShowConfirmAddSupply}
                    showConfirmRemoveSupply={showConfirmRemoveSupply}
                    setShowConfirmRemoveSupply={setShowConfirmRemoveSupply}
                    setLoaderMessage={setLoaderMessage}
                    resetAllValues={resetAllValues}
                    fetchUserWalletBalance={fetchUserWalletBalance}
                    setTokenIn={setTokenIn}
                    setTokenOut={setTokenOut}
                    tokens={tokens}
                    loaderInButton={loaderInButton}
                    setLoaderInButton={setLoaderInButton}
                  />
                </Tab>
              </Tabs>

              <TransactionSettings
                recepient={recepient}
                slippage={slippage}
                setSlippage={setSlippage}
                setRecepient={setRecepient}
                walletAddress={props.walletAddress}
                handleRecepient={handleRecepient}
                setShowRecepient={setShowRecepient}
              />
            </div>
          </div>
          <div className="bottom-footer mt-2 flex flex-row">
            <div>
              <img src={props.theme === 'light' ? Graph : GraphDark} alt="graph"></img>
            </div>
            <div className="ml-3">
              <span className="bottom-label">Stable Swap</span>
              <p className="bottom-desc">Lorem Ipsum is simply dummy text of.</p>
              {isStableSwap ? (
                <>
                  <span className="bottom-last">Learn More</span>
                </>
              ) : (
                <>
                  <span
                    className="bottom-last"
                    onClick={() => redirect(true)}
                    style={{ cursor: 'pointer' }}
                  >
                    Try it out
                  </span>
                  <span className="new">New</span>
                </>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <SwapModal
        show={show}
        activeTab={activeTab}
        onHide={handleClose}
        selectToken={selectToken}
        tokens={tokens}
        tokenIn={tokenIn}
        tokenOut={tokenOut}
        tokenType={tokenType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <InfoModal
        open={showTransactionSubmitModal}
        onClose={() => setShowTransactionSubmitModal(false)}
        message={'Transaction submitted'}
        buttonText={'View on Tezos'}
        onBtnClick={
          transactionId ? () => window.open(`https://tzkt.io/${transactionId}`, '_blank') : null
        }
      />

      <Loader loading={loading} loaderMessage={loaderMessage} />
    </Container>
  );
};

export default Swap;

Swap.propTypes = {
  connecthWallet: PropTypes.any,
  walletAddress: PropTypes.any,
  theme: PropTypes.any,
};
