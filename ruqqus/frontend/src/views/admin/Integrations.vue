<template>
	<div class="flex flex-col flex-grow overflow-y-auto">

		<!-- Header content section -->
		<div class="grid grid-cols-12 sticky top-0 z-10">
			<div class="col-span-full 2xl:col-start-2 2xl:col-end-10">
				<div class="flex items-center justify-between px-4 py-3 bg-gray-50 sm:bg-gray-100">
					<h1 class="text-2xl capitalize mb-0">
						Integrations
					</h1>
					<div class="flex items-center space-x-4">
						<div v-show="changed" class="text-xs text-gray-400">
							You have unsaved changes!
						</div>
						<button v-if="!loading && !errored" :disabled="!changed" class="button purple500" @click="save()">
							Save
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Main content section -->

		<!-- Error state if guild data fails to load -->
		<div v-show="errored && !loading" class="w-full h-2/3 px-4">
			<div class="flex flex-col h-full justify-center items-center text-center">
				<i class="block fad fa-ghost text-gray-400 dark:text-gray-200 text-5xl mb-6"></i>
				<div class="h5">
					Unable to Load Moderation Tools
				</div>
				<p class="text-gray-600 dark:text-gray-400">
					Sorry, we're unable to fetch guild reports right now. Please try again later.
				</p>
			</div>
		</div>

		<div class="grid grid-cols-12">

			<div v-show="loading && !errored" class="col-span-full 2xl:col-start-2 2xl:col-end-10">
				<div class="flex flex-col w-full p-4 space-y-3 animate-pulse">
					<div class="rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 w-1/6 h-3"></div>
					<div class="rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 w-full h-20"></div>
				</div>
			</div>

			<div v-if="!loading && !errored" class="col-span-full 2xl:col-start-2 2xl:col-end-10">
				<div class="p-4">
					<div class="md:grid md:grid-cols-3 md:gap-6">
						<div class="mt-5 md:mt-0 md:col-span-3 space-y-8">

							<div class="flex flex-wrap -mt-2 -mx-2 overflow-hidden">
								<div v-for="(item, index) in integrations" :key="index" class="my-2 px-2 w-full overflow-hidden md:w-1/2">
									<div class="flex justify-between p-4 bg-white border rounded-sm">
										<div class="flex">
											<img :src="item.logo" class="w-11 h-11 object-cover"/>
											<div class="pl-4 pr-8">
												<div class="h5">
													{{ item.name }}
												</div>
												<p class="text-sm text-gray-500">
													{{ item.description }}
												</p>
											</div>
										</div>
										<button class="button gray200">
											Connect
										</button>
									</div>
								</div>
							</div>

							<div>
								<div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2">
									Your Integrations
								</div>
								<div v-if="activeIntegrations" class="sm:rounded-sm border-t border-b sm:border bg-white divide-y">
									<div class="flex items-center justify-between p-4">
										<div class="flex">
											<img :src="item.logo" class="w-11 h-11 object-cover"/>
											<div class="pl-4 pr-8">
												<div class="h5">
													{{ item.name }}
												</div>
												<p class="text-sm text-gray-500">
													{{ item.description }}
												</p>
											</div>
										</div>
										<button class="button white">
											<i class="far fa-wrench fa-fw pr-1"></i>
											Configure
										</button>
									</div>
								</div>
								<div v-else class="sm:rounded-sm border-t border-b sm:border bg-white">
									<div class="text-center p-12">
										<p class="text-gray-500">
											You have no active integrations...
										</p>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// Import components
//import { getGuild } from '@/api/Guild.js';

import Toggle from "@/components/forms/Toggle.vue";

export default {
	name: "AdminIntegrationsView",
	data() {
		return {
			changed: false,
			loading: false,
			errored: false,
			s: {},
			saved: {},
			integrations: [
			{
				logo: 'https://i.imgur.com/bV2OM6P.png',
				name: 'Gumroad',
				description: 'Collect donations from your members via automatic monthly subscriptions.',
				isActive: false
			},
			{
				logo: 'https://i.imgur.com/MHgOhAk.png',
				name: 'Discord',
				description: 'Enable members to connect their account here with Discord. Ideal for official server integrations.',
				isActive: false
			}
			]
		}
	},
	components: {
		Toggle
	},
	computed: {
		activeIntegrations() {
			const activeIntegrations = this.integrations.filter(function(elem){
				if(elem.isActive === true)
					return elem
			});
			if (activeIntegrations.length > 0) {
				return activeIntegrations
			} else {
				return {}
			}
		}
	},
	watch: {
		// '$route.params.name': { // get guild info and posts if guild changes
		// 	handler() {
		// 		this.getGuildInfo()
		// 	},
		// 	immediate: true
		// },
		's': { // get guild info and posts if guild changes
			handler() {
				this.changed = (JSON.stringify(this.s) !== JSON.stringify(this.saved))
			},
			deep: true
		}
	},
	methods: {
		// getGuildInfo() {
		// 	let guild = this.$route.params.name;
		// 	getGuild(guild)
		// 	.then(response => {
		// 		let data = response.data
		// 		this.saved = Object.assign({}, data);
		// 		this.g = data;
		// 	})
		// 	.catch(error => {
		// 		console.error(error)
		// 		this.errored = true
		// 	})
		// 	.finally(() => this.loading = false)
		// },
		save() {
			this.changed = false;
			this.saved = Object.assign({}, this.s);
			this.$store.commit('site/SET_SITE', {site: this.saved});
		}
	},
	created() {
		this.s = Object.assign({}, this.$store.getters['site/getSite'])
	}
};
</script>