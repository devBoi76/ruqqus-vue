<template>
  <!-- Render a `div` instead of nothing -->
  <Listbox as="div" v-model="selectedPerson">
    <ListboxButton class="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
      {{ selectedPerson.name }}
    </ListboxButton>

    <!-- Render a `div` instead of a `ul` -->
    <ListboxOptions as="div" class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
      <!-- Render a `span` instead of a `li` -->
      <ListboxOption v-slot="{ active, selected }" as="span" v-for="person in people" :key="person" :value="person">
        <span :class="[active ? 'text-amber-900 bg-amber-100' : 'text-gray-900','cursor-default select-none relative py-2 pl-10 pr-4',]">
          {{ person.name }}
        </span>
        <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
          <i class="far fa-check fa-sm"></i>
        </span>
      </ListboxOption>
      <div class="py-2 border-t">
        <button v-show="!form" class="button linkGray400" @click="form = !form">
          <i class="far fa-plus fa-sm pr-1"></i>
          Create new category
        </button>
        <input v-show="form" type="text" placeholder="i.e. memes"/>
      </div>
    </ListboxOptions>
  </Listbox>
</template>

<script>
  import { ref } from 'vue'
  import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  } from '@headlessui/vue'

  export default {
    components: { Listbox, ListboxButton, ListboxOptions, ListboxOption },

    setup() {
      const people = [
      { id: 1, name: 'Durward Reynolds' },
      { id: 2, name: 'Kenton Towne' },
      { id: 3, name: 'Therese Wunsch' },
      { id: 4, name: 'Benedict Kessler' },
      { id: 5, name: 'Katelyn Rohan' },
      ]
      const selectedPerson = ref(people[0])

      let form = false

      return {
        people,
        selectedPerson,
        form
      }
    },
  }
</script>