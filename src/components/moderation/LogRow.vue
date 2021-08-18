<template>

  <div class="rounded-sm bg-white hover:bg-gray-50 dark:hover:bg-gray-700 mb-2 last:mb-0" :class="{ 'bg-gray-50 dark:bg-gray-700':details }">

    <div class="relative flex justify-between items-center px-3 py-2 rounded-sm" @click.self="toggleDetails()">

      <div class="flex items-center">

        <div class="flex flex-shrink-0 items-center justify-center w-10 h-10 rounded-full mr-3" :class="logColor">
          <i class="fas fa-fw text-center text-base" :class="logIcon"></i>
        </div>

        <div class="flex items-center">
          <img
          :src="this.log.guildmaster.profile_url"
          alt="avatar"
          class="flex-shrink-0 w-10 h-10 rounded-sm mr-2 bg-white dark:bg-black dark:bg-opacity-10"
          />
          <div class="overflow-hidden">
            <p class="truncate text-gray-600 dark:text-gray-400 mb-0">
              <a :to="this.log.guildmaster.permalink" class="font-bold">{{ this.log.guildmaster.username }} </a>
              {{ logStr }}
            </p>
            <div class="text-sm text-gray-500">{{ this.log.created_date }}</div>
          </div>
        </div>

      </div>

      <button class="w-10 h-10 px-2 py-0 rounded-sm text-gray-600 dark:text-gray-200 select-none" @click="toggleDetails()">
        <i class="far fa-fw text-base" :class="details ? 'fa-chevron-up' : 'fa-chevron-right'"></i>
      </button>

    </div>

    <div v-show="details" class="p-3 bg-white dark:bg-gray-800 border-t dark:border-opacity-10">

      <div class="text-sm font-bold tracking-wide text-gray-500 dark:text-gray-200 mb-1">Notes:</div>

      <div class="mb-3 dark:text-gray-100">
        <span v-html="this.log.str"></span>
      </div>

      <div class="hidden px-3 py-1 leading-5 rounded-full bg-yellow-200 uppercase tracking-wide text-yellow-700 text-2xs font-bold">
        Rule 3
      </div>

      <div class="mt-3 pt-3 border-t border-gray-200 dark:border-white dark:border-opacity-10">
        <div class="flex items-center space-x-1">
          <button class="flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-sm leading-6 font-bold text-sm text-gray-600 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800">
            <i class="fas fa-external-link pr-2"></i>View
          </button>
          <button class="flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-sm leading-6 font-bold text-sm text-gray-600 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800">
            <i class="fas fa-link pr-2"></i>Copy Link
          </button>
        </div>
      </div>

    </div>

  </div>

</template>
<script>

//Import components

export default {
  props: {
    log: Object
  },
  components: {
  },
  data() {
    return {
      details: false
    }
  },
  computed: {
    darkMode() {
      return this.$store.state.persist.darkMode
    },
    logIcon() { // replace with object lookups
      if (this.log.kind == 'kick_post') {
        return 'fa-ban text-red-500 dark:text-red-400'
      } else if (this.log.kind == 'exile_user') {
        return 'fa-user-slash text-red-500 dark:text-red-400'
      } else if (this.log.kind == 'collapse') {
        return 'fa-comment-alt-minus text-yellow-500 dark:text-yellow-400'
      } else if (this.log.kind == 'pin_post') {
        return 'fa-thumbtack text-green-500 dark:text-green-400 transform rotate-45'
      } else if (this.log.kind == 'unpin_post') {
        return 'fa-thumbtack text-red-500 dark:text-red-400 transform rotate-45'
      } else if (this.log.kind == 'yank_post') {
        return 'fa-hand-lizard text-purple-500 dark:text-purple-400'
      } else if (this.log.kind == 'approve_post') {
        return 'fa-check text-green-500 dark:text-green-400'
      } else if (this.log.kind == 'herald_comment') {
        return 'fa-crown text-yellow-500 dark:text-yellow-400'
      } else if (this.log.kind == 'herald_post') {
        return 'fa-crown text-yellow-500 dark:text-yellow-400'
      } else if (this.log.kind == 'update_settings') {
        return 'fa-cog text-blue-500 dark:text-blue-400'
      } else {
        return 'fa-info-circle text-blue-500 dark:text-blue-400'
      }
    },
    logColor() {
      if (this.log.kind == 'kick_post') {
        return 'bg-red-100 dark:bg-red-400'
      } else if (this.log.kind == 'exile_user') {
        return 'bg-red-100 dark:bg-red-400'
      } else if (this.log.kind == 'collapse') {
        return 'bg-yellow-100 dark:bg-yellow-400'
      } else if (this.log.kind == 'pin_post') {
        return 'bg-green-100 dark:bg-green-400'
      } else if (this.log.kind == 'unpin_post') {
        return 'bg-red-100 dark:bg-red-400'
      } else if (this.log.kind == 'yank_post') {
        return 'bg-purple-100 dark:bg-purple-400'
      } else if (this.log.kind == 'approve_post') {
        return 'bg-green-100 dark:bg-green-400'
      } else if (this.log.kind == 'herald_comment') {
        return 'bg-yellow-100 dark:bg-yellow-400'
      } else if (this.log.kind == 'herald_post') {
        return 'bg-yellow-100 dark:bg-yellow-400'
      } else {
        return 'bg-blue-100 dark:bg-blue-400'
      }
    },
    logStr() {
      if (this.log.kind == 'kick_post') {
        return 'kicked a post'
      } else if (this.log.kind == 'exile_user') {
        return 'exiled a user'
      } else if (this.log.kind == 'collapse') {
        return 'collapsed a comment'
      } else if (this.log.kind == 'pin_post') {
        return 'pinned a post'
      } else if (this.log.kind == 'unpin_post') {
        return 'unpinned a post'
      } else if (this.log.kind == 'yank_post') {
        return 'yanked a post'
      } else if (this.log.kind == 'approve_post') {
        return 'approved a post'
      } else if (this.log.kind == 'herald_comment') {
        return 'heralded their comment'
      } else if (this.log.kind == 'herald_post') {
        return 'heralded their post'
      } else {
        return 'updated a setting'
      }
    }
  },
  methods: {
    toggleDetails() {
      this.details = !this.details
    }
  }
}
</script>