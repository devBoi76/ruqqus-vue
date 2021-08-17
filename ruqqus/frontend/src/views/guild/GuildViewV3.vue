<template>
	<div class="w-full overflow-y-auto">
		<div class="grid grid-cols-12 xl:grid-cols-10 bg-white dark:bg-gray-800">

			<!-- Desktop Banner skeleton -->
			<div v-show="loading" class="col-span-full hidden md:block">
				<div class="relative flex items-end w-full h-56 bg-white dark:bg-gray-800">
					<div class="z-0 grid grid-cols-12 w-full">
						<div class="col-span-full 2xl:col-start-2 2xl:col-end-10">
							<div class="flex items-center animate-pulse p-6">
								<div class="w-20 h-20 rounded-sm bg-gray-100 dark:bg-white dark:bg-opacity-10 flex-shrink-0"></div>
								<div class="ml-5 w-44 h-5 bg-gray-100 dark:bg-white dark:bg-opacity-10 rounded-sm"></div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Desktop Banner -->
			<div v-if="!loading" class="col-span-full hidden md:block">
				<div class="relative flex items-end w-full h-56 bg-center bg-cover" :style="{ 'background-image': 'url(' + g.banner_url + ')' }">
					<div class="absolute w-full h-full bg-gradient-to-t from-black to-transaprent opacity-40"></div>
					<div class="grid grid-cols-12 w-full z-0">
						<div class="col-span-full 2xl:col-start-2 2xl:col-end-10">
							<div class="flex items-center p-6">
								<router-link :to="`/+${g.name}`" class="flex justify-center items-center bg-white rounded p-1">
									<img :src="g.profile_url" class="w-20 h-20 object-cover rounded-sm">
								</router-link>
								<div class="ml-4">
									<h1 class="sr-only">
										{{ g.name }}
									</h1>
									<router-link :to="`/+${g.name}`" class="block h3 text-white">
										{{ g.name }}
									</router-link>
									<router-link :to="`/+${g.name}`" class="block text-sm text-white font-medium hover:underline">
										ruqqus.com/+{{ g.name }}
									</router-link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Mobile Banner -->
			<div v-if="!loading" class="col-span-full md:hidden">
				<div class="relative flex items-end w-full bg-center bg-cover" :class="isThread ? 'h-32' : 'h-44'" :style="{'background-image': 'url(' + g.banner_url + ')'}">
					<div class="absolute w-full h-full bg-gradient-to-b from-black via-transparent to-transaprent opacity-60">
					</div>
					<div class="absolute top-2.5 px-2.5 flex items-center w-full">
						<router-link v-if="isThread" :to="`/+${$route.params.name}`" class="text-white font-bold truncate">
							<i class="far fa-long-arrow-left fa-lg pr-2"></i>
							{{ g.name }}
						</router-link>
						<div v-show="!isThread" class="flex flex-shrink-0 items-center space-x-2.5 ml-auto">
							<button class="button outlineWhite">
								New post
							</button>
							<button class="button white">
								Join
							</button>
						</div>
					</div>
				</div>
				<div class="relative w-full -mt-16 mb-6 px-4 overflow-hidden">
					<div class="flex flex-col items-center">
						<router-link :to="`/+${g.name}`" class="flex justify-center items-center bg-white dark:bg-gray-800 rounded-md p-1" :class="{'mb-2':!isThread}">
							<img :src="g.profile_url" class="object-cover rounded" :class="isThread ? 'w-20 h-20' : 'w-24 h-24'"/>
						</router-link>
						<div v-show="!isThread" class="w-full text-center">
							<h1 class="sr-only">
								{{ g.name }}
							</h1>
							<router-link :to="`/+${g.name}`" class="block h3 text-gray-900 dark:text-gray-100">
								{{ g.name }}
							</router-link>
							<p class="text-sm text-gray-500 mt-1">
								{{ g.subscriber_count === 1 ? '1 member' : `${Number(g.subscriber_count).toLocaleString()} members` }}
							</p>
							<div class="hidden space-x-2">
								<button class="button outlinePrimary w-full" :to="`/submit?g=${$route.params.name}`">
									Create post
								</button>
								<button class="button primary w-full">
									Join
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>

		<!-- Tabs skeleton -->
		<div class="hidden md:block" v-show="loading">
			<div class="grid grid-cols-12 gap-4 bg-white border-b dark:bg-gray-800 dark:border-0">
				<div class="col-span-full 2xl:col-start-2 2xl:col-end-10">
					<div class="flex items-center animate-pulse sm:px-6">
						<div class="flex w-full items-center space-x-4 h-14">
							<div class="w-16 h-4 bg-gray-100 dark:bg-white dark:bg-opacity-10 rounded-sm"></div>
							<div class="w-16 h-4 bg-gray-100 dark:bg-white dark:bg-opacity-10 rounded-sm"></div>
							<div class="w-20 h-4 bg-gray-100 dark:bg-white dark:bg-opacity-10 rounded-sm"></div>
							<div class="w-20 h-4 bg-gray-100 dark:bg-white dark:bg-opacity-10 rounded-sm"></div>
							<div class="w-20 h-4 bg-gray-100 dark:bg-white dark:bg-opacity-10 rounded-sm"></div>
						</div>
						<div class="flex items-center space-x-2">
							<span class="w-28 h-8 bg-gray-100 dark:bg-white dark:bg-opacity-10 rounded-sm"></span>
							<span class="w-20 h-8 bg-gray-100 dark:bg-white dark:bg-opacity-10 rounded-sm"></span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Tabs -->
		<div v-if="!loading" :class="{'hidden sm:block':isThread}">
			<!-- Tabs (Compact View) -->
			<div class="grid grid-cols-12 gap-4 bg-white sm:bg-gray-100 sm:border-b dark:bg-gray-800 dark:border-0 mb-4 sm:mb-0">
				<div class="col-span-full 2xl:col-start-2 2xl:col-end-10 z-50">
					<div class="flex items-center overflow-x-auto sm:overflow-visible scrollbar-hidden sm:px-6">
						<div class="flex flex-grow items-end space-x-4 sm:h-14">
							<router-link v-slot="{ href, navigate, isExactActive }" :to="`/+${g.name}`">
								<a :href="href" @click="navigate" class="flex-shrink-0 group text-center">
									<div class="border-b-2 px-4 sm:px-3 pb-4 font-medium" :class="isExactActive ? 'text-gray-900 dark:text-gray-200 border-primary' : 'border-transparent text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'">
										<div class="leading-tight">
											Posts
										</div>
									</div>
								</a>
							</router-link>
							<router-link v-slot="{ href, navigate, isExactActive }" :to="`/+${g.name}/about`">
								<a :href="href" @click="navigate" class="flex-shrink-0 group text-center">
									<div class="border-b-2 px-4 sm:px-3 pb-4 font-medium" :class="isExactActive ? 'text-gray-900 dark:text-gray-200 border-primary' : 'border-transparent text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'">
										<div class="leading-tight">
											About
										</div>
									</div>
								</a>
							</router-link>
							<router-link v-slot="{ href, navigate, isExactActive }" :to="`/+${g.name}/members`">
								<a :href="href" @click="navigate" class="flex-shrink-0 group text-center">
									<div class="border-b-2 px-4 sm:px-3 pb-4 font-medium" :class="isExactActive ? 'text-gray-900 dark:text-gray-200 border-primary' : 'border-transparent text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'">
										<div class="leading-tight">
											Members
											<span class="hidden sm:inline-block font-medium">
												{{ g.subscriber_count || 0 }}
											</span>
										</div>
									</div>
								</a>
							</router-link>
							<router-link v-slot="{ href, navigate, isExactActive }" :to="`/+${g.name}/logs`">
								<a :href="href" @click="navigate" class="flex-shrink-0 group text-center">
									<div class="border-b-2 px-4 sm:px-3 pb-4 font-medium" :class="isExactActive ? 'text-gray-900 dark:text-gray-200 border-primary' : 'border-transparent text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'">
										<div class="leading-tight">
											Audit Log
										</div>
									</div>
								</a>
							</router-link>
							<router-link v-slot="{ href, navigate, isExactActive }" :to="`/+${g.name}/saved`">
								<a :href="href" @click="navigate" class="flex-shrink-0 group text-center">
									<div class="border-b-2 px-4 m:px-3 pb-4 font-medium" :class="isExactActive ? 'text-gray-900 dark:text-gray-200 border-primary' : 'border-transparent text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'">
										<div class="leading-tight">
											Saved
											<span class="hidden sm:inline-block font-medium">
												{{ g.saved || 24 }}
											</span>
										</div>
									</div>
								</a>
							</router-link>
						</div>
						<div class="hidden lg:flex flex-shrink-0 items-center space-x-2">
							<Options/>
							<button class="button outlinePrimary" :to="`/submit?g=${$route.params.name}`">
								Create post
							</button>
							<button class="button primary">
								Join +{{ g.name }}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Section beneath banner -->
		<div class="relative grid grid-cols-12" :class="{ 'xl:grid-cols-10':narrow }">
			<!-- Background art and style -->
			<div v-if="backgroundImage && !loading" class="absolute w-full h-full bg-cover bg-center" :style="bgStyle"/>
			<!-- Render guild sections: posts, about, members, etc -->
			<div class="relative col-span-full flex gap-6 sm:p-6" :class="{'xl:col-start-2 xl:col-end-10':narrow}">
				<div class="w-full">
					<keep-alive max=5>
						<router-view :key="$route.fullPath"></router-view>
					</keep-alive>
				</div>
				<!-- Right sidebar skeleton -->
				<div v-if="loading" class="hidden xl:block flex-shrink-0 w-80 space-y-4">
					<div class="rounded-sm bg-white dark:bg-gray-800">
						<div class="flex flex-col w-full px-3 py-4 animate-pulse">
							<div class="flex flex-col w-full space-y-2 mb-8">
								<div class="w-full h-4 bg-gray-100 dark:bg-white dark:bg-opacity-10 rounded-sm"></div>
							</div>
							<div class="space-y-2 mb-10">
								<div class="w-full h-3 bg-gray-100 dark:bg-white dark:bg-opacity-10 rounded-sm"></div>
								<div class="w-3/4 h-3 bg-gray-100 dark:bg-white dark:bg-opacity-10 rounded-sm"></div>
							</div>
							<div class="space-y-2">
								<div class="w-1/3 h-3 bg-gray-100 dark:bg-white dark:bg-opacity-10 rounded-sm"></div>
								<div class="w-2/4 h-3 bg-gray-100 dark:bg-white dark:bg-opacity-10 rounded-sm"></div>
							</div>
						</div>
					</div>
				</div>
				<!-- Right sidebar -->
				<div v-if="!loading" class="hidden lg:block flex-shrink-0 w-80 space-y-4">
					<div class="shadow-xs rounded-sm bg-white dark:bg-gray-800">
						<div class="flex items-center px-3 py-4 border-b dark:border-gray-700 dark:border-opacity-70">
							<div class="text-lg font-bold capitalize leading-5 dark:text-gray-200">About Guild</div>
						</div>
						<div class="p-4 space-y-4">
							<div v-html="g.description_html" class="dark:text-gray-200 break-words"></div>
							<ul class="space-y-2">
								<li class="flex items-center">
									<i class="far fa-tag fa-sm fa-fw text-gray-500 mr-2"></i>
									<span class="text-sm text-gray-500">
										{{ g.category || 'no tags...' }}
									</span>
								</li>
								<li class="flex items-center">
									<i class="far fa-birthday-cake fa-sm fa-fw text-gray-500 mr-2"></i>
									<span class="text-sm text-gray-500">
										{{ g.created_date }}
									</span>
								</li>
								<li v-if="g.is_private" class="flex items-center">
									<i class="far fa-lock-alt fa-sm fa-fw text-orange-500 mr-2"></i>
									<span class="text-sm text-orange-500">
										Private
									</span>
								</li>
								<li v-if="g.over_18" class="flex items-center">
									<i class="far fa-eye-evil fa-sm fa-fw text-red-500 mr-2"></i>
									<span class="text-sm text-red-500">
										NSFW
									</span>
								</li>
							</ul>
							<div class="flex justify-around bg-gray-100 dark:bg-gray-900 px-2 py-3 rounded-sm">
								<div class="text-center">
									<div class="text-sm text-gray-500 dark:text-gray-500">Members</div>
									<div class="text-lg font-medium text-gray-700 dark:text-gray-200">
										{{ Number(g.subscriber_count).toLocaleString() }}
									</div>
								</div>
								<div class="text-center">
									<div class="text-sm text-gray-500 dark:text-gray-500">Posts</div>
									<div class="text-lg font-medium text-gray-700 dark:text-gray-200">
										503
									</div>
								</div>

								<div class="text-center">
									<div class="text-sm text-gray-500 dark:text-gray-500">Tipped</div>
									<div class="text-lg font-medium text-gray-700 dark:text-gray-200">
										24
									</div>
								</div>
							</div>
							<div>
								<button class="button outlinePrimary w-full" :to="`/submit?g=${$route.params.name}`">
									Create post
								</button>
								<button class="button primary w-full mt-2">
									Join +{{ g.name }}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<LoaderScreen :loading="loading"/>
	</div>
