<template>
  <Popover v-slot="{ open }" class="relative inline-block text-left">
    <PopoverButton class="flex items-center justify-center text-gray-700 hover:text-gray-900 bg-white group focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 rounded-sm w-8 h-8">
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
    <PopoverPanel class="absolute left-0 bottom-4 w-full z-10 mt-2 bg-white border rounded shadow-lg">
      <Tabs/>
    </PopoverPanel>
  </transition>
</Popover>
</template>

<script>
  import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

  import Tabs from "@/components/Tabs.vue"

  export default {
    components: { Popover, PopoverButton, PopoverPanel, Tabs },
    data() {
      return {
        primarySwatches: ['#EF4444', '#F43F5E', '#EC4899', '#D946EF', '#A855F7', '#8B5CF6', '#6366F1', '#3B82F6', '#0EA5E9', '#06B6D4','#14B8A6', '#10B981', '#22C55E', '#84CC16', '#EAB308', '#F59E0B', '#F97316', '#78716C', '#71717A', '#6B7280', '#64748B']
      }
    },
    computed: {
    }
  }
</script>
