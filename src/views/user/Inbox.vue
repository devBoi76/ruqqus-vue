<template>
	<div class="w-full overflow-y-auto">
		<div class="grid grid-cols-12 xl:grid-cols-10">
			<div class="col-span-full xl:col-start-3 xl:col-end-9 flex flex-col gap-4 sm:p-6 my-4 sm:my-0">
				<div class="px-4 sm:px-0">
					<h1 class="h3 font-semibold mb-0">
						Notifications
					</h1>
				</div>
				<!-- Main Content Section -->
				<div class="border-t border-b border-gray-100 dark:border-transparent sm:border sm:border-gray-200 sm:rounded-sm bg-white">
					<!-- Tabs -->
					<div class="flex flex-shrink-0 w-full items-end px-4 border-b dark:border-white dark:border-opacity-10 dark:bg-gray-700">
						<router-link v-for="tab in tabs" :key="tab.name" v-slot="{ href, navigate, isExactActive }" :to="tab.route">
							<a :href="href" @click="navigate" class="group">
								<div class="border-b-2 px-4 py-3 text-sm font-semibold leading-tight capitalize" :class="isExactActive ? 'text-gray-900 border-purple-500' : 'text-gray-400 hover:text-gray-500 border-transparent'">
									{{ tab.name }}
								</div>
							</a>
						</router-link>
					</div>
					<!-- Inbox -->
					<!-- Loading state -->
					<div v-show="loading" class="space-y-5 py-4">
						<div v-for="i in 5" :key="i" class="flex w-full px-4 space-x-3 animate-pulse">
							<div class="rounded-sm bg-gray-100 dark:bg-white dark:bg-opacity-20 w-8 h-8"></div>
							<div class="rounded-sm bg-gray-100 dark:bg-white dark:bg-opacity-20 h-8 flex-grow"></div>
						</div>
					</div>
					<!-- Errored state -->
					<div v-show="errored">
						<div class="flex flex-col items-center text-center w-full p-12">
							<i class="block fad fa-ghost text-gray-400 text-4xl mb-5"></i>
							<div class="h5">Unable to Load Notifications</div>
							<p class="text-sm text-gray-400">
								Sorry, we're unable to fetch your notifications right now.
							</p>
							<button class="button outlineGray200 mt-3" @click="getNotifications()">
								Try again
							</button>
						</div>
					</div>
					<NotificationList v-if="notifications.length" :notifications="notifications"/>
					<!-- Empty state -->
					<div v-show="!loading && !errored" v-else class="flex flex-col items-center p-12">
						<i class="block fad fa-bell text-gray-400 text-4xl mb-5"></i>
						<div class="h5">No Unread Notifications</div>
						<p class="text-sm text-gray-400">You're all caught up! Time for a coffee break? 🧙</p>
						<button class="button outlinePurple500 mt-3">
							View all
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// Import Components
import { defineAsyncComponent } from 'vue'
import axios from 'axios'

const NotificationList = defineAsyncComponent(() => import('@/components/notifications/NotificationList.vue'));

import { mapState } from 'vuex';

export default {
	name: "UserFriendsView",
	components: {
		NotificationList
	},
	props: {
		sort: String
	},
	data() {
		return {
			loading: true,
			errored: false,
			notifications: [],
			tabs: [
			{
				name: "all",
				route: {
					path: '/notifications'
				},
				exact: true,
				icon: 'fas fa-crown',
				color: 'blue-500',
				description: 'Manage how you receive notifications across Ruqqus.'
			},
			{
				name: "unread",
				route: {
					path: '/notifications/unread'
				},
				exact: true,
				icon: 'fas fa-chess-rook',
				color: 'gray-300',
				description: 'Manage your public profile.'
			},
			{
				name: "posts",
				route: {
					path: '/notifications/posts'
				},
				exact: true,
				icon: 'fas fa-file',
				color: 'gray-300',
				description: 'Manage your public profile.'
			},
			{
				name: "replies",
				route: {
					path: '/notifications/replies'
				},
				exact: true,
				icon: 'fas fa-eye-slash',
				color: 'red-500',
				description: 'Configure your email, password, and more.'
			},
			{
				name: "mentions",
				route: {
					path: '/notifications/mentions'
				},
				exact: true,
				icon: 'fas fa-eye-slash',
				color: 'red-500',
				description: 'Configure your email, password, and more.'
			}
			// {
			// 	name: "system",
			// 	route: {
			// 		path: '/notifications/system'
			// 	},
			// 	exact: true,
			// 	icon: 'fas fa-eye-slash',
			// 	color: 'red-500',
			// 	description: 'Configure your email, password, and more.'
			// }
			]
		}
	},
	computed: {
		...mapState("persist", ["v"])
	},
	watch: {
		// call again the method if the route changes
		sort: function () {
			this.getNotifications();
		}
	},
	methods: {
		clearNotifcations() {
			this.loading = true;
			this.errored = false;
			this.notifications.length = 0
		},
		getNotifications() {
			this.clearNotifcations();
			axios
			.get(`/notifications/${this.sort || 'all'}`)
			.then(response => {
				this.notifications = response.data.notifications
				console.log(response.data)
			})
			.catch(error => {
				console.log(error)
				this.errored = true
			})
			.finally(() => this.loading = false)
		}
	},
	created() {
		this.getNotifications()
	}
}
</script>