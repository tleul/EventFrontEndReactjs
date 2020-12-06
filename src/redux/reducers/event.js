import {
	EVENTCREATESUCCESS,
	EVENTDELETESUCCESS,
	EVENTUPDATESUCCESS,
	LOADEVENT,
} from './../actions/types';

const initialState = {
	event: [],
	loading: false,
};

export default (state = initialState, action) => {
	const { payload, type } = action;

	switch (type) {
		case EVENTCREATESUCCESS:
		case EVENTDELETESUCCESS:
		case EVENTUPDATESUCCESS:
		case LOADEVENT:
			return {
				...state,
				event: payload,
				loading: true,
			};

		default:
			return state;
	}
};
