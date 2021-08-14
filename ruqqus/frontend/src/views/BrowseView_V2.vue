<template>
  <div class="flex flex-grow bg-gray-50">
    <vue-scroll>
      <div class="relative bg-gradient-to-br overflow-hidden">
        <div class="lg:container lg:mx-auto p-4 py-20">
          <h1 class="text-white">
            <span class="block xl:inline capitalize">
              {{ $route.params.category || "Browse" }}
            </span>
          </h1>
          <p class="text-white">
            Discover new communities on Ruqqus by topic.
          </p>
        </div>
      </div>
      <div class="lg:container lg:mx-auto p-4 lg:py-8">
        <div class="flex"> <!--xl:space-x-8-->
          <div class="hidden"> <!--xl:block w-72-->
            <div class="top-4 sticky">
              <div class="text-xs tracking-wide font-medium uppercase text-gray-500 dark:text-gray-400 mb-2">
                Categories
              </div>
              <ul>
                <li v-for="tab in categories" :key="tab.id">
                  <router-link :to="tab.route" v-slot="{ href, navigate, isExactActive }">
                    <a :href="href" @click="navigate" class="block px-4 py-2 text-left text-gray-900 transition duration-100 rounded-sm" :class="isExactActive ? 'bg-gray-100' : 'hover:bg-gray-50'">
                      <span class="font-medium capitalize">
                        {{ tab.name }}
                      </span>
                    </a>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="w-full space-y-8">
            <div>
              <div class="text-xl font-bold mb-2">
                Categories
              </div>
              <div class="flex flex-wrap -mx-2 overflow-hidden md:-mx-3">
                <router-link :to="category.route" v-for="category in categories" :key="category.id" class="my-2 px-2 md:my-3 md:px-3 w-1/2 lg:w-1/4">
                  <div class="flex items-center text-gray-900 overflow-hidden">
                    <div class="flex items-center justify-center h-11 w-11 bg-gradient-to-br text-white rounded-sm" :class="category.gradient || 'from-purple-300 to-purple-500'">
                      <i class="fad fa-fw fa-lg" :class="category.icon || 'chess-rook'"></i>
                    </div>
                    <div class="px-3">
                      <span class="font-bold capitalize">{{ category.name }}</span>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
            <div v-for="category in categories" :key="category.id" class="pt-4 border-t space-y-3">
              <div>
                <div class="flex items-center mb-2">
                  <div class="flex items-center justify-center h-7 w-7 bg-gradient-to-br text-white rounded-sm mr-3" :class="category.gradient || 'from-purple-300 to-purple-500'">
                    <i class="fad fa-fw" :class="category.icon"></i>
                  </div>
                  <div class="text-xl font-bold capitalize">
                    {{ category.name }}
                  </div>
                  <router-link :to="category.route" class="block ml-auto text-gray-600 hover:underline">
                    View more
                  </router-link>
                </div>
<!--                 <div class="flex items-center space-x-3">
                  <i class="fas fa-filter text-gray-500 fa-lg fa-fw"></i>
                  <button v-for="tag in tags" :key="tag.name" class="group px-2 py-1.5 rounded-full border border-purple-200 bg-purple-50 text-purple-500 uppercase font-bold text-2xs leading-none tracking-wide hover:bg-purple-100 focus:bg-purple-100" tabindex="0">
                    {{ tag }}
                    <i class="hidden group-hover:inline fas fa-times-circle fa-lg ml-2 -mr-1"></i>
                  </button>
                </div> -->
                <!-- Guild Card Grid -->
                <div class="flex flex-wrap -mx-2 overflow-hidden md:-mx-3">
                  <div v-for="guild in v.boards_subscribed.slice(0, 4)" :key="guild.name" class="my-2 px-2 w-full overflow-hidden md:my-3 md:px-3 md:w-1/2 lg:w-1/4">
                    <GuildCard :guild="guild"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
// Import our components
import { mapState } from "vuex";

import GuildCard from "@/components/cards/GuildCard.vue";

export default {
  name: "browse-view",
  components: {
    GuildCard
  },
  data() {
    return {
      categories: [
      {
        id: 1,
        name: 'all categories',
        icon: 'fa-globe-stand',
        gradient: 'from-purple-300 to-purple-500',
        route: {
          name: 'BrowseView'
        },
        tags: []
      },
      {
        id: 2,
        name: 'arts',
        icon: 'fa-palette',
        gradient: 'from-pink-300 to-pink-500',
        route: {
          name: 'BrowseView',
          params: { category: 'arts'}
        },
        tags: ['console', 'pc']
      },
      {
        id: 3,
        name: 'business',
        icon: 'fa-chart-line',
        gradient: 'from-green-300 to-green-500',
        route: {
          name: 'BrowseView',
          params: { category: 'business'}
        },
        tags: ['console', 'pc']
      },
      {
        id: 4,
        name: 'culture',
        icon: 'fa-book-spells',
        gradient: 'from-red-300 to-orange-500',
        route: {
          name: 'BrowseView',
          params: { category: 'culture'}
        },
        tags: ['hardware', 'software', 'industry news']
      },
      {
        id: 5,
        name: 'discussion',
        icon: 'fa-podium',
        gradient: 'from-teal-300 to-cyan-500',
        route: {
          name: 'BrowseView',
          params: { category: 'discussion'}
        },
        tags: ['hardware', 'software', 'industry news']
      },
      {
        id: 6,
        name: 'entertainment',
        icon: 'fa-theater-masks',
        gradient: 'from-orange-300 to-yellow-500',
        route: {
          name: 'BrowseView',
          params: { category: 'entertainment'}
        },
        tags: ['hardware', 'software', 'industry news']
      },
      {
        id: 7,
        name: 'gaming',
        icon: 'fa-headset',
        gradient: 'from-blue-300 to-blue-500',
        route: {
          name: 'BrowseView',
          params: { category: 'gaming'}
        },
        tags: ['hardware', 'software', 'industry news']
      },
      {
        id: 8,
        name: 'health',
        icon: 'fa-heart',
        gradient: 'from-red-300 to-red-500',
        route: {
          name: 'BrowseView',
          params: { category: 'health'}
        },
        tags: ['hardware', 'software', 'industry news']
      }
      ]
    };
  },
  computed: {
    ...mapState("persist",["v"]),
  }
};
</script>

<style>
</style>
