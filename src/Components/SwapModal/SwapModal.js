import React from 'react';
import { Modal } from "react-bootstrap"

const SwapModal = props => {
	return (
		<Modal
			show={!!props.show}
			onHide={props.onHide}
			animation={false}
			className="swap-modal modal-themed">
			<Modal.Header closeButton className="border-bottom-themed">
				<Modal.Title><span className="span-themed">Select a token</span></Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="coin-selection-table">
					{props.show === "tokenIn" &&
						props.tokens.map((token, index) => {
							return (
								<button
									disabled={props.tokenIn.name === token.name}
									className="token-select-btn"
									key={index}
									onClick={() => {
										if (token.name === props.tokenOut.name) {
											props.onHide()
											props.handleStateSwap()
										} else {
											props.selectToken(token)
										}
										console.log(token, "tokenTop")
									}}>
									<img
										src={token.image}
										className="select-token-img"
										alt={token.name}
									/>
									<span className="span-themed">{token.name}</span>
								</button>
							)
						})}
					{props.show === "tokenOut" &&
						props.tokens.map((token, index) => {
							return (
								<button
									disabled={props.tokenOut.name === token.name}
									className="token-select-btn"
									key={index}
									onClick={() => {
										if (token.name === props.tokenIn.name) {
											props.onHide()
											props.handleStateSwap()
										} else {
											props.selectToken(token)
										}
										console.log(token, "tokenBottom")
									}}>
									<img
										src={token.image}
										className="select-token-img"
										alt={token.name}
									/>
									<span className="span-themed">{token.name}</span>
								</button>
							)
            })}
            {props.show !== "tokenOut" && props.show !== "tokenOut" && props.tokens.map((token, index) => {
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
	)
}

export default SwapModal
