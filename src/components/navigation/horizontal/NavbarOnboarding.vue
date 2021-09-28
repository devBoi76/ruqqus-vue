	<template>
		<nav class="fixed w-full bg-white sm:border-b dark:bg-gray-800 dark:shadow z-10">
			<div class="mx-auto px-4 md:px-6">
				<div class="flex items-center justify-between h-14">
					<div class="flex flex-grow items-center">
						<div class="flex-shrink-0">
							<span class="font-semibold text-xl text-gray-900" @click.once="clicked = true">
								{{ site.name }}
							</span>
						</div>
					</div>
					<!-- <div v-show="clicked" class="flex-grow-1">
						<i class="far fa-lock-alt fa-sm text-gray-400 pr-2"></i>
						<span class="text-gray-400 text-xs">You must complete the walkthrough before entering Ruqqus.</span>
					</div> -->
					<div class="-mr-2 flex md:hidden">
						<!-- Mobile menu button -->
						<button class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
							<span class="sr-only">Open main menu</span>
						<!--
							Heroicon name: menu

							Menu open: "hidden", Menu closed: "block"
						-->
						<svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
						<!--
							Heroicon name: x

							Menu open: "block", Menu closed: "hidden"
						-->
						<svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			</div>
		</div>

		<!--
			Mobile menu, toggle classes based on menu state.

			Open: "block", closed: "hidden"
		-->
		<div class="hidden md:hidden">
			<div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
				<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
				<a href="#" class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-bold">Dashboard</a>

				<a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-bold">Team</a>

				<a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-bold">Projects</a>

				<a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-bold">Calendar</a>

				<a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-bold">Reports</a>
			</div>
			<div class="pt-4 pb-3 border-t border-gray-700">
				<div class="flex items-center px-5">
					<div class="flex-shrink-0">
						<img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
					</div>
					<div class="ml-3">
						<div class="text-base font-bold leading-none text-white">Tom Cook</div>
						<div class="text-sm font-bold leading-none text-gray-400">tom@example.com</div>
					</div>
					<button class="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
						<span class="sr-only">View notifications</span>
						<!-- Heroicon name: bell -->
						<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
						</svg>
					</button>
				</div>
				<div class="mt-3 px-2 space-y-1">
					<a href="#" class="block px-3 py-2 rounded-md text-base font-bold text-gray-400 hover:text-white hover:bg-gray-700">Your Profile</a>

					<a href="#" class="block px-3 py-2 rounded-md text-base font-bold text-gray-400 hover:text-white hover:bg-gray-700">Settings</a>

					<a href="#" class="block px-3 py-2 rounded-md text-base font-bold text-gray-400 hover:text-white hover:bg-gray-700">Sign out</a>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	export default {
		name: "Navbar",
		components: {},
		data() {
			return {
				clicked: false,
				notifications: [],
			};
		},
		computed: {
			...mapState("persist", ["v"]),
			site() {
				return this.$store.getters['site/getSite'];
			}
		},
		methods: {
			...mapActions("persist", ["logout"]),
		}
	};
</script>

<style scoped>
.navbar {
	height: 55px;
}
.notifications-badge {
	position: absolute!important;
	top: -4px!important;
	right: -8px!important;
}
::v-deep .navbar-expand-lg .navbar-nav .dropdown-menu {
	left: -8rem;
}
</style>
