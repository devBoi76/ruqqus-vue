<template>
  <div class="flex flex-col flex-grow bg-white md:shadow-xs md:rounded-sm overflow-hidden">

    <!-- Header content section -->
    <div class="flex flex-shrink-0 w-full items-center h-16 px-4 bg-white border-b dark:border-white dark:border-opacity-10 dark:bg-gray-700">
      <h1 class="text-xl font-medium mb-0">Guilds</h1>
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
    <div class="grid grid-cols-12 gap-8">
      <div class="col-span-full dark:text-gray-100">
        <!-- Loading state -->
        <div v-show="loading" class="space-y-5 py-4">
          <div v-for="i in 5" :key="i" class="flex w-full px-4 space-x-3 animate-pulse">
            <div class="rounded-sm bg-gray-100 dark:bg-white dark:bg-opacity-20 w-11 h-11"></div>
            <div>
              <div class="rounded-sm bg-gray-100 dark:bg-white dark:bg-opacity-20 h-3 w-24 mb-2"></div>
              <div class="rounded-sm bg-gray-100 dark:bg-white dark:bg-opacity-20 h-2 w-1/3"></div>
            </div>
          </div>
        </div>
        <!-- Errored state -->
        <div v-show="errored">
          <div class="flex flex-col items-center text-center w-full p-12">
            <i class="block fad fa-ghost text-gray-400 text-4xl mb-5"></i>
            <div class="h5">Unable to Load Guilds</div>
            <p class="text-sm text-gray-400">
              Sorry, we're unable to fetch your guilds right now.
            </p>
            <button class="button outlineGray200 mt-3" @click="reloadPage()">
              <i class="far fa-redo-alt pr-2"></i>
              Try again
            </button>
          </div>
        </div>
        <GuildList v-if="guilds" :guilds="guilds"/>
        <!-- Empty state -->
        <div v-show="!loading && !errored" v-else class="flex flex-col items-center p-12">
          <i class="block fad fa-bell text-gray-400 text-4xl mb-5"></i>
          <div class="h5">No Guilds</div>
          <p class="text-sm text-gray-400">You need to join some guilds first!</p>
          <button class="button outlinePurple500 mt-3" to="/browse">
            Explore guilds
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// Import Components

import { mapState } from 'vuex';
import GuildList from '@/components/guild/GuildList.vue';

export default {
  name: "UserSettingsView",
  components: {
    GuildList
  },
  data() {
    return {
      loading: false,
      errored: false,
      tabs: [
      {
        name: "joined",
        route: {
          name: 'user-guilds-view'
        },
        exact: true,
        icon: 'fas fa-chess-rook',
        color: 'gray-300',
        description: 'Manage your public profile.'
      },
      {
        name: "moderating",
        route: {
          name: 'user-guilds-view',
          params: { sort: 'moderating' }
        },
        exact: true,
        icon: 'fas fa-crown',
        color: 'blue-500',
        description: 'Manage how you receive notifications across Ruqqus.'
      },
      {
        name: "hidden",
        route: {
          name: 'user-guilds-view',
          params: { sort: 'hidden' }
        },
        icon: 'fas fa-eye-slash',
        color: 'red-500',
        description: 'Configure your email, password, and more.'
      }
      ],
      guilds: [
      {
        id: 1,
        name:'ruqqus',
        profile_url:'https://i.ruqqus.com/board/ruqqus/profile-3.png',
        description:'The official guild for all things Ruqqus.'
      },
      {
        id: 2,
        name:'gaming',
        profile_url:'https://i.ruqqus.com/board/gaming/profile-2.png',
        description:'For all things gaming.'
      },
      {
        id: 3,
        name:'AskRuqqus',
        profile_url:'https://i.ruqqus.com/board/askruqqus/profile-4.png',
        description:'Ask and answer questions.'
      },
      {
        id: 4,
        name:'technology',
        profile_url:'https://i.ruqqus.com/board/technology/profile-3.png',
        description:'For all things tech.'
      },
      {
        id: 5,
        name:'ruqquscraft',
        profile_url:'https://i.ruqqus.com/board/ruqquscraft/profile-4.png',
        description:'Official Guild for the Ruqquscraft Minecraft Server!'
      },
      {
        id: 6,
        name:'cooking',
        profile_url:'https://i.ruqqus.com/board/cooking/profile-2.png',
        description:'Cooking and Food Related. A Place For The Cooks Of Ruqqus or Aspiring Cooks. Post Your Recipes Here As Well. All Welcome to Participate.'
      },
      {
        id: 7,
        name:'privacy',
        profile_url:'https://i.ruqqus.com/board/privacy/profile-2.png',
        description:'Privacy and freedom in a digital world'
      }
      ]
    }
  },
  computed: {
    ...mapState("persist", ["v"])
  },
  methods: {
    reloadPage() {
      window.location.reload();
    }
  }
}
</script>
