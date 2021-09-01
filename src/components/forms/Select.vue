<template>
  <!-- Render a `div` instead of nothing -->
  <Listbox as="div" v-model="selectedPerson">
    <div class="relative">
      <ListboxButton class="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
        {{ selectedPerson.name }}
      </ListboxButton>
      <ListboxOptions as="div" class="absolute right-0 w-64 mt-4 py-2 origin-top-right bg-white rounded shadow-lg border focus:outline-none">
        <ListboxOption v-slot="{ active, selected }" as="div" v-for="person in people" :key="person" :value="person">
          <div :class="[active ? 'text-primary bg-gray-100' : 'text-gray-700','relative cursor-default select-none relative py-2 pl-10 pr-4',]">
            <span :class="[selected ? 'font-medium' : 'font-normal','block truncate']">{{ person.name }}</span
            <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-4 text-sm text-primary">
              <i class="far fa-check fa-sm"></i>
            </span>
          </div>
        </ListboxOption>
        <div class="mt-2 pt-2 border-t">
          <button v-show="!form" class="button linkGray400 mx-auto" @click="form = !form">
            <i class="far fa-plus fa-sm pr-1"></i>
            Create new category
          </button>
          <input v-show="form" type="text" placeholder="i.e. memes"/>
        </div>
      </ListboxOptions>
    </div>
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