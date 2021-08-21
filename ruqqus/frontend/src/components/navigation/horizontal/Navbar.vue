  <template>
    <nav class="fixed w-full bg-white border-b dark:bg-gray-800 dark:shadow z-10">
      <div class="mx-auto px-4">
        <div class="flex items-center justify-between h-14">
          <div class="flex flex-grow items-center">
            <div class="flex-shrink-0">
              <router-link to="/" class="font-bold text-xl text-purple-500 tracking-wide">ruqqus</router-link>
            </div>
          </div>
          <div class="hidden md:flex space-x-2">
            <button @click="logout()" class="button outlinePrimary">
              Log in
            </button>
            <button @click="logout()" class="button primary">
              Sign up
            </button>
          </div>
          <!-- Mobile Menu -->
          <transition enter-class="opacity-0" enter-active-class="ease-out transition-all duration-100" enter-to-class="opacity-200" leave-class="opacity-100" leave-active-class="ease-out transition-all duration-200" leave-to-class="opacity-0">
            <div @keydown.esc="isOpen = false" v-show="isOpen" class="z-10 fixed inset-0 transition-opacity">
              <div @click="isOpen = false" class="absolute inset-0 bg-gray-900 opacity-80" tabindex="0">
              </div>
            </div>
          </transition>
          <aside class="transform top-0 right-0 w-5/6 bg-white dark:bg-gray-800 fixed h-full py-3 overflow-y-auto ease-in-out transition-all duration-200 z-75" :class="isOpen ? 'translate-x-0' : 'translate-x-full'">
            <div class="absolute top-4 left-3">
              <button class="inline-flex items-center justify-center p-1 text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" @click="drawer">
                <span class="sr-only">Close menu</span>
                <!-- Menu Icon -->
                <i class="far fa-long-arrow-left fa-fw fa-lg"></i>
              </button>
            </div>
            <button class="button outlinePrimary">
              Log in
            </button>
            <button class="button primary mt-2">
              Sign up
            </button>
            <router-link to="/following" class="block px-4 py-2 text-lg text-gray-700 dark:text-gray-200" @click="isOpen = false">
              <i class="far fa-user text-center fa-fw mr-3"></i><span>About</span>
            </router-link>
            <router-link to="/guilds" class="block px-4 py-2 text-lg text-gray-700 dark:text-gray-200" @click="isOpen = false">
              <i class="far fa-users-crown text-center fa-fw mr-3"></i><span>Rules</span>
            </router-link>
            <router-link to="/saved" class="block px-4 py-2 text-lg text-gray-700 dark:text-gray-200" @click="isOpen = false">
              <i class="far fa-bookmark text-center fa-fw mr-3"></i><span>Source Code</span>
            </router-link>
            <router-link to="/settings" class="block px-4 py-2 text-lg text-gray-700 dark:text-gray-200" @click="isOpen = false">
              <i class="far fa-cog text-center fa-fw mr-3"></i><span>Discord</span>
            </router-link>
            <button class="flex items-center px-4 py-2 text-lg text-gray-700 dark:text-gray-200" @click="dark = !dark">
              <i class="far text-center fa-fw mr-3" :class="dark ? 'fa-sunglasses' : 'fa-moon'"></i>
              <span>{{ dark ? 'Light Theme' : 'Dark Theme'}}</span>
            </button>
          </aside>
        </div>
      </div>
  </nav>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  export default {
    name: "Navbar",
    components: {},
    data() {
      return {
      };
    },
    computed: {
      ...mapState("persist", ["v"]),
    },
    methods: {
      ...mapActions("persist", ["logout"]),
    }
  };
</script>
