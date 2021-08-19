<template>
	<div class="w-full overflow-y-auto">
		<!-- Desktop - Main content section -->
		<div class="flex flex-col flex-grow">
			<!-- Header content section -->
			<div class="flex items-center justify-between flex-shrink-0 p-4 md:px-4 md:py-8 border-b bg-white dark:border-white dark:border-opacity-10 dark:bg-gray-700">
				<div class="mx-auto">
					<div class="text-xl font-bold dark:text-gray-100">
						Search results for "{{ this.$route.query.q || this.fallback.q }}"
					</div>
				</div>
			</div>

			<!-- Tabs -->
			<div class="flex flex-shrink-0 w-full items-end h-12 px-4 border-b dark:border-white dark:border-opacity-10 dark:bg-gray-700">
				<div class="grid grid-cols-12">
					<div class="col-span-full xl:col-start-2 xl:col-end-12">
						<router-link v-for="tab in tabs" :key="tab.name" v-slot="{ href, navigate, isExactActive }" :to="tab.route">
							<a :href="href" @click="navigate" class="group">
								<div class="border-b-2 px-4 pb-3 capitalize" :class="isExactActive ? 'text-purple-500 border-purple-500' : 'text-gray-500 hover:text-gray-700 border-transparent'">
									{{ tab.name }}
								</div>
							</a>
						</router-link>
					</div>
				</div>
			</div>

			<!-- Main Content Desktop -->
			<div class="grid grid-cols-12">
				<div class="col-span-full xl:col-start-2 xl:col-end-12">
					<div v-if="getItems" class="md:px-4 py-4">
						<div class="flex space-x-4">
							<div class="w-full">
								<div class="flex items-center mb-3">
									<div v-if="getItemsLength" class="text-xs text-gray-500">
										{{ getItemsLength === 1 ? '1 Result' : `${getItemsLength} Results` }}
									</div>
									<ItemSort class="ml-auto"/>
								</div>
								<ItemList compact/>
							</div>
							<div class="hidden lg:w-1/3">
								<div class="flex flex-col flex-shrink-0 space-y-6">
									<div>
										<div class="flex items-center justify-between mb-2">
											<div class="text-sm text-gray-600 font-bold">Filters</div>
											<button class="hidden text-sm text-red-500 hover:text-red-700">
												Clear
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- End Desktop - Main content section -->
	</div>
</template>

<script>
// Import our components
const ItemList = () => import('@/views/ItemList.vue')
const ItemSort = () => import('@/components/dropdowns/ItemSort.vue')

import { mapState, mapGetters } from "vuex";

//import axios from "axios";

export default {
	name: "SearchView",
	props: ["users"],
	data() {
		return {
			loading: true,
			errored: false,
			filtersVisible: false,
			page: 1,
			tabs: [
			{
				id: 1,
				name: "posts",
				route: {
					name: 'SearchView',
				}
			},
			{
				id: 2,
				name: "comments",
				route: {
					name: 'SearchView',
				},
				exact: true
			},
			{
				id: 3,
				name: "people",
				route: {
					name: 'SearchView',
				},
				exact: true,
				number: "250 online"
			}
			],
			fallback: {
				q: '503'
			}
		};
	},
	computed:{
		...mapState("persist", ["v"]),
		...mapGetters("create", ["canDropImage"]),
		...mapGetters('items', ['getItems','getItemsLength'])
	},
	watch: {
		'$route.query': {
			handler() {
				this.search()
			},
			immediate: true
		}
	},
	components: {
		ItemList,
		ItemSort
	},
	methods: {
		search() {
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
