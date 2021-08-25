import { createApp } from 'vue'
import { store } from './store'
import router from './router'

import App from './App.vue'
import axios from 'axios'
import interceptors from './helpers/interceptors.js'
import * as LazyLoad from '@vant/lazyload'
import VueTippy from '../node_modules/vue-tippy'

// Import CSS files
import "./assets/fontawesome/css/all.css";
import "../node_modules/tailwindcss/tailwind.css";
import "./assets/style/styles.css";

const app = createApp(App)

app.config.devtools = true

app.config.globalProperties.$store = store
app.config.globalProperties.$http = axios

app.use(store)
app.use(router)

// Use our Interceptors
interceptors()

// Vue LazyLoad
app.use(LazyLoad)

// Vue-Tippy (tippy.js)
app.use(
  VueTippy,
  // optional
  {
    directive: 'tippy', // => v-tippy
    component: 'tippy', // => <tippy/>
    componentSingleton: 'tippy-singleton', // => <tippy-singleton/>
    arrow: true,
    animation: 'scale',
    duration: 75,
    placement: 'bottom',
    flipDuration: 0,
    popperOptions: {
      modifiers: {
        preventOverflow: {
          enabled: false
        }
      }
    }
  }
)

//Vue.use(VueTailwind, settings)

// Vue.config.productionTip = false

 // actually mount to DOM
app.mount('#app')
