<template>
  <div class="hidden md:flex items-center flex-col flex-shrink-0 dark:bg-gray-800 dark:border-gray-700 dark:border-opacity-70"
  :class="['bg-'+sidebarColor, expanded ? 'w-60' : 'w-16 text-center',{'border-r':!noBorder}]">

  <!-- Scrollable section -->
  <vue-scroll :ops="hideBar">

    <!-- Expand toggle -->
    <div v-show="expanded" class="mt-3 px-3 flex items-center justify-between w-full">
      <div>
        <div class="px-3 text-xs tracking-wider font-medium uppercase text-white text-opacity-80 dark:text-opacity-60">
          Feeds
        </div>
      </div>
      <!-- Expand toggle -->
      <div v-if="!disableToggle" class="mt-3 px-3" :class="{'flex items-center justify-between w-full':!collapsed}">
        <button @click="toggleBar" class="button transparent">
          <i class="far " :class="!collapsed ? 'fa-arrow-to-left' : 'fa-arrow-from-left'"></i>
        </button>
      </div>
    </div>


    <div class="flex flex-col items-center py-4">

      <div v-show="!expanded">
        <ul class="pb-3 border-b dark:border-gray-800">
          <li v-for="link in links" :key="link.id" class="mb-3 last:mb-0">
            <router-link
            v-slot="{ route, href, navigate }"
            :alt="link.name + 'icon'"
            :to="link.route"
            >
            <a :href="href" @click="navigate" class="group">
              <div class="flex items-center justify-center w-11 h-11 text-xl transition duration-200 rounded-sm" :class="route.path === $route.path ? 'text-white dark:text-gray-200 bg-purple-500' : 'text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:text-purple-500'">
                <i class="far" :class="link.icon"></i>
              </div>
            </a>
          </router-link>
        </li>
      </ul>
    </div>

    <div v-show="expanded">
      <ul class="mt-n2 mb-4 pb-2 border-b dark:border-gray-800">
        <li v-for="link of links.slice(0, 3)" :key="link.id">
          <button block :class="[darkMode ? 'gray-800' : sidebarColor]" :to="link.route" class="button py-2 text-left">
            <i class="text-sm mr-3 w-6 text-center" :class="[link.icon, darkMode ? 'far text-gray-100' : 'far']"></i>
            <span class="text-capitalize">{{ link.name }}</span>
          </button>
        </li>
      </ul>
    </div>

    <div class="mt-n2 mb-2" v-show="expanded">
      <div class="text-extra-sm tracking-wider font-weight-bold text-uppercase dark:text-gray-400">
        Other
      </div>
    </div>

    <div v-show="expanded">
      <ul class="mb-4 pb-2 border-b dark:border-white">
        <li v-for="link of links.slice(3, 6)" :key="link.id">
          <button block :class="[darkMode ? 'gray-800' : 'white']" :to="link.route" class="button py-2 text-left">
            <i class="text-sm mr-3 w-6 text-center" :class="[link.icon, darkMode ? 'far text-gray-100' : 'far']"></i>
            <span class="text-capitalize">{{ link.name }}</span>
          </button>
        </li>
      </ul>
    </div>

  <!--
  <div v-show="expanded" class="pl-3">
    <span class="text-gray-100 text-capitalize" :class="{'text-gray-100':darkMode}">{{ link.name }}</span>
  </div>
-->

<div class="mt-n2 mb-2" v-if="v.boards_subscribed" v-show="expanded">
  <div class="text-extra-sm tracking-wider font-weight-bold text-uppercase" :class="{'text-gray-400':darkMode}">
    Guilds
  </div>
</div>

<draggable
v-if="v.boards_subscribed"
v-show="!expanded"
tag="ul"
v-model="myArray"
group="guilds"
:forceFallback="true"
@start="drag=true"
@end="drag=false"
v-bind="{animation: 150, ghostClass: 'ghost', dragClass: 'drag', disabled: false}"
class="mb-3"
>
<transition-group type="transition" :name="!drag ? 'flip-list' : null">
  <li class="group relative mb-3 last:mb-0" v-for="guild in v.boards_subscribed" :key="guild.name">
    <router-link v-slot="{ href, navigate, isActive }" :to="'/+' + guild.name">
      <a :href="href" @click="navigate">
        <div class="absolute h-4 top-3.5 transform transition ease-in-out duration-200 origin-center chosen-hidden bg-purple-500" :class="isActive ? '-left-2.5 scale-y-250' : '-left-4 group-hover:-left-2.5 group-hover:scale-y-250 group-hover:bg-opacity-100 bg-opacity-60'" style="width:3px">
        </div>
        <img
        :id="`guild-icon-` + guild.name"
        v-lazy="guild.profile_url"
        :key="guild.profile_url"
        alt="Guild icon"
        class="w-11 h-11 object-cover bg-black bg-opacity-10 dark:text-white dark:text-opacity-70 rounded-sm"
        :content="`+${guild.name}`"
        v-tippy="{ placement : 'right' }"
        />
      </a>
    </router-link>
  </li>
