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
          <div class="p-2 bg-white">
            <ul class="flex flex-wrap -m-1">
              <li v-for="swatch in primarySwatches" :key="swatch" class="p-1">
                <label :for="swatch" class="flex flex-shrink-0 w-6 h-6 shadow-inner rounded-full" :style="{ 'background-color': swatch }">
                  <input type="checkbox" class="invisible" :id="swatch" :value="swatch" v-model="primaryColor"/>
                </label>
              </li>
            </ul>
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
        primaryColor: null,
        primarySwatches: ['#C53030', '#F97316', '#ECC94B', '#22C55E', '#14B8A6', '#0EA5E9', '#6366F1', '#8B5CF6', '#EC4899', '#9B2C2C', '#C2410C', '#B7791F','#15803D', '#0F766E', '#0369A1', '#4338CA', '#5B21B6', '#9D174D']
      }
    }
  }
</script>
