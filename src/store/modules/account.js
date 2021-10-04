const namespaced = true

import { getAccount, getAccountSettings, updateAccountSettings } from '../../api/Account.js';

const state = {
	"v": {},
	"settings": {}
}

const getters = {
	getAccount (state) {
      return state.v
    },
    getAccountSettings (state) {
    	return state.settings
    }
}

const mutations = {
	SET_ACCOUNT: (state, account) => {
		console.log(account)
		state.v = Object.assign({}, account)
	},
	SET_ACCOUNT_SETTINGS: (state, settings) => {
		console.log(settings)
		state.settings = Object.assign({}, settings)
	}
}

const actions = {
	fetchAccount({ state, commit }, id) {
		getAccount(id)
		.then(response => {
			let data = response.data
			commit("SET_ACCOUNT", data)
		})
	},
	fetchAccountSettings({ state, commit }, id) {
		getAccountSettings(id)
		.then(response => {
			let data = response.data
			commit("SET_ACCOUNT_SETTINGS", data)
		})
	},
	saveAccountSettings({ state, commit }, payload) {
		updateAccountSettings(payload.id, payload)
		.then(response => {
			let data = response.data
			commit("persist/SET_AUTH_USER", data, { root: true })
			dispatch('toasts/addNotification', {
				type: 'success',
				header: 'Settings saved',
				message: 'Your settings have been updated!'
			},
			{
				root: true
			})
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
