<template>
  <div class="w-full overflow-y-auto">
    <div class="grid grid-cols-12 xl:grid-cols-10">
      <div class="col-span-full xl:col-start-3 xl:col-end-9 flex flex-col gap-4 sm:p-6 my-2.5 sm:my-0">
        <h1 class="h3 font-semibold mb-0">
          Settings
        </h1>
        <div class="flex gap-6">
          <!-- Main Content Section -->
          <div class="w-full">
            <div class="flex flex-grow">
              <div class="w-full bg-white dark:bg-gray-800 sm:rounded-sm sm:border">
                <div class="grid grid-cols-3 gap-6">
                  <div class="col-span-3 sm:col-span-2">
                    <label class="label">
                      Community name
                    </label>
                    <input class="form-input light" v-model="site.name" :placeholder="$route.params.name" type="text"/>
                    <p class="text-sm text-gray-500 mt-1">
                      This does not affect your community web address
                    </p>
                  </div>
                </div>
                <div class="grid grid-cols-3 gap-6">
                  <div class="col-span-3 sm:col-span-2">
                    <div class="relative">
                      <label class="label">
                        Community tagline
                      </label>
                      <textarea class="form-textarea light" v-model="site.tagline" type="text" rows="3" maxlength="140" placeholder="A community residing on the world wide web."/>
                      <div v-if="site.tagline" class="absolute text-xs font-semibold text-gray-400 right-3 bottom-2" :class="{'text-red-500':site.tagline.length >= 140}">
                        {{ 140 - site.tagline.length }}
                      </div>
                    </div>
                    <p class="text-sm text-gray-500 mt-1">
                      Descriptive text used in social images and banner artwork
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
