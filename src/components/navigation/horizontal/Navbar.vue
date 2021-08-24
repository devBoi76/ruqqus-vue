<template>
	<nav class="fixed w-full bg-white sm:border-b dark:bg-gray-800 dark:border-gray-700 dark:border-opacity-70 z-100"">
		<div class="mx-auto px-4">
			<div class="flex items-center justify-between h-12 sm:h-14">
				<div class="flex flex-grow items-center">
					<div class="flex-shrink-0">
						<router-link to="/" class="font-bold text-xl text-purple-500 tracking-wide">ruqqus</router-link>
					</div>
					<div class="hidden md:block w-1/3">
						<div class="ml-4 flex items-baseline space-x-4">
							<div class="relative">
								<Search/>
							</div>
						</div>
					</div>
				</div>
				<div class="hidden md:flex space-x-2">
					<router-link to="/login" custom v-slot="{ navigate }">
						<button class="button outlinePrimary" @click="navigate" @keypress.enter="navigate" role="link">
							Log in
						</button>
					</router-link>
					<router-link to="/register" custom v-slot="{ navigate }">
						<button class="button primary" @click="navigate" @keypress.enter="navigate" role="link">
							Sign up
						</button>
					</router-link>
				</div>
				<div class="-mr-1 flex space-x-1 md:hidden">
					<!-- Search button -->
					<button class="inline-flex items-center justify-center p-1 text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" @click="searchDrawer">
						<span class="sr-only">Search</span>
						<!-- Menu Icon -->
						<i class="far fa-search fa-fw fa-lg"></i>
					</button>
					<!-- Mobile menu button -->
					<button class="inline-flex items-center justify-center p-1 text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" @click="drawer">
						<span class="sr-only">Open main menu</span>
						<!-- Menu Icon -->
						<i class="far fa-bars fa-fw fa-lg"></i>
					</button>
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
					<button class="button outlinePrimary">
						Log in
					</button>
					<button class="button primary mt-2">
						Sign up
					</button>
					<router-link to="/following" class="block px-4 py-2 text-lg text-gray-700 dark:text-gray-200" @click="isOpen = false">
						<i class="far fa-user text-center fa-fw mr-3"></i><span>About</span>
					</router-link>
					<router-link to="/guilds" class="block px-4 py-2 text-lg text-gray-700 dark:text-gray-200" @click="isOpen = false">
						<i class="far fa-users-crown text-center fa-fw mr-3"></i><span>Rules</span>
					</router-link>
					<router-link to="/saved" class="block px-4 py-2 text-lg text-gray-700 dark:text-gray-200" @click="isOpen = false">
						<i class="far fa-bookmark text-center fa-fw mr-3"></i><span>Source Code</span>
					</router-link>
					<router-link to="/settings" class="block px-4 py-2 text-lg text-gray-700 dark:text-gray-200" @click="isOpen = false">
						<i class="far fa-cog text-center fa-fw mr-3"></i><span>Discord</span>
					</router-link>
					<button class="flex items-center px-4 py-2 text-lg text-gray-700 dark:text-gray-200" @click="dark = !dark">
						<i class="far text-center fa-fw mr-3" :class="dark ? 'fa-sunglasses' : 'fa-moon'"></i>
						<span>{{ dark ? 'Light Theme' : 'Dark Theme'}}</span>
					</button>
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
						<input class="form-input" v-model="searchTerm" placeholder="Search Ruqqus..." @keyup.enter="search(); searchDrawer()"/>
					</div>
				</aside>
			</div>
		</div>
	</nav>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	import Search from "@/components/popovers/PopoverSearch.vue";

	export default {
		name: "Navbar",
		components: {
			Search
		},
		data() {
			return {
				searchTerm: this.$route.query.q,
				isOpen: false,
				isSearch: false
			};
		},
		computed: {
			...mapState("persist", ["v"]),
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
	};
</script>
