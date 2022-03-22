import PropTypes from 'prop-types';
import { computeRemoveTokens, removeLiquidity } from '../../apis/swap/swap';
import { remove_liquidity, liqCalcRemove, getExchangeRate } from '../../apis/stableswap/stableswap';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import InfoModal from '../../Components/Ui/Modals/InfoModal';

import Button from '../../Components/Ui/Buttons/Button';
import CONFIG from '../../config/config';
import ConfirmRemoveLiquidity from '../../Components/SwapTabsContent/LiquidityTabs/ConfirmRemoveLiquidity';
import { setLoader } from '../../redux/slices/settings/settings.slice';

const RemoveLiquidityNew = (props) => {
  const [firstTokenAmount, setFirstTokenAmount] = useState('');
  const [showTransactionSubmitModal, setShowTransactionSubmitModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const [removableTokens, setRemovableTokens] = useState({});

  const [xtztoctez, setxtztoctez] = useState('0.00');
  const [cteztoxtz, setcteztoxtz] = useState('0.00');
  const fetchOutputData = async () => {
    const res = getExchangeRate(
      props.swapData.tezPool,
      props.swapData.ctezPool,
      props.swapData.target,
    );

    setxtztoctez(res.ctezexchangeRate.toFixed(6));
    setcteztoxtz(res.tezexchangeRate.toFixed(6));
  };
  useEffect(() => {
    if (props.isStableSwap) {
      fetchOutputData();
    }
  }, [props]);

  useEffect(() => {
    setErrorMessage(false);
  }, [props.tokenOut.name, firstTokenAmount]);

  const setErrorMessageOnUI = (value) => {
    setMessage(value);
    setErrorMessage(true);
  };
  const resetValues = () => {
    props.resetAllValues();
    setRemovableTokens({});
  };

  const removeLiquidityInput = (input) => {
    const removeAmount = parseFloat(input);
    let computedRemoveTokens;
    if (props.tokenIn.name === 'tez') {
      computedRemoveTokens = liqCalcRemove(
        removeAmount,
        props.swapData.tezPool,
        props.swapData.ctezPool,
        props.swapData.lpTokenSupply,
      );
    } else {
      computedRemoveTokens = computeRemoveTokens(
        removeAmount,
        props.swapData.lpTokenSupply,
        props.swapData.tokenIn_supply,
        props.swapData.tokenOut_supply,
        props.slippage,
      );
    }

    computedRemoveTokens = {
      ...computedRemoveTokens,
      removeAmount: removeAmount,
    };
    setRemovableTokens(computedRemoveTokens);
  };
  // const InfoMessage = useMemo(() => {
  //   return (
  //     <span>
  //       {lpTokenAmount.estimatedLpOutput} {props.tokenIn.name}/{props.tokenOut.name} LP Tokens
  //     </span>
  //   );
  // }, [lpTokenAmount.estimatedLpOutput]);

  const handleRemoveLiquidity = () => {
    props.setShowConfirmRemoveSupply(true);
    //props.setHideContent('content-hide');
  };
  const confirmRemoveLiquidity = () => {
    props.setLoading(true);
    props.setLoader(true);
    if (props.tokenIn.name === 'tez') {
      remove_liquidity(
        props.tokenIn.name,
        props.tokenOut.name,
        removableTokens.removeAmount,
        transactionSubmitModal,
        props.setShowConfirmRemoveSupply,
        resetValues,
      ).then((data) => {
        if (data.success) {
          props.setLoading(false);
          props.setShowConfirmRemoveSupply(false);
          transactionSubmitModal(data.operationId);
          props.handleLoaderMessage('success', 'Transaction confirmed');
          props.setLoader(false);
          //props.setHideContent('');
          resetValues();
          setTimeout(() => {
            props.setLoaderMessage({});
          }, 5000);
        } else {
          props.setLoading(false);
          props.handleLoaderMessage('error', 'Transaction failed');
          props.setLoader(false);
          props.setShowConfirmRemoveSupply(false);
          // props.setHideContent('');
          props.resetAllValues();
          setTimeout(() => {
            props.setLoaderMessage({});
          }, 5000);
        }
      });
    } else {
      removeLiquidity(
        props.tokenIn.name,
        props.tokenOut.name,
        removableTokens.tokenFirst_Out,
        removableTokens.tokenSecond_Out,
        removableTokens.removeAmount,
        props.walletAddress,
        props.swapData.dexContractInstance,
        transactionSubmitModal,
        resetValues,
        props.setShowConfirmRemoveSupply,
      ).then((data) => {
        if (data.success) {
          props.setLoading(false);
          props.handleLoaderMessage('success', 'Transaction confirmed');
          props.setLoader(false);
          props.setShowConfirmRemoveSupply(false);
          //props.setHideContent('');
          props.resetAllValues();
          setTimeout(() => {
            props.setLoaderMessage({});
          }, 5000);
        } else {
          props.setLoading(false);
          props.handleLoaderMessage('error', 'Transaction failed');
          props.setLoader(false);
          props.setShowConfirmRemoveSupply(false);
          // props.setHideContent('');
          props.resetAllValues();
          setTimeout(() => {
            props.setLoaderMessage({});
          }, 5000);
        }
      });
    }
  };

  let swapContentButton = (
    <Button
      onClick={props.connecthWallet}
      color={'primary'}
      startIcon={'add'}
      className={'mt-4 w-100 flex align-items-center justify-content-center'}
    >
      Connect Wallet
    </Button>
  );

  if (props.walletAddress) {
    swapContentButton = (
      <Button
        onClick={() => setErrorMessageOnUI('Enter an amount to withdraw')}
        color={'disabled'}
        className={'enter-amount mt-4 w-100 flex align-items-center justify-content-center'}
      >
        Confirm Withdrawal
      </Button>
    );
  }
  if (props.walletAddress && firstTokenAmount) {
    swapContentButton = (
      <Button
        onClick={handleRemoveLiquidity}
        color={'primary'}
        className={'mt-4 w-100 flex align-items-center justify-content-center'}
      >
        Confirm Withdrawal
      </Button>
    );
  }
  if (props.tokenIn.name && props.tokenOut.name) {
    if (
      props.walletAddress &&
      firstTokenAmount &&
      firstTokenAmount >
        props.userBalances[
          props.isStableSwap
            ? CONFIG.STABLESWAP[CONFIG.NETWORK][props.tokenIn.name].DEX_PAIRS[props.tokenOut.name]
                .liquidityToken
            : CONFIG.AMM[CONFIG.NETWORK][props.tokenIn.name].DEX_PAIRS[props.tokenOut.name]
                .liquidityToken
        ]
    ) {
      swapContentButton = (
        <Button
          onClick={() => null}
          color={'primary'}
          className={'enter-amount mt-4 w-100 flex align-items-center justify-content-center'}
        >
          Insufficient Balance
        </Button>
      );
    }
  }

  const transactionSubmitModal = (id) => {
    setTransactionId(id);
    setShowTransactionSubmitModal(true);
  };

  const onClickAmount = () => {
    const value =
      props.userBalances[
        props.isStableSwap
          ? CONFIG.STABLESWAP[CONFIG.NETWORK][props.tokenIn.name].DEX_PAIRS[props.tokenOut.name]
              .liquidityToken
          : CONFIG.AMM[CONFIG.NETWORK][props.tokenIn.name].DEX_PAIRS[props.tokenOut.name]
              .liquidityToken
      ].toLocaleString('en-US', {
        maximumFractionDigits: 20,
        useGrouping: false,
      }) ?? 0;
    setFirstTokenAmount(value.substring(0, value.length - 1));
    removeLiquidityInput(value.substring(0, value.length - 1));
  };

  return (
    <>
      <div className="lq-content-box">
        <div className={clsx('lq-token-select-box', errorMessage && 'errorBorder')}>
          <div className="token-selector-lq-remove align-items-center flex ">Amount to Remove</div>
          <div className="input-lq-remove  ">
            <div className="d-flex  align-items-center ">
              <div className="max-button" onClick={onClickAmount}>
                MAX
              </div>
              <div className="input-width">
                {props.swapData.success && props.userBalances[props.tokenIn.name] ? (
                  <input
                    type="text"
                    className="token-user-input-lq"
                    placeholder="0.0"
                    value={firstTokenAmount}
                    onChange={(e) => {
                      setFirstTokenAmount(e.target.value);
                      removeLiquidityInput(e.target.value);
                    }}
                  />
                ) : (
                  <input
                    type="text"
                    className="token-user-input-lq"
                    placeholder="0.0"
                    disabled
                    value={firstTokenAmount}
                  />
                )}
                <p className="wallet-token-balance-lq">
                  $0.0
                  {/* {props.tokenIn.name === 'tez'
                  ? (dolar * firstTokenAmount).toFixed(2)
                  : props.getTokenPrice.success && firstTokenAmount
                  ? (
                      firstTokenAmount * props.getTokenPrice.tokenPrice[props.tokenIn.name]
                    ).toFixed(5)
                  : '0.00'} */}
                </p>
              </div>
              <div className="balance-lq ml-auto">
                {props.walletAddress && props.tokenIn.name ? (
                  <p className="bal">
                    Balance:{' '}
                    {props.userBalances[
                      CONFIG.AMM[CONFIG.NETWORK][props.tokenIn.name].DEX_PAIRS[props.tokenOut.name]
                        .liquidityToken
                    ] >= 0 ? (
                      props.userBalances[
                        CONFIG.AMM[CONFIG.NETWORK][props.tokenIn.name].DEX_PAIRS[
                          props.tokenOut.name
                        ].liquidityToken
                      ].toFixed(4)
                    ) : (
                      <div className="shimmer">0.0000</div>
                    )}{' '}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lq-arrow-center remove-lq-arrow-center">
        <span className="material-icons-round">arrow_downward</span>
      </div>

      <div className="swap-content-box second-input">
        <div
          className={clsx(
            'lq-token-select-box',
            'remove-lq-input-height',

            errorMessage && 'errorBorder',
          )}
        >
          <div className="token-selector-lq-remove align-items-center flex remove-lq-border">
            You will receive
          </div>

          <div className="input-lq-remove d-flex">
            <div className="d-flex remove-tokens">
              <div>
                <img height="42" width="42" src={props.tokenIn.image} />
              </div>
              <div className="ml-2">
                <span className="remove-value-lq">
                  {removableTokens.tokenFirst_Out
                    ? removableTokens.tokenFirst_Out.toFixed(4)
                    : '0.00'}
                </span>
                <div className="remove-token-lq">{props.tokenIn.name}</div>
              </div>
            </div>
            <div className="ml-3 d-flex remove-tokens">
              <div>
                <img height="42" width="42" src={props.tokenOut.image} />
              </div>
              <div className="ml-2">
                <span className="remove-value-lq">
                  {removableTokens.tokenSecond_Out
                    ? removableTokens.tokenSecond_Out.toFixed(4)
                    : '0.00'}
                </span>
                <div className="remove-token-lq">{props.tokenOut.name}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {errorMessage && <span className="error-message">{message}</span>}

      {/* <div className="swap-detail-wrapper bg-themed-light">
        <div className="add-liquidity-tip">
          When you add liquidity, you will receive pool tokens representing your position. These
          tokens automatically earn fees proportional to your share of the pool, and can be redeemed
          at any time.
        </div>
      </div> */}

      {swapContentButton}
      {props.isPositionAvailable ? (
        <div className="your-positions">
          <div className="d-flex justify-content-between">
            <div className="left">
              <div className="your-positions-label ">Your Positions</div>
              <img width="50" height="50" src={props.tokenIn.image} />
              <img width="50" height="50" src={props.tokenOut.image} className="ml-2" />
              <span className="lp-pair">
                {props.tokenIn.name} / {props.tokenOut.name}
              </span>
              <div className="d-flex mt-2">
                <div>
                  <div className="token-name-lp">{props.tokenIn.name}</div>
                  <div className="tokenin-value">
                    <span className="value">
                      {props.positionDetails.data
                        ? props.positionDetails.data.tokenAPoolBalance.toFixed(10)
                        : '0.00'}
                    </span>{' '}
                    <span className="tokenName"> {props.tokenIn.name}</span>
                  </div>
                </div>
                <div className="ml-2">
                  <div className="token-name-lp">{props.tokenOut.name}</div>
                  <div className="tokenin-value">
                    <span className="value">
                      {props.positionDetails.data
                        ? props.positionDetails.data.tokenBPoolBalance.toFixed(10)
                        : '0.00'}
                    </span>{' '}
                    <span className="tokenName">{props.tokenOut.name}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-auto right">
              <div className="pool-tokens ml-auto">
                <div className="label">Pool Tokens</div>
                <div className="pool-value">
                  {props.positionDetails.data
                    ? props.positionDetails.data.lpBalance.toFixed(6)
                    : '0.00'}
                </div>
              </div>
              <div className="pool-share">
                <div className="label">Your pool share</div>
                <div className="pool-value">
                  {props.positionDetails.data
                    ? props.positionDetails.data.lpTokenShare.toFixed(6)
                    : '0.00'}{' '}
                  %
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <ConfirmRemoveLiquidity
        {...props}
        removableTokens={removableTokens}
        confirmRemoveLiquidity={confirmRemoveLiquidity}
        onHide={props.handleClose}
        xtztoctez={xtztoctez}
        cteztoxtz={cteztoxtz}
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
    </>
  );
};

const mapStateToProps = (state) => ({
  loader: state.settings.loader,
});

const mapDispatchToProps = (dispatch) => ({
  setLoader: (value) => dispatch(setLoader(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RemoveLiquidityNew);

RemoveLiquidityNew.propTypes = {
  theme: PropTypes.any,
  connecthWallet: PropTypes.any,
  setLoader: PropTypes.any,
  fetchUserWalletBalance: PropTypes.any,
  firstTokenAmount: PropTypes.any,
  getTokenPrice: PropTypes.any,
  handleClose: PropTypes.any,
  handleLoaderMessage: PropTypes.any,
  handleTokenType: PropTypes.any,
  loaderInButton: PropTypes.any,
  resetAllValues: PropTypes.any,
  setFirstTokenAmount: PropTypes.any,
  //setHideContent: PropTypes.any,
  setLoaderMessage: PropTypes.any,
  setLoading: PropTypes.any,
  setShowConfirmRemoveSupply: PropTypes.any,
  swapData: PropTypes.any,
  tokenContractInstances: PropTypes.any,
  tokenIn: PropTypes.any,
  tokenOut: PropTypes.any,
  userBalances: PropTypes.any,
  walletAddress: PropTypes.any,
  isStableSwap: PropTypes.any,
  getSwapData: PropTypes.func,
  setSwapData: PropTypes.func,
  slippage: PropTypes.any,
  positionDetails: PropTypes.any,
  isPositionAvailable: PropTypes.any,
};
