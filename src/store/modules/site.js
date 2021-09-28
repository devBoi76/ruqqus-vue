const namespaced = true

import { getSite } from '../../api/Site.js';

const state = {
	"site": {}
}

const getters = {
    getSite: state => {
      return state.site
    }
}

const mutations = {
	SET_SITE: (state, site) => {
		state.site = Object.assign({}, site)
		console.log(state.site)
	}
}

const actions = {
	fetchSite({ state, commit }) {
		getSite()
		.then(response => {
			let data = response.data
			commit("SET_SITE", data)
			//document.documentElement.style.setProperty('--color-primary', data.rgb)
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
