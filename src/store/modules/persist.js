const namespaced = true

import axios from 'axios'

import { getSite } from '../../api/Site.js';

const state = {
	site: {},
	v: {},
	v2: {
		'username': 'steve',
		'usernameColor': '#00FFFF',
		'title': 'Newton',
		'titleColor': '#FFFF00',
		'id': 1,
		'profileUrl': 'https://i.imgur.com/yC8L3ME.gif',
		'bannerUrl': 'https://i.imgur.com/I4IfRQa.png',
		'bio': 'All your base are belong to us.',
		'bioHtml': '<p>All your base are belong to us.</p>',
		'reputation': 2001,
		'email': 'example@example.com',
		'isPrivate': true,
		'hasDisabledFollowers': false,
		'hasNotifications': {
			'followers': true,
			'posts': false,
			'replies': true,
			'mentions': true
		}
	},
	u: {},
	loading: true,
	isCard: true,
	darkMode: false,
	user: [],
	guilds: [],
	dark: false,
	is_authenticated: false, // set to false when auth is fully functional
	is_leftBar_collapsed: false,
	mfa: false,
	notificationsFilters: [],
	searchHistory: []
}

const getters = {
	getSite(state) {
		return state.site
	},
	getAuthUser(state) {
		return state.v
	}
}

const mutations = {
	AUTHENTICATE(state, payload) {
		state.is_authenticated = payload
	},
	TOGGLE_MFA(state) {
		state.mfa = !state.mfa
	},
	changeLoadingState(state, payload) {
		state.loading = payload
	},
	SET_USER(state, payload) {
		console.log("setting u : ")
		console.log("payload: ", payload.data)
		state.u = payload.data
	},
	SET_AUTH_USER(state, payload) {
		state.v = payload
		console.log("v data: ", payload)
	},
	v(state, payload){
		state.v = payload
		console.log("v data: ", payload)
	},
	SET_SITE: (state, site) => {
		console.log(site)
		state.site = Object.assign({}, site)
	},
	UPDATE_ISCARD(state) {
		state.isCard = !state.isCard
	},
	UPDATE_DARKMODE(state) {
		state.darkMode = !state.darkMode
	},
	UPDATE_LEFTBAR_COLLAPSE(state) {
		state.is_leftBar_collapsed = !state.is_leftBar_collapsed
	},
	SET_NOTIFICATIONS_FILTERS(state, payload) {
		state.notificationsFilters = payload
	},
	ADD_SEARCH_ITEM(state, payload) {
		state.searchHistory.push(payload)
		console.log(state.searchHistory)
	},
	SHIFT_SEARCH_HISTORY(state) {
		state.searchHistory.shift()
	},
	CLEAR_SEARCH_HISTORY(state) {
		state.searchHistory = []
	}
}
const actions = {
	fetchSite({ state, commit }) {
		getSite()
		.then(response => {
			let data = response.data
			commit("SET_SITE", data)
			document.documentElement.style.setProperty('--color-primary', data.rgb)
		})
	},
	login({ commit, dispatch }){
		commit('changeLoadingState', true)
		commit('authenticate', true)
		dispatch('getUser')
	},
	async getUser({ commit }, obj) {
		commit('changeLoadingState', true)
		return axios.get(obj.url_core)
		.then(res => {
			let data = res.data.u
			console.log(data)
			commit("SET_USER", { data })
			commit('changeLoadingState', false)
		}).catch(err => {
			console.log(err);
		})
	},
	toggle_card({commit}){
		commit('UPDATE_ISCARD')
	},
	toggle_dark({commit}){
		commit('UPDATE_DARKMODE')
	},
	toggle_leftbar({commit}){
		commit('UPDATE_LEFTBAR_COLLAPSE')
	},
	// register(){

	// },
	auth_v({commit, dispatch, rootState}, form){
		commit("changeLoadingState", true);

		const headers = {'Content-Type': 'multipart/form-data'}
		const data = new FormData();

		data.append('username', form.name);
		data.append('password', form.password);

		axios({
			method: 'post',
			url: '/login',
			data: data,
			headers: headers
		})
		.then(
			function(response){

				if (response.status === 200) {
					commit("SET_AUTH_USER", response.data.v);
					commit("AUTHENTICATE", true);
				}
					// handle MFA code
					else if (response.status === 201) {
						//commit("SET_AUTH_USER", response.data.v);
						console.log(`form hash : ${response.data.hash}`)
						console.log(`form time : ${response.data.time}`)
						commit("SET_AUTH_USER", {time: response.data.time,
							hash: response.data.hash,
							username: response.data.v.username});
						commit("TOGGLE_MFA")
						console.log('mfa toggled')
						console.log(`mfa required, v: ${response.data.v}`)
						//return response.data.status_code
					}
					else{
						commit("SET_AUTH_USER", {});
						commit("AUTHENTICATE", false);
					}
				})
		.catch(error => {
			commit("SET_AUTH_USER", {});
			commit("AUTHENTICATE", false);
			dispatch('toasts/addNotification', {
				type: 'error',
				header: 'Error logging in.',
				message: 'Sorry, please try again later.'
			},
			{
				root: true
			})
		})
		commit("changeLoadingState", false);
	},
	verify_mfa({commit, state}, form){
		const headers = {'Content-Type': 'multipart/form-data'}
		const data = new FormData();

		data.append('username', state.v.username);
		data.append('time', state.v.time);
		data.append('hash', state.v.hash);
		data.append('2fa_token', form.mfa)
		axios({
			method: 'post',
			url: '/login',
			data: data,
			headers: headers
		}).then(
		function(response) {
			if (response.status === 200) {
				commit("SET_AUTH_USER", response.data.v);
				commit("AUTHENTICATE", true);
				commit("TOGGLE_MFA")
			}
		})
	},
	logout({commit}){
		axios({
			method: 'post',
			url: '/logout',
		})
		.then(
			function(response) {
				if (response.status === 200) {
					commit("SET_AUTH_USER", {});
					commit("AUTHENTICATE", false);
				}
			})
		.catch(function(){
			commit("SET_AUTH_USER", {});
			commit("AUTHENTICATE", false);
		})
	},
	addSearchItem({commit, state}, payload){
		if (payload && !state.searchHistory.includes(payload)) { // check if query is not empty and for duplicates
			commit("ADD_SEARCH_ITEM", payload)
			if (state.searchHistory.length > 10) { // remove first search history item if array exceeds 10
				commit("SHIFT_SEARCH_HISTORY")
			}
		}
	},
	clearSearchHistory({commit}) {
		commit("CLEAR_SEARCH_HISTORY")
	}
}

export default {
	namespaced,
	state,
	getters,
	mutations,
	actions,
}
