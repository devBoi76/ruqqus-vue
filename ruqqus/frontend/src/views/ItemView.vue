<template>
  <div class="w-full overflow-y-auto">
    <Banner/>
    <div class="grid grid-cols-12">
      <div class="col-span-full xl:col-start-2 xl:col-end-12 flex gap-6 sm:p-6 my-2.5 sm:my-0">

        <!-- Main Content Section -->
        <div class="w-full">

          <!-- Bread Crumbs -->
          <div v-if="item" class="hidden space-x-2 mb-3 break-words">
            <router-link :to="`/+${$route.params.name}`" class="text-sm capitalize text-gray-400 hover:underline dark:text-gray-100">
              Posts
            </router-link>
            <span class="text-sm text-gray-400 dark:text-gray-100">
              /
            </span>
            <span class="text-sm capitalize text-gray-700 dark:text-gray-100">
              {{ item.title }}
            </span>
          </div>
          <!-- End Bread Crumbs -->

          <!-- Pinned Banner -->
          <div v-if="item && item.pinned" class="flex items-center mb-2 px-4 py-2 bg-green-500 text-green-700 rounded-sm">
            <i class="fas fa-thumbtack fa-sm mr-2"></i>
            This post has been pinned by the guild masters.
          </div>
          <!-- End Pinned Banner -->

          <div v-if="item" class="relative w-full bg-white dark:bg-gray-800 border-t border-b border-gray-100 dark:border-0 sm:border-0 sm:rounded-sm dark:text-gray-100">
            <!-- Item's meta information and content-->
            <div class="flex flex-shrink-0 items-center justify-between p-2.5 border-b dark:border-gray-700 dark:border-opacity-70">
              <div class="flex items-center w-full overflow-x-auto">
                <router-link :to="'/'+item.author.username">
                  <img
                  :src="item.author.profile_url"
                  alt="avatar"
                  class="w-9 h-9 md:w-8 md:h-8 object-cover mr-2 rounded-sm"
                  />
                </router-link>
                <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-2 leading-4">
                  <router-link :to="'/'+item.author.username" class="block font-bold text-sm text-gray-900 dark:text-gray-100">
                    {{ item.author.username }}
                  </router-link>
                  <div class="flex items-center space-x-2 text-xs mt-0.5 sm:mt-0 sm:text-sm text-gray-500">
                    <span>{{ getFormat(item.created_utc) }}</span>
                    <span v-if="item.edited_utc != 0">
                      <span class="font-black text-gray-400 dark:text-gray-500">·</span>
                      <span class="italic">
                        Edited {{ getFormat(item.edited_utc) }}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="hidden md:block">
                <a v-if="item.url && !item.is_image && !item.pinned" :href="item.url" target="_blank" class="block">
                  <i class="far fa-external-link text-gray-400"></i>
                </a>
                <div v-else>
                  <i :class="item.pinned ? 'fas fa-thumbtack text-green-500' : postIcon"></i>
                </div>
              </div>
              <button class="flex items-center justify-center md:hidden -mr-1 p-1 text-gray-600 dark:text-gray-400">
                <i class="far fa-ellipsis-h fa-fw fa-lg"></i>
              </button>
            </div>

            <!-- Post content: title, body, and avatars -->
            <div class="px-2.5 mt-3 sm:mt-4">
              <!-- Title -->
              <h1 class="text-lg md:text-xl leading-6 font-medium dark:text-gray-100 mb-2">
                {{ item.title }}
              </h1>
            </div>

            <!-- Embed -->
            <div class="px-2.5 mt-3 sm:mt-4" v-if="item.url && !item.is_image">
              <EmbedLink
              :domain="item.domain"
              :title="item.title"
              :thumbnail="item.thumb_url"
              :url="item.url"
              :preview="item.url"
              />
            </div>

            <!-- Image -->
            <div v-if="item.is_image" class="flex justify-center mt-3 md:mt-4">
              <img
              :src="item.url"
              alt="Post image"
              class="w-full md:w-2/3 h-full object-cover sm:rounded-sm"
              />
            </div>

            <!-- Text body -->
            <div v-if="item.body_html !== ''" class="px-2.5 mt-3 sm:mt-4 relative overflow-hidden">
              <div class="break-words dark:text-gray-200" v-html="item.body_html"></div>
            </div>

            <!-- Footer -->
            <div class="flex justify-between items-center px-2.5 py-3">

              <!-- Mobile actions -->
              <div class="flex flex-grow md:hidden items-center justify-between">
                <router-link class="text-sm text-gray-600 dark:text-gray-400 font-bold" :to="item.permalink">
                  {{ item.comment_count === 1 ? '1 reply' : `${item.comment_count} replies` }}
                </router-link>
                <div class="flex items-center space-x-4">
                  <div class="flex items-center space-x-1">
                    <button class="text-gray-600 dark:text-gray-400" @click="vote(1)">
                      <i class="fa-arrow-alt-up fa-fw fa-lg" :class="voteType === 1 ? 'text-primary fas' : 'far'"></i>
                    </button>
                    <div class="text-sm text-center font-bold" :class="{ 'text-primary': voteType === 1, 'text-teal-500': voteType === -1, 'text-gray-900 dark:text-gray-300': voteType === 0 }">
                      {{ item.score + voteType }}
                    </div>
                    <button class="text-gray-600 dark:text-gray-400" @click="vote(-1)">
                      <i class="fa-arrow-alt-down fa-fw fa-lg" :class="voteType === -1 ? 'text-teal-500 fas' : 'far'"></i>
                    </button>
                  </div>
                  <button class="flex items-center py-1 text-gray-600 leading-none dark:text-gray-400 hover:text-gray-600">
                    <i class="far fa-retweet-alt fa-fw fa-lg"></i>
                  </button>
                  <button class="flex items-center py-1 text-gray-600 leading-none dark:text-gray-400 hover:text-gray-600">
                    <i class="far fa-share-alt fa-fw fa-lg"></i>
                  </button>
                  <button class="flex items-center py-1 text-gray-600 leading-none dark:text-gray-400 hover:text-gray-600">
                    <i class="far fa-bookmark fa-fw fa-lg"></i>
                  </button>
                  <button v-if="author" class="flex items-center py-1 text-gray-600 leading-none dark:text-gray-400 hover:text-gray-600">
                    <i class="far fa-trash-alt fa-fw fa-lg"></i>
                  </button>
                  <button v-if="author" class="flex items-center py-1 text-gray-600 leading-none dark:text-gray-400 hover:text-gray-600">
                    <i class="far fa-pen fa-fw fa-lg"></i>
                  </button>
                </div>
              </div>

              <!-- Desktop actions -->
              <div class="hidden md:flex flex-grow items-center space-x-6">
                <div class="flex items-center leading-none">
                  <button class="text-gray-500 dark:text-gray-400" @click="vote(1)">
                    <i class="fa-arrow-alt-up fa-fw text-lg" :class="voteType === 1 ? 'text-primary fas' : 'fal'"></i>
                  </button>
                  <div class="text-sm text-center font-bold leading-4 w-8" :class="{ 'text-primary': voteType === 1, 'text-teal-500': voteType === -1, 'text-gray-900 dark:text-gray-300': voteType === 0 }">
                    {{ item.score + voteType }}
                  </div>
                  <button class="text-gray-500 dark:text-gray-400" @click="vote(-1)">
                    <i class="fa-arrow-alt-down fa-fw text-lg" :class="voteType === -1 ? 'text-teal-500 fas' : 'fal'"></i>
                  </button>
                </div>
                <button class="flex items-center text-gray-500 leading-none dark:text-gray-400 hover:text-gray-600">
                  <i class="far fa-retweet-alt fa-fw mr-1"></i>
                  <span class="text-sm font-bold">Repost</span>
                </button>
                <button class="flex items-center text-gray-500 leading-none dark:text-gray-400 hover:text-gray-600">
                  <i class="far fa-share-alt fa-fw mr-1"></i>
                  <span class="text-sm font-bold">Share</span>
                </button>
                <button class="flex items-center text-gray-500 leading-none dark:text-gray-400 hover:text-gray-600">
                  <i class="far fa-bookmark fa-fw mr-1"></i>
                  <span class="text-sm font-bold">Save</span>
                </button>
                <button v-if="author" class="flex items-center text-gray-500 leading-none dark:text-gray-400 hover:text-gray-600">
                  <i class="far fa-trash-alt fa-fw mr-1"></i>
                  <span class="text-sm font-bold">Delete</span>
                </button>
                <button v-if="author" class="flex items-center text-gray-500 leading-none dark:text-gray-400 hover:text-gray-600">
                  <i class="far fa-pen fa-fw mr-1"></i>
                  <span class="text-sm font-bold">Edit</span>
                </button>
                <Options/>
              </div>

            </div>

          </div>

          <!-- Skeleton loading -->
          <div v-show="!item && loading" class="w-full p-4 rounded-sm bg-white dark:bg-gray-800">
            <div class="flex flex-col space-y-4 animate-pulse">
              <div class="bg-gray-100 dark:bg-white dark:bg-opacity-20 mb-4 w-40 h-4 rounded-sm"></div>
              <div class="flex flex-col w-full justify-between">
                <div class="bg-gray-100 dark:bg-white dark:bg-opacity-20 mb-2 w-3/4 h-4 rounded-sm"></div>
                <div class="bg-gray-100 dark:bg-white dark:bg-opacity-20 mb-2 w-2/4 h-4 rounded-sm"></div>
              </div>
              <div class="h-10"></div>
            </div>
          </div>

          <!-- Comment section -->
          <div v-if="item" class="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-0 sm:border-0 sm:rounded-sm mt-3">

            <CommentWrite v-if="v" :visible="replying" @change="toggleReplying" class="relative hidden md:flex p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 dark:border-opacity-70 z-20 rounded-t-sm"/>

            <div v-else class="relative hidden md:flex justify-between p-2.5 sm:p-4 bg-white border-b z-20">
              <p>
                Create a Ruqqus account to join the discussion, vote on content, and more!
              </p>
              <div class="flex items-center space-x-2">
                <button class="button primary" to="/register">
                  Sign up
                </button>
                <button class="button outlinePrimary" to="/login">
                  Log in
                </button>
              </div>
            </div>

            <div class="relative" :class="{'md:-mt-14':item.comment_count >= 8}">
              <div v-if="item.comment_count >= 8" class="sticky top-0 hidden md:flex items-center justify-between p-4 bg-white border-b dark:border-gray-700 z-10">
                <div class="flex space-x-2 break-words">
                  <router-link :to="`/+${$route.params.name}`" class="text-sm capitalize text-gray-400 hover:underline dark:text-gray-100 router-link-active">
                    +{{ $route.params.name }}
                  </router-link>
                  <span class="text-sm text-gray-400 dark:text-gray-100">
                    /
                  </span>
                  <span class="font-bold text-sm capitalize dark:text-gray-100 w-80 truncate">
                    {{ item.title }}
                  </span>
                </div>
              </div>

              <div v-if="item.comment_count > 0">
                <CommentSort :permalink="item.permalink" :count="item.comment_count" class="px-2.5 pt-3 sm:px-4 sm:py-0 sm:mt-5"/>
              </div>

              <CommentWrite v-if="v" :visible="replying" @change="toggleReplying" class="relative flex md:hidden px-2.5 pt-3 mb-1"/>

              <div v-else class="relative flex md:hidden justify-between px-2.5 pt-3">
                <p>
                  Create a Ruqqus account to join the discussion, vote on content, and more!
                </p>
                <div class="flex items-center space-x-2">
                  <button class="button primary" to="/register">
                    Sign up
                  </button>
                  <button class="button outlinePrimary" to="/login">
                    Log in
                  </button>
                </div>
              </div>

              <div v-if="item.comment_count > 0" class="px-2.5 py-3 sm:p-4">
                <CommentList :comments="comments" :offset="offset"/>
              </div>

              <!-- Empty state -->
              <div v-else class="flex flex-col items-center w-full px-4 py-12">
                <i class="block fad fa-comment-alt-smile text-primary text-opacity-60 text-4xl mb-3"></i>
                <div class="h6 text-gray-400 dark:text-gray-600">Be the first to comment!</div>
              </div>

              <!-- Loading state
              <div v-if="item.comment_count > 0 && !comments.length" class="p-3 md:px-4 md:pt-4 pb-48">
                <span class="loading text-gray-400 text-sm">
                  {{loadingCopy[Math.floor(Math.random() * loadingCopy.length)]}}
                </span>
              </div> -->
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
// Import components
import { defineAsyncComponent } from 'vue'
import { getPostComments } from '../api/Post.js';
import { getComment } from '../api/Comment.js';

