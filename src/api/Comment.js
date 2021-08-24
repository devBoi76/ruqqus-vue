// API endpoints for interfacing with posts
// For documentation on these endpoints (and our entire API), please visit postman url here

import { HTTP } from '@/helpers/http-common.js';

const url = '/comment/'

// Return comment given id
export function getComment(id){
	return HTTP.get(url+id);
}

// Create comment given data
export function createComment(data){
	return HTTP.post(url, data)
}

// Update comment given id and data object
export function updateComment(id, data){
	return HTTP.put(url+id, data)
}

// Delete comment given id
export function deleteComment(id){
	return HTTP.delete(url+id)
}