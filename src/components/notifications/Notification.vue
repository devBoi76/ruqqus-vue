<template>
 <router-link :to="notification.permalink" class="flex px-4 py-3 border-b border-gray-100 hover:bg-gray-50 last:border-b-0">
  <div class="relative flex-shrink-0 w-8 h-8">
    <img v-lazy="notification.author.profile_url" alt="avatar" class="w-8 h-8 object-cover rounded-sm bg-white dark:bg-gray-700"/>
    <div class="absolute -bottom-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full" :class="badgeColor[notification.notif_type] || badgeColor.normal">
      <i class="fas text-2xs text-white text-center h-3" :class="badgeIcon[notification.notif_type] || badgeIcon.normal" style="width:12px;"></i>
    </div>
  </div>
  <div class="flex-grow ml-4">
    <div class="relative">
      <div class="p-2 bg-gray-100 rounded text-gray-900 text-sm leading-tight break-words">
        <span class="text-sm font-bold">
          {{ notification.author.username }}
        </span>
        {{ action[notification.notif_type] || action.normal }}
        <span v-if="notification.body" class="text-gray-500">
          "{{ truncate(notifcation.body, 140) }}"
        </span>
      </div>
      <span class="arrow"/>
    </div>
    <p class="mt-1 text-2xs text-gray-400">
      {{ getFormat(notification.created_utc) }} in +{{ notification.post.guild_name }}
    </p>
  </div>
  <img v-if="notification.post.thumb_url" v-lazy="notification.post.thumb_url" alt="Post image" class="ml-3 w-14 h-10 object-cover rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 flex-shrink-0"/>
</router-link>
</template>

<script>
  //import date-fns
  import { isValid, formatDistanceToNow } from '../../../node_modules/date-fns'
  export default {
    props: {
      notification: Object
    },
    data() {
      return {
        isValid,
        formatDistanceToNow,
        action: {
          1: 'system notification',
          2: `replied to your post ${this.notification.post.title}:`,
          3: `mentioned you in ${this.notification.post.title}:`,
          4: 'followed you',
          normal: 'posted'
        },
        badgeColor: {
          1: 'bg-blue-500',
          2: 'bg-green-500',
          3: 'bg-blue-500',
          4: 'bg-purple-500',
          normal: 'bg-purple-500'
        },
        badgeIcon: {
          1: 'fa-cog',
          2: 'fa-reply',
          3: 'fa-at',
          4: 'fa-plus',
          normal: 'fa-feather'
        },
      };
    },
    computed: {
    },
    methods: {
      getFormat(val) {
        const timestamp = val * 1000
        if (isValid(timestamp)) {
          return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
        }
      },
      truncate(value, limit) {
        if (value.length > limit) {
          value = value.substring(0, (limit - 3)) + '...';
        }

        return value
      }
    }
  };
</script>

<style scoped>
.arrow {
  position: absolute;
  top: 8px;
  left: -8px;
  border-top: 8px solid rgba(255, 0, 0, 0);
  border-bottom: 8px solid rgba(255, 0, 0, 0);
  border-right: 8px solid rgba(245,245,245,1);
}
</style>
