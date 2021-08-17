import SimpleModal from "./SimpleModal";
import PropTypes from "prop-types";
import Button from "../Buttons/Button";

import styles from './modal.module.scss'
import clsx from "clsx";
import { useState , useEffect } from "react";
import { Collapse } from "react-bootstrap";

// ! TEMP variable
const BUTTON_TEXT = {
  SELECT: 'Select stake',
  CONFIRM: 'Confirm unstake',
}


const UnstakeModal = props => {

  const [open, setOpen] = useState(false);
  const [buttonText, setButtonText] = useState(BUTTON_TEXT.CONFIRM)
  const [selected, setSelected] = useState([]);

  const calculateFee = (difference ,obj) => {
    let feeObj = {mapId : obj.mapId}
    let fee = -1;
      for (let i = 0; i < props.withdrawalFeeStructure.length; i++) {
        if (difference < props.withdrawalFeeStructure[i].block) {
          fee = ((obj.amount * props.withdrawalFeeStructure[i].rate) / 100).toFixed(10);
          fee = parseFloat(fee);
          feeObj['rate'] = props.withdrawalFeeStructure[i].rate;
          feeObj['fee'] = fee;
          feeObj['amount']=obj.amount
          break;
        }
      }
      if (fee === -1) {
        fee = (
          (obj.amount * props.withdrawalFeeStructure[props.withdrawalFeeStructure.length - 1].rate) /
          100
        ).toFixed(10);
        fee = parseFloat(fee);
        feeObj['rate'] = props.withdrawalFeeStructure[props.withdrawalFeeStructure.length - 1].rate;
        feeObj['fee'] = fee;
        feeObj['amount']=obj.amount
      }
      return feeObj;
  }

  const onStakeSelect = (obj) => {
    if(selected.findIndex(sel => sel.mapId === obj.mapId) === -1) {
      let difference = props.currentBlock - parseInt(obj.block);
      let calculatedFee = calculateFee(difference,obj);
      setSelected([ ...selected, calculatedFee ])
    } else {
      setSelected(selected.filter(x => x.mapId !== obj.mapId));
    }
}

  return (
    <SimpleModal
      open={props.open}
      onClose={props.onClose}
      title={`Unstake ${props.tokenData.title} tokens`}
    >
      <div className={styles.unStakeModal}>

        <div className={styles.unstakeSelectWrapper}>
          <div
            className={clsx(
              styles.unstakeSelect,
              "d-flex justify-content-between",
              {[styles.active]: open})}
          >
            <span>Select stake</span>
            <Button
              className={(clsx(styles.collapseBtn, { [styles.active]: open }))}
              isIconBtn={true}
              color="secondary"
              startIcon="expand_more"
              onClick={() => setOpen(!open)}
            />
          </div>

          <Collapse in={open}>
              
            <div className={styles.collapsedContent}>
              {
                props.userStakes[props.CONTRACT].singularStakes.map((x,index) => (
                  <label key={x.mapId} className={styles.stakedItem}>
                    <div className="d-flex justify-content-between flex-grow-1">
                      <span>{'Stake ' + x.mapId}</span>
                      <span>{x.amount}</span>
                    </div>
                    <input
                      type="checkbox"
                      className="ml-2"
                      checked={selected.findIndex(sel => sel.mapId === x.mapId) >= 0}
                      onChange={() => onStakeSelect(x, props)}
                    />
                  </label>
                ))
              }
            </div>
          </Collapse>

        </div>

        <div className="d-flex justify-content-end mr-2 mb-2">
          <div>Total staked balance: {props.userStakes[props.CONTRACT].stakedAmount}</div>
        </div>

        {
          selected.length > 0 && (
            <>
              <div className="mb-2">Fee Breakdown</div>

              <div className={styles.feeBreakdownWrapper}>
                <div className={clsx(styles.feeBreakdownTable, "pb-2")}>
                  {
                    selected.map(x => (
                      <div>
                        <div>{'Stake ' + x.mapId}</div>
                        <div>{x.rate+'%'}</div>
                        <div>{x.fee}</div>
                      </div>
                    ))
                  }
                </div>
                <div className={clsx(styles.totalRow, "pt-2")}>
                  <div>Total</div>
                  <div />
                  <div>{selected.reduce((acc, cur) => acc + cur.fee, 0)}</div>
                </div>
              </div>
            </>
          )
        }

        <Button onClick={() => props.unstakeOnFarm(selected,props.identifier,props.isActiveOpen,props.position)} color="primary" className="w-100 mt-4">{buttonText}</Button>
      </div>
    </SimpleModal>
  )
}


UnstakeModal.propTypes = {
  tokenData: PropTypes.any, // TODO add types
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default UnstakeModal;