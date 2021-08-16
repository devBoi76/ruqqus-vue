<template>
	<div class="flex flex-grow bg-cover bg-center bg-gray-900" :style="{ 'background-image': 'url(' + u.banner_url + ')' }">
		<vue-scroll>
			<div class="grid grid-cols-12 xl:grid-cols-8">
				<div class="col-span-full xl:col-start-2 xl:col-end-8 flex gap-6 md:p-4 xl:p-0">

					<!-- Main content section -->
					<div class="flex flex-col flex-grow bg-gray-900 bg-opacity-90">

						<!-- User Banner -->
						<div v-if="!loading && u && !u.is_banned" class="relative flex flex-col p-4 bg-cover bg-center" :style="{ 'background-image': 'url(' + u.banner_url + ')' }">
							<div v-show="u.banner_url" class="absolute w-full h-full left-0 bottom-0 bg-black bg-opacity-70"></div>
							<div class="flex flex-grow z-0">
								<div class="relative w-40 h-40 flex-shrink-0">
									<img :src="frame" class="absolute w-full h-full transform scale-120"/>
									<img class="w-full h-full object-cover rounded-sm" :src="u.profile_url" alt="user avatar"/>
								</div>
								<div class="mx-4 flex flex-col flex-grow space-y-3 py-1">
									<h1 class="h3 text-gray-100">
										{{ u.username }}
									</h1>
									<div v-if="u.bio_html" v-html="u.bio_html" class="text-gray-200 break-words"></div>
									<p v-else class="text-gray-400">
										No bio... a mysterious ruqqie they are.
									</p>
								</div>
								<div class="hidden lg:block flex-shrink-0 w-80 ml-auto">
									<div class="flex justify-around px-2 py-3 bg-black bg-opacity-30 rounded-sm">
										<div class="text-center">
											<div class="text-lg font-medium" :class="repStyle">
												{{ (u.post_rep + u.comment_rep).toLocaleString() }}
											</div>
											<div class="text-sm text-gray-300">Reputation</div>
										</div>
										<div class="text-center">
											<div class="text-lg font-medium text-gray-300">
												{{ this.convertBase(u.id, 36, 10) }}
											</div>
											<div class="text-sm text-gray-300">Member #</div>
										</div>
										<div class="text-center">
											<div class="text-lg font-medium text-gray-300">
												24
											</div>
											<div class="text-sm text-gray-300">Tipped</div>
										</div>
									</div>
									<div v-if="v" class="mt-3">
										<button v-if="v.username === u.username" class="button black" to="/settings">
											Edit Profile
										</button>
										<div v-if="v.username !== u.username && !u.is_private" class="flex space-x-2">
											<button  class="button black w-full">
												Follow
											</button>
											<button class="button black w-full">
												Send Message
											</button>
										</div>
									</div>
									<div class="hidden text-xl leading-6">
										<span class="text-gray-300">
											Reputation
										</span>
										<span :class="repStyle">
											{{ (u.post_rep + u.comment_rep).toLocaleString() }}
										</span>
									</div>
								</div>
							</div>
						</div>
						<!-- End User Banner -->

						<!-- Navigation and Content -->
						<div v-if="!loading" class="flex flex-col p-4">

							<!-- Tabs -->
							<div v-if="u && !u.is_banned" class="flex flex-shrink-0 w-full items-end h-12 px-4 bg-opacity-40 bg-black rounded-sm mb-4">
								<router-link v-for="tab in tabs" :key="tab.name" v-slot="{ href, navigate, isExactActive }" :to="tab.route">
									<a :href="href" @click="navigate" class="group">
										<div class="border-b-2 px-4 pb-3 capitalize" :class="isExactActive ? 'text-gray-100 border-gray-100' : 'text-gray-300 hover:text-gray-100 border-transparent'">
											{{ tab.name }}
											<span v-if="tab.counter" class="font-medium">
												{{ tab.counter.toLocaleString() }}
											</span>
										</div>
									</a>
								</router-link>
							</div>
							<!-- End Tabs -->

							<!-- Content -->
							<div class="flex gap-4">

								<keep-alive max=3 v-if="!u.is_private && !u.is_banned">
									<router-view :key="$route.fullPath"></router-view>
								</keep-alive>

								<div v-if="u.is_private" class="flex flex-grow items-center justify-center bg-black bg-opacity-40 rounded-sm">
									<div class="flex flex-col items-center">
										<i class="block fal fa-user-secret text-gray-500 text-4xl mb-5"></i>
										<div class="h5 text-gray-300">This account is private</div>
										<p class="text-sm text-gray-400">
											@{{ u.username }} has enabled private mode to cloak their posting history.
										</p>
									</div>
								</div>

								<div v-if="u.is_banned" class="flex flex-grow items-center justify-center bg-black bg-opacity-40 rounded-sm">
									<div class="flex flex-col items-center">
										<i class="block fal fa-user-slash text-red-500 text-4xl mb-5"></i>
										<div class="h5 text-gray-300">
											This account is {{ u.is_permanent_ban ? 'permanently banned' : 'temporarily suspended'}}
										</div>
										<p class="text-sm text-gray-400">
											@{{ u.username }} is {{ u.is_permanent_ban ? 'permanently banned' : 'temporarily suspended'}} for "{{ u.ban_reason }}"
										</p>
									</div>
								</div>

								<!-- Right sidebar -->
								<div v-if="!u.is_banned" class="hidden lg:block flex-shrink-0 w-80 space-y-4">
									<div class="bg-black bg-opacity-40 rounded-sm">
										<div class="px-4 py-3 text-lg leading-6 border-b border-black overflow-hidden">
											<span class="text-lg font-bold text-gray-300 capitalize">
												About
											</span>
											<span class="text-lg text-gray-400">
												{{ u.username }}
											</span>
										</div>
										<div class="px-4 py-3 space-y-4">
											<ul v-if="!u.is_banned" class="mb-0 space-y-2">
												<li class="flex items-center">
													<i class="far fa-birthday-cake fa-sm fa-fw text-gray-500 mr-2"></i>
													<span class="text-sm text-gray-400">
														Ruqqie for {{ getFormat(u.created_utc) }}
													</span>
												</li>
												<li class="flex md:hidden items-center">
													<i class="far fa-fire fa-sm fa-fw text-gray-500 mr-2"></i>
													<span class="text-sm text-gray-400">
														{{ (u.post_rep + u.comment_rep).toLocaleString() }} reputation
													</span>
												</li>
												<li v-if="u.followers" class="flex items-center">
													<i class="far fa-medal fa-sm fa-fw text-gray-500 mr-2"></i>
													<span class="text-sm text-gray-400">
														{{ u.followers === 1 ? `1 follower` : `${u.followers} followers`}}
													</span>
												</li>
												<li v-if="u.is_private" class="flex items-center">
													<i class="far fa-lock-alt fa-sm fa-fw text-orange-700 mr-2"></i>
													<span class="text-sm text-orange-700">
														Private
													</span>
												</li>
												<li v-if="u.over_18" class="flex items-center">
													<i class="far fa-eye-evil fa-sm fa-fw text-red-700 mr-2"></i>
													<span class="text-sm text-red-700">
														NSFW
													</span>
												</li>
											</ul>
										</div>
									</div>
									<div class="bg-black bg-opacity-40 rounded-sm">
										<div class="px-4 py-3 text-lg leading-6 border-b border-black overflow-hidden">
											<span class="text-lg font-bold text-gray-300 capitalize">
												Badges
											</span>
											<span class="text-lg text-gray-400 capitalize">
												{{ u.badges.length }}
											</span>
										</div>
										<div class="px-3 py-2">
											<div v-if="u.badges.length">
												<ul class="flex flex-wrap -mx-1 mb-0 overflow-hidden">
													<li v-for="badge in u.badges" :key="badge.name" class="my-2 px-2 w-1/5 overflow-hidden">
														<div class="h-11 w-11 flex items-center justify-center bg-white bg-opacity-05 hover:bg-opacity-10">
															<!--<img :src="badge.icon_url" class="w-6 h-6 object-cover" :alt="`${badge.name}-badge`"/>-->
															<img src="https://i.ibb.co/WDn4KZ7/Poggers.png" class="w-5 h-5 object-cover" :alt="`${badge.name}-badge`"/>
														</div>
													</li>
												</ul>
											</div>
											<p v-else class="text-gray-500">
												Badge collection is empty...
											</p>
										</div>
									</div>
									<div v-if="guilds.length" class="bg-black bg-opacity-40 rounded-sm">
										<div class="px-4 py-3 text-lg leading-6 border-b border-black overflow-hidden">
											<span class="text-lg font-bold text-gray-300 capitalize">
												Moderating
											</span>
											<span class="text-lg text-gray-400 capitalize">
												{{ guilds.length }}
											</span>
										</div>
										<div class="px-4 py-3">
											<ul class="mb-0 space-y-5">
												<li v-for="guild in guilds" :key="guild.id">
													<a href="https://github.com/ruqqus/ruqqus" class="group flex items-center">
														<img :src="guild.profile_url" class="w-8 h-8 rounded-sm object-cover"/>
														<div class="pl-3">
															<div class="text-sm text-gray-300 font-bold">
																+{{ guild.name }}
															</div>
															<p class="text-2xs text-gray-400 dark:text-white dark:text-opacity-65">
																{{ guild.subscription_count }}
																{{ guild.subscription_count === 1 ? 'member' : 'members' }}
															</p>
														</div>
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!-- Right sidebar -->

							</div>
							<!-- End User Content -->
						</div>
						<!-- End Navigation and Content -->

					</div>
					<!-- End Main Content -->

				</div>
			</div>
		</vue-scroll>
	</div>
