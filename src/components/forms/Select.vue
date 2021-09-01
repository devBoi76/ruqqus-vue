<template>
  <!-- Render a `div` instead of nothing -->
  <Listbox as="div" v-model="selectedPerson">
    <ListboxButton>{{ selectedPerson.name }}</ListboxButton>

    <!-- Render a `div` instead of a `ul` -->
    <ListboxOptions as="div">
      <!-- Render a `span` instead of a `li` -->
      <ListboxOption
        as="span"
        v-for="person in people"
        :key="person"
        :value="person"
      >
        {{ person.name }}
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

      const form = false

      return {
        people,
        selectedPerson,
        form
      }
    },
  }
</script>