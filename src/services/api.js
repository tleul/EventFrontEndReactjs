import axios from 'axios';

export default axios.create({
	baseURL: '/api/api',
	headers: {
		'Content-Type': 'application/json',
		'x-auth-user': localStorage.getItem('token'),
	},
});
