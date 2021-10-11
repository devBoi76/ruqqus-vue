// API endpoints for interfacing with posts
// For documentation on these endpoints (and our entire API), please visit postman url here

import axios from 'axios';

const url = 'https://e7c49a6d-8ce7-466c-992e-7cf3e6e2d110.mock.pstmn.io/v2/post/'

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