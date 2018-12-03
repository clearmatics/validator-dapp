import { CONTRACT_DATA } from '../actions/constants';

const initialState = {
	drizzle: [],
	drizzleState: []
};

const contract = (state = initialState, action) => {
	switch (action.type) {
	case CONTRACT_DATA:
		return {
			...state,
			drizzle: action.drizzle,
			drizzleState: action.drizzleState
		};
	default:
		return state;
	}
};
export default contract;
