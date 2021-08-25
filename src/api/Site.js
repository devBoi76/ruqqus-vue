// API endpoints for interfacing with Ruqqus instance
// For documentation on these endpoints (and our entire API), please visit postman url here

import axios from 'axios';

const url = `/site`

// Return all public site info
export function getSite(){
	return axios.get(url);
}

// Return all site settings (administrator-only)
export function getSiteSettings(){
	return axios.get(url+'/settings');
}

// Return all site flagged content (administrator-only)
export function getSiteFlags(params){
	return axios.get(url+'/flags', {
		params: params
	})
}




