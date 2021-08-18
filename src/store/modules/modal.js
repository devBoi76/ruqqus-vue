const namespaced = true
//import axios from 'axios'

const state = {
  modalData: {
    variant: '',
    content: '',
    endpoint: '',
    showModal: false,
    loading: false
  }
}

const getters = {}

const mutations = {
  UPDATE_MODAL(state, payload) {
    state.modalData.variant = payload.variant
    state.modalData.content = payload.content
    state.modalData.endpoint = payload.endpoint

  },
  UPDATE_MODAL_LOADING(state) {
    state.modalData.loading = !state.modalData.loading
  },
  HIDE_MODAL(state) {
    state.modalData.showModal = false
  },
  SHOW_MODAL(state) {
    state.modalData.showModal = true
  }
}

const actions = {
  update_modal({ commit }, payload) {
    commit('UPDATE_MODAL', {
      variant: payload.variant,
      content: payload.content,
      endpoint: payload.endpoint
    })
  },
  reset_modal({ commit }) {
    commit('UPDATE_MODAL', {
      variant: "",
      content: "",
      endpoint: "",
      showModal: false,
      loading: false
    })
  },
  update_modal_loading({commit}) {
    commit('UPDATE_MODAL_LOADING')
  },
  hide_modal({ commit }) {
    commit('HIDE_MODAL')
  },
  show_modal({ commit }) {
    commit('SHOW_MODAL')
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
}
