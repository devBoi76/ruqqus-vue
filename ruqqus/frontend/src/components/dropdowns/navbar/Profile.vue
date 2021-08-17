<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
      class="flex items-center p-1 text-sm text-gray-900 font-bold bg-white dark:bg-gray-800 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:shadow-solid focus:outline-none focus:shadow-solid active:bg-gray-100 active:dark:bg-gray-700"
      >
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
  <MenuItems
  class="absolute right-0 w-56 mt-4 origin-top-right bg-white divide-y divide-gray-100 rounded shadow-lg border focus:outline-none"
  >
  <div>
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
          <i class="fas fa-circle text-yellow-700 pr-1"></i>{{ v.post_rep + v.comment_rep }} rep
        </div>
      </div>
    </router-link>
    <!-- Following Link -->
    <MenuItem v-slot="{ active }">
      <button
      :class="[
      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
      'group flex items-center w-full px-4 py-2 text-sm',
      ]"
      >
      <i class="far fa-user text-center fa-fw mr-2"></i><span>Following</span>
    </button>
  </MenuItem>
  <!-- Guilds Link -->
  <MenuItem v-slot="{ active }">
    <button
    :class="[
    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
    'group flex items-center w-full px-4 py-2 text-sm',
    ]"
    >
    <i class="far fa-users-crown text-center fa-fw mr-2"></i><span>Guilds</span>
  </button>
</MenuItem>
<!-- Saved Link -->
<MenuItem v-slot="{ active }">
  <button
  :class="[
  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
  'group flex items-center w-full px-4 py-2 text-sm',
  ]"
  >
  <i class="far fa-bookmark text-center fa-fw mr-2"></i><span>Saved</span>
</button>
</MenuItem>
<!-- User Settings Link -->
<MenuItem v-slot="{ active }">
  <button
  :class="[
  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
  'group flex items-center w-full px-4 py-2 text-sm',
  ]"
  >
  <i class="far fa-cog text-center fa-fw mr-2"></i><span>Settings</span>
</button>
</MenuItem>
<!-- Moderation Link -->
<MenuItem v-slot="{ active }">
  <button
  :class="[
  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
  'group flex items-center w-full px-4 py-2 text-sm',
  ]"
  >
  <i class="far fa-crown text-center fa-fw mr-2"></i><span>Moderation</span>
</button>
</MenuItem>
<!-- Create New Community Link -->
<MenuItem v-slot="{ active }">
  <button
  :class="[
  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
  'group flex items-center w-full px-4 py-2 text-sm',
  ]"
  >
  <i class="far fa-swords text-center fa-fw mr-2"></i><span>Create New Guild</span>
</button>
</MenuItem>
<!-- Invite Friends Link -->
<MenuItem v-slot="{ active }">
  <button
  :class="[
  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
  'group flex items-center w-full px-4 py-2 text-sm',
  ]"
  >
  <i class="far fa-user-plus text-center fa-fw mr-2"></i><span>Invite Friends</span>
</button>
</MenuItem>
<!-- Dark Theme Link -->
<MenuItem v-slot="{ active }">
  <button
  :class="[
  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
  'group flex items-center w-full px-4 py-2 text-sm',
  ]"
  >
  <i class="far text-center fa-fw mr-3" :class="dark ? 'fa-sun' : 'fa-moon'"></i><span>Dark Theme</span>
</button>
</MenuItem>
</div>
<div class="px-1 py-1">
  <!-- Sign Out -->
  <MenuItem v-slot="{ active }">
    <button
    :class="[
    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
    'group flex items-center w-full px-4 py-2 text-sm',
    ]"
    >
    <i class="far fa-sign-out fa-rotate-180 text-center fa-fw mr-2"></i><span>Sign Out</span>
  </button>
</MenuItem>
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
			...mapState("persist", ["v"]),
			self() {
				return this.username === this.v.username; // if username prop matches auth'd user
			}
		},
    methods: {
      ...mapActions("persist", ["logout"]),
    }
  }
</script>
