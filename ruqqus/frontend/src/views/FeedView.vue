<template>
	<div class="w-full overflow-y-auto">
		<div class="grid grid-cols-12" :class="{ 'xl:grid-cols-10':isCard }">
			<div class="col-span-full flex gap-6 sm:p-6 my-2.5 sm:my-0" :class="{'xl:col-start-2 xl:col-end-10':isCard}">

				<!-- Main Content Section -->
				<div class="w-full">

					<!-- Post Creation -->
					<div class="hidden sm:flex flex-col space-y-2 mb-4 px-4 py-3 bg-white dark:bg-gray-800 sm:shadow-xs sm:rounded-sm">
						<div class="flex items-center space-x-2">
							<img :src="v.profile_url" class="flex-shrink-0 w-6 h-6 object-fit rounded-sm bg-gray-200 dark:bg-gray-800">
							<div class="font-bold text-sm">
								{{ v.username || 'Ruqqie' }}
							</div>
						</div>
						<div class="group flex-grow overflow-hidden">
							<router-link to="/submit" tag="div" class="flex items-center h-full">
								<p class="text-gray-400 text-lg group-hover:text-gray-500 dark:group-hover:text-gray-200 mb-0">
									Create a new post...
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
					<div class="flex items-center flex-shrink-0 sm:rounded-sm sm:shadow-xs mb-2.5 sm:mb-4 px-4 py-3 bg-white dark:bg-gray-800">
						<div class="flex items-center justify-between flex-grow">
							<div class="text-xl font-bold capitalize leading-none dark:text-gray-200">
								{{ $route.meta.title }} Feed
							</div>
							<div class="flex flex-wrap items-center space-x-6">
								<ItemSort/>
								<ListingToggle/>
							</div>
						</div>
					</div>
					<!-- End Post Sorting and Display Toggle -->

					<!-- List of Posts -->
					<ItemList v-if="posts" :loading="loading" @paginate="paginated()"/>
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
										<p class="text-gray-700">
											When you join some communities, their posts show up here!
										</p>
										<t-button variant="purple500" class="mt-2">
											Explore Guilds
										</t-button>
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
									<t-button variant="purple500" class="mt-2">
										Explore Guilds
									</t-button>
								</div>
								<div v-else class="p-24">
								</div>
							</div>
						</div>
					</div>
					<!-- End Home Feed Empty State -->

				</div>
				<!-- End Main Content Section -->

				<!-- Right Bar -->
				<div class="hidden lg:block flex-shrink-0 w-80">
					<div v-show="loading" class="flex flex-col w-full p-4 animate-pulse">
						<div class="space-y-4">
							<div class="flex space-x-3">
								<div class="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-sm"></div>
								<div class="flex flex-col justify-between flex-grow">
									<div class="w-3/4 h-3 bg-gray-100 rounded-sm"></div>
									<div class="w-16 h-3 bg-gray-100 rounded-sm"></div>
								</div>
							</div>
							<div class="flex space-x-3">
								<div class="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-sm"></div>
								<div class="flex flex-col justify-between flex-grow">
									<div class="w-full h-3 bg-gray-100 rounded-sm"></div>
									<div class="w-24 h-3 bg-gray-100 rounded-sm"></div>
								</div>
							</div>
							<div class="flex space-x-3">
								<div class="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-sm"></div>
								<div class="flex flex-col justify-between flex-grow">
									<div class="w-2/4 h-3 bg-gray-100 rounded-sm"></div>
									<div class="w-16 h-3 bg-gray-100 rounded-sm"></div>
								</div>
							</div>
							<div class="flex space-x-3">
								<div class="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-sm"></div>
								<div class="flex flex-col justify-between flex-grow">
									<div class="w-3/4 h-3 bg-gray-100 rounded-sm"></div>
									<div class="w-24 h-3 bg-gray-100 rounded-sm"></div>
								</div>
							</div>
						</div>
					</div>
					<div v-if="!loading" class="space-y-4">
						<SidebarSection title="Improve your acount">
							<template v-slot:body>
								<div class="p-4 bg-white dark:bg-gray-800 shadow-xs rounded-sm">
									<ul class="mb-0 space-y-4">
										<li>
											<a href="https://github.com/ruqqus/ruqqus" class="group flex items-center">
												<i class="far fa-check text-green-500 fa-fw"></i>
												<span class="text-gray-500 line-through pl-2">
													Join 5 more guilds
												</span>
											</a>
										</li>
										<li>
											<a href="https://github.com/ruqqus/ruqqus" class="group flex items-center">
												<i class="far fa-check text-green-500 fa-fw"></i>
												<span class="text-gray-500 line-through pl-2">
													Follow 10 more people
												</span>
											</a>
										</li>
										<li>
											<router-link to="/submit" class="group flex items-center">
												<i class="far fa-check text-gray-200 dark:text-gray-500 fa-fw"></i>
												<span class="text-purple-500 dark:text-gray-200 pl-2">
													Create your first post
												</span>
											</router-link>
										</li>
										<li>
											<a href="https://github.com/ruqqus/ruqqus" class="group flex items-center">
												<i class="far fa-check text-gray-200 dark:text-gray-500 fa-fw"></i>
												<span class="text-purple-500 dark:text-gray-200 pl-2">
													Write a profile biography
												</span>
											</a>
										</li>
										<li>
											<a href="https://github.com/ruqqus/ruqqus" class="group flex items-center">
												<i class="far fa-check text-gray-200 dark:text-gray-500 fa-fw"></i>
												<span class="text-purple-500 dark:text-gray-200 pl-2">
													Upload a custom avatar
												</span>
											</a>
										</li>
									</ul>
								</div>
							</template>
						</SidebarSection>
						<SidebarSection>
							<template v-slot:body>
								<div class="p-4 bg-white dark:bg-gray-800 shadow-xs rounded-sm">
									<div class="flex items-center mb-2">
										<img src="https://i.ruqqus.com/board/ruqqus/profile-3.png" class="w-8 h-8 rounded-sm bg-gray-100 dark:bg-gray-800 object-cover">
										<div class="pl-3 font-bold">
											Home
										</div>
									</div>
									<p class="text-sm text-gray-600 dark:text-gray-200">
										Your personal Ruqqus homepage. Check here for content from your communities and people you follow.
									</p>
									<t-button variant="purple500" class="w-full" to="/submit">
										Create post
									</t-button>
									<t-button variant="outlinePurple500" class="mt-2 w-full">
										Find Communities
									</t-button>
								</div>
							</template>
						</SidebarSection>
						<SidebarSection title="Featured Guilds" class="mb-6">
							<template v-slot:body>
								<div class="p-4 bg-white dark:bg-gray-800 shadow-xs rounded-sm">
									<ul class="mb-5 space-y-3">
										<li v-for="guild in featured" :key="guild.id" class="border-b border-gray-100 dark:border-gray-700 dark:border-opacity-70 pb-3 last:border-b-0 last:pb-0">
											<a href="https://github.com/ruqqus/ruqqus" class="group flex items-center">
												<img :src="guild.profile_url" class="w-8 h-8 rounded-sm bg-gray-100 dark:bg-gray-800 object-cover"/>
												<div class="pl-3">
													<div class="text-sm text-gray-900 dark:text-gray-200 font-bold">
														+{{ guild.name }}
													</div>
													<p class="text-2xs text-gray-500 dark:text-white dark:text-opacity-65">
														{{ guild.subscription_count }}
														{{ guild.subscription_count === 1 ? 'member' : 'members' }}
													</p>
												</div>
											</a>
										</li>
									</ul>
									<t-button variant="outlinePurple500" class="w-full">
										View more
									</t-button>
								</div>
							</template>
						</SidebarSection>
						<SidebarSection title="Support Ruqqus">
							<template v-slot:body>
								<ul class="mb-0 p-4 space-y-3 bg-white dark:bg-gray-800 shadow-xs rounded-sm">
									<li>
										<a href="https://github.com/ruqqus/ruqqus" class="group flex items-center justify-between">
											<div class="pr-3">
												<div class="text-sm text-gray-900 dark:text-gray-200 font-bold">
													Contribute Code
													<i class="fas fa-long-arrow-right text-purple-500 fa-sm pl-1 opacity-0 group-hover:opacity-100"></i>
												</div>
												<p class="text-xs text-gray-500 dark:text-gray-400">
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
												<div class="text-sm text-gray-900 dark:text-gray-200 font-bold">
													Ruqqus Merch
													<i class="fas fa-long-arrow-right text-purple-500 fa-sm pl-1 opacity-0 group-hover:opacity-100"></i>
												</div>
												<p class="text-xs text-gray-500 dark:text-gray-400">
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
												<div class="text-sm text-gray-900 dark:text-gray-200 font-bold">
													Report a Bug
													<i class="fas fa-long-arrow-right text-purple-500 fa-sm pl-1 opacity-0 group-hover:opacity-100"></i>
												</div>
												<p class="text-xs text-gray-500 dark:text-gray-400">
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
				</div>
				<!-- End Right bar -->

			</div>
		</div>
	</div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
