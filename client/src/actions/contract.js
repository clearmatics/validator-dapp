import { CONTRACT_DATA } from './constants';

export const setContractData = (drizzle, drizzleState) => {
	return dispatch => {
		dispatch({
			type: CONTRACT_DATA,
			drizzle,
			drizzleState
		});
	};
};
