<template>
  <button @click="openModal" class="button gray100">
    Settings
  </button>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal">
      <div class="fixed inset-0 z-100 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-black opacity-70" />
        </TransitionChild>

        <span class="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95">
        <div class="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded">
          <DialogTitle as="div" class="px-6 py-4">
            <h3 class="text-lg font-semibold leading-6 text-gray-900">
              Edit Emoji
            </h3>
          </DialogTitle>
          <div class="px-6 space-y-8">
            <div class="flex items-center">
              <div class="flex-shrink-0 w-8 h-8">
                <img class="w-8 h-8" src="https://i.imgur.com/u6zqX6q.jpg" alt="kekw" />
              </div>
              <div class="hidden ml-3">
                <div class="flex items-center font-medium text-gray-900">
                  <span class="text-gray-500 pr-[1px]">:</span>
                  <span>kekw</span>
                  <span class="text-gray-500 pl-[1px]">:</span>
                </div>
              </div>
              <input type="text" v-model="innerEmoji.name" :placeholder="innerEmoji.name" class="form-input white ml-3">
            </div>
            <div>
              <div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2">
                Category
              </div>
              <Select v-model:selected="innerEmoji.category" :options="options" class="w-full"/>
            </div>
            <div>
              <div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2">
                Permissions
              </div>
              <div class="flex flex-grow items-center justify-between mt-5">
                <label class="label">
                  Allow in posts
                </label>
                <toggle v-model:enabled="innerEmoji.restrictions.posts"/>
              </div>
              <div class="flex flex-grow items-center justify-between mt-5">
                <label class="label">
                  Allow in comments
                </label>
                <toggle v-model:enabled="innerEmoji.restrictions.comments"/>
              </div>
              <div class="flex flex-grow items-center justify-between mt-5">
                <label class="label">
                  Requires premium membership
                </label>
                <toggle v-model:enabled="innerEmoji.restrictions.premium"/>
              </div>
            </div>
          </div>
          <div class="flex mt-4 px-6 py-4 bg-gray-50 border-t">
            <button class="text-sm text-red-500 hover:text-red-700">
              Delete
            </button>
            <div class="flex ml-auto">
              <button class="button linkGray400 mr-2" @click="closeModal">
                Cancel
              </button>
              <button class="button primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </TransitionChild>
    </div>
  </div>
</Dialog>
</TransitionRoot>
</template>

<script>
  import { ref } from 'vue'
  import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
  } from '@headlessui/vue'

  import Select from "@/components/forms/Select.vue";

  import Toggle from "@/components/forms/Toggle.vue"

  export default {
    components: {
      TransitionRoot,
      TransitionChild,
      Dialog,
      DialogOverlay,
      DialogTitle,
      Select,
      Toggle
    },
    props: {
      emoji: Object
    },
    setup() {
      const isOpen = ref(false)

      let innerEmoji = {
        name: 'kekw',
        category: 'memes',
        restrictions: {
          posts: true,
          comments: true,
          premium: true
        }
      }

      let selected = { name: 'Wade Cooper' }

      const options = [
      { name: 'memes' },
      { name: 'animated' }
      ]

      return {
        innerEmoji,
        selected,
        options,
        isOpen,
        closeModal() {
          isOpen.value = false
        },
        openModal() {
          isOpen.value = true
        },
      }
    },
  }
</script>
