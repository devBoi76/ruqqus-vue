<template>
  <div>
    <!-- Loop through guilds prop -->
    <GuildListing v-for="guild in guilds" v-bind:key="guild.id" :guild="guild"/>
  </div>
</template>

<script>
// Import components
import GuildListing from "@/components/guild/GuildListing.vue";
export default {
  name: "guild-list",
  props: {
    guilds: Array
  },
  data() {
    return {
      loadingGuilds: false
    };
  },
  components: {
    GuildListing
  }
};
</script>
