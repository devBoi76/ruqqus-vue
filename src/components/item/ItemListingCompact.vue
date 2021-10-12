<template>
	<div class="relative bg-white border-t border-b border-gray-100 dark:border-transparent sm:border sm:rounded-sm dark:bg-gray-800" :class="hidePinned ? 'hidden' : 'flex'">
		<!-- Moderator Mode Checkbox -->
		<label v-if="moderating" class="flex flex-col flex-shrink-0 items-center w-9 py-2 bg-gray-50 border-r rounded-tl-sm rounded-bl-sm cursor-pointer">
			<input type="radio" class="form-checkbox" name="item_checkbox" v-model="selected" :value="item.id"/>
		</label>
		<div class="flex flex-grow">
			<!-- Post Details -->
			<div class="flex flex-col flex-grow">
				<div class="flex flex-shrink-0 items-center justify-between p-2.5 border-b dark:border-gray-700 dark:border-opacity-70">
					<div class="flex items-center w-full overflow-x-auto">
						<!-- Author Avatar -->
						<router-link :to="'/'+item.author.username">
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
					<!-- Post Options Dropdown - Mobile Only -->
					<button class="flex items-center justify-center md:hidden -mr-1 p-1 text-gray-600 dark:text-gray-400">
						<i class="far fa-ellipsis-h fa-fw fa-lg"></i>
					</button>
				</div>
				<!-- Post Content -->
				<div class="flex justify-between p-2.5">
					<div>
						<!-- Post Title -->
						<h5 class="text-lg md:text-xl font-medium">
							<router-link class="text-gray-900 visited:text-gray-400 dark:text-gray-100 hover:text-primary" :to="item.permalink">
								{{ item.title }}
							</router-link>
						</h5>
						<!-- Link Post Domain -->
						<a :href="item.url" v-if="item.url && item.type !== 'image'" target="_blank" class="block text-sm text-gray-500 dark:tex-gray-400 hover:underline">
							{{ item.domain }}
							<i class="far fa-external-link fa-sm pl-1"></i>
						</a>
					</div>
					<div class="flex-shrink-0 pl-3">
						<!-- Thumbnail -->
						<div v-if="item.thumbUrl && isScreenshot" class="relative">
							<img
							v-if="item.type === 'image'"
							:src="item.thumbUrl"
							alt="Post image"
							class="w-14 md:w-20 h-14 object-cover rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20"
							@click="isExpanded = !isExpanded"
							/>
							<!-- Fallback Icon - Link Posts Only -->
							<a v-else :href="item.url" target="_blank" class="block">
								<img
								:src="item.thumbUrl"
								alt="Post image"
								class="w-14 md:w-20 h-14 object-cover rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20"
								/>
								<span class="absolute bottom-0 right-0 block flex items-center justify-center h-6 w-6 rounded-br-sm rounded-tl-sm text-white bg-black bg-opacity-50">
									<i class="far fa-external-link fa-fw fa-sm"></i>
								</span>
							</a>
						</div>
						<!-- Fallback Icon -->
						<div v-else class="hidden md:flex items-center justify-center w-20 h-14 rounded-sm bg-gray-100 dark:bg-gray-700">
							<i class="far text-lg" :class="postIcon"></i>
						</div>
					</div>
				</div>
				<!-- Expanded Image -->
				<router-link v-show="isExpanded" v-if="item.type === 'image'" :to="item.permalink">
					<img
					:src="item.url"
					alt="Post image"
					class="w-full h-full obect-cover mt-6 bg-gray-100 sm:rounded-sm sm:hidden" 
					/>
				</router-link>
				<!-- Footer -->
				<div class="flex flex-shrink-0 justify-between items-center mb-3 mt-3 md:mt-0 px-2.5">
					<!-- Desktop actions -->
					<div class="hidden md:flex items-center space-x-6">
						<!-- Voting Buttons -->
						<div class="flex items-center space-x-2">
							<!-- Upvote Button -->
							<button class="text-gray-500 dark:text-gray-400" @click="vote(1)">
								<i class="fa-arrow-alt-up fa-fw text-lg" :class="voteType === 1 ? 'text-primary fas' : 'fal'"></i>
							</button>
							<!-- Score -->
							<div class="text-sm text-center font-bold" :class="{ 'text-primary': voteType === 1, 'text-teal-500': voteType === -1, 'text-gray-900 dark:text-gray-300': voteType === 0 }">
								{{ item.score + voteType }}
							</div>
							<!-- Downvote Button -->
							<button class="text-gray-500 dark:text-gray-400" @click="vote(-1)">
								<i class="fa-arrow-alt-down fa-fw text-lg" :class="voteType === -1 ? 'text-teal-500 fas' : 'fal'"></i>
							</button>
						</div>
						<!-- Repost Button -->
						<button class="flex items-center text-gray-500 leading-none dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
							<i class="far fa-retweet-alt fa-fw mr-1"></i>
							<span class="text-sm font-bold">Repost</span>
						</button>
						<!-- Share Button -->
						<button class="flex items-center text-gray-500 leading-none dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
							<i class="far fa-share-alt fa-fw mr-1"></i>
							<span class="text-sm font-bold">Share</span>
						</button>
						<!-- Save Button -->
						<SaveButton v-if="author">
							<template v-slot:default="{isSaved, savePost, unsavePost}">
								<button class="flex items-center text-gray-500 leading-none dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" @click="isSaved ? unsavePost() : savePost()">
									<i class="fa-bookmark fa-fw mr-1" :class="isSaved ? 'fas' : 'far'"></i>
									<span class="text-sm font-bold">
										{{ isSaved ? 'Unsave' : 'Save' }}
									</span>
								</button>
							</template>
						</SaveButton>
						<!-- Delete Button-->
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

					<!-- Mobile actions -->
					<div class="flex flex-grow md:hidden items-center">
						<router-link v-if="item.commentCount > 0" class="text-sm text-gray-600 dark:text-gray-400 font-bold" :to="item.permalink">
							{{ item.commentCount === 1 ? '1 reply' : `${item.commentCount} replies` }}
						</router-link>

						<div class="flex items-center space-x-4 ml-auto">
							<!-- Voting Buttons -->
							<div class="flex items-center space-x-1">
								<!-- Upvote Button -->
								<button class="text-gray-600 dark:text-gray-400" @click="vote(1)">
									<i class="fa-arrow-alt-up fa-fw fa-lg" :class="voteType === 1 ? 'text-primary fas' : 'far'"></i>
								</button>
								<!-- Score -->
								<div class="text-sm text-center font-bold" :class="{ 'text-primary': voteType === 1, 'text-teal-500': voteType === -1, 'text-gray-900 dark:text-gray-300': voteType === 0 }">
									{{ item.score + voteType }}
								</div>
								<!-- Downvote Button -->
								<button class="text-gray-600 dark:text-gray-400" @click="vote(-1)">
									<i class="fa-arrow-alt-down fa-fw fa-lg" :class="voteType === -1 ? 'text-teal-500 fas' : 'far'"></i>
								</button>
							</div>
							<!-- Retweet Button -->
							<button class="flex items-center py-1 text-gray-600 leading-none dark:text-gray-400 hover:text-gray-600">
								<i class="far fa-retweet-alt fa-fw fa-lg"></i>
							</button>
							<!-- Share Button -->
							<button class="flex items-center py-1 text-gray-600 leading-none dark:text-gray-400 hover:text-gray-600">
								<i class="far fa-share-alt fa-fw fa-lg"></i>
							</button>
							<!-- Save Button -->
							<button class="flex items-center py-1 text-gray-600 leading-none dark:text-gray-400 hover:text-gray-600">
								<i class="far fa-bookmark fa-fw fa-lg"></i>
							</button>
							<!-- Delete Button -->
							<button v-if="author" class="flex items-center py-1 text-gray-600 leading-none dark:text-gray-400 hover:text-gray-600">
								<i class="far fa-trash-alt fa-fw fa-lg"></i>
							</button>
							<!-- Edit Button -->
							<button v-if="author" class="flex items-center py-1 text-gray-600 leading-none dark:text-gray-400 hover:text-gray-600">
								<i class="far fa-pencil fa-fw fa-lg"></i>
							</button>
						</div>
					</div>
					<!-- Participant avatars -->
					<div class="hidden md:flex items-center">
						<!-- Avatar Group -->
						<!-- <div class="flex items-center -space-x-4">
							<img
							v-for="participant of item.participants"
							:key="participant.id"
							:src="participant.avatar"
							variant="null"
							rounded
							class="border border-gray-500 border-2"
							v-b-tooltip.hover.bottom="participant.username"
							/>
						</div> -->
						<!-- Comment Count -->
						<router-link v-if="item.commentCount > 0" class="block ml-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary" :to="item.permalink">
							{{ item.commentCount === 1 ? '1 reply' : `${item.commentCount} replies` }}
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapState, mapGetters } from "vuex";
//import date-fns
import { isValid, formatDistanceToNowStrict } from '../../../node_modules/date-fns';

