import React from 'react';
import { Modal } from 'react-bootstrap';

const SwapModal = (props) => {
  const tokensToShow = props.tokens.filter((token) => {
    // if ((props.tokenIn.name !== token.name) && (props.tokenIn.name == 'PLENTY')) {
    //   return token;
    // } else {
    //   return
    // }
    if (props.tokenIn.name !== 'PLENTY' && props.tokenType == 'tokenOut') {
      return token.name == 'PLENTY';
    } else if (props.tokenIn.name !== token.name) {
      return token;
    }
  });
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      animation={false}
      className="swap-modal modal-themed"
    >
      <Modal.Header closeButton className="border-bottom-themed">
        <Modal.Title>
          <span className="span-themed">Select a token</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="coin-selection-table">
          {tokensToShow.map((token, index) => {
            return (
              <button
                className="token-select-btn"
                key={index}
                onClick={() => props.selectToken(token)}
              >
                <img
                  src={token.image}
                  className="select-token-img"
                  alt={token.name}
                />
                <span className="span-themed">{token.name}</span>
              </button>
            );
          })}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SwapModal;
