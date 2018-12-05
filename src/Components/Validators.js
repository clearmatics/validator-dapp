import React from 'react';
import ReactTable from 'react-table';
import loading from '../assets/loadingIcon.svg';
import 'react-table/react-table.css';

class Validator extends React.Component {
	state = {
		node: null,
		validator: null,
		addVal: null,
		removeVal: null
	};
	handleAddressChange = e => {
		this.setState({ node: e.target.value });
	};

	// get validator list
	componentDidMount() {
		const { drizzle } = this.props;
		const obsContract = drizzle.contracts.Soma;

		const validator = obsContract.methods['getValidators'].cacheCall();
		this.setState({ validator });
	}

	addValidator = node => {
		const { drizzle, drizzleState } = this.props;
		const contract = drizzle.contracts.Soma;

		const addVal = contract.methods['AddValidator'].cacheSend(node, {
			from: drizzleState.accounts[0],
			gas: 1000000
		});

		this.setState({ addVal });
		this.refs.node.value = null;
	};

	removeValidator = node => {
		const { drizzle, drizzleState } = this.props;
		const contract = drizzle.contracts.Soma;

		const removeVal = contract.methods['RemoveValidator'].cacheSend(node, {
			from: drizzleState.accounts[0],
			gas: 1000000
		});
		this.setState({ removeVal });
	};

	getTxStatus = () => {
		// get the transaction states from the drizzle state
		const { transactions, transactionStack } = this.props.drizzleState;

		// get the transaction hash using our saved `status`
		const addHash = transactionStack[this.state.addVal];
		const removeHash = transactionStack[this.state.removeVal];

		// if transaction hash does not exist, don't display anything
		if (!addHash && !removeHash) return null;
		// otherwise, return the transaction status
		console.log(addHash);
		console.log(removeHash);
		if (
			transactions &&
			transactions[addHash] &&
			transactions[addHash].status === 'pending'
		) {
			return true;
		} else if (
			transactions &&
			transactions[removeHash] &&
			transactions[removeHash].status === 'pending'
		) {
			return true;
		} else return false;
	};

	render() {
		const { Soma } = this.props.drizzleState.contracts;
		const validators = Soma.getValidators[this.state.validator];
		const validatorData = validators && validators.value;
		let valError = validatorData
			? validatorData.some(validator => validator === this.state.node)
			: null;

		return (
			<div>
				<div className="transaction-loading">
					<img alt="" src={this.getTxStatus() ? loading : null} />
				</div>
				<div className="add-section">
					<p className={valError ? 'active-error' : 'error'}>
						This Validator is already present
					</p>
					<input
						ref="node"
						type="text"
						id="node"
						placeholder="Address"
						autoComplete="off"
						onChange={this.handleAddressChange}
					/>

					<button
						disabled={valError ? true : false}
						className="add-btn"
						onClick={() =>
							this.addValidator(this.state.node, this.setState({ node: null }))
						}
					>
						Add Validator
					</button>
				</div>

				<div className="list-title">
					<span>
						{' '}
						Current number of Validators{' '}
						{validatorData ? validators.value.length : 0}{' '}
					</span>
				</div>

				<div className="list">
					{validatorData ? (
						<ReactTable
							data={validators.value.map(address => ({ address }))}
							columns={[
								{
									Header: 'Validator Address',
									accessor: 'address',
									width: 440
								},
								{
									Header: 'Remove Validator',
									accessor: 'address',
									width: 150,
									Cell: row => (
										<div>
											<button
												className="remove-btn"
												onClick={() => this.removeValidator(row.value)}
											>
												Remove
											</button>
										</div>
									)
								}
							]}
							defaultPageSize={10}
							className="-striped -highlight"
						/>
					) : (
						<p>No validators at present </p>
					)}
				</div>
			</div>
		);
	}
}

export default Validator;
