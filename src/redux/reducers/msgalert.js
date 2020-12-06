import { SETMESSAGEALERT, REMOVEMESSAGEALERT } from '../actions/types';
const initialState = {
	msg: null,

	loading: false,
};

export default (state = initialState, action) => {
	const { payload, type } = action;

	switch (type) {
		case SETMESSAGEALERT:
			return {
				...state,
				msg: payload,
				loading: true,
			};

		case REMOVEMESSAGEALERT:
			return {
				...state,

				msg: null,
				loading: true,
			};
		default:
			return state;
	}
};
