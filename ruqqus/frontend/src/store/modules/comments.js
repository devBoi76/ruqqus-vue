const namespaced = true

import { getPostComments } from '../../api/Post.js';
import { createComment } from '../../api/Comment.js';

const state = {
	comments: [],
	id: 0,
	body: "",
	upvotes: 0,
	downvotes: 0,
	score: 0,
	created_time: "",
	edited_time: "",
	author: "",
	sort: {
		'activity': [],
		'disputed': [],
		'hot': [],
		'top': [],
		'new': []
	},
	loading_comment: true,
	form: {
		body: "",
		changed: false
	},
	mentions: [
	{
		username: 'VILLAIN',
		profile_url: 'https://i.ruqqus.com/users/VILLAIN/profile-2.png'
	},
	{
		username: 'Drakus_',
		profile_url: 'https://i.ruqqus.com/users/Drakus_/profile-7.png'
	},
	{
		username: 'RoyBatty',
		profile_url: 'https://i.ruqqus.com/uid/1ags/profile-5.png'
	},
	{
		username: 'yifton',
		profile_url: 'https://i.ruqqus.com/users/yifton/profile-6.png'
	},
	{
		username: 'hexachrome',
		profile_url: 'https://i.ruqqus.com/users/Hexachrome/profile-1.png'
	},
	{
		username: 'Nemu',
		profile_url: 'https://i.ruqqus.com/uid/8cq/profile-1.png'
	},
	{
		username: 'Nath_SoM',
		profile_url: 'https://i.ruqqus.com/users/Nath_SoM/profile-1.png'
	}
	]
}

const getters = {
	getComments( state ){
		return state.comments
	}
}

const mutations = {
	UPDATE_FORM(state, {key, val}){
		state.form[key] = val
	},
	SET_COMMENTS(state, { comments }){
		state.comments = comments
	},
	SET_MENTIONS(state, { mentions }){
		state.mentions = mentions
	},
	PUSH_COMMENT(state, { comment }){
		state.comments.push(comment)
	}
}

const actions = {
	fetchPostComments({ commit }, id) {
		getPostComments(id)
		.then(response => {
			commit("SET_COMMENTS", response.data.data)
		})
	},
	postComment({ commit }, data) {
		createComment(data)
		.then(response => {
			commit("PUSH_COMMENT", response.data)
		})
	},
	deleteForm({commit}) {
		commit('UPDATE_FORM', "body", "")
		commit('UPDATE_FORM', "changed", false)
	},
	setMentions({commit}, payload) {
		commit('SET_MENTIONS', payload)
	}
}

export default {
	namespaced,
	state,
	getters,
	mutations,
	actions,
}
