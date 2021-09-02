<template>
  <button type="button" @click="openModal" class="button gray200">
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
        <div class="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
          <DialogTitle as="div" class="px-6 py-4">
            <h3 class="text-lg font-semibold leading-6 text-gray-900">
              Edit Emoji
            </h3>
          </DialogTitle>
          <div class="px-6 space-y-5">
            <div>
              <label class="label">Alias</label>
              <input type="text" class="form-input light" placeholder="poggers">
            </div>
            <div>
              <label class="label">Permissions</label>
              <div class="flex flex-grow items-center justify-between">
                <div class="font-medium leading-tight">
                  Allow in posts
                </div>
                <toggle v-model="isNsfw"/>
              </div>
              <div class="flex flex-grow items-center justify-between mt-3">
                <div class="font-medium leading-tight">
                  Allow in comments
                </div>
                <toggle v-model="isNsfw"/>
              </div>
              <div class="flex flex-grow items-center justify-between mt-3">
                <div class="font-medium leading-tight">
                  Requires premium membership
                </div>
                <toggle v-model="isNsfw"/>
              </div>
            </div>
            <p class="text-sm text-gray-500">
              Note: modifying existing emoji will not affect its current appearance in posts, comments, etc.
            </p>
          </div>
          <div class="flex mt-4 px-6 py-4 bg-gray-50 border-t">
            <button class="button linkRed500">
              Delete Emoji
            </button>
            <div class="flex ml-auto">
              <button class="button gray200 mr-2">
                Cancel
              </button>
              <button class="button primary" @click="closeModal">
                Save changes
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
