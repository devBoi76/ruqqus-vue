<template>
	<t-dropdown :classes="{dropdown: 'origin-top-left right-0 bg-gray-50 dark:bg-gray-900 w-96 h-96 py-0'}" @hide="onHide">
		<!-- Trigger -->
		<div slot="trigger" slot-scope="{ mousedownHandler, focusHandler, blurHandler, keydownHandler, isShown }">
			<button id="user-menu" class="relative flex items-center justify-center px-2 w-8 h-8 text-xl text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-sm" :class="{ 'bg-gray-100 dark:bg-gray-700 text-purple-500': isShown }" aria-label="User menu" aria-haspopup="true" @mousedown="mousedownHandler" @focus="focusHandler" @blur="blurHandler" @keydown="keydownHandler" @click="getNotifications()" :content="tippyText" v-tippy="{ placement: 'bottom', delay: [1000,0] }">
				<span class="sr-only">View notifications</span>
				<i class="far fa-bell"></i>
				<span class="absolute flex items-center justify-center w-6 h-6 rounded bg-purple-500 border-2 border-white dark:border-gray-800 transform transition duration-150" :class="notifications.length ? 'scale-100' : 'scale-0'" style="top: -6px;right: -6px;">
					<span class="font-bold text-2xs text-white dark:text-gray-200">
						{{ notifications.length || 1 }}
					</span>
				</span>
			</button>
		</div>
		<!-- Menu -->
		<div slot-scope="{ hide }" class="flex flex-col flex-grow h-full">
			<div class="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b dark:border-gray-800">
				<div class="text-2xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-400">Notifications</div>
				<div class="flex items-center space-x-2 leading-tight">
					<button :disabled="!notifications.length" class="text-sm text-gray-500 hover:text-gray-700 disabed:opacity-50">
						<i class="far fa-check-double"></i>
					</button>
					<span class="text-gray-300 text-sm font-hairline">
						|
					</span>
					<button class="text-sm text-gray-500 hover:text-gray-700" @click="toggleSettings()">
						<i class="far fa-cog"></i>
					</button>
				</div>
			</div>

			<!-- settings -->
			<div v-show="showSettings" class="flex flex-col p-4 bg-white border-b">
				<div class="text-2xs font-bold uppercase tracking-wide text-gray-400">
					Show:
				</div>
				<hr>
				<t-checkbox-group name="filter" v-model="filters" :options="['Replies', 'Mentions', 'Activity', 'Moderation']"></t-checkbox-group>
			</div>


			<!-- Notifications List -->
			<vue-scroll :class="{'opacity-50 pointer-events-none':showSettings}">
				<div class="flex flex-col items-center justify-center">
					<!-- Loading state -->
					<div v-show="loading && !errored && !notifications.length" class="w-full space-y-5 py-4">
						<div v-for="i in 5" :key="i" class="flex px-4 space-x-3 animate-pulse">
							<div class="rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 w-8 h-8 flex-shrink-0"></div>
							<div class="rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 w-full h-8"></div>
						</div>
					</div>
					<!-- Errored state -->
					<div v-show="!loading && errored && !notifications.length">
						<div class="flex flex-col items-center text-center w-full p-12">
							<i class="block fad fa-ghost text-gray-400 text-4xl mb-5"></i>
							<div class="h5">Unable to Load Notifications</div>
							<p class="text-sm text-gray-400">
								Sorry, we're unable to fetch your notifications right now.
							</p>
							<button class="button outlineGray200 mt-3" @click="getNotifications()">
								<i class="far fa-redo-alt pr-2"></i>
								Try again
							</button>
						</div>
					</div>
					<!-- Notifications -->
					<div v-if="notifications.length" class="w-full bg-white">
						<NotificationList :notifications="notifications" @click.native="hide"/>
					</div>
					<!-- Empty state -->
					<div v-show="!loading && !errored && !notifications.length" class="flex flex-col items-center p-12">
						<i class="block fad fa-bell text-gray-400 text-4xl mb-5"></i>
						<div class="h5">
							No Unread Notifications
						</div>
						<p class="text-sm text-gray-400">
							You're all caught up! Time for a coffee break? 🧙
						</p>
					</div>
				</div>
			</vue-scroll>

			<!-- View entire inbox link -->
			<div class="flex items-center justify-center p-3 border-t">
				<router-link to="/notifications" class="text-sm text-purple-500 hover:underline" @click.native="hide">
					View everything
					<i class="far fa-long-arrow-right pl-2"></i>
				</router-link>
			</div>
		</div>
	</t-dropdown>
</template>

<script>
	import axios from "axios";
	//import { mapGetters } from "vuex"
	const NotificationList = () => import('@/components/notifications/NotificationList.vue')
	
	export default {
		name: "NotificationsDropdown",
		components: {
			NotificationList
		},
		data() {
			return {
				loading: true,
				errored: false,
				showSettings: false,
				notifications: []
			}
		},
		computed: {
			//...mapGetters("notifications", ["notificationsCount"]),
			filters: {
				get() {
					return this.$store.state.persist.notificationsFilters
				},
				set (value) {
					this.$store.commit('persist/SET_NOTIFICATIONS_FILTERS', value)
					console.log('notifications set in state')
				}
			},
			tippyText() {
				return this.notifications.length ? 'You have unread notifications' : 'Notifications'
			}
		},
		methods: {
			toggleSettings() {
				return this.showSettings = !this.showSettings;
			},
			onHide() {
				this.showSettings = false;
				console.log('notifications navbar dropdown hidden')
			},
			getNotifications() {
				this.loading = true;
				this.errored = false;
				axios
				.get('/api/vue/notifications/all')
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
		}
	}
</script>