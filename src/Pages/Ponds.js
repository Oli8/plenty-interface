import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import kalamimg from '../assets/images/kalam.png';
import wrapimg from '../assets/images/wrap.png';
import { connect } from 'react-redux';
import * as pondsAction from '../redux/actions/ponds/ponds.action';
import * as walletActions from '../redux/actions/wallet/wallet.action';
import CONFIG from '../config/config';
import PondCard from '../Components/PondCard/PondCard';
import styles from '../assets/scss/partials/_farms.module.scss';
import Switch from '../Components/Ui/Switch/Switch';
import PondModals from '../Components/PondPage/PondModals';

const Ponds = (props) => {
  useEffect(() => {
    const fetchData = () => {
      renderPonds();
    };

    fetchData();
    const backgroundRefresh = setInterval(() => {
      fetchData();
    }, 60 * 1000);

    return () => clearInterval(backgroundRefresh);
  }, [props.isActiveOpen, props.userAddress, props.rpcNode]);
  const pondsCardListType = {
    KALAM: {
      image: kalamimg,
      harvestImg: kalamimg,
      title: 'KALAM',
    },
    WRAP: {
      image: wrapimg,
      harvestImg: wrapimg,
      title: 'WRAP',
    },
  };

  const renderPonds = () => {
    const pondsToBeRendered = [];
    for (const key in CONFIG.PONDS[CONFIG.NETWORK]) {
      for (const i in CONFIG.PONDS[CONFIG.NETWORK][key][
        props.isActiveOpen === true ? 'active' : 'inactive'
      ]) {
        pondsToBeRendered.push({
          pondData:
            CONFIG.PONDS[CONFIG.NETWORK][key][props.isActiveOpen === true ? 'active' : 'inactive'][
              i
            ],
          properties:
            pondsCardListType[
              CONFIG.PONDS[CONFIG.NETWORK][key][
                props.isActiveOpen === true ? 'active' : 'inactive'
              ][i].CARD_TYPE
            ],
          identifier: key,
          location: i,
          withdrawalFeeStructure:
            CONFIG.withdrawalFeeDistribution[
              CONFIG.PONDS[CONFIG.NETWORK][key][
                props.isActiveOpen === true ? 'active' : 'inactive'
              ][i].withdrawalFeeType
            ],
          title:
            CONFIG.PONDS[CONFIG.NETWORK][key][props.isActiveOpen === true ? 'active' : 'inactive'][
              i
            ].CARD_TYPE,
        });
      }
    }
    props.setPondsToRender(pondsToBeRendered);
  };

  return (
    <div>
      <div className="mt-5 d-flex justify-content-center w-100">
        <Switch
          value={props.isActiveOpen}
          onChange={() => props.togglePondsType(!props.isActiveOpen)}
          trueLabel={'Active'}
          falseLabel={'Inactive'}
          inverted={true}
        />
      </div>
      <div className={styles.cardsContainer}>
        {props.pondsToRender?.map((pond, index) => {
          return (
            <PondCard
              key={index}
              {...pond.properties}
              {...pond.poolData}
              identifier={pond.identifier}
              position={pond.location}
              {...props}
              {...pond}
            />
          );
        })}
        {props.pondsToRender.length <= 0 ? (
          <div style={{ textAlign: 'center' }}>
            <p>No active ponds</p>
            <br />
            <p>
              Stake not visible? Visit{' '}
              <a href="https://old.plentydefi.com/ponds" target="_blank" rel="noreferrer">
                {' '}
                old.plentydefi.com
              </a>{' '}
              to unstake
            </p>
          </div>
        ) : null}
        {/* {pondsList.map(pool => {
          return <PondCard key={pool.title} {...pool} walletAddress={walletAddress} />;
        })} */}
      </div>
      <PondModals />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userAddress: state.wallet.address,
    isActiveOpen: state.ponds.isActiveOpen,
    pondsToRender: state.ponds.pondsToRender,
    rpcNode: state.settings.rpcNode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    connectWallet: () => dispatch(walletActions.connectWallet()),
    togglePondsType: (isActive) => dispatch(pondsAction.togglePondsType(isActive)),
    setPondsToRender: (pondsToBeRender) => dispatch(pondsAction.setPondsToRender(pondsToBeRender)),
  };
};

Ponds.propTypes = {
  isActiveOpen: PropTypes.any,
  pondsToRender: PropTypes.any,
  rpcNode: PropTypes.any,
  setPondsToRender: PropTypes.any,
  togglePondsType: PropTypes.any,
  userAddress: PropTypes.any,
  walletAddress: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ponds);
