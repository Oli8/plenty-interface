import SimpleModal from "../Ui/Modals/SimpleModal";
import PropTypes from "prop-types";

import styles from './info-table-modal.module.scss';
import clsx from "clsx";
import useInfoTableHooks from "./infoTableHooks";

// ! TEMP variable
const tableData = [
  { col1: 1, col2: 0.77, col3: 7.43 },
  { col1: 7, col2: 5.45, col3: 52.01 },
  { col1: 30, col2: 23.39, col3: 222.39 },
  { col1: 365, col2: 283.65, col3: 2712.31 },
]

const InfoTableModal = props => {
  const { headerRow, formattedData, disclaimer } = useInfoTableHooks({ type: props.type, data: tableData })
  // const { headerRow, formatedData, disclaimer } = useInfoTableHooks({ type: props.type, data: props.tableData })

  return (
    <SimpleModal
      open={props.open}
      onClose={props.onClose}
      title={props.type === 'roi' ? 'ROI' : 'Withdrawal fee breakdown'}
      backdrop={true}
    >
      <div className={clsx(styles.infoTable, "w-100 mb-2")}>

        <div className="font-weight-bold">

          {headerRow?.map(x => <div key={x}>{x}</div>)}

        </div>

        {formattedData?.map(x => ( // TODO add props.tableData
          <div key={x.col1}>
            <div>{x.col1}</div>
            <div>{x.col2}</div>
            <div>{x.col3}</div>
          </div>
        ))}

      </div>

      <div className={styles.caption}>
        {disclaimer}
      </div>
    </SimpleModal>
  )
}

InfoTableModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  tableData: PropTypes.array.isRequired,
  type: PropTypes.oneOf(["roi", "withdrawal"]),
};

export default InfoTableModal;
