const namespaced = true

const state = {
  selected: {},
}

const mutations = {
  PUSH_MESSAGE(state, payload) {
    state.selected = Object.assign({}, payload)
    console.log(state.selected)
  }
}

const actions = {
  pushMessage: ({commit}, message) => {
    commit('PUSH_MESSAGE', message)
  }
}

export default {
  namespaced,
  state,
  mutations,
  actions
}