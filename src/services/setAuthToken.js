import API from './api';
const setAuthToken = (token) => {
	if (token) {
		API.defaults.headers.common['x-auth-user'] = token;
		localStorage.setItem('token', token);
	} else {
		delete API.defaults.headers.common['x-auth-user'];
		localStorage.removeItem('token');
	}
};
export default setAuthToken;
