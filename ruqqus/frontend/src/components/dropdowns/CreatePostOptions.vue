<template>
  <Popover class="relative">
    <PopoverButton class="flex items-center justify-center px-2 w-8 h-8 text-xl text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-sm">
      <i class="far fa-cog fa-fw text-lg"></i>
    </PopoverButton>

    <PopoverPanel class="absolute z-10">
      <div class="text-lg font-medium">
        Post options
      </div>
      <div class="flex flex-col space-y-5 mt-4 pt-5">
        <div class="flex flex-col space-y-5">
          <label class="inline-flex">
            <input type="radio" class="form-radio primary" v-model="publishType" value="immediately" checked>
            <div class="ml-3 -mt-0.5 w-full">
              <div class="text-sm text-gray-900 font-bold select-none">
                Publish now
              </div>
              <div class="text-xs text-gray-500">
                Publish the post immediately
              </div>
            </div>
          </label>
          <label class="inline-flex">
            <input type="radio" class="form-radio primary" v-model="publishType" value="scheduled">
            <div class="ml-3 -mt-0.5 w-full">
              <div class="text-sm text-gray-900 font-bold select-none">
                Schedule for later
              </div>
              <input type="datetime-local" id="time" name="time" class="flex items-center form-input light mt-2"/>
              <div class="mt-2 text-xs text-gray-500">
                Automatically publish the post later on
              </div>
            </div>
          </label>
        </div>
        <div class="flex flex-col space-y-2">
          <label class="flex items-center">
            <input type="checkbox" class="form-checkbox green500" name="pin" value="pin"/>
            <span class="pl-2 text-sm text-gray-700 select-none">
              Pin this post
            </span>
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="form-checkbox red500" name="pin" value="pin"/>
            <span class="pl-2 text-sm text-gray-700 select-none">
              Mark as mature content
            </span>
          </label>
        </div>
      </div>
      <div class="flex justify-end mt-5 pt-5">
        <button type="button" class="button linkGray400">
          Save as Draft
        </button>
        <button type="button" class="button purple500" @click="createPost()">
          {{ buttonText }}
        </button>
      </div>
    </PopoverPanel>
  </Popover>
</template>

<script>
  import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

  export default {
    components: { Popover, PopoverButton, PopoverPanel },
  }
</script>