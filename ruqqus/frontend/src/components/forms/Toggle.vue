<template>
  <Switch v-model="enabled" :class="enabled ? 'bg-green-500' : 'bg-gray-300'" class="relative inline-flex flex-shrink-0 h-[22px] w-[40px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
    <span class="sr-only">Use setting</span>
    <span aria-hidden="true" :class="enabled ? 'translate-x-[18px]' : 'translate-x-0'" class="pointer-events-none inline-block h-[18px] w-[18px] rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"/>
  </Switch>
</template>

<script>
  import { ref } from 'vue'
  import { Switch } from '@headlessui/vue'

  export default {
    components: { Switch },

    setup() {
      const enabled = ref(false)

      return { enabled }
    },
  }
</script>
