const namespaced = true

import axios from "axios";
const state = {
  lodges: {
    name: "",
    descr: "",
    color: "",
    changed: false

  }
}
const getters = {}
const mutations = {
  UPDATE_FORM_LODGE(state, obj){
    state.lodges[obj.key] = obj.val
  }
}
const actions = {
  deleteLodgeForm({commit}){
    commit('UPDATE_FORM_LODGE', {"name": ""})
    commit('UPDATE_FORM_LODGE', {"descr": ""})
    commit('UPDATE_FORM_LODGE', {"color": ""})
    commit('UPDATE_FORM_LODGE', {"changed": false})
  },
  submitLodgeForm(form){
    return axios.post('https://ruqqus.com/mod/settings/lodges', {
      name: form.name,
      desc: form.description,
      color: form.color
    })
  },
  toggleLodgeChange({commit}){
    commit("UPDATE_FORM_LODGE", {"changed": !state.lodges.changed})
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
}