</transition-group>
</draggable>

<div v-if="v.boards_subscribed" v-show="expanded">
  <ul class="mb-0" :class="darkMode ? 'border-white-13' : 'border-gray-200'" style="list-style: none;">
    <draggable
    v-model="myArray"
    group="guilds"
    delay=300
    @start="drag=true"
    @end="drag=false"
    v-bind="{ghostClass: 'ghost', chosenClass: 'chosen', dragClass: 'drag'}"
    >
    <li v-for="guild in v.boards_subscribed" :key="guild.name">
      <button block :class="[darkMode ? 'gray-800' : 'white']" :to="'/+' + guild.name" class="button flex items-center py-2 text-left"
      active-class="text-purple-500 bg-white-10">
      <b-avatar
      :id="`guild-icon-` + guild.name"
      :src="guild.profile_url"
      size="1.5rem"
      variant="dark"
      badge-variant="dark"
      rounded
      alt="Guild icon"
      ></b-avatar>
      <span class="pl-3">+{{ guild.name }}</span>
    </button>
  </li>
</draggable>
</ul>
</div>

<div v-show="!expanded">
  <ul class="mb-0">
    <li>
      <router-link tag="button"
      class="flex items-center justify-center w-11 h-11 text-gray-600 border-2 border-gray-200 dark:border-gray-700 border-dashed hover:text-white hover:bg-purple-500 hover:border-transparent dark:hover:border-transparent transition duration-100 rounded-sm"
      to="/browse"
      >
      <i class="far fa-plus"></i>
    </router-link>
  </li>
</ul>
</div>

</div>
</vue-scroll>
</div>
</template>

<script>
// import components
import { mapState, mapActions } from "vuex";

const draggable = () => import('vuedraggable')

export default {
  props: {
    sidebarColor: {
      type: String,
      default: 'white'
    },
    noBorder: {
      type: Boolean,
      default: false
    },
    disableToggle: {
      type: Boolean,
      default: false
    },
    light: Boolean
  },
  components: {
    draggable
  },
  data() {
    return {
      drag: false,
      hideBar: { // Vue-Scroll bar
        bar: {
          opacity: 0
        }
      },
      links: [
      {
        id: 1,
        name: 'home',
        route: '/',
        icon: 'fa-home-lg-alt'
      },
      {
        id: 2,
        name: 'staregazed',
        route: '/stargazed',
        icon: 'fa-stars'
      },
      {
        id: 3,
        name: 'trends',
        route: '/trending',
        icon: 'fa-fire'
      },
      {
        id: 4,
        name: 'all',
        route: '/all',
        icon: 'fa-layer-group'
      }
      ],
      guilds: [
      {
        id: 1,
        src: "https://i.imgur.com/jEAcsd1.png",
        name: "LeagueOfLegends"
      },
      {
        id: 2,
        src: "https://i.imgur.com/w1tUXW8.png",
        name: "xbox"
      },
      {
        id: 3,
        src: "https://i.imgur.com/tjaSIRm.png",
        name: "terraria"
      },
      {
        id: 4,
        src: "https://i.imgur.com/xCrthmd.png",
        name: "halo"
      },
      {
        id: 5,
        src: "https://i.imgur.com/AZbYkUS.png",
        name: "BrawlStars"
      },
      {
        id: 6,
        src: "https://i.imgur.com/GYxY7b8.png",
        name: "technology"
      },
      {
        id: 7,
        src: "https://i.imgur.com/X2QrXsk.png",
        name: "HistoryInPictures"
      },
      {
        id: 8,
        src: "https://i.imgur.com/OuUzu0y.png?1",
        name: "Netflix"
      },
      {
        id: 9,
        src: "https://i.imgur.com/KWwAoT9.png",
        name: "minecraft"
      },
      {
        id: 10,
        src: "https://i.imgur.com/9CITzb6.jpg",
        name: "lofi"
      },
      {
        id: 11,
        src: "https://i.imgur.com/xfX7yOQ.png?1",
        name: "RuneScape"
      }
      ]
    };
  },
  computed: {
    ...mapState("persist",["v"]),
    myArray() {
      return this.v.boards_subscribed
    }
  },
  methods: {
    toggleBar() {
      this.toggle_leftbar()
    },
    ...mapActions("persist",["toggle_leftbar"])
  }
};
</script>

<style scoped>
.flip-list {
  transition: transform 0.5s;
}
.ghost {
  @apply invisible
}
.drag {
  @apply transform scale-105 rotate-3 origin-left opacity-100
}
.sortable-fallback { opacity: 1 !important }
.drag .chosen-hidden {
  @apply invisible
}
</style>