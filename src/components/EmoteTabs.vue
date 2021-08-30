<template>
  <div class="w-full rounded overflow-hidden">
    <TabGroup>
      <div class="relative">
        <div class="z-10 absolute top-0 right-0 w-8 h-full rounded-tr bg-gradient-to-l from-white"></div>
        <TabList class="relative flex px-2.5 overflow-x-scroll scrollbar-hidden bg-white shadow-xs rounded-t">
          <Tab
            v-for="category in Object.keys(categories)"
            as="template"
            :key="category"
            v-slot="{ selected }"
          >
            <button
              :class="[
                'border-b-2 p-3 capitalize text-sm font-semibold leading-tight',
                selected
                  ? 'border-primary text-gray-900'
                  : 'border-transparent text-gray-400 hover:text-gray-500',
              ]"
            >
              {{ category }}
            </button>
          </Tab>
        </TabList>
      </div>

      <TabPanels>
        <div class="hidden p-4 shadow-xs mb-1">
          <input type="text" class="form-input light" placeholder="Find the perfect emote"/>
        </div>
        <TabPanel
          v-for="(category, index) in Object.values(categories)"
          :key="index"
          class="p-2.5 bg-white overflow-y-auto scrollbar-hidden min-h-[10rem] max-h-[10rem]"
        >
          <ul class="inline-flex flex-wrap mb-0">
            <li
              v-for="emote in category"
              :key="emote.id"
            >
              <button class="relative p-1 rounded hover:bg-primary hover:bg-opacity-20" @click="selectEmote($event, emote.src)">
                <img :src="emote.src" class="w-8 h-8 object-contain" :alt="emote.name"/>
              </button>
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
  methods: {
    selectEmote(event, val) {
      console.log(val)
      this.$parent.$emit("selectEmote",val) // `$parent` requires a strict parent to grand-parent relation between this component and the parent
    }
  }
}
</script>