import Banner from '@/components/Banner.vue';

const CommentWrite = defineAsyncComponent(() => import('@/components/comment/CommentWrite.vue'));
const CommentSort = defineAsyncComponent(() => import('@/components/comment/CommentSort.vue'));
const CommentList = defineAsyncComponent(() => import('@/components/comment/CommentList.vue'));

const EmbedLink = defineAsyncComponent(() => import('@/components/embeds/Link.vue'));

//import state
import { mapState, mapActions, mapGetters } from "vuex";

//import date-fns
import { isValid, formatDistanceToNowStrict } from '../../node_modules/date-fns'

export default {
  name: "item-view",
  data() {
    return {
      loading: true,
      errored: false,
      loadingComments: true,
      erroredComments: false,
      replying: false,
      isValid,
      formatDistanceToNowStrict,
      //voteType: 0,
      comments: [],
      loadingCopy: [
      'Spinning the thread hamster wheel',
      'Pinging Ruqqie for replies',
      'Discussionizing the discussion',
      'Fetching replies from the Ruqqus castle',
      'Plucking replies from the potato servers',
      'Rummaging for replies',
      'Threading the replies',
      'Parsing the comment section with fairy dusty',
      'Notifying the thread elves',
      'Sprinkling fairy dust over replies',
      'Summoning replies through wizardry',
      'Using interweb magic to fetch comments',
      'Cleaning up unicorn vomit before displaying comments'
      ]
    };
  },
  components: {
    Banner,
    EmbedLink,
    CommentSort,
    CommentWrite,
    CommentList
  },
  watch: {
    '$route.params.id': {
      handler() {
        if (this.item == null) {
          this.getPost()
        }
      },
      immediate: true
    },
    '$route.params.commentId': {
      handler() {
        if (this.$route.params.commentId) {
          this.comments = []
          this.getCommentReplies()
        }
      },
      immediate: true
    },
    'item': { // get replies when item changes
      handler(newVal) {
        if (newVal !== undefined && !this.$route.params.commentId) {
          this.comments = []
          this.getReplies()
        }
      },
      immediate: true
    },
    'comments': { // set mentions when comments array changes
      handler(newVal) {
        if (newVal !== undefined) {
          this.setMentions()
        }
      }
    },
    itemVoteActionStatus(newVal, oldVal) {
      if (newVal === 3) {
        this.voteType = 0
      }
      return oldVal
    }
  },
  computed: {
    ...mapState("persist", ["v"]),
    ...mapState("comments", ["mentions"]),
    ...mapGetters("items", ["getItem"]),
    item: function() {
      return this.getItem(this.$route.params.id);
    },
    voteType: {
      get() {
        return this.$store.getters['items/getItemVoteType'](this.$route.params.id);
      },
      set (value) {
        console.log(value)
        this.$store.commit('items/SET_ITEM_VOTE_TYPE', {type: value, id: this.$route.params.id});
      }
    },
    itemVoteActionStatus() {
      if (this.item) {
        return this.$store.getters['items/getItemVoteActionStatus'](this.$route.params.id);
      } else {
        return 0
      }
    },
    postIcon() {
      if (!this.item.url) {
        return 'far fa-text text-gray-400'
      } else if (this.item.is_image) {
        return 'far fa-camera-alt text-gray-400'
      } else {
        return 'far fa-link text-gray-400'
      }
    },
    offset() {
      if (this.comments.length) {
        return this.comments[0].level - 1
      } else {
        return 0
      }
    },
    author() {
      return this.v && this.v.username === this.item.author.username
    }
  },
  methods: {
    ...mapActions('items', ['resetItem', 'votePost']),
    toggleReplying(val) {
      this.replying = val
    },
    getFormat(val) {
      const timestamp = val * 1000
      if (isValid(timestamp)) {
        return formatDistanceToNowStrict(new Date(timestamp), { addSuffix: true })
      }
    },
    vote(type) {
      this.voteType = this.voteType === type ? 0 : type;
      this.votePost({post_id: this.item.id, vote: type})
    },
    getPost() {
      console.log('get post method triggered')
      let id = this.$route.params.id;
      this.$store.dispatch('items/fetchPost', id)
      .then(() => {
        console.log("getPost dispatch successful")
      })
      .catch(error => {
        console.error(error)
        this.errored = true

      })
      .finally(() => this.loading = false)
    },
    setMentions() {
      let users = this.comments.map(function(obj) {
        return {
          username: obj.author_name,
          profile_url: obj.profile_url
        }
      });
      this.$store.commit('comments/SET_MENTIONS', {mentions: users});
      console.log(this.mentions)
    },
    getReplies() {
      console.log('get replies method triggered')
      let id = this.$route.params.id;

      getPostComments(id)
      .then(response => {
        this.comments = response.data.results;
      })
      .catch(error => {
        console.error(error)
        this.erroredComments = true

      })
      .finally(() => this.loadingComments = false)
    },
    getCommentReplies() {
      console.log('get comment method triggered')
      let id = this.$route.params.commentId;

      getComment(id)
      .then(response => {
        this.comments.push(response.data)
      })
      .catch(error => {
        console.error(error)
        this.erroredComment = true

      })
      .finally(() => this.loadingComments = false)
    }
  }
}
</script>
