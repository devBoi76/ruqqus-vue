<template>
  <Popover v-slot="{ open }" class="relative inline-block text-left">
    <PopoverButton class="flex items-center justify-center text-gray-700 hover:text-gray-900 bg-white group focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 rounded-sm w-8 h-8">
      <i class="fas fa-grin fa-fw"></i>
    </PopoverButton>

    <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-y-1 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-1 opacity-0"
    >
    <PopoverPanel class="absolute right-0 bottom-4 w-full z-10 bg-white border rounded shadow-lg">
      test
    </PopoverPanel>
  </transition>
</Popover>
</template>

<script>
  import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

  //import Tabs from "@/components/Tabs.vue"

  export default {
    components: {
      Popover,
      PopoverButton,
      PopoverPanel,
      //Tabs
    },
    props: {
    },
    data() {
      return {
        emotes: [
        {
          category: 'meme'
          emotes: [
          id: 1,
          shortcut: 'pepe',
          src: 'https://i.imgur.com/3BH7ry5.jpg']
        },
        {
          category: 'animated'
          emotes: [
          id: 1,
          shortcut: 'think',
          src: 'https://i.imgur.com/q1il1nl.gif']
        }
        ]
      }
    },
    computed: {
      innerEmote: {
        get: function () {
          return this.color
        },
        set: function (newValue) {
          this.$emit("update:color",newValue)
        }
      }
    }
  }
</script>
