<template>
  <div class="flex flex-col flex-grow overflow-y-auto">

    <!-- Header content section -->
    <div class="grid grid-cols-12">
      <div class="col-span-full mt-4 px-4">
        <h1 class="text-2xl mb-0">Overview</h1>
      </div>
    </div>

    <!-- Main content section -->

    <!-- Error state if guild data fails to load -->
    <div v-show="errored && !loading" class="w-full h-full px-4 my-4">
      <div class="flex flex-col h-full justify-center items-center text-center">
        <i class="block fad fa-ghost text-gray-400 dark:text-gray-200 text-5xl mb-6"></i>
        <div class="h5">
          Unable to Load Moderation Tools
        </div>
        <p class="text-gray-600 dark:text-gray-400">
          Sorry we're unable to fetch guild reports right now. Try again later.
        </p>
      </div>
    </div>

    <div v-show="loading && !errored" class="col-start-1 col-span-full lg:col-span-8 px-4 my-4 dark:text-gray-100">
      <div class="flex flex-col w-full space-y-3 animate-pulse">
        <div class="rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 w-1/6 h-4"></div>
        <div class="rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 w-2/6 h-4"></div>
        <div class="rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 w-full h-44"></div>
      </div>
    </div>

    <div v-show="!loading && !errored" class="col-start-1 col-span-full lg:col-span-8 px-4 my-4 dark:text-gray-100">
      <div class="flex flex-col items-center rounded-sm bg-white border border-gray-300 dark:bg-opacity-20 w-full p-12">
        <i class="block fad fa-crown text-gray-400 text-4xl mb-6"></i>
        <div class="h5">Welcome to +{{g.name}} Moderation Tools</div>
        <p class="text-gray-600">Here you can manage the guild's reports, appearance, and more.</p>
      </div>
    </div>
  </div>
</template>

<script>
// Import components
import axios from "axios";

export default {
  name: "UserSettingsBasicInfoView",
  components: {
  },
  data() {
    return {
      loading: true,
      errored: false,
      g: []
    }
  },
  computed: {
  },
  methods: {
  },
  created() {
    axios
    .get(`/api/vue/core/+${this.$route.params.name}`)
    .then(response => {
      this.g = response.data
    })
    .catch(error => {
      console.log(error)
      this.errored = true
    })
    .finally(() => this.loading = false)
  }
};
</script>