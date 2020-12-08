import axios from 'axios';

export default axios.create({
	baseURL: 'http://3.101.22.177/api/api',
	headers: {
		'Content-Type': 'application/json',
		'x-auth-user': localStorage.getItem('token'),
	},
});
