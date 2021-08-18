const namespaced = true

import axios from 'axios'

const state = {
	v: Object,
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
	notificationsFilters: []
}

const getters = {}

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
	SET_USER(state, payload){
		console.log("setting u : ")
		console.log("payload: ", payload.data)
		state.u = payload.data
	},
	v(state, payload){
		state.v = payload
		console.log("v data: ", payload)
	},
	guilds(state, payload){
		state.guilds = payload
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
	}
}
const actions = {
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
	async getGuilds({ commit }){
		commit('changeLoadingState', true)
		if (this.state.is_authenticated) {
			const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
			const ids = response.data.map(post => post.id)
			//console.log(ids, this)
			commit('guilds', ids)
		} else {
			commit('guilds', [])
		}
		commit('changeLoadingState', false)
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
	auth_v({commit}, form){
		commit("changeLoadingState", true);

		const headers = {'Content-Type': 'multipart/form-data'}
		const data = new FormData();

		data.append('username', form.name);
		data.append('password', form.password);

		axios({
			method: 'post',
			url: '/api/vue/login',
			data: data,
			headers: headers
		})
		.then(
			function(response){
				if (response.data.status_code === 200) {
					commit("v", response.data.v);
					commit("AUTHENTICATE", true);
				}
					// handle MFA code
					else if (response.data.status_code === 201) {
						//commit("v", response.data.v);
						console.log(`form hash : ${response.data.hash}`)
						console.log(`form time : ${response.data.time}`)
						commit("v", {time: response.data.time,
							hash: response.data.hash,
							username: response.data.v.username});
						commit("TOGGLE_MFA")
						console.log('mfa toggled')
						console.log(`mfa required, v: ${response.data.v}`)
						//return response.data.status_code
					}
					else{
						commit("v", {});
						commit("AUTHENTICATE", false);
					}
				})
		.catch(function() {
			commit("v", {});
			commit("AUTHENTICATE", false);
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
			url: '/api/vue/login',
			data: data,
			headers: headers
		}).then(
		function(response) {
			if (response.data.status_code === 200) {
				commit("v", response.data.v);
				commit("AUTHENTICATE", true);
				commit("TOGGLE_MFA")
			}
		})
	},
	logout({commit}){
		axios({
			method: 'post',
			url: '/api/vue/logout',
		})
		.then(
			function(response) {
				if (response.data.status_code === 200) {
					commit("v", {});
					commit("AUTHENTICATE", false);
				}
			})
		.catch(function(){
			commit("v", {});
			commit("AUTHENTICATE", false);
		})
	}
}

export default {
	namespaced,
	state,
	getters,
	mutations,
	actions,
}
