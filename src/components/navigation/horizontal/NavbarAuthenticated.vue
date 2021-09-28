<template>
	<nav class="fixed w-full bg-white sm:border-b dark:bg-gray-800 dark:border-gray-700 dark:border-opacity-70 z-100">
		<div class="mx-auto px-4 md:px-6">
			<div class="flex items-center justify-between h-12 sm:h-14">
				<div class="flex flex-grow items-center">
					<img v-if="site.hasIcon" :src="site.icon" class="w-10 h-10 rounded-sm bg-white bg-opacity-20 mr-3" alt="Community icon"/>
					<div class="flex-shrink-0">
						<router-link to="/" class="font-semibold text-xl text-gray-900">
							{{ site.name }}
						</router-link>
					</div>
					<div class="hidden md:block w-1/3">
						<div class="ml-4 flex items-baseline space-x-4">
							<div class="relative">
								<Search/>
							</div>
						</div>
					</div>
				</div>
				<div class="hidden md:block">
					<div class="ml-4 flex items-center space-x-2 md:ml-6">

						<router-link to="/" tag="button" class="flex items-center justify-center px-2 w-8 h-8 text-xl text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-sm" content="Home" v-tippy="{ placement: 'bottom', delay: [1000,0] }">
							<span class="sr-only">Home</span>
							<i class="far fa-home-alt"></i>
						</router-link>

						<router-link to="/?sort=hot" tag="button" class="flex items-center justify-center px-2 w-8 h-8 text-xl text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-sm" content="Popular" v-tippy="{ placement: 'bottom', delay: [1000,0] }">
							<span class="sr-only">New</span>
							<i class="far fa-bolt"></i>
						</router-link>

						<router-link to="/admin" tag="button" class="flex items-center justify-center px-2 w-8 h-8 text-xl text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-sm" content="Admin tools" v-tippy="{ placement: 'bottom', delay: [1000,0] }">
							<span class="sr-only">View admin tools</span>
							<i class="far fa-shield"></i>
						</router-link>

						<!-- Notifications dropdown -->
						<keep-alive>
							<Notifications/>
						</keep-alive>

						<!-- Create dropdown -->
						<button class="flex items-center justify-center px-2 w-8 h-8 text-xl text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-sm" @click="createPost" content="Create a post" v-tippy="{ placement: 'bottom', delay: [1000,0] }">
							<span class="sr-only">Create new post</span>
							<i class="far fa-pen"></i>
						</button>

						<!-- Profile dropdown -->
						<Profile/>
					</div>
				</div>
				<div class="-mr-1 flex space-x-1 md:hidden">
					<!-- Search button -->
					<button class="inline-flex items-center justify-center p-1 text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" @click="searchDrawer">
						<span class="sr-only">Search</span>
						<!-- Menu Icon -->
						<i class="far fa-search fa-fw fa-lg"></i>
					</button>
					<!-- Create post button -->
					<router-link tag="button" class="inline-flex items-center justify-center p-1 text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" to="/create/post">
						<span class="sr-only">Create post</span>
						<!-- Menu Icon -->
						<i class="far fa-feather fa-fw fa-lg"></i>
					</router-link>
					<!-- Mobile menu button -->
					<button class="inline-flex items-center justify-center p-1 text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" @click="drawer">
						<span class="sr-only">Open main menu</span>
						<!-- Menu Icon -->
						<i class="far fa-bars fa-fw fa-lg"></i>
					</button>
				</div>
			</div>
		</div>

		<!-- Mobile Menu -->
		<transition enter-class="opacity-0" enter-active-class="ease-out transition-all duration-100" enter-to-class="opacity-200" leave-class="opacity-100" leave-active-class="ease-out transition-all duration-200" leave-to-class="opacity-0">
			<div @keydown.esc="isOpen = false" v-show="isOpen" class="z-10 fixed inset-0 transition-opacity">
				<div @click="isOpen = false" class="absolute inset-0 bg-gray-900 opacity-80" tabindex="0">
				</div>
			</div>
		</transition>
		<aside class="transform top-0 right-0 w-5/6 bg-white dark:bg-gray-800 fixed h-full py-3 overflow-y-auto ease-in-out transition-all duration-200 z-75" :class="isOpen ? 'translate-x-0' : 'translate-x-full'">
			<div class="absolute top-4 left-3">
				<button class="inline-flex items-center justify-center p-1 text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" @click="drawer">
					<span class="sr-only">Close menu</span>
					<!-- Menu Icon -->
					<i class="far fa-long-arrow-left fa-fw fa-lg"></i>
				</button>
			</div>
			<div class="flex flex-col items-center text-center px-6 py-2">
				<router-link @click="isOpen = false" :to="`/${v.username}`">
					<img class="w-16 h-16 object-cover rounded-sm" :src="v.profile_url" alt="user avatar"/>
				</router-link>
				<div class="truncate mt-2">
					<router-link @click="isOpen = false" :to="`/${v.username}`" class="text-xl font-bold leading-5 text-gray-900 dark:text-gray-200">
						{{ v.username }}
					</router-link>
					<ul class="flex items-center space-x-2 mt-1 mb-0 text-xs text-gray-500 dark:text-gray-400">
						<li>
							503 followers
						</li>
						<li>
							<span class="font-hairline">
								|
							</span>
						</li>
						<li>
							{{ v.post_rep + v.comment_rep }} Reputation
						</li>
					</ul>
				</div>
			</div>
			<hr class="my-2 dark:border-gray-700 dark:border-opacity-70">
			<router-link to="/inbox" class="block px-4 py-2 text-lg text-gray-700 dark:text-gray-200" @click="isOpen = false">
				<i class="far fa-envelope text-center fa-fw mr-3"></i><span>Inbox</span>
			</router-link>
			<router-link to="/following" class="block px-4 py-2 text-lg text-gray-700 dark:text-gray-200" @click="isOpen = false">
				<i class="far fa-user text-center fa-fw mr-3"></i><span>Following</span>
			</router-link>
			<router-link to="/guilds" class="block px-4 py-2 text-lg text-gray-700 dark:text-gray-200" @click="isOpen = false">
				<i class="far fa-users-crown text-center fa-fw mr-3"></i><span>Guilds</span>
			</router-link>
			<router-link to="/saved" class="block px-4 py-2 text-lg text-gray-700 dark:text-gray-200" @click="isOpen = false">
				<i class="far fa-bookmark text-center fa-fw mr-3"></i><span>Saved</span>
			</router-link>
			<router-link to="/settings" class="block px-4 py-2 text-lg text-gray-700 dark:text-gray-200" @click="isOpen = false">
				<i class="far fa-cog text-center fa-fw mr-3"></i><span>My Account</span>
			</router-link>
			<router-link to="/mod" class="block px-4 py-2 text-lg text-gray-700 dark:text-gray-200" @click="isOpen = false">
				<i class="far fa-crown text-center fa-fw mr-3"></i><span>Moderation</span>
			</router-link>
			<!-- <div class="hidden items-center px-4 py-2 text-lg text-gray-700 dark:text-gray-200">
				<i class="far fa-signal-stream text-center fa-fw mr-3" :class="{'text-green-500':online}"></i><span>Appear Online</span>
				<t-toggle v-model="online" variant="success" class="ml-auto"/>
			</div> -->
			<button class="flex items-center px-4 py-2 text-lg text-gray-700 dark:text-gray-200" @click="dark = !dark">
				<i class="far text-center fa-fw mr-3" :class="dark ? 'fa-sunglasses' : 'fa-moon'"></i>
				<span>{{ dark ? 'Light Theme' : 'Dark Theme'}}</span>
			</button>
			<hr class="my-2 dark:border-gray-700 dark:border-opacity-70">
			<router-link to="#" class="block px-4 py-2 text-lg text-red-500" role="menuitem" @click="isOpen = false">
				<i class="far fa-sign-out fa-rotate-180 text-center fa-fw mr-3"></i><span>Sign Out</span>
			</router-link>
		</aside>

		<!-- Search Menu -->
		<transition enter-class="opacity-0" enter-active-class="ease-out transition-all duration-100" enter-to-class="opacity-200" leave-class="opacity-100" leave-active-class="ease-out transition-all duration-200" leave-to-class="opacity-0">
			<div @keydown.esc="isSearch = false" v-show="isSearch" class="z-10 fixed inset-0 transition-opacity">
				<div @click="isSearch = false" class="absolute inset-0 bg-gray-900 opacity-80" tabindex="0">
				</div>
			</div>
		</transition>
		<aside class="transform top-0 right-0 w-full bg-white dark:bg-gray-800 fixed h-full p-3 overflow-y-auto ease-in-out transition-all duration-200 z-75" :class="isSearch ? 'translate-x-0' : 'translate-x-full'">
			<div class="flex items-center space-x-3">
				<button class="inline-flex items-center justify-center p-1 text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" @click="searchDrawer">
					<span class="sr-only">Close search menu</span>
					<!-- Menu Icon -->
					<i class="far fa-long-arrow-left fa-fw fa-lg"></i>
				</button>
				<input class="form-input light" v-model="searchTerm" placeholder="Search Ruqqus..." @keyup.enter="search(); searchDrawer()"/>
			</div>
		</aside>
	</nav>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import Notifications from "@/components/dropdowns/navbar/Notifications.vue";
	import Profile from "@/components/dropdowns/navbar/Profile.vue";
	import Search from "@/components/popovers/PopoverSearch.vue";

	export default {
		name: "Navbar",
		components: {
			Notifications,
			Profile,
			Search
		},
		data() {
			return {
				online: false,
				searchTerm: this.$route.query.q,
				notifications: [1,2,3],
				isOpen: false,
				isSearch: false
			}
		},
		computed: {
			...mapState("persist", ["v", "darkMode"]),
			site() {
				return this.$store.getters['site/getSite'];
			},
			loginOrRegister() {
				return this.$route.name == 'LoginView' || this.$route.name == 'RegisterView'
			},
			dark: {
				get () {
					return this.darkMode
				},
				set (value) {
					this.$store.dispatch('persist/toggle_dark', value)
				}
			}
		},
		watch: {
			isOpen: {
				immediate: true,
				handler(isOpen) {
					if (isOpen) document.body.style.setProperty("overflow", "hidden");
					else document.body.style.removeProperty("overflow");
				}
			},
			isSearch: {
				immediate: true,
				handler(isSearch) {
					if (isSearch) document.body.style.setProperty("overflow", "hidden");
					else document.body.style.removeProperty("overflow");
				}
			}
		},
		methods: {
			...mapActions("persist", ["logout"]),
			createPost() {
				if (this.$route.path.startsWith === '/+') {
					this.$store.commit('create/TOGGLE_POST_CREATION_MODAL', {show: true})
				} else {
					this.$router.push('/create/post')
				}
			},
			search() {
				this.$router.push("/search?q="+this.searchTerm);
			},
			drawer() {
				this.isOpen = !this.isOpen;
			},
			searchDrawer() {
				this.isSearch = !this.isSearch;
			}
		},
		mounted() {
			document.addEventListener("keydown", e => {
				if (e.keyCode == 27 && this.isOpen) this.isOpen = false;
				if (e.keyCode == 27 && this.isSearch) this.isSearch = false;
			});
			window.addEventListener('popstate', () => {
				if (this.isOpen) this.isOpen = false, this.$router.go(1);
				if (this.isSearch) this.isSearch = false, this.$router.go(1);
			})
		}
	}
</script>
