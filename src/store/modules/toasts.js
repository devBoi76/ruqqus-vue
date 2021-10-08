const namespaced = true

const state = {
	notifications: []
}

const getters = {
	toastsLength(state) {
		return state.notifications.length
	}
}

const mutations = {
	PUSH_NOTIFICATION: (state, notification) => {
		notification.id = (Math.random().toString(36) + Date.now().toString(36)).substr(2)
		state.notifications.push(notification)
	},
	REMOVE_NOTIFICATION: (state, notificationToRemove) => {
		state.notifications = state.notifications.filter(notification => {
			return notification.id != notificationToRemove.id
		})
	}
}

const actions = {
	addNotification: ({commit}, notification) => {
		commit('PUSH_NOTIFICATION', notification)
	},
	removeNotification: ({commit}, notification) => {
		commit('REMOVE_NOTIFICATION', notification)
	}
}

export default {
	namespaced,
	state,
	getters,
	mutations,
	actions
}
