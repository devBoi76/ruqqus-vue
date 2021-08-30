<template>
  <div class="w-full max-w-sm px-4 fixed top-16">
    <Popover v-slot="{ open }" class="relative">
      <PopoverButton :class="open ? '' : 'text-opacity-90'" class="flex items-center border rounded-sm text-gray-700 hover:text-gray-900 bg-white group focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        <div class="w-6 h-6 bg-red-500 rounded-l-sm"></div>
        <div class="flex items-center justify-center w-6 h-6">
          <i class="far fa-fw fa-eye-dropper"></i>
        </div>
      </PopoverButton>

      <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel class="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
          <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div class="p-4 bg-gray-50">
              test
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
</div>
</template>

<script>
  import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

  export default {
    components: { Popover, PopoverButton, PopoverPanel },
    props: {
      color: String
    },
    data() {
      return {
      }
    }
  }
</script>
