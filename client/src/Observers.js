import React from 'react';
import ReactTable from 'react-table';
import LoadingData from './LoadingData';
import _ from 'lodash';
import loading from './assets/loading.svg';
import 'react-table/react-table.css';

class Observers extends React.Component {
	state = {
		validators: null
	};

	componentDidMount() {
		const { drizzle } = this.props;
		const contract = drizzle.contracts.Glienicke;

		const validators = contract.methods['getEnodeData'].cacheCall();
		this.setState({ validators });
	}

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
									width: 230
								},
								{
									Header: 'Validator Address',
									accessor: 'address',
									width: 230
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
			return <div className="validator-section">{transactionList}</div>;
		} else {
			return <img alt="" className="loading-svg" src={loading} />;
		}
	}
}

export default LoadingData(Observers);
