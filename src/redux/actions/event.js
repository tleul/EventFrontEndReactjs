import { filter } from 'lodash';
import { toast } from 'react-toastify';
import API from '../../services/api';

import {
	EVENTCREATESUCCESS,
	EVENTDELETESUCCESS,
	EVENTUPDATESUCCESS,
	LOADEVENT,
} from './types';

export const loadevent = () => async (dispatch) => {
	const response = await API.get('/event');

	dispatch({ type: LOADEVENT, payload: response.data });
};
export const filterevent = (categoryID) => async (dispatch) => {
	const response = await API.get('/event');
	const filteredEvent = response.data.filter(
		(event) => event.event_category._id === categoryID,
	);
	dispatch({ type: LOADEVENT, payload: filteredEvent });
	console.log(filteredEvent);
};

export const deleteevent = (event) => async (dispatch) => {
	try {
		const response = await API.delete(`/event/${event._id}`);

		toast(event.event_Name + ' ' + response.data.msg, {
			preventDuplicate: true,
		});
		dispatch(loadevent());
	} catch (error) {
		toast('Netowork Error', {
			preventDuplicate: true,
		});
	}
};

export const addevent = (body) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const response = await API.post(
			'/event',
			body,
		);
		return response.status === 200;
	} catch (error) {
		console.log(error);
	}
};
export const updateevent = (body, id) => async (dispatch) => {
	console.log(body);
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const response = await API.put(
			'/event/' + id,
			body,
		);
		return response.status === 200;
	} catch (error) {
		console.log(error);
	}
};
