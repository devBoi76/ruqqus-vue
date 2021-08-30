<template>
  <Popover v-slot="{ open }" class="relative inline-block text-left">
    <PopoverButton class="flex items-center justify-center px-2 w-8 h-8 text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm">
      <span class="sr-only">Emote Picker</span>
      <i class="far fa-grin fa-fw"></i>
    </PopoverButton>

    <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-y-1 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-1 opacity-0"
    >
    <PopoverPanel class="absolute top-0 left-6 ml-2 w-56 z-10 bg-white border rounded shadow-lg">
      <Tabs @select-emote="selectEmote($event, val)"/>
    </PopoverPanel>
  </transition>
</Popover>
</template>

<script>
  import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

  import Tabs from "@/components/EmoteTabs.vue"

  export default {
    components: { Popover, PopoverButton, PopoverPanel, Tabs },
    data() {
      return {
      }
    },
    methods: {
      selectEmote(event, val) {
        console.log(val)
        this.$emit("selectEmote",val)
      }
    }
  }
</script>