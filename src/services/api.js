import axios from 'axios';

export default axios.create({
	baseURL: '/api',
	headers: {
		'Content-Type': 'application/json',
		'x-auth-user': localStorage.getItem('token'),
	},
});
