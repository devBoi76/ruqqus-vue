// API endpoints for interfacing with Ruqqus feeds
// For documentation on these endpoints (and our entire API), please visit postman url here

import axios from 'axios';

const url = 'http://localhost/api/v2/feed/'

// Return a posts of a feed. For demonstration purposes.
export function getFeed(type, params) {
	return axios.get(url, {
		params: params
	});
}

// Return a posts of a feed. Requires a type (all, hot, etc). Optional parameters for sort, pagination, etc
// export function getFeed(type, params) {
// 	return axios.get(url+type, {
// 		params: params
// 	});
// }





