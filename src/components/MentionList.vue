<template>
  <div class="relative rounded-sm bg-white border shadow-lg overflow-hidden text-sm">
    <div class="px-3 py-2 bg-gray-50">
      <span class="text-sm text-gray-400">
         @mention people to share this comment or thread
      </span>
    </div>
    <button
    class="flex items-center w-full px-3 py-2"
    :class="index === selectedIndex ? 'text-white bg-primary' : 'text-gray-900 bg-transparent hover:bg-gray-100'"
    v-for="(item, index) in items"
    :key="index"
    @click="selectItem(index)"
    >
    <img
    :src="item.profile_url"
    alt="avatar"
    class="w-6 h-6 object-cover rounded-sm bg-gray-200 dark:bg-gray-700"
    />
    <span class="font-medium pl-2">
      {{ item.username }}
    </span>
  </button>
</div>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true,
      },

      command: {
        type: Function,
        required: true,
      },
    },

    data() {
      return {
        selectedIndex: 0,
      }
    },

    watch: {
      items() {
        this.selectedIndex = 0
      },
    },

    methods: {
      onKeyDown({ event }) {
        if (event.key === 'ArrowUp') {
          this.upHandler()
          return true
        }

        if (event.key === 'ArrowDown') {
          this.downHandler()
          return true
        }

        if (event.key === 'Enter') {
          this.enterHandler()
          return true
        }

        return false
      },
      upHandler() {
        this.selectedIndex = ((this.selectedIndex + this.items.length) - 1) % this.items.length
      },

      downHandler() {
        this.selectedIndex = (this.selectedIndex + 1) % this.items.length
      },

      enterHandler() {
        this.selectItem(this.selectedIndex)
      },

      selectItem(index) {
        const item = this.items[index]

        if (item) {
          this.command({ id: item.username })
        }
      },
    },
  }
</script>