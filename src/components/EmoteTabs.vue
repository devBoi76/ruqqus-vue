<template>
  <div class="w-full rounded overflow-hidden">
    <TabGroup>
      <TabList class="flex px-4 space-x-1 bg-white border-b">
        <Tab
          v-for="category in Object.keys(categories)"
          as="template"
          :key="category"
          v-slot="{ selected }"
        >
          <button
            :class="[
              'border-b-2 px-4 py-3 capitalize text-sm font-semibold mb-[-1px]',
              selected
                ? 'border-primary text-gray-900'
                : 'border-transparent text-gray-400 hover:text-gray-500',
            ]"
          >
            {{ category }}
          </button>
        </Tab>
      </TabList>

      <TabPanels>
        <div class="px-4 py-3 shadow-xs mb-1">
          <input type="text" class="form-input light" placeholder="Find the perfect emote"/>
        </div>
        <TabPanel
          v-for="(category, index) in Object.values(categories)"
          :key="index"
          class="px-4 pb-4 bg-white overflow-y-auto scrollbar-hidden max-height-[10rem]"
        >
          <ul class="inline-flex flex-wrap gap-1 mb-0">
            <li
              v-for="emote in category"
              :key="emote.id"
              class="relative p-1 rounded hover:bg-gray-100"
            >
              <img :src="emote.src" class="w-7 h-7 object-contain" :alt="emote.name"/>
            </li>
          </ul>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script>
import { ref } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

export default {
  components: {
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
  },
  setup() {
    let categories = ref({
      Animated: [
        {
          id: 1,
          shortcut: 'think',
          src: 'https://i.imgur.com/q1il1nl.gif'
        },
        {
          id: 2,
          shortcut: 'flushed',
          src: 'https://i.imgur.com/R9XCoie.gif'
        },
      ],
      Meme: [
        {
          id: 1,
          shortcut: 'pepe',
          src: 'https://i.imgur.com/3BH7ry5.jpg'
        },
        {
          id: 2,
          shortcut: 'poggers',
          src: 'https://i.imgur.com/D5TdiNt.jpg'
        },
      ]
    })

    return { categories }
  },
}
</script>
