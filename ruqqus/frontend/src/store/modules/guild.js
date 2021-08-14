const namespaced = true

import { getGuild } from '../../api/Guild.js';

const state = {
	guild: {},
	'pinned':[],
	lodges: [{id: 0, name: "all"}],
	rules: [{id: 0, name: "Remain on-topic", description: "This guild is for Vue.JS. All posts must be related to the framework."}],
	loading_lodges: true,
	loading_guild: true,
	members: [],
	guildmasters: [],
	guilds: Object
}

const getters = {
	getGuild: (state) => (name) => {
		return state.guilds[name]
	}
}

const mutations = {
	SET_GUILD: (state, guild) => {
		if (!state.guilds[guild.name]) {
			state.guilds = Object.assign({}, state.guilds, { [guild.name]:guild })
		}
		console.log(state.guilds)
	},
	SET_GUILDS: (state, guilds) => {
		for (let i = 0; i < guilds.length; i++) {
			let guild = guilds[i].guild;
			if (!state.guilds[guild.name]) {
				state.guilds = Object.assign({}, state.guilds, { [guild.name]:guild })
			}
		}
		console.log(state.guilds)
	},
	CLEAR_GUILDS: (state) => {
		state.guilds = {}
	},
	RESET_GUILD: (state) => {
		state.guild = {}
	},
	// DELETE_GUILD: (state, id) => {
	// 	delete state.guilds.id
	// },
	TOGGLE(state, type) {
		state[type] = !state[type]
	},
	SET_LODGES(state, { lodges }){
		state.lodges = lodges
	},
	SET_RULES(state, { rules }){
		state.rules = rules
	},
	SET_MEMBERS(state, { members }){
		state.members = members
	},
	SET_GUILDMASTERS(state, { guildmasters }){
		state.guildmasters = guildmasters
	}
}

const actions = {
	fetchGuild({ state, commit }, guild) {
		if (Object.keys(state.guilds).length > 10) {
			delete state.guilds[Object.keys(state.guilds)[0]];
		}
		getGuild(guild)
		.then(response => {
			let data = response.data
			commit("SET_GUILD", data)
			document.documentElement.style.setProperty('--color-primary', data.rgb)
		})
	},
	resetGuild({commit}){
		commit("RESET_GUILD")
	}
}

export default {
	namespaced,
	state,
	getters,
	mutations,
	actions,
}
