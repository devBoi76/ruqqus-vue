import axios from 'axios';

const HTTP = axios.create({
	baseURL: `${import.meta.env.VITE_BASE_URL}/api/v2`,
});

HTTP.defaults.withCredentials = true;

export { HTTP };