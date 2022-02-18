// API endpoints for interfacing with Ruqqus feeds
// For documentation on these endpoints (and our entire API), please visit postman url here

import axios from 'axios';

const url = `/search`

// Return a posts of a feed. Requires a type (all, hot, etc). Optioanl parameters for sort, pagination, etc
export function getSearch(params){
	return axios.get(url, {
		params: params
	})
}