import axios from 'axios';

const getToken = () => {
	return localStorage.getItem('JWT');
};

const authClient = axios.create({
	baseURL: 'http://localhost:8002/api-v1',
	headers: {
		'Content-Type': 'application/json',
	},
});
authClient.interceptors.request.use(
	(config) => {
		const token = getToken()
		if (token) {
			config.headers = {
				...config.headers, authorization: `JWT ${token}`
			}
		}
		return config
	}
)

authClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			console.error('Unauthorized: Redirecting to login...');
			localStorage.removeItem('JWT');
			window.location.href = '/login';
		}
		return Promise.reject(error);
	}
); export default authClient;

