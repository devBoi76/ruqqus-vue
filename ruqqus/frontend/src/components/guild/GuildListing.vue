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
      <t-button v-if="guild.name === 'ruqqus'" variant="purple500">
        Joined
      </t-button>
      <t-button v-else variant="outlineGray200">
        Join
      </t-button>
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