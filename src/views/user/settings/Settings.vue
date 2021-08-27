<template>
  <div class="w-full overflow-y-auto">
    <div class="grid grid-cols-12 xl:grid-cols-10">
      <div class="col-span-full xl:col-start-3 xl:col-end-9 flex flex-col gap-4 sm:p-6 my-2.5 sm:my-0">
        <h1 class="h3 font-semibold mb-0">
          Settings
        </h1>
        <!-- Main Content Section -->
        <div class="w-full space-y-8">
          <div class="relative">
            <div class="z-10 absolute top-4 right-4">
              <button v-show="!editAppearance" class="button white" @click="toggleAppearance">
                Edit appearance
              </button>
              <div v-show="editAppearance" class="flex items-center space-x-2">
                <button type="button" class="button linkWhite" @click="toggleAppearance" tabindex="0">
                  Cancel
                </button>
                <button type="button" class="button white" tabindex="0">
                  Save
                </button>
              </div>
            </div>
            <div class="relative">
              <img :src="v.banner_url" class="w-full h-56 lg:h-72 object-cover rounded"/>
              <div v-show="editAppearance" class="absolute bottom-0 flex items-center justify-center w-full h-full bg-black bg-opacity-30">
                <button type="button" class="w-9 h-9 flex items-center justify-center px-2 py-0 text-white bg-transparent hover:bg-black hover:bg-opacity-50 rounded-sm transition duration-100 ease-in-out" tabindex="0">
                  <i class="far fa-pen fa-lg"></i>
                </button>
              </div>
            </div>
            <div class="flex px-4 -mt-12">
              <div class="relative rounded-sm overflow-hidden w-20 h-20 flex-shrink-0">
                <img :src="v.profile_url" class="object-cover" alt="profile-picture"/>
                <div v-show="editAppearance" class="absolute bottom-0 flex items-center justify-center w-full h-full bg-black bg-opacity-30">
                  <button type="button" class="w-9 h-9 flex items-center justify-center text-white px-2 py-0 bg-transparent hover:bg-black hover:bg-opacity-50 rounded-sm transition duration-100 ease-in-out" tabindex="0">
                    <i class="far fa-pen fa-lg"></i>
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
                <div class="col-span-3">
                  <label class="label">
                    Display name
                  </label>
                  <input required class="form-input light" v-model="webhook" placeholder="Enter your Unsplash API key" type="text"/>
                  <p class="text-sm text-gray-500 mt-1">
                    Your original username will always stay reserved for you:
                    <span class="text-primary">
                      {{ v.username }}
                    </span>
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-6 p-4">
                <div class="col-span-3">
                  <label class="label">
                    Bio
                  </label>
                  <Editor @input="getEditorContent()" min-height="10rem" :limit="1000" :value="bio"/>
                  <p class="text-sm text-gray-500 mt-1">
                    <i class="fab fa-markdown fa-fw fa-sm"></i>
                    markdown supported
                  </p>
                </div>
              </div>
            </form>
          </div>
          <div>
            <div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2">
              Privacy
            </div>
            <form class="rounded-sm border bg-white divide-y">
              <div class="grid grid-cols-3 gap-6 p-4">
                <div class="col-span-3">
                  <div class="flex flex-grow items-center justify-between">
                    <div>
                      <div class="font-semibold leading-tight">
                        Private profile
                      </div>
                      <p class="text-sm text-gray-500 mt-1">
                        Cloak my posting history from others
                      </p>
                    </div>
                    <Toggle v-model="v.is_private"/>
                  </div>
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
// Import Components
import { mapState } from 'vuex';

import Editor from "@/components/editors/Editor_V2.vue";
import Toggle from "@/components/forms/Toggle.vue";

export default {
  name: "UserSettingsView",
  data() {
    return {
      editAppearance: false,
      bio: ''
    }
  },
  components: {
    Editor,
    Toggle
  },
  computed: {
    ...mapState("persist", ["v"])
  },
  methods: {
    toggleAppearance() {
      this.editAppearance = !this.editAppearance
    },
    getEditorContent(value) {
      this.bio = value;
    }
  },
  created() {
    console.log(this.v)
  }
}
</script>