// Import our components
const ItemList = defineAsyncComponent(() => import('@/views/ItemList.vue'))
//const ItemListingTiny = () => import('@/components/item/ItemListingTiny.vue')

const ItemSort = defineAsyncComponent(() => import('@/components/dropdowns/ItemSort.vue'))
const ListingToggle = defineAsyncComponent(() => import('@/components/forms/ListingToggle.vue'))

const SidebarSection = defineAsyncComponent(() => import('@/components/navigation/vertical/SidebarSection.vue'))

import { mapState } from "vuex";

export default {
	name: "FeedView",
	//props: ["users"],
	data() {
		return {
			loading: false,
			errored: false,
			items: [],
			params: {
				page: this.$route.query.page || 1,
				sort: this.$route.query.sort || 'hot',
				t: this.$route.query.t || 'all'
			},
			featured: [
			{
				id: 1,
				name: 'ruqqus',
				profile_url: 'https://i.ruqqus.com/board/ruqqus/profile-3.png',
				subscription_count: 4503
			},
			{
				id: 2,
				name: 'gaming',
				profile_url: 'https://i.ruqqus.com/board/gaming/profile-2.png',
				subscription_count: 4500
			},
			{
				id: 3,
				name: 'politicalcompassmemes',
				profile_url: 'https://i.ruqqus.com/board/politicalcompassmemes/profile-7.png',
				subscription_count: 503
			},
			{
				id: 4,
				name: 'technology',
				profile_url: 'https://i.ruqqus.com/board/technology/profile-3.png',
				subscription_count: 1010
			}
			],
			itemsFollowing: [
			{
				id: 1,
				title: '[OC] The Upvooter',
				created_utc: 1621042047,
				author: {
					username: 'drakus_',
					profile_url: 'https://i.ruqqus.com/users/Drakus_/profile-7.png'
				}
			},
			{
				id: 2,
				title: 'Cap depreciation thread',
				created_utc: 1621042047,
				author: {
					username: 'RoyBatty',
					profile_url: 'https://i.ruqqus.com/uid/1ags/profile-4.png'
				}
			},
			{
				id: 3,
				title: 'ｔｈｅ💙ｉｄｅａｌｉｓｔ',
				created_utc: 1621042047,
				author: {
					username: 'BlackWindow',
					profile_url: 'https://i.ruqqus.com/users/BlackWindow/profile-2.png'
				}
			}
			]
		};
	},
	computed:{
		...mapState("persist", ["v", "isCard"]),
		...mapState("items", ["posts"]),
		feedIcon() {
			if (this.$route.name === 'HomeView') {
				return 'fa-home-lg-alt'
			} else if (this.$route.name === 'StargazedView') {
				return 'fa-stars'
			} else if (this.$route.name === 'TrendingView') {
				return 'fa-fire'
			} else {
				return 'fa-layer-group'
			}
		}
	},
	watch: {
		// call again the method if the route changes
		'$route': {
			handler() {
				this.loading = true;
				this.errored = false;
				this.getFeed()
			}
		}
	},
	components: {
		ItemList,
		//ItemListingTiny,
		ItemSort,
		ListingToggle,
		SidebarSection
	},
	methods: {
		getFeed() {
			let payload = {
				feed: this.$route.meta.title,
				params: this.params
			}
			this.$store.dispatch('items/fetchFeed', payload)
			.then(() => {
				console.log("getFeed dispatch successful")
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
	},
	created() {
		this.getFeed()
		//document.documentElement.style.setProperty('--color-primary', `139, 92, 246`)
	}
};
</script>
