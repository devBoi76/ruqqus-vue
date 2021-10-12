<template>
	<!-- Banner -->
	<div class="w-full overflow-y-auto">
		<div class="relative flex flex-col items-center justify-center text-center min-h-[100px] max-h-[140px] sm:min-h-[270px] sm:max-h-[300px] z-50">
			<img class="absolute w-full h-full bottom-0 top-0 left-0 right-0 object-cover" src="https://i.imgur.com/AgS5BXJ.jpg" alt="banner">
			<h1 class="hidden sm:block z-10 h2 text-white mb-4">
				Search results for "{{ $route.query.q || fallback.q }}"
			</h1>
		</div>

		<!-- Search Bar -->
		<div class="container mx-auto grid grid-cols-12 -mt-8">
			<div class="col-span-full lg:col-start-3 lg:col-end-11 px-6 sm:px-0 z-75">
				<form class="relative" @submit.prevent="onSubmit">
					<div class="absolute left-4 top-[1.375rem]">
						<button class="text-gray-400 hover:text-gray-500" @click="search()">
							<i class="far fa-search fa-fw text-lg"></i>
						</button>
					</div>
					<input required type="text" class="form-input white pl-12 pr-5 py-5" v-model="searchTerm" placeholder="Search posts, comments, and @members" @keyup.enter="search()">
					<div class="absolute right-4 top-[1.375rem]">
						<button class="text-gray-400 hover:text-gray-500" @click="searchTerm = ''">
							<i class="far fa-times-circle fa-fw text-lg"></i>
						</button>
					</div>
				</form>
			</div>
		</div>
		<!-- End Search Bar -->

		<div class="container mx-auto grid grid-cols-12">
			<div class="col-span-full flex gap-6 sm:py-6 my-2.5 sm:my-0" :class="isCard ? 'lg:col-start-3 lg:col-end-11' : 'lg:col-start-2 lg:col-end-12'">

				<!-- Main Content Section -->
				<div class="w-full">

					<!-- Post Sorting and Display Toggle -->
					<div v-if="getItemsLength" class="flex items-center flex-shrink-0 sm:rounded-sm sm:border mb-2.5 sm:mb-4 px-4 py-3 bg-white dark:bg-gray-800">
						<div class="flex items-center justify-between flex-grow">
							<div class="text-gray-500">
								{{ getItemsLength === 1 ? '1 Result' : `${getItemsLength} Results` }}
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
				this.fetchResults();
				this.$store.dispatch('persist/addSearchItem', this.$route.query.q);
			},
			immediate: true,
			flush: 'post'
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
