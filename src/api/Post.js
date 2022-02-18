// API endpoints for interfacing with posts
// For documentation on these endpoints (and our entire API), please visit postman url here

import axios from 'axios';

const url = '/api/v2/submissions/'

// Return post info given id
export function getPost(id){
	return axios.get(url+id);
}

// Return a post's comments info given id
export function getPostComments(id){
	return axios.get(url+id+'/comments'); // api/vue/post/{{ id }}/comments/{{ comment id }}
}

// Delete comment given id
export function deletePost(id){
	return axios.delete(id)
}