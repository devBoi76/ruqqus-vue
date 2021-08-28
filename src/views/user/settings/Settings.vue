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
              <div class="z-10 ml-4 pt-3 font-bold text-lg text-white" :class="{'text-opacity-30':editAppearance}">
                {{ v.username }}
              </div>
            </div>
          </div>
          <div>
            <div class="flex justify-between">
              <div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2">
                Profile
              </div>
              <div class="text-xs text-gray-400">
                <i class="fas fa-globe-americas fa-sm pr-1"></i>
                <span>
                  Visible to everyone
                </span>
              </div>
            </div>
            <form class="rounded-sm border bg-white divide-y">
              <div class="grid grid-cols-3 gap-6 p-4">
                <div class="col-span-3">
                  <label class="label">
                    Display name
                  </label>
                  <input required class="form-input light" v-model="webhook" :placeholder="v.username" type="text"/>
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
            <div class="flex justify-between">
              <div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2">
                Security
              </div>
              <div class="text-xs text-gray-400">
                <i class="fas fa-lock-alt fa-sm pr-1"></i>
                <span>
                  Only you can see these details
                </span>
              </div>
            </div>
            <div class="rounded-sm border bg-white divide-y">
              <ToggleForm @change="handleChange">
                <template v-slot:default="{active, toggle}">
                  <div class="p-4">
                    <div class="flex items-center justify-between">
                      <div>
                        <div class="font-semibold leading-tight">
                          Password
                        </div>
                        <p class="text-sm text-gray-500 mt-1">
                          Change your password
                        </p>
                      </div>
                      <button class="flex items-center justify-center px-2 w-8 h-8 text-lg text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-sm" @click="toggle" aria-expanded="active">
                        <i class="far fa-fw" :class="active ? 'fa-compress-alt' : 'fa-pen'"></i>
                      </button>
                    </div>
                    <div v-if="active" class="space-y-6 mt-6">
                      <div class="grid grid-cols-3 gap-6">
                        <div class="col-span-3">
                          <label class="label">
                            Current password
                          </label>
                          <input required class="form-input light" v-model="password" placeholder="Enter your current password" type="password"/>
                        </div>
                        <div class="col-span-3">
                          <label class="label">
                            New password
                          </label>
                          <div class="relative">
                            <input required class="form-input light pr-10" v-model="newPassword" placeholder="Enter a new password" :type="showPassword ? 'text' : 'password'" :disabled="!password"/>
                            <button type="button" class="flex items-center absolute text-gray-400 right-1 bottom-0 p-2 transform active:scale-95 origin-center" @click="showPassword = !showPassword">
                              {{ showPassword ? '&#128585;' : '&#128584;' }}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </ToggleForm>
              <ToggleForm @change="handleChange">
                <template v-slot:default="{active, toggle}">
                  <div class="p-4">
                    <div class="flex items-center justify-between">
                      <div>
                        <div class="font-semibold leading-tight">
                          Email
                        </div>
                        <p class="text-sm text-gray-500 mt-1">
                          {{ v.email || 'You have not verified an email with this account'}}
                        </p>
                      </div>
                      <button class="flex items-center justify-center px-2 w-8 h-8 text-lg text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-sm" @click="toggle" aria-expanded="active">
                        <i class="far fa-fw" :class="active ? 'fa-compress-alt' : 'fa-pen'"></i>
                      </button>
                    </div>
                    <div v-if="active" class="space-y-6 mt-6">
                      <div class="grid grid-cols-3 gap-6">
                        <div class="col-span-3">
                          <label class="label">
                            Email address
                          </label>
                          <input required class="form-input light" v-model="v.email" :placeholder="v.email || `john@example.com`" type="email"/>
                          <p class="text-sm text-gray-500 mt-1">
                            Used for password resets and opt-in announcements
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </ToggleForm>
            </div>
          </div>
          <div>
            <div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2">
              Email alerts
            </div>
            <form class="rounded-sm border bg-white divide-y">
              <div class="grid grid-cols-3 gap-6 p-4">
                <div class="col-span-3">
                  <div class="flex flex-grow items-center justify-between">
                    <div>
                      <div class="font-semibold leading-tight">
                        Announcement emails
                      </div>
                      <p class="text-sm text-gray-500 mt-1">
                        Receive official site announcements via email (requires a verified email)
                      </p>
                    </div>
                    <Toggle v-model="v.is_private" :disabled="!v.email"/>
                  </div>
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
                      <p class="text-sm text-gray-500 mt-1 md:w-3/4">
                        Cloak your posting history and ask search engines not to index your profile (content is always visible via direct link).
                      </p>
                    </div>
                    <Toggle v-model="v.is_private"/>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-6 p-4">
                <div class="col-span-3">
                  <div class="flex flex-grow items-center justify-between">
                    <div>
                      <div class="font-semibold leading-tight">
                        Disable followers
                      </div>
                      <p class="text-sm text-gray-500 mt-1">
                        Prevent others from following you
                      </p>
                    </div>
                    <Toggle v-model="v.is_private"/>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div>
            <div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2">
              Notifications
            </div>
            <form class="rounded-sm border bg-white divide-y">
              <div class="grid grid-cols-3 gap-6 p-4">
                <div class="col-span-3">
                  <div class="flex flex-grow items-center justify-between">
                    <div>
                      <div class="font-semibold leading-tight">
                        New follower
                      </div>
                      <p class="text-sm text-gray-500 mt-1">
                        Be notified when someone follows you
                      </p>
                    </div>
                    <Toggle v-model="v.is_private"/>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-6 p-4">
                <div class="col-span-3">
                  <div class="flex flex-grow items-center justify-between">
                    <div>
                      <div class="font-semibold leading-tight">
                        New posts
                      </div>
                      <p class="text-sm text-gray-500 mt-1">
                        Be notified when people you follow post
                      </p>
                    </div>
                    <Toggle v-model="v.is_private"/>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-6 p-4">
                <div class="col-span-3">
                  <div class="flex flex-grow items-center justify-between">
                    <div>
                      <div class="font-semibold leading-tight">
                        Replies
                      </div>
                      <p class="text-sm text-gray-500 mt-1">
                        Be notified when someone replies to your posts or comments
                      </p>
                    </div>
                    <Toggle v-model="v.is_private"/>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-6 p-4">
                <div class="col-span-3">
                  <div class="flex flex-grow items-center justify-between">
                    <div>
                      <div class="font-semibold leading-tight">
                        Username mentions
                      </div>
                      <p class="text-sm text-gray-500 mt-1">
                        Be notified when someone @mentions you
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
import { defineAsyncComponent } from 'vue'
import { mapState } from 'vuex';

import Editor from "@/components/editors/Editor_V2.vue";
import Toggle from "@/components/forms/Toggle.vue";

const ToggleForm = defineAsyncComponent(() => import('@/components/Toggle.vue'));

export default {
  name: "UserSettingsView",
  data() {
    return {
      editAppearance: false,
      bio: '',
      isEmailSubscribed: false,
      password: '',
      showPassword: false
    }
  },
  components: {
    Editor,
    Toggle,
    ToggleForm
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