const namespaced = true

const state = {
  selectedCats: [],
  joinedGuilds:[]
}
const getters = {
  selectedCatsCount(state) {
    return state.selectedCats.length
  },
  joinedGuildsCount(state) {
    return state.joinedGuilds.length
  }
}
const mutations = {
  SET_CATEGORIES(state, payload) {
    state.selectedCats = payload;
  },
  ADD_CATEGORY(state, payload) {
    state.selectedCats.push(payload)
  },
  REMOVE_CATEGORY(state, payload) {
    const index = state.selectedCats.indexOf(payload)
    state.selectedCats.splice(index, 1)
  },
  JOIN_GUILD(state, payload) {
    state.joinedGuilds.push(payload)
  },
  LEAVE_GUILD(state, payload) {
    const index = state.selectedCats.indexOf(payload)
    state.joinedGuilds.splice(index, 1)
  }
}
const actions = {
  updateCats({commit}, categories){
    commit('SET_CATEGORIES', categories)
  },
  addCat({commit}, category){
    commit('ADD_CATEGORY', category)
  },
  removeCat({commit}, category){
    commit('REMOVE_CATEGORY', category)
  },
  joinGuild({commit}, guild){
    commit('JOIN_GUILD', guild)
  },
  leaveGuild({commit}, guild){
    commit('LEAVE_GUILD', guild)
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}