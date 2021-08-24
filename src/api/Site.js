// API endpoints for interfacing with Ruqqus instance
// For documentation on these endpoints (and our entire API), please visit postman url here

import { HTTP } from '@/helpers/http-common.js';

const url = `/site`

// Return all public site info
export function getSite(){
	return HTTP.get(url);
}

// Return all site settings (administrator-only)
export function getSiteSettings(){
	return HTTP.get(url+'/settings');
}

// Return all site flagged content (administrator-only)
export function getSiteFlags(params){
	return HTTP.get(url+'/flags', {
		params: params
	})
}




