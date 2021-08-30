<template>
  <div class="w-full overflow-y-auto">
    <div class="grid grid-cols-12 xl:grid-cols-10">
      <div class="col-span-full xl:col-start-3 xl:col-end-9 flex flex-col gap-4 sm:p-6 my-2.5 sm:my-0">
        <h1 class="h3 font-semibold mb-0">
          Settings
        </h1>
        <!-- Main Content Section -->
        <div class="w-full space-y-8">
          <div>
            <div class="flex justify-between">
              <div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2">
                Profile
              </div>
              <div class="text-xs text-gray-400">
                <i class="fas fa-globe-americas fa-sm pr-0.5"></i>
                <span>
                  Visible to everyone
                </span>
              </div>
            </div>
            <form class="rounded-sm border bg-white divide-y">
              <div class="grid grid-cols-3 gap-6 p-4">
                <div class="col-span-3">
                  <div class="flex flex-grow items-center justify-between">
                    <div>
                      <div class="font-semibold leading-tight">
                        Avatar
                      </div>
                      <p class="text-sm text-gray-500 mt-1">
                        png, jpg, gif up to 16mb
                      </p>
                    </div>
                    <img :src="v.profile_url" class="w-11 h-11 rounded-sm bg-gray-100 object-cover" alt="guild icon artwork"/>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-6 p-4">
                <div class="col-span-3">
                  <div class="flex flex-grow items-center justify-between">
                    <div>
                      <div class="font-semibold leading-tight">
                        Banner
                      </div>
                      <p class="text-sm text-gray-500 mt-1">
                        png, jpg, gif up to 16mb
                      </p>
                    </div>
                    <img :src="banner" class="w-48 h-11 rounded-sm bg-gray-100 object-cover" alt="guild cover artwork"/>
                  </div>
                </div>
              </div>
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
                    <i class="fab fa-markdown fa-sm pr-0.5"></i>
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
                <i class="fas fa-lock-alt fa-sm pr-0.5"></i>
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
            <form class="rounded-sm border bg-white divide-y" :class="{ 'opacity-50 pointer-events-none':!v.email }">
              <div class="grid grid-cols-3 gap-6 p-4">
                <div class="col-span-3">
                  <div class="flex flex-grow items-center justify-between">
                    <div>
                      <div class="font-semibold leading-tight">
                        Announcements
                      </div>
                      <p class="text-sm text-gray-500 mt-1">
                        Receive official site announcements via email
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
                        Cloak my posting history and ask search engines not to index my profile
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
                        Prevent others from following me
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
                    <label class="label mb-0">
                      When someone follows me
                    </label>
                    <Toggle v-model="v.is_private"/>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-6 p-4">
                <div class="col-span-3">
                  <div class="flex flex-grow items-center justify-between">
                    <label class="label mb-0">
                      New posts from people I follow
                    </label>
                    <Toggle v-model="v.is_private"/>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-6 p-4">
                <div class="col-span-3">
                  <div class="flex flex-grow items-center justify-between">
                    <label class="label mb-0">
                      When someone replies to me
                    </label>
                    <Toggle v-model="v.is_private"/>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-6 p-4">
                <div class="col-span-3">
                  <div class="flex flex-grow items-center justify-between">
                    <label class="label mb-0">
                      Username mentions
                    </label>
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
    ...mapState("persist", ["v"]),
    banner() {
      return this.v.banner_url || 'https://i.imgur.com/AgS5BXJ.jpg'
    }
  },
  methods: {
    getEditorContent(value) {
      this.bio = value;
    }
  },
  created() {
    console.log(this.v)
  }
}
</script>