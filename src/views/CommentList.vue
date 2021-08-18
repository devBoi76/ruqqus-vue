<template>
  <div>
    <div>
      <comment v-for="comment in comments" :key="comment.id" :comment="comment"/>
    </div>
    <!-- Skeleton loading -->
    <div v-show="loadingComments">
      <div v-for="i in 2" :key="i" class="flex mb-4 last:mb-0">
       <div class="mr-4 animate-pulse">
         <div class="bg-gray-300 dark:bg-white dark:bg-opacity-20 rounded-sm w-11 h-11"></div>
       </div>
       <div class="w-full p-4 rounded-sm border border-gray-300 bg-white dark:bg-gray-800">
        <div class="flex flex-col space-y-4 animate-pulse">
          <div class="flex flex-col w-full justify-between">
            <div class="bg-gray-200 dark:bg-white dark:bg-opacity-20 mb-2 w-40 h-4 rounded-sm"></div>
          </div>
          <div class="bg-gray-200 dark:bg-white dark:bg-opacity-20 mb-4 w-3/4 h-4 rounded-sm"></div>
          <div class="bg-gray-200 dark:bg-white dark:bg-opacity-20 mb-4 w-2/4 h-10 rounded-sm"></div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// Import components
import Comment from "@/components/comment/Comment.vue";

import { mapState } from "vuex";

export default {
  props: {
    comments: Array
  },
  data() {
    return {
    };
  },
  components: {
    Comment
  },
  watch: {
    '$route.query.sort'() {
      this.fetchComments();
    }
  },
  computed: {
    sort() {
      return this.$route.query.sort || null
    },
    //...mapState("comments", ["comments"]),
    ...mapState("items", ["item"]),
    loadingComments() {
      console.log(`comment: ${Object.keys(this.$store.state.items.item.replies.length).length}`)
      console.log(`comment: ${Object.keys(this.$store.state.items.item.replies.length).length < 1}`)
      return this.$store.state.items.item.replies.length < 1
    },
  }
}
</script>
