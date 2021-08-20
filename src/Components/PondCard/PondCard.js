import styles from '../../assets/scss/partials/_farms.module.scss';
import Image from 'react-bootstrap/Image';
import clsx from 'clsx';
import PondCardBottom from './PondCardBottom';
import Button from '../Ui/Buttons/Button';

import CalculatorSvg from '../../assets/images/icons/calculator.svg';
import { numberWithCommas } from '../../utils/formatNumbers';
import { useDispatch } from 'react-redux';
import { openClosePondsModal } from '../../redux/actions/ponds/ponds.action';
import { POND_PAGE_MODAL } from '../../constants/pondsPage';

const PondCard = (props) => {
  const dispatch = useDispatch();

  const apyCalculate = (apr) =>
    ((Math.pow(1 + apr / 100 / 365, 365) - 1) * 100).toFixed(0);

  const getAPR = (props) => {
    // try {
    //   if (props.isActiveOpen === true) {
    //     if (props.activePondData.isPresent === true) {
    //       const apr = props.activePondData.data.response[props.CONTRACT]?.APR ?? 0;
    //       return Math.round(apr);
    //     }
    //
    //     return 0;
    //   }
    //
    //   return 0;
    // } catch (e) {
    //   return 0;
    // }

    return 0;
  };

  const getAPY = (props) => {
    // if (props.isActiveOpen === true) {
    //   if (props.activePondData.isPresent === true) {
    //     const apy = apyCalculate(
    //       props.activePondData.data.response[props.CONTRACT]?.APR?.toFixed(2) ?? 0
    //     );
    //
    //     return numberWithCommas(Math.round(apy));
    //   }
    //
    //   return 0;
    // }

    return 0;
  };

  const getReward = () => {
    // if(props.isActiveOpen === true) {
    //   if(props.activePondData.isPresent === true) {
    //     return (props.activePondData.data.response[props.CONTRACT]?.rewardRate ?? 0) * 2880;
    //   }
    //
    //   return 0;
    // }

    return 0;
  };

  const getTotalLiquidity = () => {
    // if (props.isActiveOpen === true) {
    //   if (props.activePondData.isPresent === true) {
    //     return numberWithCommas(props.activePondData.data.response[props.CONTRACT]?.totalLiquidty?.toFixed(0) ?? 0);
    //   }
    //
    //   return 0;
    // }

    return 0;
  };

  const hasStakedAmount = () => {
    // return props.userStakes.hasOwnProperty(props.CONTRACT) && props.userStakes[props.CONTRACT]?.stakedAmount > 0;
    return false;
  };

  const onRoiClick = () => {
    dispatch(
      openClosePondsModal({
        open: POND_PAGE_MODAL.ROI,
        contractAddress: props.CONTRACT,
      })
    );
  };

  return (
    <>
      <div>
        <div className={styles.plentyCard}>
          {/* * Header */}
          <div className="pool-card-top-banner">
            <p className="pool-card-top-banner-text">
              Visit old.plentydefi.com to unstake
            </p>
          </div>
          <div
            className={clsx(
              styles.plentyCardHeader,
              'flex justify-content-center align-center p-26 pb-20'
            )}
          >
            <div className={clsx(styles.imageWrapperSingle, 'mr-2')}>
              <Image src={props.image} fluid />
            </div>
            <div>
              <p className={styles.title}>{props.title}</p>
            </div>
          </div>
          {/* * Header */}

          {/* * Content */}
          <div className={clsx(styles.plentyCardContent, 'pb-0')}>
            <div
              className={clsx(
                styles.plentyCardContentInfo,
                'flex justify-between'
              )}
            >
              <p className={styles.plentyCardContentTag}>APY:</p>
              <p className={styles.plentyCardContentTag}>{getAPY(props)}%</p>
            </div>
            <div
              className={clsx(
                styles.plentyCardContentInfo,
                'flex justify-between'
              )}
            >
              <p className={styles.plentyCardContentTag}>APR:</p>
              <p className={styles.plentyCardContentTag}>
                <img
                  src={CalculatorSvg}
                  alt={'Check ROI'}
                  className={styles.roiInfoImg}
                  onClick={onRoiClick}
                />
                {getAPR(props)}%
              </p>
            </div>
            <div
              className={clsx(
                styles.plentyCardContentInfo,
                'flex justify-between'
              )}
            >
              <p className={styles.plentyCardContentTag}>Rewards:</p>
              <p className={styles.plentyCardContentTag}>
                {getReward()} PLENTY / DAY
              </p>
            </div>

            <div
              className={clsx(
                styles.plentyCardTvlInfo,
                'flex justify-between align-center mb-4'
              )}
            >
              <p className={styles.plentyCardContentTag}>TVL:</p>
              <p className={styles.plentyCardContentTag}>
                ${getTotalLiquidity()}
              </p>
            </div>

            {props.userAddress ? (
              !hasStakedAmount() ? (
                <Button
                  onClick={() => null}
                  color={'primary'}
                  className="w-100"
                >
                  Stake
                </Button>
              ) : null
            ) : (
              <Button
                onClick={props.connectWallet}
                color={'primary'}
                className="w-100"
                startIcon="add"
              >
                Connect Wallet
              </Button>
            )}
          </div>
          {/* * Content */}

          <PondCardBottom {...props} />
        </div>
      </div>
      {/* <StakeModal open={props.isStakeModalOpen} onClose={() => props.closePondsStakeModal()} tokenData={{title: props.title}} /> */}
    </>
  );
};

export default PondCard;
