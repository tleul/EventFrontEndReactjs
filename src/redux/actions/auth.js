import API from '../../services/api';
import setAuthToken from '../../services/setAuthToken';
import { toast } from 'react-toastify';
import {
	LOGINSUCCESS,
	LOGINFAIL,
	REGISTERSUCCESS,
	REGISTERFAIL,
	LOGOUT,
	LOADUSER,
} from './types';

export const registeruser = (user, admin) => async (dispatch) => {
	try {
		const admininfo = {
			admin: admin.admin,
			adminPin: admin.adminPin,
		};
		const body = { ...user, ...admininfo };
		console.log(body, admin);
		const response = await API.post('/admin', body);
		localStorage.setItem('token', response.headers['x-auth-user']);

		dispatch({ type: REGISTERSUCCESS, payload: response.data });
		toast('You have been Registered Succesfuly', {
			preventDuplicate: true,
		});
	} catch (error) {
		console.log(error.response.data.msg);
		toast(error.response.data.msg, {
			preventDuplicate: true,
		});
	}
};

export const logoutuser = () => (dispatch) => {
	localStorage.removeItem('token');
	dispatch({ type: LOGOUT });
};

export const loginuser = (user) => async (dispatch) => {
	try {
		const response = await API.post('/admin/login', user);
		localStorage.setItem('token', response.headers['x-auth-user']);
		dispatch({ type: LOGINSUCCESS, payload: response.data });
	} catch (error) {
		console.log(error);
	}
};

export const loaduser = () => async (dispatch) => {
	try {
		let token = localStorage.getItem('token');
		if (!token) return dispatch({ type: LOGINFAIL });

		setAuthToken(token);
		const response = await API.get('/auth');

		dispatch({ type: LOADUSER, payload: response.data });
	} catch (error) {
		dispatch({ type: LOGINFAIL });
	}
};
