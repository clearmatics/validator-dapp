import React from 'react';
import ReactTable from 'react-table';
import LoadingData from './LoadingData';
import _ from 'lodash';
import loading from './assets/loading.svg';
import 'react-table/react-table.css';

class Validators extends React.Component {
	// constructor(props) {
	// 	super(props);
	// }

	state = {
		address: null,
		validators: null,
		name: null
	};
	handleAddressChange = e => {
		this.setState({ address: e.target.value });
	};

	handleNameChange = e => {
		this.setState({ name: e.target.value });
	};
	componentDidMount() {
		const { drizzle } = this.props;
		const contract = drizzle.contracts.Glienicke;

		const validators = contract.methods['getEnodeData'].cacheCall();
		this.setState({ validators });
	}

	addNode = (name, address) => {
		const { drizzle, drizzleState } = this.props;
		const contract = drizzle.contracts.Glienicke;

		contract.methods['addEnode'].cacheSend(name, address, {
			from: drizzleState.accounts[0],
			gas: 1000000
		});

		this.refs.name.value = '';
		this.refs.address.value = '';
	};

	removeNode = address => {
		const { drizzle, drizzleState } = this.props;
		const contract = drizzle.contracts.Glienicke;

		contract.methods['removeEnode'].cacheSend(address, {
			from: drizzleState.accounts[0],
			gas: 1000000
		});
	};

	render() {
		const { Glienicke } = this.props.drizzleState.contracts;

		const validators = Glienicke.getEnodeData[this.state.validators];
		let transactionList =
			validators && validators.value[0].length ? (
				<div>
					<span className="list-title">List of Validators</span>
					<div className="list">
						<ReactTable
							data={_.zipWith(
								validators.value[1],
								validators.value[0],
								(name, address) => ({ name, address })
							)}
							columns={[
								{
									Header: 'Validator Name',
									accessor: 'name',
									width: 130
								},
								{
									Header: 'Validator Address',
									accessor: 'address',
									width: 130
								},
								{
									Header: 'Remove Validator',
									accessor: 'address',
									width: 120,
									Cell: row => (
										<div>
											<button
												className="add-btn"
												onClick={() => this.removeNode(row.value)}
											>
												Remove
											</button>
										</div>
									)
								}
							]}
							defaultPageSize={5}
							className="-striped -highlight"
						/>
					</div>
				</div>
			) : (
				<p>No validators at present </p>
			);

		if (validators && validators.value) {
			return (
				<div className="validator-section">
					<div className="add-section">
						<input
							ref="name"
							type="text"
							id="name"
							placeholder="Name"
							onChange={this.handleNameChange}
						/>
						<input
							ref="address"
							type="text"
							id="address"
							placeholder="Address"
							onChange={this.handleAddressChange}
						/>

						<button
							className="add-btn"
							onClick={() => this.addNode(this.state.address, this.state.name)}
						>
							Add Validator
						</button>
					</div>
					{transactionList}
				</div>
			);
		} else {
			return <img alt="" className="loading-svg" src={loading} />;
		}
	}
}

export default LoadingData(Validators);
