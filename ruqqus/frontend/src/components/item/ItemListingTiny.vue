<!-- This is a view-only component used to display a list of posts in feeds, purely for display and linking to threads -->
<template>
	<div class="flex flex-col">
		<!-- Post title and image -->
		<div class="flex justify-between">
			<router-link class="text-sm text-gray-900 font-bold dark:text-gray-100 hover:text-primary" :to="`/+${item.guild_name}/post/${item.id}`">
				{{ item.title }}
			</router-link>
			<router-link :to="item.permalink" class="ml-3 flex-shrink-0">
				<img v-if="item.thumb_url" v-lazy="item.thumb_url" alt="Post image" class="w-14 h-10 object-cover rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20"/>
				<div v-else class="flex items-center justify-center w-14 h-10 rounded-sm bg-gray-100 dark:bg-gray-700 border">
					<i :class="postIcon"></i>
				</div>
			</router-link>
		</div>
		<!-- Meta -->
		<div class="flex items-center justify-between mt-2">
			<!-- Author -->
			<div class="flex items-center">
				<router-link :to="`/${item.author.username}`" class="flex-shrink-0">
					<img
					v-lazy="item.author.profile_url"
					alt="Author avatar"
					class="w-6 h-6 object-cover rounded-sm bg-gray-100 dark:bg-white dark:bg-opacity-20"
					/>
				</router-link>
				<div class="flex items-center space-x-1 pl-2 text-2xs">
					<router-link :to="`/${item.author.username}`" class="font-bold text-gray-900 dark:text-gray-200">
						@{{ item.author.username }}
					</router-link>
					<span class="font-black text-gray-400 dark:text-gray-500">·</span>
					<span class="text-gray-500">{{ getFormat(item.created_utc) }}</span>
				</div>
			</div>
			<!-- Icons -->
			<i v-if="pinned" class="fas fa-thumbtack text-2xs text-green-500 mt-1 mr-2"></i>
		</div>
	</div>
</template>

<script>
//import date-fns
import { isValid, formatDistanceToNow } from '../../../node_modules/date-fns'

export default {
	name: "ItemListingCompact",
	props: {
		item: Object
	},
	components: {
	},
	data() {
		return {
			isValid,
			formatDistanceToNow,
		};
	},
	computed: {
		pinned() {
			if (this.item.is_pinned && (this.$route.name === 'guild-posts-view' || this.$route.name === 'guild-item-view')) {
				return true
			} else {
				return false
			}
		},
		postIcon() {
			if (!this.item.url) {
				return 'far fa-text fa-sm text-gray-400'
			} else if (this.item.is_image) {
				return 'far fa-camera-alt fa-sm text-gray-400'
			} else {
				return 'far fa-link fa-sm text-gray-400'
			}
		}
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