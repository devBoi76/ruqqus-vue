<template>
	<div>
		<!-- Post Creation -->
		<div v-if="v" class="hidden flex-col space-y-2 mb-4 px-4 py-3 bg-white dark:bg-gray-800 md:shadow-xs md:rounded-sm">
			<div class="flex items-center space-x-2">
				<img :src="v.profile_url" class="flex-shrink-0 w-6 h-6 object-fit rounded-sm bg-gray-200 dark:bg-gray-800">
				<div class="font-bold text-sm">
					{{ v.username || 'Ruqqie' }}
				</div>
			</div>
			<div class="group flex-grow overflow-hidden">
				<router-link :to="`/submit?g=${$route.params.name}`" tag="div" class="flex items-center h-full">
					<p class="text-gray-400 text-lg group-hover:text-gray-500 mb-0">
						Post something interesting...
					</p>
					<div class="hidden items-center space-x-2 ml-auto text-sm">
						<i class="fas fa-text fa-fw text-gray-300 group-hover:text-gray-400"></i>
						<i class="fas fa-link fa-fw text-gray-300 group-hover:text-gray-400"></i>
						<i class="fas fa-image fa-fw text-gray-300 group-hover:text-gray-400"></i>
					</div>
				</router-link>
			</div>
		</div>
		<!-- End Post Creation -->

		<!-- Post Sorting and Display Toggle -->
		<div class="flex items-center flex-shrink-0 sm:rounded-sm sm:shadow-xs mb-4 px-4 py-3 bg-white dark:bg-gray-800">
			<div class="flex items-center justify-between flex-grow">
				<div class="text-lg font-bold capitalize leading-none dark:text-gray-200">
					Posts
				</div>
				<div class="flex flex-wrap items-center space-x-6">
					<ItemSort/>
					<ListingToggle/>
				</div>
			</div>
		</div>
		<!-- End Post Sorting and Display Toggle -->

		<!-- List of Posts -->
		<ItemList :loading="loading" @paginate="paginated()"/>
		<!-- End List of Posts -->

	</div>
</template>

<script>
// Import our components
import { mapState } from "vuex";

const ItemList = () => import('@/views/ItemList.vue')

const ItemSort = () => import('@/components/dropdowns/ItemSort.vue')
const ListingToggle = () => import('@/components/forms/ListingToggle.vue')

export default {
	name: "PostsView",
	data() {
		return {
			loading: true,
			errored: false,
			params: {
				page: this.$route.query.page || 1,
				sort: this.$route.query.sort || 'hot',
				t: this.$route.query.t || 'all'
			}
		};
	},
	components: {
		ItemList,
		ItemSort,
		ListingToggle
	},
	computed: {
		...mapState("persist", ["v"]),
	},
	watch: {
		'$route.params.name': { // get guild posts if guild changes
			handler() {
				console.log('route param guild name watcher triggered')
				this.getPosts()
			},
			immediate: true
		},
		'$route.query': { // get guild posts if query changes
			handler() {
				console.log('route param guild name watcher triggered')
				this.loading = true;
				this.errored = false;
				this.getPosts()
			}
		},
		itemVoteActionStatus(newVal, oldVal) {
			if (newVal === 3) {
				this.voteType = 0
			}
			return oldVal
		}
	},
	methods: {
		getPosts() {
			let payload = {
				guild: this.$route.params.name, 
				params: this.params
			}
			this.$store.dispatch('items/fetchGuildPosts', payload)
			.then(() => {
				console.log("getGuildPosts dispatch successful")
			})
			.catch(error => {
				console.error(error)
				this.errored = true

			})
			.finally(() => this.loading = false)
		},
		paginated() {
			console.log(`pagination works! ${this.page++}`)
			this.$router.replace({query: {page: this.page++ }})
		}
	}
};
</script>