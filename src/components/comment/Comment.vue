<template>
	<div class="group flex relative mt-6 first:mt-0" :class="{ 'opacity-60 hover:opacity-100 focus:opacity-100 items-center': isCollapsed }">
		<div class="relative flex flex-col flex-shrink-0 mr-2 sm:mr-3 items-center">
			<!-- User Avatar -->
			<router-link v-if="comment.profile_url" :to="`/${comment.author_name}`">
				<img
				:src="comment.profile_url"
				class="object-fit rounded-sm bg-gray-100 dark:bg-gray-700"
				:class="level > 1 || isCollapsed ? 'w-6 h-6' : 'w-8 h-8'"
				/>
			</router-link>
			<!-- Deleted User Comment -->
			<div v-else class="flex items-center justify-center bg-transparent border dark:border-gray-700 border-dashed rounded-sm" :class="level > 1 || isCollapsed ? 'w-6 h-6 text-sm' : 'w-8 h-8 text-lg'">
				<i class="far fa-user text-gray-400 dark:text-gray-600"></i>
			</div>
			<!-- Comment Collapse Bar -->
			<div class="comment-collapse-bar dark:opacity-30 dark:hover:opacity-100" :class="{'reply':level > 1}" @click="collapseComment" v-show="!isCollapsed">
			</div>
		</div>
		<!-- User Details -->
		<div class="flex-grow" :class="{'flex items-center':isCollapsed}">
			<div :id="comment.id" :class="{'flex flex-grow items-center leading-none':isCollapsed}">
				<div :class="{'mb-1':!isCollapsed}">
					<div class="inline-block space-x-1 text-xs text-gray-500 dark:text-gray-400">
						<router-link v-if="comment.author_name" :to="`/${comment.author_name}`" class="text-sm text-gray-900 dark:text-gray-200 hover:text-primary font-bold">
							{{ comment.author_name }}
						</router-link>
						<span v-else class="text-sm text-gray-400 dark:text-gray-400 font-bold line-through">
							Deleted
						</span>
						<!-- Parent Context Link -->
						<router-link v-if="comment.parent_comment_id" :to="`#${comment.parent_comment_id}`" class="text-gray-500 hover:text-gray-600">
							<i class="fas fa-reply fa-sm fa-flip-horizontal"></i>
						</router-link>
						<span v-show="!isCollapsed" class="space-x-1">
							<span class="font-black text-gray-400 dark:text-gray-500">·</span>
							<!-- Timestamp -->
							<span>{{ getFormat(comment.created_utc) }}</span>
							<!-- Edited Timestamp -->
							<span v-if="comment.edited_utc != 0">
								<span class="font-black text-gray-400 dark:text-gray-500">·</span>
								<span class="italic">
									Edited {{ getFormat(comment.edited_utc) }}
								</span>
							</span>
						</span>
						<span class="hidden md:inline-block font-black text-gray-400 dark:text-gray-500">·</span>
						<!-- Score (desktop) -->
						<span class="hidden md:inline-block">
							{{ comment.score + voteType }} {{ comment.score + voteType === 1 ? 'point' : 'points' }}
						</span>
						<!-- Reply Count -->
						<span v-show="isCollapsed && comment.replies.length" class="space-x-1">
							<span class="font-black text-gray-400 dark:text-gray-500">·</span>
							<span>
								{{ comment.replies.length }} {{ comment.replies.length === 1 ? 'reply' : 'replies' }}
							</span>
						</span>
						<!-- Expand Button -->
						<button v-show="isCollapsed" class="px-1" @click="collapseComment()">
							<i class="far fa-expand-alt fa-sm text-primary"></i>
						</button>
					</div>
				</div>
				<div class="dark:text-gray-200 break-words" v-show="!isCollapsed" v-html="comment.body_html" v-lazy-container="{ selector: 'a' }"/>
			</div>
			<!-- Desktop Actions -->
			<ul class="hidden md:flex flex-grow items-center space-x-4 mb-0 mt-2" v-show="!isCollapsed">
				<li>
					<button class="text-xs font-medium leading-6 hover:underline" :class="voteType === 1 ? 'text-primary' : 'text-gray-500 hover:text-gray-600 dark:text-gray-400'" @click="vote(1)">
						Upvote ({{ newUpvotes }})
					</button>
				</li>
				<li>
					<button class="text-xs font-medium leading-6 hover:underline" :class="voteType === -1 ? 'text-green-500' : 'text-gray-500 hover:text-gray-600 dark:text-gray-400'" @click="vote(-1)">
						Downvote ({{ newDownvotes }})
					</button>
				</li>
				<li>
					<button class="flex items-center space-x-2 text-xs text-gray-500 font-medium leading-4 dark:text-gray-400 hover:text-gray-600 hover:underline" @click="replying = true">
						<span class="capitalize">reply</span>
					</button>
				</li>
				<li>
					<button class="flex items-center space-x-2 text-xs text-gray-500 font-medium leading-4 dark:text-gray-400 hover:text-gray-600 hover:underline" @click="replying = true">
						<span class="capitalize">save</span>
					</button>
				</li>
				<li v-for="button of buttons" :key="button.id">
					<button class="flex items-center space-x-2 text-xs text-gray-500 font-medium leading-4 dark:text-gray-400 hover:text-gray-600 hover:underline" @click="button.method">
						<span class="capitalize">{{ button.text }}</span>
					</button>
				</li>
				<li>
					<Options :username="comment.author_name"/>
				</li>
			</ul>
			<!-- Mobile Actions -->
			<ul class="flex md:hidden items-center justify-end space-x-4 mb-0 mt-3" style="list-style: none;" v-show="!isCollapsed">
				<li>
					<div class="flex items-center">
						<!-- Upvote -->
						<button class="block text-gray-600 dark:text-gray-400" @click="vote(1)">
							<i class="fa-arrow-alt-up text-lg" :class="voteType === 1 ? 'text-primary fas' : 'far'"></i>
						</button>
						<!-- Score -->
						<div class="px-2 font-medium" :class="{ 'text-primary': voteType === 1, 'text-teal-500': voteType === -1, 'text-gray-900 dark:text-gray-300': voteType === 0 }">
							{{ comment.score + voteType }}
						</div>
						<!-- Downvote -->
						<button class="block text-gray-600 dark:text-gray-400" @click="vote(-1)">
							<i class="fa-arrow-alt-down text-lg" :class="voteType === -1 ? 'text-teal-500 fas' : 'far'"></i>
						</button>
					</div>
				</li>
				<li>
					<!-- Reply -->
					<button class="block text-gray-600 dark:text-gray-400">
						<i class="far fa-reply text-lg"></i>
					</button>
				</li>
				<li v-for="button in buttons" :key="button.id">
					<button class="block text-gray-600 dark:text-gray-400">
						<i class="far text-lg" :class="button.icon"></i>
					</button>
				</li>
				<li>
					<Options @click="logReplies()"/>
				</li>
			</ul>
			<!-- Rich Text Editor -->
			<WriteComment v-if="replying" v-show="!isCollapsed" :visible="replying" is_reply @change="toggleReplying" class="mt-3"/>
			<!-- Replies -->
			<CommentList v-if="comment.replies.length && level <= limit" v-show="!isCollapsed" :comments="comment.replies" :offset="offset"/>
			<!-- Continue Thread Link -->
			<router-link v-if="comment.replies.length && level > limit" :to="comment.permalink" class="mt-2 block text-xs hover:underline">
				Continue this thread
				<i class="far fa-long-arrow-alt-right pl-1"></i>
			</router-link>
		</div>
	</div>
