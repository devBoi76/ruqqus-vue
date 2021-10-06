<template>
  <div class="hidden md:flex flex-col flex-shrink-0 w-16 h-full mr-4" :class="{ 'top-4 sticky':stickyPos }">

    <!-- User avatar and profile link -->
    <router-link :to="'/'+author.username">
      <img
      v-if="avatar"
      class="w-16 h-16 object-cover rounded-sm bg-white dark:bg-gray-700"
      :src="author.avatarUrl"
      />
    </router-link>

    <div v-if="voting" class="flex flex-col items-center my-2 dark:text-white dark:border-white dark:border-opacity-10">
      <!-- Upvote Button -->
      <button class="px-2 py-1 text-gray-500 dark:text-gray-100" @click="vote(1)">
        <i class="fa-arrow-alt-up text-lg" :class="voteType === 1 ? 'fas text-primary' : 'fal'"></i>
      </button>
      <!-- Score -->
      <div class="text-sm font-medium" :class="{ 'text-primary': voteType === 1, 'text-teal-500': voteType === -1 }">
        {{ score + voteType }}
      </div>
      <!-- Downvote Button -->
      <button class="px-2 py-1 text-gray-500 dark:text-gray-100" @click="vote(-1)">
        <i class="fa-arrow-alt-down text-lg" :class="voteType === -1 ? 'fas text-teal-500' : 'fal'"></i>
      </button>
    </div>
    <!-- Repost Button -->
    <div v-if="repost" class="mb-1 text-center">
      <button size="lg" class="button link text-gray-400" v-b-tooltip.hover.left title="Repost">
        <i class="far fa-retweet"></i>
      </button>
    </div>
    <!-- Share Button -->
    <div v-if="share" class="mb-1 text-center">
      <button size="lg" class="button link text-gray-400" v-b-tooltip.hover.left title="Share post">
        <i class="far fa-share-alt"></i>
      </button>
    </div>
    <!-- Save Button -->
    <div v-if="save" class="mb-1 text-center">
      <button size="lg" class="button link text-gray-400" v-b-tooltip.hover.left title="Save post">
        <i class="far fa-bookmark"></i>
      </button>
    </div>
    <!-- Report Button -->
    <div v-if="report" class="mb-1 text-center">
      <button size="lg" class="button link text-gray-400" v-b-tooltip.hover.left title="Report post">
        <i class="far fa-flag"></i>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ItemActions",
    props: {
      author: Object,
      avatar: Boolean,
      repost: Boolean,
      report: Boolean,
      save: Boolean,
      score: Number,
      share: Boolean,
      options: Boolean,
      voting: Boolean,
      stickyPos: Boolean,
      id: Number
    },
    data() {
      return {
        //voteType: 0,
        isActive: false
      };
    },
    watch: {
      itemVoteActionStatus(newVal, oldVal) { 
        if (newVal === 3) {
          this.voteType = 0
        }
        return oldVal
      }
    },
    computed: {
      voteType: {
        get() { // functional getter
          return this.$store.getters['items/getItemVoteType'](this.id); // pass item ID to get item vote integer
        },
        set (value) {
          this.$store.commit('items/SET_ITEM_VOTE_TYPE', {type: value, id: this.id}); // when user votes, pass value to item (object) in state
        }
      },
      itemVoteActionStatus() {
        return this.$store.getters['items/getItemVoteActionStatus'](this.id); // get vote status from state
      }
    },
    methods: {
      vote(type) {
        this.voteType = this.voteType === type ? 0 : type; // update component vote count
        this.$store.dispatch('items/votePost', {post_id: this.id, vote: type}); // dispatch action and handle voting server-side
      }
    }
  };
</script>