const SaveButton = defineAsyncComponent(() => import('@/components/buttons/SavePostButton.vue'))

export default {
	name: "ItemListingCompact",
	props: {
		//item: Object,
		id: String,
		moderating: Boolean,
		source: {
			type: Object,
			default () {
				return {}
			}
		}
	},
	components: {
		SaveButton
	},
	data() {
		return {
			isExpanded: false,
			isValid,
			formatDistanceToNowStrict
			//voteType: 0
		};
	},
	computed: {
		...mapState("persist", ["v"]),
		...mapGetters("items", ["getItem"]),
		// item() {
		// 	return this.source;
		// },
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
		saved: {
			get() {
				return this.$store.getters['items/getItemSavedStatus'](this.item.id);
			},
			set (value) {
				console.log(value)
				this.$store.commit('items/SET_ITEM_SAVE_TYPE', {type: value, id: this.item.id});
			}
		},
		itemVotedStatus() {
			return this.$store.getters['items/getItemVotedStatus'](this.item.id); // get vote status from state
		},
		itemVoteActionStatus() {
			return this.$store.getters['items/getItemVoteActionStatus'](this.item.id); // get vote status from state
		},
		selected: {
			get() {
				return this.$store.state.items.selectedItems
			},
			set (value) {
				this.$store.commit('items/TOGGLE_ITEM', {id: value})
			}
		},
		pinned() {
			return (this.item.isStickied && (this.$route.name === 'guild-post-view' || this.$route.name === 'guild-item-view'))
		},
		postIcon() {
			if (!this.item.url) {
				return 'far fa-text text-gray-400'
			} else if (this.item.type === 'image') {
				return 'far fa-camera-alt text-gray-400'
			} else {
				return 'far fa-link text-gray-400'
			}
		},
		isScreenshot() {
			return !this.item.thumbUrl.startsWith("/assets/images/icons/")
		},
		hidePinned() {
			return (this.item.isStickied && this.$route.query.sort)
		},
		author() {
			return this.v && this.v.username === this.item.author.username
		}
	},
	watch: {
		itemVoteActionStatus(newVal, oldVal) {
			if (newVal === 3) {
				this.voteType = 0
			}
			return oldVal
		},
		itemSaveActionStatus(newVal, oldVal) {
			if (newVal === 3) {
				this.saved = !this.saved
			}
			return oldVal
		}
	},
	methods: {
		getFormat(val) {
			const timestamp = val * 1000
			if (isValid(timestamp)) {
				return formatDistanceToNowStrict(new Date(timestamp), { addSuffix: true })
			}
		},
		vote(type) {
			this.voteType = this.voteType === type ? 0 : type; // update component vote count
			this.$store.dispatch('items/votePost', {post_id: this.item.id, vote: type}); // dispatch action and handle voting server-side-
		}
	},
};
</script>
