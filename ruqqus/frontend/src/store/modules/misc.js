const namespaced = true

import axios from 'axios'

const state = {
  hoveredUser: [],
  showUserPopover: false
}

const getters = {}

const mutations = {
  SET_HOVERED_USER(state, { user }){
    state.hoveredUser = user
  },
  TOGGLE_USER_POPOVER(state) {
    state.showUserPopover = !state.showUserPopover
  }
}

const actions = {
  getUser({commit}) {
    return axios.get(`https://5f6fca49bdb178001633bb9d.mockapi.io/posts/1/author`)
    .then(res => {
      let user = res.data;
      commit('SET_HOVERED_USER', { user })
      console.log(res)
    }).catch(err => {
      console.log(err);
    })
  },
  toggle_user_popover({commit}){
    commit('TOGGLE_USER_POPOVER')
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
}
