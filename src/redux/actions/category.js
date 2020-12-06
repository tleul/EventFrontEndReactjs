import API from '../../services/api';

import {
	CATEGORYCREATESUCCESS,
	CATEGORYDELETESUCCESS,
	CATEGORYUPDATESUCCESS,
	LOADCATEGORY,
	REMOVEMESSAGEALERT,
	SETMESSAGEALERT,
} from './types';

export const loadcategory = () => async (dispatch) => {
	const { data } = await API.get('/catagory');

	dispatch({ type: LOADCATEGORY, payload: data });
};

export const deletecategory = (id) => async (dispatch) => {
	try {
		const res = await API.delete(`/catagory/${id}`);

		dispatch(loadcategory());
	} catch (error) {
		dispatch({ type: SETMESSAGEALERT, payload: error.response.data });
		setTimeout(() => {
			dispatch({ type: REMOVEMESSAGEALERT });
		}, 10000);
	}
};
