<template>
	<div class="flex flex-col flex-grow space-y-4">

		<!-- Recent comments section -->
		<div class="w-full bg-black bg-opacity-40 rounded-sm overflow-hidden">
			<div class="flex items-center justify-between px-4 py-3 leading-6 border-b border-black overflow-hidden">
				<span class="text-lg font-bold text-gray-300 capitalize">
					Recent Comments
				</span>
				<router-link :to="{name:'user-profile-comments-view'}" class="text-xs text-gray-100 hover:underline">
					View all comments
				</router-link>
			</div>
			<div v-if="!loadingComments && comments.length">
				<!-- <Comment v-for="comment in comments.slice(0, 5)" :key="comment.id" :comment="comment"/> -->
				<Comment v-for="comment in comments.slice(0,5)" :key="comment.id">
					<template v-slot:comment="{ getFormat }">
						<router-link :to="comment.permalink" class="flex px-4 py-3 hover:bg-white hover:bg-opacity-05">
							<div class="flex-grow">
								<div class="relative">
									<div class="p-2 bg-gray-100 rounded text-gray-900 text-sm leading-tight break-words">
										<span class="text-sm font-bold">
											{{ comment.author.username }}
										</span>
										commented on {{ comment.post.title || "a post" }}:
										<span v-if="comment.body" class="text-gray-500">
											"{{ truncate(comment.body, 140) }}"
										</span>
									</div>
									<span class="arrow"/>
								</div>
								<p class="mt-1 text-2xs text-gray-400">
									{{ getFormat(comment.created_utc) }} in +{{ comment.guild.name }}
								</p>
							</div>
							<img v-if="comment.post.thumb_url" v-lazy="comment.post.thumb_url" alt="Post image" class="ml-3 w-14 h-10 object-cover rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 flex-shrink-0"/>
						</router-link>
					</template>
				</Comment>
			</div>

			<!-- Loading comments state -->
			<div v-if="loadingComments && !erroredComments" class="p-4">
				<span class="loading text-gray-400 text-sm">
					{{loadingCommentsCopy[Math.floor(Math.random() * loadingCommentsCopy.length)]}}
				</span>
			</div>

			<!-- Errored comments state -->
			<div v-show="!loadingComments && erroredComments" class="p-4">
				<span class="text-gray-400 text-sm">
					Unable to load comments right now. Please try agian later.
				</span>
			</div>
		</div>

		<!-- Recent posts section -->
		<div class="w-full bg-black bg-opacity-40 rounded-sm overflow-hidden">
			<div class="flex items-center justify-between px-4 py-3 leading-6 border-b border-black">
				<span class="text-lg font-bold text-gray-300 capitalize">
					Recent Posts
				</span>
				<router-link :to="{name:'user-profile-posts-view'}" class="text-xs text-gray-100 hover:underline">
					View all posts
				</router-link>
			</div>
			<ItemList v-if="!loading && posts.length" class="p-4"/>

			<!-- Loading comments state -->
			<div v-if="loadingPosts && !erroredPosts" class="p-4">
				<span class="loading text-gray-400 text-sm">
					{{loadingPostsCopy[Math.floor(Math.random() * loadingPostsCopy.length)]}}
				</span>
			</div>

			<!-- Errored comments state -->
			<div v-show="!loadingPosts && erroredPosts" class="p-4">
				<span class="text-gray-400 text-sm">
					Unable to load posts right now. Please try agian later.
				</span>
			</div>
		</div>

	</div>
</template>

<script>
	import { getAccountComments } from '../../../api/Account.js';

	import Comment from "@/components/comment/CommentCompact.vue"
	import ItemList from "@/views/ItemList.vue";

	export default {
		data() {
			return {
				loadingComments: true,
				loadingPosts: true,
				erroredComments: false,
				erroredPosts: false,
				comments: [],
				posts: [],
				loadingCommentsCopy: [
				'Spinning the comment hamster wheel',
				'Pinging Ruqqie for comments',
				'Fetching comments from the Ruqqus castle',
				'Plucking comments from the potato servers',
				'Rummaging for comments',
				],
				loadingPostsCopy: [
				'Parsing the posts with fairy dusty',
				'Notifying the post elves',
				'Sprinkling fairy dust over posts',
				'Summoning posts through wizardry',
				'Using interweb magic to fetch posts',
				'Cleaning up unicorn vomit before displaying posts'
				]
			};
		},
		components: {
			Comment,
			ItemList
		},
		computed: {
		},
		methods: {
			getComments() {
				let username = this.$route.params.username;

				getAccountComments(username)
				.then(response => {
					this.comments = response.data.listing
					console.log(this.comments)
				})
				.catch(error => {
					console.log(error)
					this.erroredComments = true

				})
				.finally(() => this.loadingComments = false)
			},
			getPosts() {
				let account = this.$route.params.username;
				this.$store.dispatch('items/fetchAccountPosts', account)
				.then(() => {
					console.log("getPosts dispatch successful")
				})
				.catch(error => {
					console.error(error)
					this.erroredPosts = true

				})
				.finally(() => this.loadingPosts = false)
			},
			truncate(value, limit) {
				if (value.length > limit) {
					value = value.substring(0, (limit - 3)) + '...';
				}

				return value
			}
		},
		created() {
			this.getComments();
			this.getPosts();
		} 
	}
</script>