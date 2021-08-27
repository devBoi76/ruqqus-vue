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
                <div class="relative">
                  <div class="z-10 absolute top-4 right-4">
                    <button v-show="!editAppearance" type="button" class="button white" @click="toggleAppearance">Edit appearance</button>
                    <div v-show="editAppearance" class="flex items-center space-x-2">
                      <button type="button" class="button black30" @click="toggleAppearance" tabindex="0">Cancel</button>
                      <button type="button" class="button white" tabindex="0">Save</button>
                    </div>
                  </div>
                  <div class="relative">
                    <img :src="v.banner_url" class="w-full h-56 lg:h-72 object-cover"/>
                    <div v-show="editAppearance" class="absolute bottom-0 flex items-center justify-center w-full h-full bg-black bg-opacity-30">
                      <button type="button" class="w-9 h-9 flex items-center justify-center px-2 py-0 text-white bg-transparent hover:bg-black hover:bg-opacity-50 rounded-sm transition duration-100 ease-in-out" tabindex="0">
                        <i class="fas fa-pencil fa-lg"></i>
                      </button>
                    </div>
                  </div>
                  <div class="flex px-4 -mt-12">
                    <div class="relative rounded-sm overflow-hidden w-20 h-20 flex-shrink-0">
                      <img :src="v.profile_url" class="object-cover" alt="profile-picture"/>
                      <div v-show="editAppearance" class="absolute bottom-0 flex items-center justify-center w-full h-full bg-black bg-opacity-30">
                        <button type="button" class="w-9 h-9 flex items-center justify-center text-white px-2 py-0 bg-transparent hover:bg-black hover:bg-opacity-50 rounded-sm transition duration-100 ease-in-out" tabindex="0">
                          <i class="fas fa-pencil fa-lg"></i>
                        </button>
                      </div>
                    </div>
                    <div class="z-10 ml-4 pt-3 font-bold text-lg text-white" :class="{'text-opacity-30':editAppearance}">{{ v.username }}</div>
                  </div>
                </div>
                <div>
                  <div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2">
                    Profile
                  </div>
                  <form class="rounded-sm border bg-white divide-y">
                    <div class="grid grid-cols-3 gap-6 p-4">
                      <div class="col-span-3 sm:col-span-2">
                        <label class="label">
                          Display name
                        </label>
                        <input required class="form-input light" v-model="webhook" placeholder="Enter your Unsplash API key" type="text"/>
                        <p class="text-sm text-gray-500 mt-1">
                          Unsplash API keys can be granted in their
                          <a href="https://unsplash.com/developers" target="_blank" class="hover:underline">
                            developer portal
                          </a>
                        </p>
                      </div>
                    </div>
                    <div class="grid grid-cols-3 gap-6 p-4">
                      <div class="col-span-3">
                        <div class="flex flex-grow items-center justify-between">
                          <div>
                            <div class="font-semibold leading-tight">
                              Use Unsplash on static pages
                            </div>
                            <p class="text-sm text-gray-500 mt-1">
                              Displays Unsplash photos on login, registration, and error pages
                            </p>
                          </div>
                          <Toggle v-model="hasUnsplashLogin"/>
                        </div>
                      </div>
                      <div class="col-span-3 sm:col-span-2" :class="{'opacity-50 pointer-events-none':!hasUnsplashLogin}">
                        <label class="label">
                          Keyword
                        </label>
                        <input required class="form-input light" v-model="keyword" placeholder="e.g. dogs" type="text"/>
                        <p class="text-sm text-gray-500 mt-1">
                          The category of images to pull from Unsplash
                        </p>
                        <!-- Preview goes right here, load 5-10 images flex box -->
                      </div>
                    </div>
                  </form>
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

import Toggle from "@/components/forms/Toggle.vue";

export default {
  name: "UserSettingsView",
  data() {
    return {
      editAppearance: false
    }
  },
  components: {
    Toggle
  },
  computed: {
    ...mapState("persist", ["v"])
  },
  methods: {
    toggleAppearance() {
      this.editAppearance = !this.editAppearance
    }
  }
}
</script>