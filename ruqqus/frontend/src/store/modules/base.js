const namespaced = true

const state = {
	cancelTokens: [],
}

const getters = {
	cancelTokens(state) {
		return state.cancelTokens;
	}
}

const mutations = {
	ADD_CANCEL_TOKEN(state, token) {
		state.cancelTokens.push(token);
	},
	CLEAR_CANCEL_TOKENS(state) {
		state.cancelTokens = [];
	}
}

const actions = {
	CANCEL_PENDING_REQUESTS(context) {
		context.state.cancelTokens.forEach((request) => { // Cancel all request where a token exists
			if(request.cancel){
				request.cancel();
			}
		});
		context.commit('CLEAR_CANCEL_TOKENS'); // Reset the cancelTokens store
	}
}

export default {
	namespaced,
	state,
	getters,
	mutations,
	actions
}
