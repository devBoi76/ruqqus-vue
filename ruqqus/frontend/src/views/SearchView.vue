<template>
	<div class="flex flex-grow">

		<!-- Desktop - Main content section -->
		<div class="flex flex-col flex-grow">
			<!-- Header content section -->
			<div class="flex items-center justify-between flex-shrink-0 p-4 md:px-4 md:py-8 border-b bg-white dark:border-white dark:border-opacity-10 dark:bg-gray-700">
				<div>
					<div class="text-xl font-bold dark:text-gray-100">
						Search results for "{{ this.$route.query.q || this.fallback.q }}"
					</div>
				</div>
			</div>

			<!-- Tabs -->
			<div class="flex flex-shrink-0 w-full items-end h-12 px-4 border-b dark:border-white dark:border-opacity-10 dark:bg-gray-700">
				<router-link v-for="tab in tabs" :key="tab.name" v-slot="{ href, navigate, isExactActive }" :to="tab.route">
					<a :href="href" @click="navigate" class="group">
						<div class="border-b-2 px-4 pb-3 capitalize" :class="isExactActive ? 'text-purple-500 border-purple-500' : 'text-gray-500 hover:text-gray-700 border-transparent'">
							{{ tab.name }}
						</div>
					</a>
				</router-link>
			</div>

			<!-- Main Content Desktop -->
			<vue-scroll>
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
			</vue-scroll>
		</div>
		<!-- End Desktop - Main content section -->

		<!-- Mobile - Main content section -->

		<!-- Right bar -->
		<div class="hidden xl:flex flex-col flex-shrink-0 w-80 bg-white border-l dark:bg-gray-700">
			<vue-scroll>
				<div class="px-4 py-5 space-y-6">
					<SidebarSection>
						<template v-slot:body>
							<div class="p-3 border rounded-sm">
								<div class="flex items-center mb-2">
									<img src="https://i.ruqqus.com/board/ruqqus/profile-3.png" class="w-8 h-8 rounded-sm bg-gray-100 object-cover">
									<div class="pl-3 font-bold">
										Search
									</div>
								</div>
								<p class="text-sm text-gray-600">
									Not finding the content you are looking for? Create a new post or community today!
								</p>
								<button class="button purple500 w-full">
									Create post
								</button>
								<button class="button outlinePurple500 mt-2 w-full">
									Create guild
								</button>
							</div>
						</template>
					</SidebarSection>
					<SidebarSection title="Support Ruqqus">
						<template v-slot:body>
							<ul class="mb-0 p-3 space-y-3 border rounded-sm">
								<li>
									<a href="https://github.com/ruqqus/ruqqus" class="group flex items-center justify-between">
										<div class="pr-3">
											<div class="text-sm text-gray-900 font-bold">
												Contribute Code
												<i class="fas fa-long-arrow-right text-purple-500 fa-sm pl-1 opacity-0 group-hover:opacity-100"></i>
											</div>
											<p class="text-xs text-gray-500">
												Ruqqus is open-source!
											</p>
										</div>
										<div class="flex flex-shrink-0 items-center justify-center w-8 h-8 rounded-sm bg-gray-100">
											<i class="fab fa-github text-black"></i>
										</div>
									</a>
								</li>
								<li>
									<a href="https://github.com/ruqqus/ruqqus" class="group flex items-center justify-between">
										<div class="pr-3">
											<div class="text-sm text-gray-900 font-bold">
												Ruqqus Merch
												<i class="fas fa-long-arrow-right text-purple-500 fa-sm pl-1 opacity-0 group-hover:opacity-100"></i>
											</div>
											<p class="text-xs text-gray-500">
												Keeps the servers running :)
											</p>
										</div>
										<div class="flex flex-shrink-0 items-center justify-center w-8 h-8 rounded-sm bg-blue-100">
											<i class="fas fa-tshirt text-blue-500"></i>
										</div>
									</a>
								</li>
								<li>
									<a href="https://github.com/ruqqus/ruqqus" class="group flex items-center justify-between">
										<div class="pr-3">
											<div class="text-sm text-gray-900 font-bold">
												Report a Bug
												<i class="fas fa-long-arrow-right text-purple-500 fa-sm pl-1 opacity-0 group-hover:opacity-100"></i>
											</div>
											<p class="text-xs text-gray-500">
												Help us squash 'em
											</p>
										</div>
										<div class="flex flex-shrink-0 items-center justify-center w-8 h-8 rounded-sm bg-red-100">
											<i class="fas fa-bug text-red-500"></i>
										</div>
									</a>
								</li>
							</ul>
						</template>
					</SidebarSection>
				</div>
			</vue-scroll>
		</div>
		<!-- End Right bar -->
	</div>
</template>

<script>
// Import our components
const ItemList = () => import('@/views/ItemList.vue')
const ItemSort = () => import('@/components/dropdowns/ItemSort.vue')

import SidebarSection from "@/components/navigation/vertical/SidebarSection.vue"

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
		ItemSort,
		SidebarSection
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
