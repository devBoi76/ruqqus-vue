<template>
  <div>
    <LogRow v-for="log of logs" v-bind:key="log.id" :log="log"/>
  </div>
</template>

<script>

// Import components

import LogRow from "@/components/moderation/LogRow.vue";

// Import axios from "axios";

export default {
  name: "log-list",
  data() {
    return {
      logs: [
      {
        id: 1,
        guildmaster: {
          id: 1,
          avatar: 'https://i.imgur.com/bAd5rLQ.jpg',
          name: 'tankie'
        },
        type: 'exile'
      },
      {
        id: 2,
        guildmaster: {
          id: 1,
          avatar: 'https://i.imgur.com/N1ELs1H.png',
          name: 'louie'
        },
        type: 'kick'
      },
      {
        id: 3,
        guildmaster: {
          id: 1,
          avatar: 'https://i.imgur.com/qZ9Zyng.jpg',
          name: 'wtf'
        },
        type: 'collapse'
      },
      {
        id: 4,
        guildmaster: {
          id: 1,
          avatar: 'https://i.imgur.com/qZ9Zyng.jpg',
          name: 'wtf'
        },
        type: 'yank'
      },
      {
        id: 5,
        guildmaster: {
          id: 1,
          avatar: 'https://i.imgur.com/A459TDD.jpg',
          name: 'jamiepullthatup'
        },
        type: 'pin'
      },
      {
        id: 6,
        guildmaster: {
          id: 1,
          avatar: 'https://i.imgur.com/00GTz4L.jpg',
          name: 'catpilled'
        },
        type: 'kick'
      },
      {
        id: 7,
        guildmaster: {
          id: 1,
          avatar: 'https://i.imgur.com/00GTz4L.jpg',
          name: 'catpilled'
        },
        type: 'exile'
      },
      {
        id: 8,
        guildmaster: {
          id: 1,
          avatar: 'https://i.imgur.com/bAd5rLQ.jpg',
          name: 'tankie'
        },
        type: 'collapse'
      }
      ]
    };
  },
  components: {
    LogRow
  }
};
</script>
