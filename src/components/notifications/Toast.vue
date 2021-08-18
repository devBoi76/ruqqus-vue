<template>
  <div class="flex justify-between px-3 py-2 text-sm rounded-sm shadow bg-white transition-all duration-200">
    <div class="flex space-x-4">
      <i class='far fa-lg' :class="notification.type === 'success' ? 'fa-check-circle text-green-500' : 'fa-exclamation-circle text-red-500'"></i>
      <div>
        <div v-if="notification.header" class="font-medium">
          {{ notification.header }}
        </div>
        <div class="text-gray-600">
          {{ notification.message }}
        </div>
      </div>
    </div>
    <button class="w-8 h-8 flex items-center justify-center px-2 py-0 text-gray-500 rounded-sm bg-white hover:bg-gray-200" aria-label="Close toast" @click="removeNotification(notification)">
      <i class="far fa-times"></i>
    </button>
  </div>
</template>

<script>
  import { mapActions } from "vuex";

  export default {
    props: {
      notification: Object
    },
    data() {
      return {
        timeout: null
      };
    },
    computed: {
    },
    methods: {
      ...mapActions("toasts", ["removeNotification"]),
    },
    created() {
      this.timeout = setTimeout(() => {
        this.removeNotification(this.notification);
      }, 3500);
    },
    beforeUnmount() {
      clearTimeout(this.timeout)
    }
  };
</script>