</template>

<script>
// Import Components
//import axios from 'axios'

import { getAccount } from '../../api/Account.js';
import { mapState, mapActions } from 'vuex';

//import date-fns
import { isValid, formatDistanceToNowStrict } from '../../../node_modules/date-fns'

export default {
	name: "UserProfileView",
	components: {
	},
	data() {
		return {
			//bgImage: 'https://i.ibb.co/3kZ1vLp/wp2957583.jpg',
			frame: 'https://i.ibb.co/RCr1Rgh/c6a479fae8979bc9c1a02378e488e3ce06b52cb1.png',
			username: null,
			loading: true,
			errored: false,
			u: {},
			tabs: [
			{
				name: "overview",
				route: {
					name: 'user-profile-overview-view'
				},
			},
			{
				name: "posts",
				route: {
					name: 'user-profile-posts-view'
				},
				counter: 0
			},
			{
				name: "comments",
				route: {
					name: 'user-profile-comments-view'
				},
				counter: 0
			}
			],
			guilds: [
			{
				id: 1,
				name: 'technology',
				profile_url: 'https://i.ruqqus.com/board/technology/profile-3.png',
				subscription_count: 3302
			},
			{
				id: 2,
				name: 'aesthetic',
				profile_url: 'https://i.ruqqus.com/board/aesthetic/profile-3.png',
				subscription_count: 603
			},
			{
				id: 3,
				name: 'privacy',
				profile_url: 'https://i.ruqqus.com/board/privacy/profile-2.png',
				subscription_count: 2648
			}
			]
		};
	},
	computed: {
		...mapState("persist", ["v"]),
		repStyle() {
			const reputation = (this.u.post_rep + this.u.comment_rep);
			if (reputation >= 1000 && reputation < 10000) {
				return 'text-blue-500'
			} else if (reputation >= 10000 && reputation < 25000) {
				return 'text-orange-500'
			} else if (reputation >= 25000 && reputation < 50000) {
				return 'text-yellow-500'
			} else if (reputation >= 50000 && reputation < 100000) {
				return 'text-purple-500'
			} else if (reputation >= 100000) {
				return 'text-rainbow'
			} else {
				return 'text-gray-300'
			}
		}
	},
	watch: {
		'$route.params.username': ['getUser','getPosts'],
	},
	methods: {
		...mapActions("items", ["getItems"]),
		getAccountInfo() {
			let username = this.$route.params.username;

			getAccount(username)
			.then(response => {
				this.u = response.data
				if (!this.u.is_banned) {
					this.tabs[1].counter = this.u.post_count
					this.tabs[2].counter = this.u.comment_count
				}
			})
			.catch(error => {
				console.error(error)
				this.errored = true

			})
			.finally(() => this.loading = false)
		},
		// getPosts() {
		// 	let name = this.$route.params.username;
		// 	let page = this.$route.query.page || 1;
		// 	let sort = this.$route.query.sort || "hot";
		// 	let time = this.$route.query.t || "all";

		// 	let obj = {
		// 		type: "user",
		// 		url: `/api/vue/user/@${name}/listing?page=${page}&sort=${sort}&t=${time}`
		// 	}
		// 	this.getItems(obj)
		// },
		convertBase(str, fromBase, toBase) {
			const num = parseInt(str, fromBase)
			return num.toLocaleString(toBase)
		},
		getFormat(val) {
			const timestamp = val * 1000
			if (isValid(timestamp)) {
				return formatDistanceToNowStrict(new Date(timestamp))
			}
		}
	},
	created() {
		this.getAccountInfo()
	}
}
</script>

<style scoped>
.text-rainbow {
	animation: color-change 5s infinite ease-in-out;
}
@keyframes color-change {
	0% { @apply text-purple-500; }
	15% { @apply text-red-500; }
	30% { @apply text-yellow-500; }
	45% { @apply text-green-500; }
	60% { @apply text-teal-500; }
	75% { @apply text-blue-500; }
	100% { @apply text-purple-500; }
}
</style>
