<template>
  <Switch v-model="enabled" :class="[enabled ? 'bg-green-500' : 'bg-gray-200', { 'opacity-50 pointer-events-none':disabled }]" class="relative inline-flex flex-shrink-0 h-[20px] w-[38px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
    <i class="absolute top-[3px] left-[4px] fas fa-check text-[10px] text-white transform" :class="enabled ? 'scale-0 opacity-0' : 'scale-100 opacity-100'"></i>
    <span class="sr-only">Use setting</span>
    <span aria-hidden="true" :class="enabled ? 'translate-x-[18px]' : 'translate-x-0'" class="pointer-events-none inline-block h-[16px] w-[16px] rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"/>
  </Switch>
</template>

<script>
  import { ref } from 'vue'
  import { Switch } from '@headlessui/vue'

  export default {
    components: { Switch },
    props: {
      disabled: Boolean
    },
    setup() {
      const enabled = ref(false)

      return { enabled }
    },
  }
</script>
