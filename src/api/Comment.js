// API endpoints for interfacing with posts
// For documentation on these endpoints (and our entire API), please visit postman url here

import axios from 'axios';

const url = '/comment/'

// Return comment given id
export function getComment(id){
	return axios.get(url+id);
}

// Create comment given data
export function createComment(data){
	return axios.post(url, data)
}

// Update comment given id and data object
export function updateComment(id, data){
	return axios.put(url+id, data)
}

// Delete comment given id
export function deleteComment(id){
	return axios.delete(url+id)
}