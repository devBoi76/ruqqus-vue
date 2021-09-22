<template>
  <Switch v-model="innerEnabled" :class="[innerEnabled ? 'bg-green-500' : 'bg-gray-200', { 'opacity-50 pointer-events-none':disabled }]" class="relative inline-flex flex-shrink-0 h-[20px] w-[36px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
    <i class="absolute top-[3px] left-[3px] fas fa-check text-[10px] text-white transform-all origin-bottom-left duration-200 ease-in-out" :class="innerEnabled ? 'scale-100' : '-rotate-90 scale-0'"></i>
    <span class="sr-only">Use setting</span>
    <span aria-hidden="true" :class="innerEnabled ? 'translate-x-[16px]' : 'translate-x-0'" class="pointer-events-none inline-block h-[16px] w-[16px] rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"/>
  </Switch>
</template>

<script>
  import { Switch } from '@headlessui/vue'

  export default {
    components: { Switch },
    props: {
      enabled: Boolean,
      disabled: Boolean
    },
    computed: {
      innerEnabled: {
        get: function () {
          return this.enabled
        },
        set: function (newValue) {
          this.$emit("update:enabled",newValue)
        }
      }
    }
  }
</script>
