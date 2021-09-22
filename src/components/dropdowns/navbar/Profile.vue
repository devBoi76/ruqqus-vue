<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton class="flex items-center p-1 text-sm text-gray-900 font-bold bg-white dark:bg-gray-800 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:shadow-solid focus:outline-none focus:shadow-solid focus:bg-gray-100 dark:focus:bg-gray-700">
        <!-- User Avatar -->
        <img class="w-8 h-8 object-cover rounded-sm mr-2" :src="v.profile_url" alt="user avatar"/>
        <i class="far fa-chevron-down fa-sm text-gray-700 dark:text-gray-400 mr-2"></i>
      </MenuButton>
    </div>

    <transition
    enter-active-class="transition duration-100 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-75 ease-in"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
    >
    <MenuItems class="absolute right-0 w-64 mt-4 origin-top-right bg-white divide-y divide-gray-100 rounded shadow-lg border focus:outline-none">
      <!-- User Details -->
      <router-link :to="`/${v.username}`" class="flex items-center p-4">
        <!-- User Avatar -->
        <img class="w-10 h-10 object-cover rounded-sm" :src="v.profile_url" alt="user avatar"/>
        <div class="pl-3 truncate">
          <!-- Username -->
          <div class="text-gray-900 font-semibold leading-4">
            {{ v.username }}
          </div>
          <div class="text-2xs text-gray-600 mt-1">
            <!-- User Reputation -->
            {{ v.post_rep + v.comment_rep || 0 }} reputation
          </div>
        </div>
      </router-link>
      <div class="py-2">
        <!-- Profile Link -->
        <MenuItem v-slot="{ active }">
          <router-link to="/profile" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700','group flex items-center w-full px-4 py-1.5']">
            <i class="far fa-user text-center fa-fw mr-2"></i><span>My Profile</span>
          </router-link>
        </MenuItem>
        <!-- Inbox Link -->
        <MenuItem v-slot="{ active }">
          <router-link to="/inbox" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700','group flex items-center w-full px-4 py-1.5']">
            <i class="far fa-envelope text-center fa-fw mr-2"></i><span>Inbox</span>
          </router-link>
        </MenuItem>
        <!-- Posts Link -->
        <MenuItem v-slot="{ active }">
          <router-link to="/posts" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700','group flex items-center w-full px-4 py-1.5']">
            <i class="far fa-pen text-center fa-fw mr-2"></i><span>Posts</span>
          </router-link>
        </MenuItem>
        <!-- Following Link -->
        <MenuItem v-slot="{ active }">
          <router-link to="/following" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700','group flex items-center w-full px-4 py-1.5']">
            <i class="far fa-heart text-center fa-fw mr-2"></i><span>Following</span>
          </router-link>
        </MenuItem>
        <!-- Saved Link -->
        <MenuItem v-slot="{ active }">
          <router-link to="/saved" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700','group flex items-center w-full px-4 py-1.5']">
            <i class="far fa-bookmark text-center fa-fw mr-2"></i><span>Saved</span>
          </router-link>
        </MenuItem>
        <!-- User Settings Link -->
        <MenuItem v-slot="{ active }">
          <router-link to="/settings" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700','group flex items-center w-full px-4 py-1.5']">
            <i class="far fa-cog text-center fa-fw mr-2"></i><span>Settings</span>
          </router-link>
        </MenuItem>
      </div>
      <div class="py-2">
        <!-- Dark Theme Link -->
        <MenuItem v-slot="{ active }">
          <button :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700','group flex items-center w-full px-4 py-1.5']" @click="dark = !dark">
            <i class="far text-center fa-fw mr-2" :class="dark ? 'fa-sunglasses' : 'fa-moon'"></i>
            <span>{{ dark ? 'Light Theme' : 'Dark Theme'}}</span>
          </button>
        </MenuItem>
      </div>
      <div class="py-2">
        <!-- Sign Out -->
        <MenuItem v-slot="{ active }">
          <button :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700','group flex items-center w-full px-4 py-1.5']">
            <i class="far fa-sign-out text-center fa-fw mr-2"></i><span>Sign Out</span>
          </button>
        </MenuItem>
      </div>
      <div class="py-2">
        <ul class="flex flex-wrap mb-0 px-3 leading-4">
          <li class="px-1 py-0.5">
            <router-link to="/about" class="text-xs text-gray-500 hover:underline">
              About
            </router-link>
          </li>
          <li class="px-1 py-0.5">
            <router-link to="/about" class="text-xs text-gray-500 hover:underline">
              Rules
            </router-link>
          </li>
          <li class="px-1 py-0.5">
            <router-link to="/about" class="text-xs text-gray-500 hover:underline">
              Contact
            </router-link>
          </li>
          <li class="px-1 py-0.5">
            <router-link to="/about" class="text-xs text-gray-500 hover:underline">
              Discord
            </router-link>
          </li>
          <li class="px-1 py-0.5">
            <router-link to="/about" class="text-xs text-gray-500 hover:underline">
              Change Log
            </router-link>
          </li>
          <li class="px-1 py-0.5">
            <router-link to="/about" class="text-xs text-gray-500 hover:underline">
              Source Code
            </router-link>
          </li>
        </ul>
      </div>
    </MenuItems>
  </transition>
</Menu>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

	export default {
		props: {
			username: String
		},
		components: {
			Menu,
			MenuButton,
			MenuItems,
			MenuItem
		},
		computed:{
			...mapState("persist", ["v","darkMode"]),
			self() {
				return this.username === this.v.username; // if username prop matches auth'd user
			},
      dark: {
        get () {
          return this.darkMode
        },
        set (value) {
          this.$store.dispatch('persist/toggle_dark', value)
        }
      }
    },
    methods: {
      ...mapActions("persist", ["logout"]),
    }
  }
</script>
