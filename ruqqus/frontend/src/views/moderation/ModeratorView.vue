<template>
	<div class="flex flex-grow">

		<Sidebar :menu="menu" sidebar-color="white" sticky-header border>
			<template v-slot:header>
				<div class="flex flex-shrink-0 w-full items-center h-16 md:px-4 border-b border-black border-opacity-10 dark:border-white dark:border-opacity-10 dark:bg-gray-700 mb-2">
					<!-- Define sidebar bg color here so tailwidn doesn't purge the class during prod build -->
					<span class="hidden bg-purple-500"></span>
					<!-- Loading skeleton elements -->
					<div v-show="loading" class="flex flex-grow items-center animate-pulse">
						<div class="w-10 h-10 rounded-sm bg-gray-100"></div>
						<div class="ml-2 w-2/3 h-3 bg-gray-100 rounded-sm"></div>
					</div>
					<!-- Show this when guild data has loaded -->
					<div v-if="!loading && !errored && g" class="flex items-center">
						<router-link :to="`/+${g.name}`">
							<img :src="g.profile_url" class="w-10 h-10 rounded-sm bg-gray-100" alt="Guild icon"/>
						</router-link>
						<div class="pl-3">
							<router-link :to="`/+${g.name}`" class="font-medium text-gray-900">
								+{{ g.name }}
							</router-link>
						</div>
					</div>
				</div>
			</template>

			<template v-slot:footer>
				<div v-if="g" class="flex items-center justify-center w-full px-4 py-3 border-t">
					<a :href="`/+${g.name}`" target="_blank" class="text-xs text-gray-400 hover:underline">
						View guild
						<i class="far fa-external-link pl-1"></i>
					</a>
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
			menu: [
			{	
				header: true,
				mobileDivider: true,
				name: 'queue',
				items: [
				{
					name: 'reports',
					route: {
						name: 'moderation-queue-view',
						params: { filter: 'reports' }
					},
					icon: 'fa-flag',
					textCase: 'capitalize'
				},
				{
					name: 'spam',
					route: {
						name: 'moderation-queue-view',
						params: { filter: 'spam' }
					},
					icon: 'fa-bomb',
					textCase: 'capitalize'
				},
				{
					name: 'unmoderated',
					route: {
						name: 'moderation-queue-view',
						params: { filter: 'unmoderated' }
					},
					icon: 'fa-question-circle',
					textCase: 'capitalize'
				},
				{
					name: 'approved',
					route: {
						name: 'moderation-queue-view',
						params: { filter: 'approved' }
					},
					icon: 'fa-check-circle',
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
						name: 'moderation-general-view'
					},
					icon: 'fa-cog',
					textCase: 'capitalize'
				},
				{
					name: 'theming',
					route: {
						name: 'moderation-theming-view'
					},
					icon: 'fa-paint-roller',
					textCase: 'capitalize'
				}
				]
			},
			{
				header: true,
				mobileDivider: true,
				name: 'members',
				items: [
				{
					name: 'all',
					route: {
						name: 'moderation-user-management-view',
						params: { sort: 'all' }
					},
					icon: 'fa-user',
					textCase: 'capitalize'
				},
				{
					name: 'exiles',
					route: {
						name: 'moderation-user-management-view',
						params: { sort: 'exile' }
					},
					icon: 'fa-gavel',
					textCase: 'capitalize'
				},
				{
					name: 'approved',
					route: {
						name: 'moderation-user-management-view',
						params: { sort: 'approved' }
					},
					icon: 'fa-heart',
					textCase: 'capitalize'
				},
				{
					name: 'guild masters',
					route: {
						name: 'moderation-user-management-view',
						params: { sort: 'guildmaster' }
					},
					icon: 'fa-crown',
					textCase: 'capitalize'
				}
				]
			},
			{
				header: true,
				name: 'other',
				items: [
				{
					name: 'access',
					route: {
						name: 'moderation-access-view'
					},
					icon: 'fa-lock-alt',
					textCase: 'capitalize'
				},
				{
					name: 'rules',
					route: {
						name: 'moderation-rules-view'
					},
					icon: 'fa-scroll-old',
					textCase: 'capitalize'
				},
				{
					name: 'titles',
					route: {
						name: 'moderation-titles-view'
					},
					icon: 'fa-signature',
					textCase: 'capitalize'
				},
				{
					name: 'tags',
					route: {
						name: 'moderation-lodges-view'
					},
					icon: 'fa-tag',
					textCase: 'capitalize'
				}
				]
			}
			]
		}
	},
	computed: {
		...mapState("persist",["v"]),
		g() {
			return this.$store.getters['guild/getGuild'](this.$route.params.name);
		}
	},
	watch: {
		'$route.params.name': { // get guild info and posts if guild changes
			handler() {
				if (this.g == null) {
					this.loading = true;
					this.errored = false;
					this.getGuildInfo()
				} else {
					this.loading = false;
				}
			},
			immediate: true
		}
	},
	methods: {
		getGuildInfo() {
			let guild = this.$route.params.name
			this.$store.dispatch('guild/fetchGuild', guild)
			.then(() => {
				console.log("getGuild dispatch successful")
			})
			.catch(error => {
				console.error(error)
				this.errored = true

			})
			.finally(() => this.loading = false)
		}
	},
	created() {
		document.documentElement.style.setProperty('--color-primary', `139, 92, 246`)
	}
}
</script>
