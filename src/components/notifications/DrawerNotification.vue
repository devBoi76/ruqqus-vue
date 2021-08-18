<template>
  <b-link class="d-flex align-items-center flex-shrink-0 px-3 py-2 notification" :to="{ name: 'personal-inbox-view' }">
    <b-avatar variant="null" rounded src="https://placekitten.com/300/300" size="32px" class="mr-2 flex-shrink-0" badge-variant="transparent" badge-offset="-8px">
      <template v-slot:badge>
        <span class="fa-stack">
          <i class="fas fa-circle fa-stack-1x text-xxl" :class="darkMode ? 'text-purple-400' : 'text-purple-500'"></i>
          <i class="fas fa-reply fa-inverse fa-stack-1x text-10"></i>
        </span>
      </template>
    </b-avatar>
    <div>
      <div>
        <span class="font-weight-bold" :class="darkMode ? 'text-gray-100' : 'text-purple-500'">@calmcat</span>
        <span class="text-muted"> replied to your post</span>
      </div>
      <div class="text-extra-sm text-muted">2 min ago in +Minecraft</div>
    </div>
  </b-link>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
      };
    },
    computed: {
      darkMode() {
        return this.$store.state.persist.darkMode
      }
    }
  };
</script>

<style lang="scss" scoped>
.notification {
  &:hover,
  &:focus {
    background-color: $white-07;
    transition: all 0.15s linear;
  }
}
.notification {
  border-bottom: 1px solid $white-07;
}
.notification:last-child {
  border-bottom: 0;
}
.text-xxl {
  font-size: 16px;
}
.text-10 {
  font-size: 8px;
}
</style>