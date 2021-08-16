<template>
  <div class="flex items-center justify-between p-4 md:px-5 md:py-4 border-b last:border-b-0">
    <div class="flex">
      <!-- Icon -->
      <img :src="guild.profile_url" class="w-11 h-11 object-cover rounded-sm" alt="guild icon"/>
      <div class="pl-3">
        <!-- Name -->
        <div class="text-lg font-medium leading-5">
          +{{ guild.name }}
        </div>
        <!-- Member Count -->
        <div class="text-sm text-gray-400">
          {{ guild.subscription_count || 0 }} {{ guild.subscription_count === 1 ? 'member' : 'members' }}
        </div>
        <!-- Description -->
        <p class="text-sm dark:text-white dark:text-opacity-65">
          {{ guild.description }}
        </p>
      </div>
    </div>
    <div class="pl-4 md:pl-3">
      <!-- Join Button -->
      <button class="button purple500" v-if="guild.name === 'ruqqus'">
        Joined
      </button>
      <button v-else class="button outlineGray200">
        Join
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    guild: Object,
  }
}
</script>