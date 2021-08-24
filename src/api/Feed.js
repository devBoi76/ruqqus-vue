// API endpoints for interfacing with Ruqqus feeds
// For documentation on these endpoints (and our entire API), please visit postman url here

import { HTTP } from '@/helpers/http-common.js';

// Return a posts of a feed. Requires a type (all, hot, etc). Optioanl parameters for sort, pagination, etc
export function getFeed(type, params) {
	return HTTP.get(`/feed/${type}`, {
		params: params
	});
}




