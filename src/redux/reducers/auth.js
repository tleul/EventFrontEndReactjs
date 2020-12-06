import {
	LOGINSUCCESS,
	LOGINFAIL,
	REGISTERSUCCESS,
	REGISTERFAIL,
	LOGOUT,
	LOADUSER,
} from './../actions/types';

const initialState = {
	isAuthenticated: false,
	user: null,
	loading: false,
};

export default (state = initialState, action) => {
	const { payload, type } = action;

	switch (type) {
		case LOGINSUCCESS:
		case REGISTERSUCCESS:
		case LOADUSER:
			return {
				...state,
				isAuthenticated: true,
				user: payload,
				loading: true,
			};
		case LOGOUT:
		case LOGINFAIL:
		case REGISTERFAIL:
			return {
				...state,
				isAuthenticated: false,
				user: null,
				loading: true,
			};
		default:
			return state;
	}
};
