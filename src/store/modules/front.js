const namespaced = true

import axios from 'axios'

const state = {
  front_name: "Front Page",
  'pinned':[],
  lodges: [],
  sort: {
    'activity': [],
    'disputed': [],
    'hot': [],
    'top': [],
    'new': []
  },
  loading_lodge: true,
  loading_front: true
}

const getters = {}

const mutations = {
  UPDATE(state, obj){
    state[obj.name] = obj.data
  },
  LOAD_FRONT(state, obj){
    state.sort[obj.sort] = obj.data
  },
  TOGGLE(state, type) {
    state[type] = !state[type]
  }
}

const actions = {
  async loadFrontPage({commit}, sort, page) {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}`);
      console.log("sort : ", sort)
      commit('LOAD_FRONT', {"sort": sort, "data": response.data})
      commit('TOGGLE', "loading_lodge")
    } catch (error) {
      console.log("load_front :", error)
    }
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
}
