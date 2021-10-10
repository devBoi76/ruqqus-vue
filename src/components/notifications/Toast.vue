<template>
  <div class="flex justify-between p-3 rounded shadow-lg bg-white transition-all duration-200">
    <div class="flex items-center space-x-3 pr-3">
      <i class='far fa-fw fa-lg' :class="notification.type === 'success' ? 'fa-check-circle text-green-500' : 'fa-exclamation-circle text-red-500'"></i>
      <div class="border-l pl-4">
        <div v-if="notification.header" class="text-base font-medium">
          {{ notification.header }}
        </div>
        <div class="text-sm text-gray-600">
          {{ notification.message }}
        </div>
      </div>
    </div>
    <button class="w-8 h-8 flex items-center justify-center px-2 py-0 text-gray-700 hover:text-gray-900 rounded-sm bg-transparent hover:bg-gray-100" aria-label="Close toast" @click="removeNotification(notification)">
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
      }, 4000);
    },
    beforeUnmount() {
      clearTimeout(this.timeout)
    }
  };
</script>