</template>

<script>
// Import Components
import LoaderScreen from '@/components/empty-state/LoaderScreen.vue'

import { mapState } from 'vuex';
//const ItemListingTiny = () => import('@/components/item/ItemListingTiny.vue')

export default {
	name: "guild-view",
	components: {
		LoaderScreen
		//ItemListingTiny
	},
	data() {
		return {
			expanded: false,
			//backgroundImage: 'https://i.ibb.co/C2vFBC4/background-Image-07ohpzlgp8j01.png',
			view: {
				atTopOfPage: true
			},
			loading: true,
			errored: false,
			tabs: [
			{
				name: "posts",
				route: {
					name: 'user-profile-overview-view'
				},
			},
			{
				name: "about",
				route: {
					name: 'user-profile-posts-view'
				}
			},
			{
				name: "members",
				route: {
					name: 'user-profile-comments-view'
				},
				counter: 0
			},
			{
				name: "audit log",
				route: {
					name: 'user-profile-comments-view'
				}
			},
			{
				name: "saved",
				route: {
					name: 'user-profile-comments-view'
				},
				counter: 0
			}
			],
		};
	},
	computed:{
		...mapState("persist", ["isCard"]),
		g() {
			return this.$store.getters['guild/getGuild'](this.$route.params.name);
		},
		isThread() {
			return this.$route.name === 'guild-item-view'
		},
		narrow() {
			if (this.isThread) {
				return false
			} else if (this.isCard) {
				return true
			} else {
				return false
			}
		},
		bgStyle() {
			return {
				background: `url(${this.backgroundImage}) no-repeat center center fixed`,
			}
		}
	},
	watch: {
		'$route.params.name': { // get guild info and posts if guild changes
			handler() {
				if (this.g == null) {
					this.loading = true;
					this.errored = false;
					this.getGuildInfo()
				} else {
					document.documentElement.style.setProperty('--color-primary', this.g.rgb)
					this.loading = false;
				}
			},
			immediate: true
		}
	},
	methods: {
		getGuildInfo() {
			let guild = this.$route.params.name
			this.$store.dispatch('guild/fetchGuild', guild)
			.then(() => {
				console.log("getGuild dispatch successful")
			})
			.catch(error => {
				console.error(error)
				this.errored = true

			})
			.finally(() => this.loading = false)
		},
		// scrollToTop() {
		// 	this.$refs["vs"].scrollTo(
		// 	{
		// 		y: 0
		// 	},
		// 	400,
		// 	"easeInQuad"
		// 	);
		// },
		// handleScroll() {
		// 	const { scrollTop, scrollLeft } = this.$refs["vs"].getPosition(); // when the user scrolls, check the pageYOffset
		// 	if (scrollTop > 256) { // user is scrolled
		// 		if (this.view.atTopOfPage) {
		// 			this.view.atTopOfPage = false
		// 		}
		// 	} else {
		// 		if (!this.view.atTopOfPage) { // user is at top of page
		// 			this.view.atTopOfPage = true
		// 		}
		// 	}
		// 	return scrollLeft
		// }
	}
}
</script>

<style scoped>
.mask-overlay {
	-webkit-mask-image: linear-gradient(180deg,#000 65%,transparent);
	mask-image: linear-gradient(180deg,#000 65%,transparent);
}
</style>
