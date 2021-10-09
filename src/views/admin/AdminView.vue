<template>
	<div class="flex flex-grow bg-white">

		<Sidebar :menu="menu" sidebar-color="gray-50" sticky-header border>
			<template v-slot:header>
				<div class="flex flex-shrink-0 w-full items-center p-6 dark:bg-gray-700">
					<!-- Define sidebar bg color here so tailwidn doesn't purge the class during prod build -->
					<span class="hidden bg-purple-500"/>
					<!-- Loading skeleton elements -->
					<div v-show="!site" class="flex flex-grow animate-pulse">
						<div class="w-10 h-10 rounded-sm bg-white bg-opacity-20 dark:bg-gray-800"></div>
						<div class="flex flex-col justify-between flex-grow pl-2">
							<div class="w-3/4 h-3 bg-white bg-opacity-20 rounded-sm"></div>
							<div class="w-16 h-3 bg-white bg-opacity-20 rounded-sm"></div>
						</div>
					</div>
					<!-- Show this when guild data has loaded -->
					<div v-if="site" class="flex items-center">
						<img :src="site.iconUrl" class="w-10 h-10 rounded-sm bg-white bg-opacity-20" alt="Community icon"/>
						<div class="pl-3">
							<div class="text-gray-900 font-semibold">
								{{ site.name }}
							</div>
						</div>
					</div>
				</div>
			</template>
			<template v-slot:footer>
				<div class="flex items-center justify-center w-full px-4 py-3 border-t">
					<a href="https://github.com/ruqqus/ruqqus" target="_blank" class="text-sm text-gray-400 hover:underline">
						View site
						<i class="far fa-external-link pl-1"></i>
					</a>
				</div>
			</template>
		</Sidebar>

		<!-- Main content section -->
		<keep-alive :max="10">
			<router-view :key="$route.fullPath"></router-view>
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
						name: 'admin-security-view'
					},
					icon: 'fa-lock-alt',
					textCase: 'capitalize'
				},
				{
					name: 'moderation',
					route: {
						name: 'admin-moderation-view'
					},
					icon: 'fa-gavel',
					textCase: 'capitalize'
				},
				{
					name: 'design',
					route: {
						name: 'admin-design-view'
					},
					icon: 'fa-paint-roller',
					textCase: 'capitalize'
				},
				{
					name: 'integrations',
					route: {
						name: 'admin-integrations-list-view'
					},
					icon: 'fa-puzzle-piece',
					textCase: 'capitalize'
				},
				]
			},
			{
				header: true,
				name: 'manage',
				items: [
				{
					name: 'users',
					route: {
						name: 'admin-user-management-view',
						params: { sort: 'all' }
					},
					icon: 'fa-user',
					textCase: 'capitalize'
				},
				{
					name: 'flags',
					route: {
						name: 'admin-queue-view',
						params: { filter: 'reports' }
					},
					icon: 'fa-flag',
					textCase: 'capitalize'
				},
				{
					name: 'media',
					route: {
						name: 'admin-queue-view',
						params: { filter: 'reports' }
					},
					icon: 'fa-image',
					textCase: 'capitalize'
				},
				// {
				// 	name: 'titles',
				// 	route: {
				// 		name: 'admin-titles-view'
				// 	},
				// 	icon: 'fa-badge-check',
				// 	textCase: 'capitalize'
				// },
				{
					name: 'emoji',
					route: {
						name: 'admin-emojis-view'
					},
					icon: 'fa-grin',
					textCase: 'capitalize'
				}
				]
			}
			]
		}
	},
	computed: {
		site() {
			return this.$store.getters['site/getSite'];
		}
	}
}
</script>