</template>

<script>
//import components
import { defineAsyncComponent } from 'vue'
import { mapState } from "vuex"

import Options from "../dropdowns/CommentOptions.vue"

const CommentList = defineAsyncComponent(() => import('@/components/comment/CommentList.vue'));
const WriteComment = defineAsyncComponent(() => import('@/components/comment/CommentWrite.vue'));

//import date-fns
import { isValid, formatDistanceToNow } from '../../../node_modules/date-fns'

export default {
	name: "single-comment",
	props: {
		comment: Object,
		offset: {
			type: Number,
			default: 0
		},
		limit: {
			type: Number,
			default: 3
		}
	},
	components: {
		Options,
		CommentList,
		WriteComment
	},
	data() {
		return {
			replying: false,
			isValid,
			formatDistanceToNow,
			isCollapsed: false,
			voteType: 0,
			buttons: [
			{
				id: 1,
				text: "share",
				icon: "fa-share-alt",
				method: ""
			}
			]
		};
	},
	computed: {
		...mapState('persist', ['v']),
		level() { // take comment level and subtract offset (depth) to get relative level
			return this.comment.level - this.offset
		},
		newUpvotes() { // if user upvotes, return current score + 1
			return this.voteType === 1 ? this.comment.upvotes + 1 : this.comment.upvotes
		},
		newDownvotes() { // if user downvotes, return current score - 1
			return this.voteType === -1 ? this.comment.downvotes - 1 : this.comment.downvotes
		}
	},
	methods: {
		//...mapActions('toasts', ['addNotification']),
		toggleReplying(val) {
			this.replying = val
		},
		getFormat(val) { // datefns to convert UTC timestamp to lcoal time
			const timestamp = val * 1000
			if (isValid(timestamp)) {
				return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
			}
		},
		vote(type) { // vote ternary operator
			this.voteType = this.voteType === type ? 0 : type;
			//this.voteComment()
		},
		// voteComment() {
		// 	const headers = {'Content-Type': 'multipart/form-data'}
		// 	const data = new FormData();
		// 	data.append('formkey', this.v.formkey)
		// 	axios({
		// 		method: 'post',
		// 		url: `/api/vue/comment/${this.comment.id}/${this.voteType}`,
		// 		data: data,
		// 		headers: headers
		// 	}).then(
		// 	function(response) {
		// 		console.log('vote cast for comment')
		// 	})
		// 	.catch(error => {
		// 		this.voteType = 0
		// 		this.addNotification({
		// 			type: 'error',
		// 			header: 'Failed to cast vote',
		// 			message: 'Please try again.'
		// 		}) 
		// 	})
		// },
		collapseComment() { // collapse comment toggle
			this.isCollapsed = !this.isCollapsed;
		}
	}
	// created() {
	//   axios
	//   .get(`/api/vue/comment/${this.comment.id}`)
	//   .then(response => {
	//     this.comments = response.data.replies
	//   })
	//   .catch(error => {
	//     console.log(error)
	//     this.errored = true
	//   })
	//   .finally(() => this.loadingReplies = false)
	// } 
};
</script>

<style scoped>
.comment-collapse-bar {
	@apply cursor-pointer
}
.comment-collapse-bar:hover::before {
	@apply border-primary;
}
.comment-collapse-bar::before {
	content: "";
	left: calc(50% - 1px);
	width: 10px;
	height: calc(100% - 32px);
	@apply absolute bottom-0 border-l-2;
}
.comment-collapse-bar.reply::before {
	height: calc(100% - 24px);
}
</style>
