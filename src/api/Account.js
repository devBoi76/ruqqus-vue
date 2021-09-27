// API endpoints for interfacing with Ruqqus accounts
// For documentation on these endpoints (and our entire API), please visit postman url here

import axios from 'axios';

//const url = `/account/`
const url = `https://08816b9e-9bc2-436d-96b5-621552da59d0.mock.pstmn.io/v2/account/`

// Return all public info given account username (or id)
export function getAccount(id){
	return axios.get(url + id);
}

// Return notfications of current auth'd account. Prameters for sort, pagination, etc
export function getAccountNotifications(params){
	return axios.get(url + `/me/notifications/`, {
		params: params
	})
}

// Return posts given account username (or id). Prameters for sort, pagination, etc
export function getAccountPosts(id, params){
	return axios.get(url+`${id}/posts`, {
		params: params
	})
}

// Return comments given account username (or id). Prameters for sort, pagination, etc
export function getAccountComments(id, params){
	return axios.get(url+`${id}/comments`, {
		params: params
	})
}

// Return account settings given account username or id
export function getAccountSettings(id) {
	return axios.get(url+`${id}/settings`)
}

// Update account settings given account username or id
export function updateAccountSettings(id, data){
	return axios.put(url+`${id}/settings`, data)
}

// Delete account given account username or id
export function deleteAccount(id){
	return axios.delete(url+id)
}
