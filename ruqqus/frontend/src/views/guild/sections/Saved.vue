<template>

  <div class="flex flex-col h-full shadow-sm bg-gray-200 dark:bg-gray-700" :class="darkMode ? 'bg-gray-700' : 'bg-gray-200'">

    <!-- Header content section -->
    <div class="md:hidden h-24 px-md-4 border-b dark:border-white-13 dark:border-opacity-10">
      <div class="h-100 items-center">
        <div>
          <div class="flex items-center justify-center h-10">

            <!-- Mobile lodges navigation -->
            <div class="d-none scroll">
              <div class="inline-block mr-2" v-for="lodge of lodges" :key="lodge.id">
                <div class="px-2 py-2 rounded-sm text-break" :style="{ backgroundColor: lodge.color }"
                >
                <div>
                  <span class="font-bold lowercase" :class="{'text-gray-100':darkMode}">
                    <i class="far fa-hashtag text-sm mr-2 w-4 text-center"></i>
                    {{ lodge.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

  <div class="flex items-center flex-shrink-0 h-16 md:px-4 border-b border-gray-300 bg-white dark:border-white dark:border-opacity-10 dark:bg-gray-700">
    <div class="flex items-center justify-between flex-grow">
      <div>
        <div class="text-base font-bold dark:text-gray-100">Ruqqsack</div>
        <p class="text-sm text-gray-600 dark:text-white dark:text-opacity-65 mb-0">
          All your saved posts from +{{ $route.params.name }}
        </p>
      </div>

      <div v-show="$route.name != 'guild-item-view'" class="flex flex-wrap items-center space-x-6">
        <div class="md:hidden">
          <t-select @change="routeChange" v-model="selected" :options="options"></t-select>
        </div>
        <div class="hidden md:block">
          <!-- <t-dropdown 
          :classes="{
            dropdown: 'w-56 origin-top-left right-0 bg-white py-2'
          }"
          text="Menu">
          Trigger
          <div slot="trigger" slot-scope="{ mousedownHandler, focusHandler, blurHandler, keydownHandler }">
            <button class="capitalize text-sm text-gray-500" id="user-menu" aria-label="User menu" aria-haspopup="true" @mousedown="mousedownHandler" @focus="focusHandler" @blur="blurHandler" @keydown="keydownHandler">
              Most recent<i class="fas fa-chevron-down fa-sm pl-2"></i>
            </button>
          </div>
          Menu
          <div slot-scope="{ hide }">
           <router-link to="?sort=hot" class="block px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @blur="hide">
            <span>Most recent</span>
          </router-link>
          <router-link to="?sort=newest" class="block px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @blur="hide">
            <span>Oldest</span>
          </router-link>
        </div>
      </t-dropdown> -->
    </div>
    <ListingToggle />
  </div>
</div>
<!--<h1 class="text-gray-100">Settings</h1>-->
</div>

<!-- Main Content Desktop -->

<vue-scroll class="hidden md:block">
  <div class="flex flex-col p-4">
    <ItemList/>
  </div>
</vue-scroll>


<!-- Main Content Mobile -->

<div class="md:hidden md:px-4 py-4">
  <div>
    <div>
      <div class="w-full">
        <ItemList/>
      </div>
    </div>
  </div>
</div>

</div>
</template>

<script>
// Import components
import ItemList from "@/views/ItemList.vue";

import ListingToggle from "@/components/forms/ListingToggle.vue";

import { mapState } from "vuex";

export default {
  name: "SavedView",
  data() {
    return {
      page: 1,
      busy: false,
      fluid: true,
      show: false,
      selected: null,
      options: [
      { value: null, text: 'Hot' },
      { value: '/', text: 'New' },
      { value: '/', text: 'Week' },
      { value: '/', text: 'Month' },
      { value: '/', text: 'Year' },
      { value: '/', text: 'All' }
      ]
    };
  },
  components: {
    ItemList,
    ListingToggle
  },
  computed: {
    ...mapState("persist", ["v", "darkMode"])
  }
}
</script>

<style scoped>
.scroll {
  white-space: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}
.scroll::-webkit-scrollbar {
  display: none; }
</style>
