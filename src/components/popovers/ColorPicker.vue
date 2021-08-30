<template>
  <Popover v-slot="{ open }" class="relative inline-block text-left">
    <PopoverButton :class="open ? '' : 'text-opacity-90'" class="flex items-center justify-center text-white bg-red-500 group focus:outline-none hover:text-opacity-100 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 rounded-sm w-[34px] h-[34px]">
      <i class="fas fa-fill-drip fa-fw"></i>
    </PopoverButton>

    <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-y-1 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-1 opacity-0"
    >
    <PopoverPanel class="absolute right-0 origin-top-right w-56 z-10 mt-2 bg-white border rounded shadow-lg">
      <div class="p-3">
        <ul class="inline-flex flex-wrap gap-2 -mt-1">
          <li v-for="swatch in primarySwatches" :key="swatch">
            <label :for="swatch" class="flex flex-shrink-0 w-5 h-5 shadow-inner rounded-sm" :style="{ 'background-color': swatch }">
              <input type="checkbox" class="invisible" :id="swatch" :value="swatch" v-model="primaryColor"/>
            </label>
          </li>
        </ul>
        <div class="flex items-center">
          <div class="uppercase tracking-wide font-semibold leading-none text-2xs text-gray-500">
            Custom
          </div>
          <div class="relative ml-8">
            <input type="color" id="color" name="color" class="w-[19px] h-[24px] rounded-full absolute left-2 top-[5px]" :value="primaryColor || `#FFFFFFF`">
            <input type="text" class="form-input light text-xs pl-8" :placeholder="primaryColor || '#FFFFFFF'"/>
          </div>
        </div>
      </div>
    </PopoverPanel>
  </transition>
</Popover>
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
        primaryColor: '',
        primarySwatches: ['#C53030', '#F97316', '#ECC94B', '#22C55E', '#14B8A6', '#0EA5E9', '#6366F1', '#8B5CF6', '#EC4899', '#9B2C2C', '#C2410C', '#B7791F','#15803D', '#0F766E', '#0369A1', '#4338CA', '#5B21B6', '#9D174D']
      }
    }
  }
</script>
