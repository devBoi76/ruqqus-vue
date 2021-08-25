import { store } from '@/store'
import axios from 'axios' 

axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}/api/v2`;

// Cancel Token Request Interceptor
export default function setup() {
	axios.interceptors.request.use(function (config) {
	//  Generate cancel token source
	let source = axios.CancelToken.source();
	
	// Set cancel token on this request
	config.cancelToken = source.token;
	// Add to vuex to make cancellation available from anywhere
	store.commit('base/ADD_CANCEL_TOKEN', source);

	return config;
}, function (error) {
	return Promise.reject(error);
});
}
