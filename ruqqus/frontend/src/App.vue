<template>
  <div id="app" class="text-base" :class="{'dark':darkMode}" @dragover.prevent="dragOver" @paste="onPaste">
    <!-- Dynamic navbar component -->
    <component :is="navbarComponent"/>
    <!-- Main content -->
    <div class="flex h-screen pt-12 sm:pt-14 bg-gray-50 sm:bg-gray-100 dark:bg-gray-950">
      <router-view ></router-view>
    </div>

    <NotificationsList v-if="toastsLength"/>
    <DropAnImage/>

  </div>
</template>

<script>
// Import components
import { defineAsyncComponent } from 'vue'
import { mapState, mapGetters } from "vuex";

const Navbar = defineAsyncComponent(() => import('@/components/navigation/horizontal/Navbar.vue'))
const NavbarAuth = defineAsyncComponent(() => import('@/components/navigation/horizontal/NavbarAuthenticated.vue'))
const NavbarOnboarding = defineAsyncComponent(() => import('@/components/navigation/horizontal/NavbarOnboarding.vue'))

const NotificationsList = defineAsyncComponent(() => import('@/components/notifications/ToastList.vue'))

const DropAnImage = defineAsyncComponent(() => import('@/components/DropAnImage.vue'))

export default {
  name: "App",
  components: {
    Navbar,
    NavbarOnboarding,
    NavbarAuth,
    NotificationsList,
    DropAnImage
  },
  data() {
    return {}
  },
  computed: {
    ...mapState("persist", ["is_authenticated", "darkMode"]),
    ...mapGetters("toasts", ["toastsLength"]),
    isOnboarding() {
      const paths = '/welcome' || '/setup'
      return this.$route.path.startsWith(paths);
    },
    navbarComponent() {
      if (this.isOnboarding) {
        return NavbarOnboarding;
      } else if (this.is_authenticated) {
        return NavbarAuth
      } else {
        return Navbar
      }
    },
    loadingGuild() {
      return Object.keys(this.$store.state.guild.guild).length < 1
    },
    image: {
      get() {
        return this.$store.state.create.post.submission.image
      },
      set (value) {
        this.$store.commit('create/SET_SUBMISSION', {submission: value})
      }
    }
  },
  methods: {
    dragOver(){
      const canDrag = this.$route.meta.dropImage !== false;
      const nothingFocused = document.activeElement === document.body;
      
      if (canDrag && nothingFocused) {
        this.$store.commit('create/TOGGLE_POST_DROPZONE', {show: true});
      }
    },
    onPaste(e) {
      const nothingFocused = document.activeElement === document.body;
      const url = new RegExp('^(?:[a-z]+:)?//', 'i');

      let clipText = e.clipboardData.getData('text/plain')
      let files = e.clipboardData.files

      if (files.length === 1 && nothingFocused && this.$route.path !== '/submit') {
        let file = files[0]
        // allows image only
        if (file.type.indexOf('image/') >= 0) {
          var reader = new FileReader()
          reader.onload = f => {
            this.image.source = f.target.result // set image source to image content
            this.image.filename = file.name // set file name
            this.$router.push('/create/post')
          }
          reader.readAsDataURL(file)
        }
      }

      if (url.test(clipText) && nothingFocused && this.$route.path !== '/submit') {
        this.$router.push({name: 'SubmitView', query: {url: clipText} })
      }

      console.log('on paste', event.clipboardData.getData('text/plain'))
    }
  },
  created() {
    const kode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
    const length = kode.length
    var pos = 0

    document.body.addEventListener('keydown', function (event) {
      if (event.keyCode === kode[pos++]) {
        if (length === pos) {
          console.log('konami code activated')
        pos = 0 // ability to start over
        return false
      }
    } else {
      pos = 0
    }
  }, false)
  }
};

// Focus accessibility script
// When mouse is being used
document.body.addEventListener('mousedown', function() {
  document.body.classList.add('using-mouse');
});
// Re-enable focus styling when Tab is pressed
document.body.addEventListener('keydown', function(event) {
  if (event.keyCode === 9) {
    document.body.classList.remove('using-mouse');
  }
});
</script>