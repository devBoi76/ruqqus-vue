<template>
	<div class="mb-2 md:mb-4 last:mb-0" :class="hidePinned ? 'hidden' : 'flex'">
		<!-- Actions -->
		<ItemActions avatar stickyPos :author="item.author" :score="item.score" :id="item.id"/>
		<!-- Card -->
		<div class="relative flex w-full bg-white dark:bg-gray-800 border-t border-b border-gray-100 dark:border-transparent sm:border sm:rounded-sm dark:text-gray-100">
			<!-- Details -->
			<div class="flex flex-col flex-grow">
				<div class="flex flex-shrink-0 items-center justify-between p-2.5 border-b dark:border-gray-700 dark:border-opacity-70" :class="{ 'border-green-400':item.isStickied }">
					<div class="flex items-center">
						<!-- Author Avatar -->
						<router-link :to="'/'+item.author.username" class="block md:hidden">
							<img
							:src="item.author.avatarUrl"
							alt="avatar"
							class="w-9 h-9 md:w-8 md:h-8 object-cover mr-2 rounded-sm bg-gray-100 dark:bg-gray-700"
							/>
						</router-link>
						<div class="flex flex-col sm:flex-row sm:items-center sm:space-x-2 leading-4">
							<!-- Author Username -->
							<router-link :to="'/'+item.author.username" class="block font-bold text-sm text-gray-900 dark:text-gray-100">
								{{ item.author.username }}
							</router-link>
							<div class="flex items-center space-x-2 text-xs mt-0.5 sm:mt-0 sm:text-sm text-gray-500 dark:text-gray-400">
								<!-- Timestamp -->
								<span>{{ getFormat(item.createdUtc) }}</span>
								<!-- Edited Timestamp -->
								<span v-if="item.editedUtc != 0">
									<span class="font-black text-gray-400 dark:text-gray-500">·</span>
									<span class="italic">
										Edited {{ getFormat(item.editedUtc) }}
									</span>
								</span>
							</div>
						</div>
					</div>
					<!-- External Link Icon -->
					<a v-if="item.url && item.type === 'link'" :href="item.url" target="_blank" class="block">
						<i class="far fa-external-link text-gray-400"></i>
					</a>
					<!-- Thumbtack, Image, or Text Icon -->
					<div v-else>
						<i :class="item.isStickied ? 'fas fa-thumbtack text-green-500' : postIcon[item.type]"></i>
					</div>
				</div>
				<!-- Embed -->
				<div class="px-2.5 mt-2.5" v-if="item.url && item.type !== 'image'">
					<EmbedLink
					:domain="item.domain"
					:title="item.metaTitle"
					:thumbnail="item.thumbUrl"
					:url="item.url"
					:preview="item.metaDescription"
					/>
				</div>
				<!-- Image -->
				<router-link v-if="item.type === 'image'" :to="item.permalink" class="flex justify-center md:mt-2.5 md:px-2.5">
					<img
					:src="item.url"
					alt="Post image"
					class="w-full h-full object-cover sm:rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20"
					/>
				</router-link>
				<!-- Post content: title, body, and avatars -->
				<div class="p-2.5">
					<!-- Title -->
					<h5 class="text-lg md:text-xl font-medium">
						<router-link class="text-gray-900 visited:text-gray-400 dark:text-gray-100 hover:text-primary" :to="item.permalink">
							{{ item.title }}
						</router-link>
					</h5>
					<!-- Body -->
					<div v-if="item.bodyHtml" class="relative overflow-hidden" :class="{'max-h-56 mask-overlay':!expanded}">
						<div class="text-gray-900 dark:text-gray-200 break-all" v-html="item.bodyHtml"></div>
					</div>
					<!-- Body expand button, mobile only -->
					<div v-if="item.bodyHtml" class="relative flex sm:hidden justify-center -mt-2">
						<button class="text-sm text-gray-600 dark:text-gray-400 font-bold px-4 py-2" @click="expanded = !expanded">
							<i class="far fa-lg" :class="expanded ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
						</button>
					</div>
					<!-- Participant Avatars -->
					<div class="flex items-center mt-3">
						<router-link class="flex items-center -space-x-4" :to="item.permalink">
							<!-- Avatar Group -->
							<!-- <img
							v-for="participant in item.participants"
							v-bind:key="participant.id"
							:src="participant.avatar"
							variant="null"
							rounded
							class="w-8 h-8 border border-gray-500 border-2"
							v-b-tooltip.hover.bottom="participant.username"
							:id="`popover-user-${participant.username}`"
							/> -->
						</router-link>
						<div class="hidden md:block ml-2">
							<!-- Replies Count -->
							<router-link :to="item.permalink" class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
								{{ item.commentCount === 1 ? '1 reply' : `${item.commentCount} replies` }}
							</router-link>
						</div>
					</div>
				</div>
				<!-- Footer -->
				<div class="flex flex-shrink-0 justify-between items-center mb-3 mt-3 md:mt-0 px-2.5">
					<!-- Desktop actions -->
					<div class="hidden md:flex flex-grow items-center justify-between">
						<div class="flex items-center space-x-2">
							<!-- Upvote Button -->
							<button class="text-gray-500 dark:text-gray-400" @click="vote(1)">
								<i class="fa-arrow-alt-up fa-fw text-lg" :class="voteType === 1 ? 'text-primary fas' : 'fal'"></i>
							</button>
							<!-- Score -->
							<div class="text-sm text-center font-bold leading-4" :class="{ 'text-primary': voteType === 1, 'text-teal-500': voteType === -1, 'text-gray-900 dark:text-gray-300': voteType === 0 }">
								{{ item.score + voteType  }}
							</div>
							<!-- Downvote Button -->
							<button class="text-gray-500 dark:text-gray-400" @click="vote(-1)">
								<i class="fa-arrow-alt-down fa-fw text-lg" :class="voteType === -1 ? 'text-teal-500 fas' : 'fal'"></i>
							</button>
						</div>
						<div class="hidden">
							<!-- Thread Link -->
							<!--<router-link tag="button" :to="{ name: 'guild-item-view', params: { id: this.item.id }}" class="flex items-center text-primary leading-6 hover:text-opacity-80">
								<i class="far fa-long-arrow-right fa-fw mr-1"></i>
								<span class="text-sm font-bold">View thread</span>
							</router-link>-->
						</div>
						<div class="flex items-center space-x-6">
							<!-- Expand Text Post Button -->
							<button v-if="!item.domain" class="flex items-center text-gray-500 leading-none dark:text-gray-400 hover:text-gray-600" @click="toggleExpand()">
								<i class="far fa-fw mr-1" :class="expanded ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
								<span class="text-sm font-bold">{{ expanded ? 'Collapse' : 'Expand' }}</span>
							</button>
							<!-- Repost Button -->
							<button class="flex items-center text-gray-500 leading-none dark:text-gray-400 hover:text-gray-600">
								<i class="far fa-retweet-alt fa-fw mr-1"></i>
								<span class="text-sm font-bold">Repost</span>
							</button>
							<!-- Share Button -->
							<button class="flex items-center text-gray-500 leading-none dark:text-gray-400 hover:text-gray-600">
								<i class="far fa-share-alt fa-fw mr-1"></i>
								<span class="text-sm font-bold">Share</span>
							</button>
							<!-- Save Button -->
							<button class="flex items-center text-gray-500 leading-none dark:text-gray-400 hover:text-gray-600">
								<i class="far fa-bookmark fa-fw mr-1"></i>
								<span class="text-sm font-bold">Save</span>
							</button>
							<!-- Trash Button -->
							<button v-if="author" class="flex items-center text-gray-500 leading-none dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
								<i class="far fa-trash-alt fa-fw mr-1"></i>
								<span class="text-sm font-bold">Delete</span>
							</button>
							<!-- Edit Button -->
							<button v-if="author" class="flex items-center text-gray-500 leading-none dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
								<i class="far fa-pen fa-fw mr-1"></i>
								<span class="text-sm font-bold">Edit</span>
							</button>
						</div>
					</div>
					<!-- Mobile actions -->
					<div class="flex flex-grow md:hidden items-center">
						<!-- Replies Count -->
						<router-link v-if="item.commentCount > 0" class="text-sm text-gray-600 dark:text-gray-400 font-bold" :to="item.permalink">
							{{ item.commentCount === 1 ? '1 reply' : `${item.commentCount} replies` }}
						</router-link>
						<!-- Voting Buttons -->
						<div class="flex items-center space-x-4 ml-auto">
							<div class="flex items-center space-x-1">
								<!-- Upvote Button -->
								<button class="text-gray-600 dark:text-gray-400" @click="vote(1)">
									<i class="fa-arrow-alt-up fa-fw fa-lg" :class="voteType === 1 ? 'text-primary fas' : 'far'"></i>
								</button>
								<!-- Score -->
								<div class="text-sm text-center font-bold" :class="{ 'text-primary': voteType === 1, 'text-teal-500': voteType === -1, 'text-gray-900 dark:text-gray-300': voteType === 0 }">
									{{ item.score }}
								</div>
								<!-- Downvote Button -->
								<button class="text-gray-600 dark:text-gray-400" @click="vote(-1)">
									<i class="fa-arrow-alt-down fa-fw fa-lg" :class="voteType === -1 ? 'text-teal-500 fas' : 'far'"></i>
								</button>
							</div>
							<!-- Repost Button -->
							<button class="flex items-center py-1 text-gray-600 leading-none dark:text-gray-400 hover:text-gray-600">
								<i class="far fa-retweet-alt fa-fw fa-lg"></i>
							</button>
							<!-- Share Button -->
							<button class="flex items-center py-1 text-gray-600 leading-none dark:text-gray-400 hover:text-gray-600">
								<i class="far fa-share-alt fa-fw fa-lg"></i>
							</button>
							<!-- Delete Button -->
							<button v-if="author" class="flex items-center py-1 text-gray-600 leading-none dark:text-gray-400 hover:text-gray-600">
								<i class="far fa-trash-alt fa-fw fa-lg"></i>
							</button>
							<!-- Edit Button -->
							<button v-if="author" class="flex items-center py-1 text-gray-600 leading-none dark:text-gray-400 hover:text-gray-600">
								<i class="far fa-pen fa-fw fa-lg"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
