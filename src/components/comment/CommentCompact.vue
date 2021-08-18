<template>
  <div>
    <slot name="comment"/>
  </div>
</template>

<script>
  //import date-fns
  import { isValid, formatDistanceToNow } from '../../../node_modules/date-fns'
  export default {
    props: {
      comment: Object
    },
    data() {
      return {
        isValid,
        formatDistanceToNow
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
