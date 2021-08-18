<template>
  <div class="w-56 text-right fixed top-16">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <!-- Button -->
        <MenuButton
          class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Options
          <i class="far fa-chevron-down"></i>
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
          class="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <!-- Copy Comment Permalink Button -->
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                ]"
              >
                <i class="far fa-link text-center fa-fw mr-2"></i><span>Copy Link</span>
              </button>
            </MenuItem>
            <!-- Edit Comment Button -->
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                ]"
              >
                <i class="far fa-edit text-center fa-fw mr-2"></i><span>Edit Comment</span>
              </button>
            </MenuItem>
          </div>
          <div class="px-1 py-1">
            <!-- Delete Comment Button -->
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                ]"
              >
                <i class="far fa-trash-alt text-center fa-fw mr-2"></i><span>Delete Comment</span>
              </button>
            </MenuItem>
            <!-- Report Comment Button -->
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                ]"
              >
                <i class="far fa-flag text-center fa-fw mr-2"></i><span>Report</span>
              </button>
            </MenuItem>
          </div>

          <div class="px-1 py-1">
            <!-- Remove Comment Button -->
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                ]"
              >
                <i class="far fa-comment-alt-minus text-center fa-fw mr-2"></i><span>Remove</span>
              </button>
            </MenuItem>
            <!-- Exile User Button -->
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                ]"
              >
                <i class="far fa-gavel text-center fa-fw mr-2"></i><span>Exile</span>
              </button>
            </MenuItem>
            <!-- Ban User Button -->
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                ]"
              >
                <i class="far fa-gavel text-center fa-fw mr-2"></i><span>Ban</span>
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script>
	import { mapState } from 'vuex'
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
		}
	}
</script>
