// API endpoints for interfacing with Ruqqus accounts
// For documentation on these endpoints (and our entire API), please visit postman url here

import { HTTP } from '@/helpers/http-common.js';

const url = `/account/`

// Return all public info given account username (or id)
export function getAccount(id){
	return HTTP.get(url + id);
}

// Return notfications of current auth'd account. Prameters for sort, pagination, etc
export function getAccountNotifications(params){
	return HTTP.get(url + `/me/notifications/`, {
		params: params
	})
}

// Return posts given account username (or id). Prameters for sort, pagination, etc
export function getAccountPosts(id, params){
	return HTTP.get(url+`${id}/posts`, {
		params: params
	})
}

// Return comments given account username (or id). Prameters for sort, pagination, etc
export function getAccountComments(id, params){
	return HTTP.get(url+`${id}/comments`, {
		params: params
	})
}

// Return account settings given account username or id
export function getAccountSettings(id) {
	return HTTP.get(url+`${id}/settings`)
}

// Update account settings given account username or id
export function updateAccountSettings(id, data){
	return HTTP.put(url+`${id}/settings`, data)
}

// Delete account given account username or id
export function deleteAccount(id){
	return HTTP.delete(url+id)
}
