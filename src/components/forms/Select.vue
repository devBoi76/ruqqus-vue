<template>
  <!-- Render a `div` instead of nothing -->
  <Listbox as="div" v-model="selectedOption">
    <div class="relative">
      <ListboxButton class="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
        {{ selectedOption.name }}
      </ListboxButton>
      <ListboxOptions as="div" class="absolute right-0 w-64 mt-2 origin-top-right bg-white rounded shadow-lg border focus:outline-none">
        <div class="py-2">
          <ListboxOption v-slot="{ active, selected }" as="div" v-for="option in innerOptions" :key="option" :value="option">
            <div :class="[active ? 'text-primary bg-gray-100' : 'text-gray-700','relative cursor-default select-none relative py-2 pl-10 pr-4',]">
              <span :class="[selected ? 'font-medium' : 'font-normal','block truncate']">{{ option.name }}</span>
              <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-4 text-sm text-primary">
                <i class="far fa-check fa-sm"></i>
              </span>
            </div>
          </ListboxOption>
        </div>
        <div v-if="showForm" class="px-4 py-3 border-t">
          <button v-show="!form" class="button linkGray400 mx-auto" @click.native="form = !form">
            <i class="far fa-plus fa-sm pr-1"></i>
            Add
          </button>
          <form v-show="form" @submit.prevent="onSubmit">
            <input type="text" placeholder="i.e. memes" class="form-input light" v-model="newOption" @keyup.enter="appendOption()"/>
            <p class="text-xs text-gray-400 mt-2">
              Press enter to create a new option
            </p>
          </div>
        </div>
      </ListboxOptions>
    </div>
  </Listbox>
</template>

<script>
  import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  } from '@headlessui/vue'

  export default {
    components: { Listbox, ListboxButton, ListboxOptions, ListboxOption },
    props: {
      selected: Object,
      options: Array,
      canAppend: Boolean
    },
    data() {
      return {
        newOption: '',
        showForm: this.canAppend
      }
    },
    computed: {
      innerOptions: {
        get: function () {
          return this.options
        },
        set: function (newValue) {
          this.$emit("update:options",newValue)
        }
      },
      selectedOption: {
        get: function () {
          return this.selected
        },
        set: function (newValue) {
          this.$emit("update:selected",newValue)
        }
      }
    },
    methods: {
      appendOption() {
        this.innerOptions.push(this.newOption)
        this.showForm = false
        this.newOption = ''
      }
    }
  }
</script>