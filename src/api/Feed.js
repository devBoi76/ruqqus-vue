// API endpoints for interfacing with Ruqqus feeds
// For documentation on these endpoints (and our entire API), please visit postman url here

import axios from 'axios';

const url = 'https://ed938631-cc32-4bb1-805e-ae9a7f5b4bca.mock.pstmn.io/v2/feed/'

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





