<template>
	<div class="flex flex-grow">

		<Sidebar :menu="menu" sidebar-color="white" sticky-header border>
			<template v-slot:header>
				<div class="flex flex-shrink-0 w-full items-center h-16 md:px-4 border-b border-black border-opacity-10 dark:border-white dark:border-opacity-10 dark:bg-gray-700 mb-2">
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
							alt="User avatar"
							/>
						</router-link>
						<div class="pl-3">
							<router-link :to="v.permalink" class="font-medium text-white">
								{{ v.username }}
							</router-link>
							<div v-if="v.email" class="text-2xs text-white text-opacity-80">
								{{ v.email }}
							</div>
						</div>
					</div>
				</div>
			</template>
		</Sidebar>

		<!-- Main content section -->
		<keep-alive max=5>
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
				mobileDivider: true,
				items: [
				{
					name: 'dashboard',
					route: {
						name: 'admin-dashboard-view',
						params: { filter: 'reports' }
					},
					icon: 'fa-columns',
					textCase: 'capitalize'
				}
				]
			},
			{
				header: true,
				mobileDivider: true,
				name: 'settings',
				items: [
				{
					name: 'general',
					route: {
						name: 'admin-basic-info-view'
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
						name: 'admin-flagged-view'
					},
					icon: 'fa-flag',
					textCase: 'capitalize'
				},
				{
					name: 'all',
					route: {
						name: 'admin-flagged-view'
					},
					icon: 'fa-globe',
					textCase: 'capitalize'
				},
				{
					name: 'media uploads',
					route: {
						name: 'admin-media-view'
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
						name: 'admin-users-view',
						params: { filter: 'exiles' }
					},
					icon: 'fa-users-crown',
					textCase: 'capitalize'
				},
				{
					name: 'banned',
					route: {
						name: 'admin-users-view',
						params: { filter: 'approved' }
					},
					icon: 'fa-user-slash',
					textCase: 'capitalize'
				},
				{
					name: 'suspect',
					route: {
						name: 'admin-users-view',
						params: { filter: 'mods' }
					},
					icon: 'fa-user-secret',
					textCase: 'capitalize'
				}
				]
			},
			{
				header: true,
				name: 'customization',
				items: [
				{
					name: 'theming',
					route: {
						name: 'admin-theming-view'
					},
					icon: 'fa-palette',
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
		axios
		.get(`/api/vue/core/+${this.$route.params.name}`)
		.then(response => {
			this.g = response.data.data
		})
		.catch(error => {
			console.log(error)
			this.errored = true
		})
		.finally(() => this.loading = false)
	}
}
</script>

<style scoped>

</style>
