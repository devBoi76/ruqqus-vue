<template>
	<div class="w-full overflow-y-auto">
		<div class="container mx-auto grid grid-cols-12">
			<div class="col-span-full lg:col-start-3 lg:col-end-11 flex gap-6 sm:py-6 my-2.5 sm:my-0">

				<!-- Main Content Section -->
				<div class="w-full">

					<!-- Pinned Banner -->
					<div v-if="item && item.isStickied" class="flex items-center mb-3 bg-green-100 border-t border-b sm:border border-green-400 sm:rounded-sm">
						<div class="flex items-center justify-center w-10 h-10 bg-green-400">
							<i class="fas fa-thumbtack text-white mt-1"></i>
						</div>
						<div class="text-green-500 font-medium pl-2.5">This post has been pinned.</div>
					</div>
					<!-- End Pinned Banner -->

					<!-- Bread Crumbs -->
					<div v-if="item" class="space-x-1 mb-3 px-2.5 break-words">
						<router-link to="/" class="text-sm capitalize text-gray-400 dark:text-gray-100">Home</router-link>
						<span class="text-gray-400 dark:text-gray-100">
							<i class="fal fa-long-arrow-right fa-sm fa-fw"/>
						</span>
						<router-link :to="item.permalink" class="text-sm capitalize text-gray-700 dark:text-gray-100">{{ item.title }}</router-link>
					</div>
					<!-- End Bread Crumbs -->

					<div v-if="item" class="relative w-full bg-white dark:bg-gray-800 border-t border-b border-gray-100 dark:border-0 sm:border sm:border-gray-200 sm:rounded-sm dark:text-gray-100 mb-3">
						<!-- Item's meta information and content-->
						<div class="flex flex-shrink-0 items-center justify-between p-2.5 border-b dark:border-gray-700 dark:border-opacity-70">
							<div class="flex items-center w-full overflow-x-auto">
								<router-link :to="'/'+item.author.username">
									<img
									loading="lazy"
									:src="item.author.avatarUrl"
									alt="avatar"
									class="w-9 h-9 md:w-8 md:h-8 object-cover mr-2 rounded-sm"
									/>
								</router-link>
								<div class="flex flex-col sm:flex-row sm:items-center sm:space-x-2 leading-4">
									<router-link :to="'/'+item.author.username" class="flex items-center font-bold text-sm text-gray-900 dark:text-gray-100" :style="{ 'color': item.author.usernameColor }">
										<span>{{ item.author.username }}</span>
										<span v-if="item.author.title && site.hasCustomTitles" class="ml-2 px-2 inline-flex text-xs leading-5 font-medium rounded-sm text-white" :style="{ 'background-color': item.author.titleColor }">
											{{ item.author.title }}
										</span>
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
								<!-- External Link Icon -->
								<a v-if="item.url && item.type === 'link'" :href="item.url" target="_blank" class="block">
									<i class="far fa-external-link text-gray-400"></i>
								</a>
								<!-- Thumbtack, Image, or Text Icon -->
								<div v-else>
									<i :class="item.isStickied ? 'fas fa-thumbtack text-green-500' : postIcon[item.type]"></i>
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
						<div class="px-2.5 mt-3 sm:mt-4" v-if="item.url && item.type !== 'image'">
							<EmbedLink
							:domain="item.domain"
							:title="item.title"
							:thumbnail="item.thumbUrl"
							:url="item.url"
							:preview="item.url"
							/>
						</div>

						<!-- Image -->
						<div v-if="item.type === 'image'" class="flex justify-center mt-3 md:mt-4">
							<img
							:src="item.url"
							alt="Post image"
							class="w-full h-full object-cover"
							/>
						</div>

						<!-- Text body -->
						<div v-if="item.bodyHtml" class="px-2.5 mt-3 sm:mt-4 relative overflow-hidden">
							<div class="break-words dark:text-gray-200" v-html="item.bodyHtml"></div>
						</div>

						<!-- Footer -->
						<div class="flex justify-between items-center px-2.5 py-3">

							<!-- Mobile actions -->
							<div class="flex flex-grow md:hidden items-center justify-between">
								<router-link class="text-sm text-gray-600 dark:text-gray-400 font-bold" :to="item.permalink">
									{{ item.commentCount === 1 ? '1 reply' : `${item.commentCount} replies` }}
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
									<div class="text-sm text-center font-bold leading-4 mx-2" :class="{ 'text-primary': voteType === 1, 'text-teal-500': voteType === -1, 'text-gray-900 dark:text-gray-300': voteType === 0 }">
										{{ item.score + voteType }}
									</div>
									<button class="text-gray-500 dark:text-gray-400" @click="vote(-1)">
										<i class="fa-arrow-alt-down fa-fw text-lg" :class="voteType === -1 ? 'text-teal-500 fas' : 'fal'"></i>
									</button>
								</div>
								<!-- <button class="flex items-center text-gray-500 leading-none dark:text-gray-400 hover:text-gray-600">
									<i class="far fa-retweet-alt fa-fw mr-1"></i>
									<span class="text-sm font-bold">Repost</span>
								</button> -->
								<button class="flex items-center text-gray-500 leading-none dark:text-gray-400 hover:text-gray-600">
									<i class="far fa-share-alt fa-fw mr-1"></i>
									<span class="text-sm font-bold">Share</span>
								</button>
								<SaveButton #default :item="{ id: item.id, isSaved: item.isSaved }">
									<button class="flex items-center text-gray-500 leading-none dark:text-gray-400 hover:text-gray-600">
										<i class="far fa-bookmark fa-fw mr-1"></i>
										<span class="text-sm font-bold">Save</span>
									</button>
								</SaveButton>
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
					<div v-if="item" class="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-0 sm:border sm:border-gray-200 sm:rounded-sm">

						<CommentWrite v-if="is_authenticated" :visible="replying" @change="toggleReplying" class="relative hidden md:flex p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 dark:border-opacity-70 z-20 rounded-t-sm"/>

						<!-- Login CTA -->
						<div v-else class="flex items-center mb-2.5 sm:mb-4 p-2.5 sm:p-4 bg-white dark:bg-gray-800 border-b sm:rounded-t-sm">
							<div class="flex-grow overflow-hidden">
								<div class="flex items-center justify-center">
									<router-link to="/register" custom v-slot="{ navigate }">
										<button class="button primary" @click="navigate" @keypress.enter="navigate" role="link">
											Sign up and start commenting
										</button>
									</router-link>
									<router-link to="/login" custom v-slot="{ navigate }">
										<button class="button linkGray400" @click="navigate" @keypress.enter="navigate" role="link">
											Or sign into your account
										</button>
									</router-link>
								</div>
							</div>
						</div>
						<!-- End Login CTA -->

						<div class="relative">

							<div v-if="item.commentCount > 0 && !loadingComments && !erroredComments">
								<CommentSort :permalink="item.permalink" :count="item.commentCount" class="px-2.5 pt-3 sm:px-4 sm:py-0 sm:mt-5"/>
							</div>

							<CommentWrite v-if="is_authenticated" :visible="replying" @change="toggleReplying" class="relative flex md:hidden px-2.5 pt-3 mb-1"/>

							<div v-if="item.commentCount > 0 && !loadingComments && !erroredComments" class="px-2.5 py-3 sm:p-4">
								<CommentList :comments="comments" :offset="offset"/>
							</div>

							<!-- Empty state -->
							<div v-if="item.commentCount === 0" class="flex flex-col items-center w-full px-4 py-12">
								<i class="block fad fa-comment-alt-smile text-primary text-opacity-60 text-4xl mb-3"></i>
								<div class="h6 text-gray-400 dark:text-gray-600">Be the first to comment!</div>
							</div>

							<!-- Error state -->
							<div v-if="!loadingComments && erroredComments" class="flex flex-col items-center w-full px-4 py-12">
								<i class="block fad fa-comment-alt-times text-primary text-opacity-60 text-4xl mb-3"></i>
								<div class="h6 text-gray-700 dark:text-gray-600">Error loading comments</div>
								<p class="text-gray-400 dark:text-gray-400">
									Whoops! Please try refreshing the page.
								</p>
							</div>
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

