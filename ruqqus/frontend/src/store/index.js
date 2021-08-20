import { createStore } from 'vuex'
import VuexPersist from 'vuex-persist';

//import DEPRECATED_STORE from './store'

import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

// hard coded paths, replace this with glob importing
import base from './modules/base'
import comments from './modules/comments'
import create from "./modules/create"
import items from "./modules/items"
import moderation from "./modules/moderation"
import notifications from "./modules/notifications"
import onboarding from "./modules/onboarding"
import persist from "./modules/persist"
import site from "./modules/site"
import toasts from "./modules/toasts"

//import * as mods from 'modules'

//const files = require.context('@/store/modules', false, /\.js$/)
//const files = import.meta.glob('./modules/*.js')
// const files = import.meta.globEager("./modules/*.js");

// const modules = {};
// for (const key in files) {
//     // if (key === "./index.js") continue;
//     modules[key.replace(/(\.\/|\.js)/g, "")] = files[key].default;
// }

//console.log(files, modules);

const persistedState = createPersistedState({
  paths: ['persist'],
  getState: (key) => Cookies.getJSON(key),
  //set secure to true for ssl
  setState: (key, state) => Cookies.set(key, state, {
    expires: 3,
    secure: true,
  }),
})

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  reducer: state => state.persist,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

export const store = createStore({
  modules: {
    base: base,
    comments: comments,
    create: create,
    items: items,
    moderation: moderation,
    notifications: notifications,
    onboarding: onboarding,
    persist: persist,
    site: site,
    toasts: toasts
  },
  plugins: [persistedState, vuexLocalStorage.plugin],
  strict: process.env.NODE_ENV !== 'production',
})

//Vue.prototype.$store = store

//export default store
