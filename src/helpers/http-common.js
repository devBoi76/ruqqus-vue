import axios from 'axios';
import interceptors from '@/helpers/interceptors.js'

const HTTP = axios.create({
	baseURL: `${import.meta.env.VITE_BASE_URL}/api/v2`,
});

HTTP.defaults.withCredentials = true;


export { HTTP };