//import components
import { defineAsyncComponent } from 'vue'
import { mapState, mapGetters } from "vuex";
import ItemActions from "@/components/item/ItemActions.vue";
const EmbedLink = defineAsyncComponent(() => import('@/components/embeds/Link.vue'));
//import date-fns
import { isValid, formatDistanceToNowStrict } from '../../../node_modules/date-fns'

export default {
	name: "ItemListing",
	props: {
		//item: Object
		id: String
	},
	components: {
		ItemActions,
		EmbedLink
	},
	data() {
		return {
			expanded: false,
			isValid,
			formatDistanceToNowStrict,
			postIcon: {
				'image': 'far fa-camera-alt text-gray-400',
				'text': 'far fa-text text-gray-400',
				'link': 'far fa-external-link text-gray-400'
			}
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
		...mapState("persist", ["v"]),
		...mapGetters("items", ["getItem"]),
		item: function() {
			return this.getItem(this.id); // functional getter, get item by state object lookup
		},
		voteType: {
			get() {
				return this.$store.getters['items/getItemVoteType'](this.item.id); // pass item ID to get item vote integer
			},
			set (value) {
				console.log(value)
				this.$store.commit('items/SET_ITEM_VOTE_TYPE', {type: value, id: this.item.id}); // when user votes, pass value to item (object) in state
			}
		},
		itemVoteActionStatus() {
			return this.$store.getters['items/getItemVoteActionStatus'](this.item.id); // get vote status from state
		},
		hidePinned() {
			return (this.item.isStickied && this.$route.query.sort !== 'hot')
		},
		author() {
			return this.v && this.v.username === this.item.author.username
		}
	},
	methods: {
		toggleExpand() {
			this.expanded = !this.expanded
		},
		getFormat(val) {
			const timestamp = val * 1000
			if (isValid(timestamp)) {
				return formatDistanceToNowStrict(new Date(timestamp), { addSuffix: true })
			}
		},
		vote(type) {
			this.voteType = this.voteType === type ? 0 : type; // update component vote count
			this.$store.dispatch('items/votePost', {post_id: this.id, vote: this.voteType}); // dispatch action and handle voting server-side
		}
	},
};
</script>

<style scoped>
.mask-overlay {
	-webkit-mask-image: linear-gradient(180deg,#000 65%,transparent);
	mask-image: linear-gradient(180deg,#000 65%,transparent);
}
</style>