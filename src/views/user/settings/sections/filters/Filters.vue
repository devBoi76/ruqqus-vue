<template>
  <!-- Main content section -->
  <div class="grid grid-cols-12 gap-4">
    <div class="sm:hidden border-b mb-4 py-2 dark:text-gray-100">
      <div>
        <div class="flex items-center">
          <b-button to="/settings" variant="link" size="lg" class="ml-n3 text-white-65">
            <i class="far fa-chevron-left mr-3"></i><span class="font-normal">Settings</span>
          </b-button>
        </div>
      </div>
    </div>
    <div class="sm:hidden dark:tetx-gray-100">
      <div>
        <h1 class="h3"><i class="far fa-user-circle mr-3"></i>Filters Settings</h1>
      </div>
    </div>

    <div v-show="loading" class="col-span-full px-4 my-4 dark:text-gray-100">
      <div class="flex flex-col w-full space-y-3 animate-pulse">
        <div class="rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 w-1/6 h-4"></div>
        <div class="rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 w-2/6 h-4"></div>
        <div class="rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 w-full h-44"></div>
      </div>
    </div>

    <div v-show="errored" class="col-span-full px-4 my-4 dark:text-gray-100">
      <div class="flex flex-col items-center rounded-sm bg-white border border-gray-300 dark:bg-opacity-20 w-full p-12">
        <i class="block fad fa-ghost text-gray-400 text-5xl mb-6"></i>
        <div class="h5">Whoops :/</div>
        <p class="text-gray-600">Sorry we're unable to fetch your settings right now. Refresh the page or try again later.</p>
      </div>
    </div>

    <div v-show="!loading && !errored" class="col-start-1 col-span-full lg:col-span-8 px-4 my-4 dark:text-gray-100">
      <div>
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="mt-5 md:mt-0 md:col-span-3 space-y-8">
            <form action="#" method="POST">
              <div class="h5">Preset Filters</div>
              <p class="text-gray-500">Manage preset content filters.</p>
              <div class="bg-white border border-gray-300 rounded-sm overflow-hidden">
                <div class="px-4 py-5 space-y-6 md:p-5">
                  <div class="flex items-start">
                    <t-toggle v-model="v.over_18"/>
                    <div class="ml-5 -mt-1">
                      <label class="label">NSFW</label>
                      <p class="mt-1 text-sm text-gray-500">
                        View mature "not safe for work" content.
                      </p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <t-toggle v-model="v.show_nsfl"/>
                    <div class="ml-5 -mt-1">
                      <label class="label">NSFL</label>
                      <p class="mt-1 text-sm text-gray-500">
                        View "not safe for life" content. i.e. shock and gore
                      </p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <t-toggle v-model="v.hide_offensive"/>
                    <div class="ml-5 -mt-1">
                      <label class="label">Hide offensive content</label>
                      <p class="mt-1 text-sm text-gray-500">
                        Enable to hide content that includes common offensive terms. A full list of words can be found <a href="/slurs.txt" class="text-purple-500 hover:underline">here</a>.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-end px-4 py-3 bg-gray-100 md:px-5 md:py-4">
                  <button type="submit" class="button purple500">Save</button>
                </div>
              </div>
            </form>

            <form action="#" method="POST">
              <div class="h5">Custom Filters</div>
              <p class="text-gray-500">Manage custom content filters that you define.</p>
              <div class="bg-white border border-gray-300 rounded-sm overflow-hidden">
                <div class="px-4 py-5 space-y-6 md:p-5">
                </div>
                <div class="flex items-center justify-end px-4 py-3 bg-gray-100 md:px-5 md:py-4">
                  <button type="submit" class="button purple500">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// Import components

import axios from 'axios'

export default {
  name: "UserSettingsBasicInfoView",
  components: {
    //Toggle,
    //Form
  },
  data() {
    return {
      loading: true,
      errored: false,
      v: [],
    }
  },
  computed: {
  },
  methods: {
  },
  created() {
    axios
    .get('/settings/user_info')
    .then(response => {
      this.v = response.data
    })
    .catch(error => {
      console.log(error)
      this.errored = true
    })
    .finally(() => this.loading = false)
  }
};
</script>
