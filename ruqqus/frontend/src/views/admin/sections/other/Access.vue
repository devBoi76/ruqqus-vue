<template>
	<div class="flex flex-col flex-grow overflow-y-auto">

		<!-- Header content section -->
		<div class="grid grid-cols-12 sticky top-0 z-10">
			<div class="col-span-full 2xl:col-start-2 2xl:col-end-10">
				<div class="flex items-center justify-between px-4 py-3 bg-gray-50 sm:bg-gray-100">
					<h1 class="text-2xl capitalize mb-0">
						Access
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

							<div>
								<div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2">
									Community Privacy
								</div>
								<div class="sm:rounded-sm sm:shadow-xs border-t border-b sm:border-0 bg-white">
									<div class="p-4 border-b">
										<div class="flex flex-grow items-center justify-between">
											<div>
												<div class="font-medium leading-tight">
													Private
												</div>
												<p class="text-sm text-gray-500 mt-1">
													Require an account to view your community's content.
												</p>
											</div>
											<t-toggle v-model="g.is_private"/>
										</div>
									</div>
									<div class="p-4">
										<div class="flex flex-grow items-center justify-between">
											<div>
												<div class="font-medium leading-tight">
													Disable Sign-Ups
												</div>
												<p class="text-sm text-gray-500 mt-1">
													This will disable any new account creation.
												</p>
											</div>
											<t-toggle v-model="g.is_all"/>
										</div>
									</div>
								</div>
							</div>

							<div>
								<div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2">
									Moderation
								</div>
								<div class="sm:rounded-sm sm:shadow-xs border-t border-b sm:border-0 bg-white">
									<div class="p-4 border-b">
										<div class="flex flex-grow items-center justify-between">
											<div>
												<div class="font-medium leading-tight">
													Restricted Posting
												</div>
												<p class="text-sm text-gray-500 mt-1">
													Restrict posting to approved users only.
												</p>
											</div>
											<Toggle v-model="g.is_restricted"/>
										</div>
									</div>
									<div class="p-4 border-b">
										<div class="flex flex-grow items-center justify-between">
											<div>
												<div class="font-medium leading-tight">
													Restricted Commenting
												</div>
												<p class="text-sm text-gray-500 mt-1">
													Restrict commenting to approved users only.
												</p>
											</div>
											<t-toggle v-model="g.is_restricted"/>
										</div>
									</div>
									<div class="p-4 border-b">
										<div class="flex flex-grow items-center justify-between">
											<div>
												<div class="font-medium leading-tight">
													Restricted Voting
												</div>
												<p class="text-sm text-gray-500 mt-1">
													Restrict voting to approved users only.
												</p>
											</div>
											<t-toggle v-model="g.is_restricted"/>
										</div>
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
import { getGuild } from '@/api/Guild.js';

import Toggle from "@/components/forms/Toggle.vue";

export default {
	name: "UserSettingsBasicInfoView",
	data() {
		return {
			changed: false,
			loading: true,
			errored: false,
			saved: {},
			g: {}
		}
	},
	components: {
		Toggle
	},
	watch: {
		'$route.params.name': { // get guild info and posts if guild changes
			handler() {
				this.getGuildInfo()
			},
			immediate: true
		},
		'g': { // get guild info and posts if guild changes
			handler() {
				if (JSON.stringify(this.g) !== JSON.stringify(this.saved)) {
					this.changed = true
				} else {
					this.changed = false
				}
			},
			deep: true
		}
	},
	methods: {
		getGuildInfo() {
			let guild = this.$route.params.name;
			getGuild(guild)
			.then(response => {
				let data = response.data
				this.saved = Object.assign({}, data);
				this.g = data;
			})
			.catch(error => {
				console.error(error)
				this.errored = true
			})
			.finally(() => this.loading = false)
		},
		save() {
			this.changed = false;
			this.saved = Object.assign({}, this.g);
		}
	}
};
</script>