<template>
	<div class="flex flex-col flex-grow bg-white md:shadow-xs md:rounded-sm overflow-hidden">

		<!-- Header content section -->
		<div class="flex flex-shrink-0 w-full items-center h-16 px-4 bg-white border-b dark:border-white dark:border-opacity-10 dark:bg-gray-700">
			<h1 class="text-xl mb-0">Following</h1>
			<div class="ml-auto w-1/3">
				<input class="form-input" v-model="searchTerm" placeholder="Filter by username"/>
			</div>
		</div>

		<!-- Main content section -->
		<vue-scroll>
			<div class="grid grid-cols-12 gap-8 px-4 my-4">
				<div class="col-span-full dark:text-gray-100">
					<div class="flex flex-wrap -mx-1 overflow-hidden">
						<div v-for="guild in v.boards_subscribed" :key="guild.name" class="my-1 px-1 w-full overflow-hidden md:w-1/2 lg:w-1/4">
							<router-link :to="`/+${guild.name}`" class="block p-4 rounded-sm bg-white border border-gray-300 hover:bg-purple-100 hover:border-purple-500">
								<div class="flex items-center">
									<img :src="guild.profile_url" class="w-11 h-11 rounded-sm object-cover flex-shrink-0">
									<div class="ml-4">
										<div class="text-gray-900 font-bold leading-4">
											{{ guild.name }}
										</div>
										<p class="mt-1 text-sm text-gray-500">{{ guild.subscriber_count }} members</p>
									</div>
								</div>
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</vue-scroll>

	</div>
</template>

<script>
// Import Components

import { mapState } from 'vuex';

export default {
	name: "UserFriendsView",
	components: {
		//Tabs
	},
	data() {
		return {
			searchTerm: "",
			tabs: [
			{
				name: "online",
				route: {
					name: 'user-friends-view',
				},
				exact: true,
				icon: 'fas fa-chess-rook',
				color: 'gray-300',
				description: 'Manage your public profile.'
			},
			{
				name: "all",
				route: {
					name: 'user-friends-view',
					params: { sort: 'all' }
				},
				exact: true,
				icon: 'fas fa-crown',
				color: 'blue-500',
				description: 'Manage how you receive notifications across Ruqqus.'
			},
			{
				name: "pending",
				route: {
					name: 'user-friends-view',
					params: { sort: 'pending' }
				},
				exact: true,
				icon: 'fas fa-eye-slash',
				color: 'red-500',
				description: 'Configure your email, password, and more.'
			},
			{
				name: "blocked",
				route: {
					name: 'user-friends-view',
					params: { sort: 'blocked' }
				},
				exact: true,
				icon: 'fas fa-eye-slash',
				color: 'red-500',
				description: 'Configure your email, password, and more.'
			}
			]
		}
	},
	computed: {
		...mapState("persist", ["v"])
	}
}
</script>