const CommentWrite = defineAsyncComponent(() => import('@/components/comment/CommentWrite.vue'));
const CommentSort = defineAsyncComponent(() => import('@/components/comment/CommentSort.vue'));
const CommentList = defineAsyncComponent(() => import('@/components/comment/CommentList.vue'));

const EmbedLink = defineAsyncComponent(() => import('@/components/embeds/Link.vue'));

const SaveButton = defineAsyncComponent(() => import('@/components/buttons/SavePostButton.vue'));

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
			],
			postIcon: {
				'image': 'far fa-camera-alt text-gray-400',
				'text': 'far fa-text text-gray-400',
				'link': 'far fa-external-link text-gray-400'
			}
		};
	},
	components: {
		EmbedLink,
		CommentSort,
		CommentWrite,
		CommentList,
		SaveButton
	},
	watch: {
		// Fetch the post if the id changes
		'$route.params.id': {
			handler() {
				if (this.item == null) {
					this.getPost()
				}
			},
			immediate: true,
			flush: 'post'
		},
		// If viewing a single comment thread, fetch the replies
		'$route.params.commentId': {
			handler() {
				if (this.$route.params.commentId) {
					this.comments = []
					this.getCommentReplies()
				}
			},
			immediate: true,
			flush: 'post'
		},
		// After post has loaded, fetch its comments
		'item': {
			handler(newVal) {
				if (newVal !== undefined && !this.$route.params.commentId) {
					this.comments = []
					this.getReplies()
				}
			},
			immediate: true
		},
		// When the comments are loaded, set the mentions array
		'comments': {
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
		...mapState("site", ["site"]),
		...mapState("persist", ["is_authenticated", "v"]),
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
				this.comments = response.data.results
			})
			.catch(error => {
				console.error(error)
				this.erroredComments = true;
				this.$store.dispatch('toasts/addNotification', {
					type: 'error',
					header: 'Error fetching comments',
					message: 'Unable to load comments right now :/'
				})
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
				this.erroredComments = true
				this.$store.dispatch('toasts/addNotification', {
					type: 'error',
					header: 'Error fetching replies',
					message: 'Unable to load replies right now :/'
				})
			})
			.finally(() => this.loadingComments = false)
		}
	}
}
</script>
