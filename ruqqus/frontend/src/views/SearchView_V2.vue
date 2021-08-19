<template>
	<!-- Banner -->
	<div class="w-full overflow-y-auto">
		<div class="relative flex flex-col items-center justify-center text-center min-h-[100px] max-h-[140px] sm:min-h-[270px] sm:max-h-[340px] z-50">
			<img class="absolute w-full h-full bottom-0 top-0 left-0 right-0 object-cover" src="https://i.imgur.com/AgS5BXJ.jpg" alt="banner">
			<h1 class="hidden sm:block z-10 h2 text-white">
				Search results for "{{ $route.query.q || fallback.q }}"
			</h1>
		</div>

		<!-- Search Bar -->
		<div class="grid grid-cols-12 -mt-8">
			<div class="col-span-full xl:col-start-2 xl:col-end-12 px-6 z-75">
				<div class="relative">
					<div class="absolute left-4 top-[1.375rem]">
						<i class="far fa-search fa-fw text-lg text-gray-400"></i>
					</div>
					<input type="text" class="form-input white pl-12 pr-5 py-5" v-model="searchTerm" placeholder="Search posts, comments, and @members" @keyup.enter="search()">
					<div class="absolute right-4 top-[1.375rem]">
						<button @click="searchTerm = ''">
							<i class="far fa-times-circle fa-fw text-lg text-gray-400"></i>
						</button>
					</div>
				</div>
			</div>
		</div>
		<!-- End Search Bar -->

		<div class="grid grid-cols-12" :class="{ 'xl:grid-cols-10':isCard }">
			<div class="col-span-full flex gap-6 sm:p-6 my-2.5 sm:my-0" :class="isCard ? 'xl:col-start-3 xl:col-end-9' : 'xl:col-start-2 xl:col-end-12'">

				<!-- Main Content Section -->
				<div class="w-full">

					<!-- Post Sorting and Display Toggle -->
					<div class="flex items-center flex-shrink-0 sm:rounded-sm mb-2.5 sm:mb-4 px-4 py-3 bg-white dark:bg-gray-800">
						<div class="flex items-center justify-between flex-grow">
							<div class="text-gray-500">
								<span v-if="getItemsLength">
									{{ getItemsLength === 1 ? '1 Result' : `${getItemsLength} Results` }}
								</span>
							</div>
							<div class="flex flex-wrap items-center space-x-6">
								<ItemSort/>
								<ListingToggle/>
							</div>
						</div>
					</div>
					<!-- End Post Sorting and Display Toggle -->

					<!-- List of Posts -->
					<ItemList v-if="posts" :loading="loading"/>
					<!-- End List of Posts -->

					<!-- Home Feed Empty State -->
					<div v-if="$route.name === 'HomeView'" v-show="!posts" class="relative">
						<div v-if="isCard">
							<div v-for="i in 3" :key="i" class="flex mb-4 last:mb-0">
								<div class="mr-4">
									<div class="border-2 border-gray-300 border-dashed dark:bg-white dark:bg-opacity-20 rounded-sm w-16 h-16"></div>
								</div>
								<div class="w-full p-4 rounded-sm border-2 border-gray-300 border-dashed dark:bg-gray-800">
									<div v-if="i === 1" class="flex flex-col items-center p-20">
										<i class="block fal fa-home-lg-alt text-gray-300 text-5xl mb-3"></i>
										<div class="h4">
											Welcome to your Home Feed
										</div>
									</div>
									<div v-else class="p-40">
									</div>
								</div>
							</div>
						</div>
						<div v-else>
							<div v-for="i in 4" :key="i" class="mb-2 last:mb-0 px-4 py-3 rounded-sm border-2 border-gray-300 border-dashed dark:bg-gray-800">
								<div v-if="i === 1" class="flex flex-col items-center p-4">
									<i class="block fal fa-home-lg-alt text-gray-300 text-5xl mb-3"></i>
									<div class="h4">
										Welcome to your Home Feed
									</div>
									<p class="text-gray-700">
										When you join some communities, their posts show up here!
									</p>
								</div>
							</div>
						</div>
					</div>
					<!-- End Home Feed Empty State -->

				</div>
				<!-- End Main Content Section -->
			</div>
		</div>
	</div>
</template>

<script>
// Import components
import { defineAsyncComponent } from 'vue'
import { mapState, mapGetters } from "vuex";

const ItemList = defineAsyncComponent(() => import('@/views/ItemList.vue'))
const ItemSort = defineAsyncComponent(() => import('@/components/dropdowns/ItemSort.vue'))
const ListingToggle = defineAsyncComponent(() => import('@/components/forms/ListingToggle.vue'))

export default {
	name: "SearchView",
	data() {
		return {
			searchTerm: this.$route.query.q,
			loading: false,
			errored: false,
			page: 1,
			fallback: {
				q: '503'
			}
		};
	},
	components: {
		ItemList,
		ItemSort,
		ListingToggle
	},
	computed:{
		...mapState("persist", ["v", "isCard"]),
		...mapState("items", ["posts"]),
		...mapGetters('items', ['getItems','getItemsLength'])
	},
	watch: {
		'$route.query': {
			handler() {
				this.fetchResults()
			}
		}
	},
	methods: {
		search() {
			this.$router.push("/search?q="+this.searchTerm);
		},
		fetchResults() {
			let query = this.$route.query || this.fallback
			this.$store.dispatch('items/fetchSearch', query)
			.then(() => {
				console.log("fetchSearch dispatch successful")
			})
			.catch(error => {
				console.error(error)
				this.errored = true
			})
			.finally(() => this.loading = false)
		}
	},
	created() {
		document.documentElement.style.setProperty('--color-primary', `139, 92, 246`)
	}
};
</script>
