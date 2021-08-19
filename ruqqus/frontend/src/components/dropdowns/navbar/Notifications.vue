<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="relative flex items-center justify-center px-2 w-8 h-8 text-xl text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm">
        <span class="sr-only">View notifications</span>
        <!-- Button Icon -->
        <i class="far fa-bell"></i>
        <!-- Counter -->
        <span class="absolute flex items-center justify-center w-6 h-6 rounded bg-purple-500 border-2 border-white dark:border-gray-800 transform transition duration-150" :class="notifications.length ? 'scale-100' : 'scale-0'" style="top: -6px;right: -6px;">
          <span class="font-bold text-2xs text-white dark:text-gray-200">
            {{ notifications.length || 1 }}
          </span>
        </span>
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
      <MenuItems class="absolute right-0 w-96 mt-5 origin-top-right bg-white divide-y divide-gray-100 rounded shadow-lg border focus:outline-none overflow-hidden">
        <div>
          <div class="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b dark:border-gray-800">
            <div class="text-2xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-400">Notifications</div>
            <div class="flex items-center space-x-2 leading-tight">
              <!-- Mark As Read Button -->
              <button :disabled="!notifications.length" class="text-sm text-gray-500 hover:text-gray-700 disabed:opacity-50">
                <i class="far fa-check-double"></i>
              </button>
              <span class="text-gray-300 text-sm font-hairline">
                |
              </span>
              <!-- Toggle Preferences Button -->
              <button class="text-sm text-gray-500 hover:text-gray-700" @click="toggleSettings()">
                <i class="far fa-cog"></i>
              </button>
            </div>
          </div>

          <!-- settings -->
          <div v-show="showSettings" class="flex flex-col p-4 bg-white border-b">
            <div class="text-2xs font-bold uppercase tracking-wide text-gray-400">
              Show:
            </div>
            <hr>
            <t-checkbox-group name="filter" v-model="filters" :options="['Replies', 'Mentions', 'Activity', 'Moderation']"></t-checkbox-group>
          </div>

          <!-- Notifications List -->
          <div class="overflow-y-auto" :class="{'opacity-50 pointer-events-none':showSettings}">
            <div class="flex flex-col items-center justify-center">
              <!-- Loading State -->
              <div v-show="loading && !errored && !notifications.length" class="w-full space-y-4 py-4">
                <div v-for="i in 5" :key="i" class="px-4 animate-pulse">
                  <div class="rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 w-full h-6"></div>
                </div>
              </div>
              <!-- Errored State -->
              <div v-show="!loading && errored && !notifications.length">
                <div class="flex flex-col items-center text-center w-full p-12">
                  <i class="block fad fa-ghost text-gray-400 text-4xl mb-5"></i>
                  <div class="h5">Unable to Load Notifications</div>
                  <p class="text-sm text-gray-400">
                    Sorry, we're unable to fetch your notifications right now.
                  </p>
                  <button class="button outlineGray200 mt-3" @click="getNotifications()">
                    <i class="far fa-redo-alt pr-2"></i>
                    Try again
                  </button>
                </div>
              </div>
              <!-- Notifications -->
              <div v-if="notifications.length" class="w-full bg-white">
                <NotificationList :notifications="notifications" @click="hide"/>
              </div>
              <!-- Empty State -->
              <div v-show="!loading && !errored && !notifications.length" class="flex flex-col items-center p-12">
                <i class="block fad fa-bell text-gray-400 text-4xl mb-5"></i>
                <div class="h5">
                  No Unread Notifications
                </div>
                <p class="text-sm text-gray-400">
                  You're all caught up! Time for a coffee break? 🧙
                </p>
              </div>
            </div>
          </div>

        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script>
  import { defineAsyncComponent } from 'vue'
  import axios from "axios";
  //import { mapGetters } from "vuex"
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
  const NotificationList = defineAsyncComponent(() => import('@/components/notifications/NotificationList.vue'));
  
  export default {
    name: "NotificationsDropdown",
    components: {
      Menu,
      MenuButton,
      MenuItems,
      MenuItem,
      NotificationList
    },
    data() {
      return {
        loading: true,
        errored: false,
        showSettings: false,
        notifications: []
      }
    },
    computed: {
      //...mapGetters("notifications", ["notificationsCount"]),
      filters: {
        get() {
          return this.$store.state.persist.notificationsFilters
        },
        set (value) {
          this.$store.commit('persist/SET_NOTIFICATIONS_FILTERS', value)
          console.log('notifications set in state')
        }
      },
      tippyText() {
        return this.notifications.length ? 'You have unread notifications' : 'Notifications'
      }
    },
    methods: {
      toggleSettings() {
        return this.showSettings = !this.showSettings;
      },
      onHide() {
        this.showSettings = false;
        console.log('notifications navbar dropdown hidden')
      },
      getNotifications() {
        this.loading = true;
        this.errored = false;
        axios
        .get('/api/vue/notifications/all')
        .then(response => {
          this.notifications = response.data.notifications
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
      }
    }
  }
</script>
