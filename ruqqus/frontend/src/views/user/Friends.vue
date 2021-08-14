<template>
	<div class="flex flex-col flex-grow">

		<!-- Header content section -->
		<div class="flex flex-shrink-0 w-full items-center h-16 px-4 bg-white border-b border-gray-300 dark:border-white dark:border-opacity-10 dark:bg-gray-700">
			<h1 class="text-2xl mb-0">Friends</h1>
			<div class="ml-auto">
				<router-link to="/browse" class="text-gray-500 hover:text-gray-700">
					<i class="far fa-info-circle fa-fw"></i>
				</router-link>
			</div>
		</div>

		<!-- Tabs -->
		<div class="flex flex-shrink-0 w-full items-end h-12 px-4 border-b border-gray-300 dark:border-white dark:border-opacity-10 dark:bg-gray-700">
			<router-link v-for="tab in tabs" :key="tab.name" v-slot="{ href, navigate, isExactActive }" :to="tab.route">
				<a :href="href" @click="navigate" class="group">
					<div class="border-b-2 px-3 pb-2 capitalize" :class="isExactActive ? 'text-purple-500 border-purple-500' : 'text-gray-500 hover:text-gray-700 border-transparent'">
						{{ tab.name }}
					</div>
				</a>
			</router-link>
		</div>

		<!-- Main content section -->
		<vue-scroll>
			<div class="grid grid-cols-12 gap-8 px-4 my-4">
				<div class="col-span-full dark:text-gray-100">
					<t-input placeholder="Filter friends by name"/>
				</div>
				<div class="col-span-full dark:text-gray-100">
					<div class="mb-1 text-sm font-medium text-gray-700 capitalize">
						{{ $route.params.sort || 'online' }} ({{ v.boards_subscribed.length }})
					</div>
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
