<template>
  <div class="flex flex-col flex-grow bg-white md:shadow-xs md:rounded-sm overflow-hidden">

    <!-- Header content section -->
    <div class="flex flex-shrink-0 w-full items-center h-16 px-4 bg-white border-b dark:border-white dark:border-opacity-10 dark:bg-gray-700">
      <h1 class="text-xl mb-0">Account Settings</h1>
    </div>

    <!-- Tabs -->
    <div class="flex flex-shrink-0 w-full items-end h-10 px-4 border-b dark:border-white dark:border-opacity-10 dark:bg-gray-700">
      <router-link v-for="tab in tabs" :key="tab.name" v-slot="{ href, navigate, isExactActive }" :to="tab.route">
        <a :href="href" @click="navigate" class="group">
          <div class="border-b-2 px-4 pb-2 capitalize" :class="isExactActive ? 'text-purple-500 border-purple-500' : 'text-gray-500 hover:text-gray-700 border-transparent'">
            {{ tab.name }}
          </div>
        </a>
      </router-link>
    </div>

    <!-- Main content section -->
    <keep-alive :max='5'>
      <router-view :key="$route.fullPath"></router-view>
    </keep-alive>

  </div>
</template>

<script>
// Import Components

import { mapState } from 'vuex';

export default {
  name: "UserSettingsView",
  data() {
    return {
      lists: [
      {
        name: "saved",
        routeName: "user-settings-profile-view",
        icon: 'fas fa-bookmark',
        color: 'red-500',
        description: 'View posts and comments you have saved.'
      },
      {
        name: "upvoted",
        routeName: "guild-about-view",
        icon: 'fas fa-arrow-alt-up',
        color: 'purple-500',
        description: 'View posts and comments you have upvoted.'
      }
      ],
      tabs: [
      {
        name: "profile",
        route: {
          name: 'user-settings-profile-view'
        },
        exact: true,
        icon: 'fas fa-user-circle',
        color: 'gray-300',
        description: 'Manage your public profile.'
      },
      {
        name: "notifications",
        route: {
          name: 'user-settings-notifications-view'
        },
        icon: 'fas fa-bell',
        color: 'blue-500',
        description: 'Manage how you receive notifications across Ruqqus.'
      },
      {
        name: "security",
        route: {
          name: 'user-settings-security-view'
        },
        icon: 'fas fa-lock-alt',
        color: 'red-500',
        description: 'Configure your email, password, and more.'
      },
      {
        name: "apps",
        route: {
          name: 'user-settings-apps-view'
        },
        icon: 'fas fa-wrench',
        color: 'orange-500',
        description: 'For developers. Manage Ruqqus-powered apps and API keys.'
      },
      {
        name: "filters",
        route: {
          name: 'user-settings-content-view'
        },
        exact: true,
        icon: 'fas fa-filter',
        color: 'green-500',
        description: 'Configure your personal Ruqqus content filters.'
      },
      {
        name: "premium",
        routeName: "user-settings-premium-view",
        icon: 'fas fa-star',
        color: 'yellow-700',
        description: 'Ruqqus Premium subscription.'
      }
      ]
    }
  },
  computed: {
    ...mapState("persist", ["darkmode"])
  }
}
</script>

<style scoped>

</style>
