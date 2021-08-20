const namespaced = true

import { getSite } from '../../api/Site.js';

const state = {
	site: {
		name: 'Pied Piper',
		meta: {
			title: 'Pied Piper - Middle-Out Compression',
			description: 'Know what has three commas in it?'
		},
		tagline: 'Know what has three commas in it?',
		description: 'Know what has three commas in it?',
		bannerUrl: 'https://i.imgur.com/AgS5BXJ.jpg',
		iconUrl: 'https://i.imgur.com/2Ah9CcW.gif',
		isNsfw: false,
		isPrivate: true,
		canDownvote: true,
		canRegister: false,
		canPost: true,
		canComment: true,
		canVote: true,
		banner: {
			image: 'https://i.imgur.com/AgS5BXJ.jpg',
			title: 'Pied Piper',
			subtitle: 'Know what has three commas in it?'
		}
	}
}

const getters = {
	getSite (state) {
      return state.site
    }
}

const mutations = {
	SET_SITE: (state, site) => {
		console.log(site)
		state.site = Object.assign({}, site)
	}
}

const actions = {
	fetchSite({ state, commit }) {
		getGuild()
		.then(response => {
			let data = response.data
			commit("SET_SITE", data)
			document.documentElement.style.setProperty('--color-primary', data.rgb)
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
