// API endpoints for interfacing with Ruqqus accounts
// For documentation on these endpoints (and our entire API), please visit postman url here

import { HTTP } from '@/helpers/http-common.js';

const url = `/guild/`

// Return all public guild info given guild name (or id)
export function getGuild(guild){
	return HTTP.get(url+guild);
}

// Return posts given guild name (or id). Optional prameters for sort, pagination, etc
export function getGuildPosts(guild, params){
	return HTTP.get(url+`${guild}/posts`, {
		params: params
	})
}

// Return comments given guild name (or id). Optional parameters for sort, pagination, etc
export function getGuildComments(guild, params){
	return HTTP.get(url+`${guild}/comments`, {
		params: params
	})
}




