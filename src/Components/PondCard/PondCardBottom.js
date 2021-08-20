import { useRef, useState } from "react";
import Button from "../Ui/Buttons/Button";
import PropTypes from 'prop-types'


import styles from "../../assets/scss/partials/_farms.module.scss"
import clsx from "clsx";
import QuantityButton from "../Ui/Buttons/QuantityButton";
import { Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { openCloseFarmsModal } from "../../redux/actions/farms/farms.actions";
import { FARM_PAGE_MODAL } from "../../constants/farmsPage";

const FarmCardBottom = (props) => {
  const [ isExpanded, toggleExpand ] = useState(false);
  const target = useRef(null);
  const dispatch = useDispatch()

  const hasStakedAmount = () => {
    // return props.userStakes.hasOwnProperty(props.CONTRACT) && props.userStakes[props.CONTRACT].stakedAmount > 0;
    return false
  }

  const onWithdrawalFeeClick = () => {
    dispatch(openCloseFarmsModal({ open: FARM_PAGE_MODAL.WITHDRAWAL, contractAddress: props.CONTRACT }))
  }

  return (
    <>

      <div className={clsx(
        styles.plentyCardContent,
        {
          "mt-4": isExpanded,
          "pt-0": !isExpanded,
          [styles.topBorder]: isExpanded,
          [styles.bottomBorder]: isExpanded
        }
      )}>

        {(hasStakedAmount() || isExpanded) && (
          <div className="d-flex">
            <div className={clsx(styles.harvestStakeAmt, "mr-2 justify-content-between")}>
              <Image height={31} src={props.harvestImg} fuild className="mt-auto mb-auto ml-2" />
              <span>
                {
                  // (
                  //   props.userAddress !== null &&
                  //   props.harvestValueOnFarms.hasOwnProperty(props.isActiveOpen) &&
                  //   props.harvestValueOnFarms[props.isActiveOpen].hasOwnProperty(props.CONTRACT)&&
                  //   props.harvestValueOnFarms[props.isActiveOpen][props.CONTRACT].totalRewards > 0
                  // )
                  //   ? props.harvestValueOnFarms[props.isActiveOpen][props.CONTRACT].totalRewards.toFixed(6)
                  //  : 0
                  0
                }
              </span>
            </div>

            <Button
              onClick={() => null}
              color={hasStakedAmount() ? "primary" : "default"}
            >
              Harvest
            </Button>
          </div>
        )}

        {isExpanded && (
          <>
            <div className="mt-3 mb-2">{props.title}</div>

            <div className="d-flex">

              <div className={clsx(styles.harvestStakeAmt, "mr-2 justify-content-end")}>
                <span>{
                  // props.userStakes.hasOwnProperty(props.CONTRACT) ? props.userStakes[props.CONTRACT].stakedAmount : 0
                  0
                }</span>
              </div>
              <span />
              {
                (props.stakedAmount > 0 ) // TODO add proper variable
                  ? <QuantityButton onAdd={() => null} onRemove={() => null}/>
                  : <Button onClick={() => null} color={"default"}>Stake</Button>
              }
            </div>
          </>
        )}

      </div>

      {
        isExpanded && (
          <>

            <div className={clsx(styles.plentyCardContent, styles.bottomBorder, "d-flex")}>
              <div className={clsx(styles.rightBorder, "w-50 text-center")}>
                <div>Deposit Fee</div>
                <OverlayTrigger
                  key="top"
                  placement="top"
                  overlay={
                    <Tooltip id={`deposit-fee-tooltip`} arrowProps={{ styles: {display: 'none'}}}>
                      No deposit fee
                    </Tooltip>
                  }
                >
                  <Button
                    id={`deposit-fee`}
                    ref={target}
                    size="small"
                    color="mute"
                    startIcon="help_outline"
                    className="mt-1 ml-auto mr-auto"
                    rounded={false}
                    onClick={undefined}
                  >0%</Button>
                </OverlayTrigger>
              </div>

              <div className={"w-50 text-center"}>
                <div>Withdrawal Fee</div>
                <Button
                  size="small"
                  color="mute"
                  startIcon="help_outline"
                  className="mt-1 ml-auto mr-auto"
                  rounded={false}
                  onClick={onWithdrawalFeeClick}
                >Variable</Button>
              </div>
            </div>

            <div className={styles.plentyCardContent}>
              <Button className="w-100" color={"default"} onClick={() => null}>
                View On Tezos
              </Button>
            </div>
          </>
        )
      }
      <div className="d-flex justify-content-center">
        <Button
          onClick={() => toggleExpand(!isExpanded)}
          isIconBtn={true}
          startIcon={isExpanded ? 'expand_less' : 'expand_more'}
          color={"mute"}
        />
      </div>
    </>
  )
};

FarmCardBottom.propTypes = {
  title: PropTypes.string.isRequired
}

export default FarmCardBottom;