import axios from 'axios';
import { store } from '@/store';

// Cancel Token Request Interceptor
export default function setup() {
	axios.interceptors.request.use(function (config) {
		//  Generate cancel token source
		let source = axios.CancelToken.source();

		// Set cancel token on this request
		config.cancelToken = source.token;

		// Add to vuex to make cancellation available from anywhere
		store.commit('base/ADD_CANCEL_TOKEN', source);

		const token = store.getters['persist/getToken'];
		if (token) config.headers["Authorization"] = `Bearer ${token}`;

		/*if (store.persist.state.token) {
			console.log("add access token");
			config.headers["Authorization"] = `Bearer ${store.persist.state.token}`;
		}*/

		return config;
	}, function (error) {
		return Promise.reject(error);
	});
}