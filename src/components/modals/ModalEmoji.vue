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
              <div class="ml-3">
                <div class="flex items-center font-medium text-gray-900">
                  <span class="text-gray-500 pr-[1px]">:</span>
                  <span>kekw</span>
                  <span class="text-gray-500 pl-[1px]">:</span>
                </div>
              </div>
            </div>
            <div>
              <div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2">
                Permissions
              </div>
              <div class="flex flex-grow items-center justify-between mt-5">
                <label class="label">
                  Allow in posts
                </label>
                <toggle v-model="isNsfw"/>
              </div>
              <div class="flex flex-grow items-center justify-between mt-5">
                <label class="label">
                  Allow in comments
                </label>
                <toggle v-model="isNsfw"/>
              </div>
              <div class="flex flex-grow items-center justify-between mt-5">
                <label class="label">
                  Requires premium membership
                </label>
                <toggle v-model="isNsfw"/>
              </div>
            </div>
            <p class="text-sm text-gray-500">
              <i class="far fa-info-circle fa-sm pr-2"></i>
              Modifying this emoji will not affect its current appearance in posts, comments, etc.
            </p>
          </div>
          <div class="flex justify-end mt-4 px-6 py-3 bg-gray-50 border-t">
            <button class="button linkGray400 mr-2" @click="closeModal">
              Cancel
            </button>
            <button class="button primary">
              Save
            </button>
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

  import Toggle from "@/components/forms/Toggle.vue"

  export default {
    components: {
      TransitionRoot,
      TransitionChild,
      Dialog,
      DialogOverlay,
      DialogTitle,
      Toggle
    },

    setup() {
      const isOpen = ref(true)

      let isNsfw = false

      return {
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
