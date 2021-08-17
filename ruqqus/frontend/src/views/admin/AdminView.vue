<template>
	<div class="flex flex-grow">

		<Sidebar :menu="menu" sidebar-color="white" sticky-header border>
			<template v-slot:header>
				<div class="flex flex-shrink-0 w-full items-center h-16 md:px-4 border-b border-black border-opacity-10 dark:border-white dark:border-opacity-10 dark:bg-gray-700">
					<!-- Define sidebar bg color here so tailwidn doesn't purge the class during prod build -->
					<span class="hidden bg-purple-500"/>
					<!-- Loading skeleton elements -->
					<div v-show="!v" class="flex flex-grow animate-pulse">
						<div class="w-10 h-10 rounded-sm bg-white bg-opacity-20 dark:bg-gray-800"></div>
						<div class="flex flex-col justify-between flex-grow pl-2">
							<div class="w-3/4 h-3 bg-white bg-opacity-20 rounded-sm"></div>
							<div class="w-16 h-3 bg-white bg-opacity-20 rounded-sm"></div>
						</div>
					</div>
					<!-- Show this when guild data has loaded -->
					<div v-if="v" class="flex items-center">
						<router-link :to="v.permalink">
							<img
							:src="v.profile_url"
							class="w-10 h-10 rounded-sm bg-white bg-opacity-20"
							alt="Community icon"
							/>
						</router-link>
						<div class="pl-3">
							<div class="text-gray-900 font-medium">
								Community Name
							</div>
							<div class="text-2xs text-gray-500">
								503 members
							</div>
						</div>
					</div>
				</div>
			</template>
			<template v-slot:footer>
				<div class="flex items-center justify-center w-full px-4 py-3 border-t">
					<a href="https://github.com/ruqqus/ruqqus" target="_blank" class="text-xs text-gray-400 hover:underline">
						View site
						<i class="far fa-external-link pl-1"></i>
					</a>
				</div>
			</template>
		</Sidebar>

		<!-- Main content section -->
		<keep-alive :max="10">
			<router-view></router-view>
		</keep-alive>

	</div>
</template>

<script>
// Import Components
import axios from "axios";
import { mapState } from "vuex";

import Sidebar from "@/components/navigation/vertical/Sidebar.vue"

export default {
	name: "GuildSettingsView",
	components: {
		Sidebar
	},
	data() {
		return {
			loading: true,
			errored: false,
			g: [],
			menu: [
			{
				header: true,
				mobileDivider: true,
				name: 'settings',
				items: [
				{
					name: 'general',
					route: {
						name: 'admin-general-view'
					},
					icon: 'fa-cog',
					textCase: 'capitalize'
				},
				{
					name: 'security',
					route: {
						name: 'admin-access-view'
					},
					icon: 'fa-lock-alt',
					textCase: 'capitalize'
				}
				]
			},
			{
				header: true,
				name: 'content',
				items: [
				{
					name: 'flagged',
					route: {
						name: 'admin-queue-view',
						params: { filter: 'reports' }
					},
					icon: 'fa-flag',
					textCase: 'capitalize'
				},
				{
					name: 'all',
					route: {
						name: 'admin-queue-view',
						params: { filter: 'unmoderated' }
					},
					icon: 'fa-question-circle',
					textCase: 'capitalize'
				},
				{
					name: 'media uploads',
					route: {
						name: 'admin-queue-view',
						params: { filter: 'media' }
					},
					icon: 'fa-image',
					textCase: 'capitalize'
				}
				]
			},
			{
				header: true,
				mobileDivider: true,
				name: 'users',
				items: [
				{
					name: 'all',
					route: {
						name: 'admin-user-management-view',
						params: { sort: 'all' }
					},
					icon: 'fa-user',
					textCase: 'capitalize'
				},
				{
					name: 'banned',
					route: {
						name: 'admin-user-management-view',
						params: { sort: 'banned' }
					},
					icon: 'fa-gavel',
					textCase: 'capitalize'
				},
				{
					name: 'staff',
					route: {
						name: 'admin-user-management-view',
						params: { sort: 'staff' }
					},
					icon: 'fa-crown',
					textCase: 'capitalize'
				}
				]
			},
			{
				header: true,
				name: 'customization',
				items: [
				{
					name: 'design',
					route: {
						name: 'admin-theming-view'
					},
					icon: 'fa-paint-roller',
					textCase: 'capitalize'
				},
				{
					name: 'tags',
					route: {
						name: 'admin-tags-view'
					},
					icon: 'fa-tag',
					textCase: 'capitalize'
				},
				{
					name: 'titles',
					route: {
						name: 'admin-titles-view'
					},
					icon: 'fa-signature',
					textCase: 'capitalize'
				}
				]
			}
			]
		}
	},
	computed: {
		...mapState("persist",["v"])
	},
	created() {
		document.documentElement.style.setProperty('--color-primary', `139, 92, 246`)
	}
}
</script>
