<template>
	<div class="flex flex-col flex-grow overflow-y-auto">

		<!-- Header content section -->
		<div class="grid grid-cols-12 sticky top-0 z-10">
			<div class="col-span-full 2xl:col-start-2 2xl:col-end-10">
				<div class="flex items-center justify-between p-6 md:px-8 bg-white">
					<h1 class="text-2xl capitalize mb-0">
						Moderation
					</h1>
					<div class="flex items-center space-x-4">
						<div v-show="isDifferent" class="text-xs text-gray-400">
							You have unsaved changes!
						</div>
						<button v-if="!loading && !errored" :disabled="!isDifferent" class="button purple500" @click="save()">
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

			<div v-if="!loading && !errored" class="col-span-full 2xl:col-start-2 2xl:col-end-10 p-4 md:px-8">
				<div class="md:grid md:grid-cols-3 md:gap-6">
					<div class="mt-5 md:mt-0 md:col-span-3 space-y-8">
						<div>
							<div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2">
								Community Restrictions
							</div>
							<div class="sm:rounded-sm border-t border-b sm:border bg-white divide-y">
								<div class="flex flex-grow items-center justify-between p-4">
									<div>
										<div class="font-semibold leading-tight">
											Restrict posting
										</div>
										<p class="text-sm text-gray-500 mt-1">
											Restrict posting to approved users only
										</p>
									</div>
									<Toggle v-model:enabled="innerSite.canPost"/>
								</div>
								<div class="flex flex-grow items-center justify-between p-4">
									<div>
										<div class="font-semibold leading-tight">
											Restrict commenting
										</div>
										<p class="text-sm text-gray-500 mt-1">
											Restrict commenting to approved users only
										</p>
									</div>
									<Toggle v-model:enabled="innerSite.canComment"/>
								</div>
								<div class="flex flex-grow items-center justify-between p-4">
									<div>
										<div class="font-semibold leading-tight">
											Restrict voting
										</div>
										<p class="text-sm text-gray-500 mt-1">
											Restrict voting to approved users only
										</p>
									</div>
									<Toggle v-model:enabled="innerSite.canVote"/>
								</div>
								<div class="flex flex-grow items-center justify-between p-4">
									<div>
										<div class="font-semibold leading-tight">
											Disable downvotes
										</div>
										<p class="text-sm text-gray-500 mt-1">
											Remove downvote buttons from all content for all members
										</p>
									</div>
									<Toggle v-model:enabled="innerSite.canDownvote"/>
								</div>
							</div>
						</div>
						<div>
							<div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2">
								Community Perks
							</div>
							<div class="sm:rounded-sm border-t border-b sm:border bg-white divide-y">
								<div class="flex flex-grow items-center justify-between p-4">
									<div>
										<div class="font-semibold leading-tight">
											Enable Custom Titles
										</div>
										<p class="text-sm text-gray-500 mt-1">
											Let members customize badges next to their username
										</p>
									</div>
									<Toggle v-model:enabled="innerSite.hasCustomTitles"/>
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

import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';

export default {
	name: "UserSettingsBasicInfoView",
	data() {
		return {
			loading: false,
			errored: false,
			isDifferent: false,
			innerSite: {}
		}
	},
	components: {
		Toggle
	},
	watch: {
		'innerSite': { // get guild info and posts if guild changes
			handler() {
				console.log('site obj watcher triggered')
				this.isDifferent = !isEqual(this.site, this.innerSite)
			},
			deep: true
		}
	},
	computed: {
		site() {
			return this.$store.getters['site/getSite']
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
			this.$store.dispatch('persist/submitSiteSettings', this.innerSite)
			.then(() => {
				console.log("submitSiteSettings dispatch successful")
				this.innerSite = {...this.site}
			})
			.catch(error => {
				console.error(error)
				this.errored = true

			})
			.finally(() => this.loading = false)
		}
	},
	created() {
		this.innerSite = cloneDeep(this.site);
		this.isDifferent = false
	}
};
</script>