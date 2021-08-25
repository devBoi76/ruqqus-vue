const namespaced = true

import axios from 'axios'

const state = {
  firstStepValidated: false,
  secondStepValidated: false,
  formFocused: false,
  guild: {
    name: "",
    description: "",
    primaryColor: "",
    category: "",
    private: false,
    invites: [],
    NSFW: [{ value: 1, text: 'This guild is for adult content.' }]
  },
  post: {
    submission: {
      title: null,
      link: null,
      image: {
        file: null,
        source: null,
        filename: null
      },
      body: null,
      guild: null,
      NSFW: false,
    },
    type: "text",
    modal: false,
    dropzone: false
  }
}

const getters = {
  canDropImage: state => {
    return !state.post.modal // if post creation modal is not showing, allow dropzone feature
  }
}

const mutations = {
  // Create a guild mutations
  SET_FIRST_STEP_VALID(state, payload) {
    state.firstStepValidated = payload.firstStepValidated
  },
  SET_SECOND_STEP_VALID(state, payload) {
    state.secondStepValidated = payload.secondStepValidated
  },
  TOGGLE_FORM_FOCUS(state, payload) {
    state.formFocused = payload.formFocused
  },
  SET_GUILD_NAME(state, payload) {
    state.guild.name = payload.name
  },
  SET_GUILD_DESCRIPTION(state, payload) {
    state.guild.description = payload.description
  },
  SET_GUILD_PRIMARY_COLOR(state, payload) {
    state.guild.primaryColor = payload.primaryColor
  },
  SET_GUILD_CATEGORY(state, payload) {
    state.guild.category = payload.category
  },
  TOGGLE_GUILD_PRIVATE(state, payload) {
    state.guild.private = payload.private
  },
  SET_GUILD_INVITES(state, payload) {
    state.guild.invites = payload.invites
  },
  TOGGLE_GUILD_NSFW(state, payload) {
    state.guild.NSFW = payload.NSFW
  },
  // Create a post mutations
  TOGGLE_POST_CREATION_MODAL(state, payload) {
    state.post.modal = payload.show
  },
  TOGGLE_POST_DROPZONE(state, payload) {
    state.post.dropzone = payload.show
  },
  SET_SUBMISSION(state, payload) {
    state.post.submission = payload.submission
  },
  RESET_SUBMISSION(state) {
    state.post.submission = {
      title: null,
      link: null,
      image: {
        file: null,
        source: null,
        filename: null
      },
      body: null,
      guild: null,
      NSFW: false,
    }
  },
  CLEAR_POST_IMAGE(state) {
    state.post.submission.image.file = null
    state.post.submission.image.source = null
    state.post.submission.image.filename = null
  }
}

const actions = {
  submitPost({state, dispatch, rootState}){
    const headers = {'Content-Type': 'multipart/form-data'}
    const data = new FormData();

    data.append('title', state.post.submission.title);
    //data.append('file', state.post.submission.image.file);
    data.append('url', state.post.submission.url);
    data.append('body', state.post.submission.body);
    data.append('board', rootState.guild.guild.name || 'general');
    data.append('formkey', rootState.persist.v.formkey)

    console.log(state.post.submission.title)
    //console.log(state.post.submission.image.file)
    console.log(state.post.submission.body)
    console.log(rootState.guild.guild.name)
    console.log(rootState.persist.v.formkey)

    axios({
      method: 'post',
      url: '/submit',
      data: data,
      headers: headers
    })
    .then(response => {
      console.log("post upvoted")
      return response
    })
    .catch(error => {
      dispatch('toasts/addNotification', {
        type: 'error',
        header: 'Failed to create post',
        message: 'Please try again later.'
      },
      {
        root: true
      })
      return error
    })
  },
  resetSubmission({commit}) {
    commit("RESET_SUBMISSION")
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
