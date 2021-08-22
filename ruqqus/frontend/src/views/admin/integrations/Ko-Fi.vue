<template>
	<div class="flex flex-col flex-grow overflow-y-auto">

		<!-- Header content section -->
		<div class="grid grid-cols-12 sticky top-0 z-10">
			<div class="col-span-full 2xl:col-start-2 2xl:col-end-10">
				<div class="flex items-center justify-between px-4 py-3 bg-gray-50 sm:bg-gray-100">
					<div class="flex items-center space-x-4">
						<h1 class="text-2xl capitalize mb-0">
							Integrations
						</h1>
						<i class="fal fa-chevron-right fa-lg text-gray-500"></i>
						<h2 class="text-2xl capitalize mb-0">
							Ko-Fi
						</h2>
					</div>
					<div class="hidden items-center space-x-4">
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
									Configuration
								</div>
								<form action="#" method="POST">
									<div class="shadow sm:rounded-md sm:overflow-hidden">
										<div class="px-4 py-5 bg-white space-y-6 sm:p-6">
											<div class="grid grid-cols-3 gap-6">
												<div class="col-span-3 sm:col-span-2">
													<label for="company-website" class="block text-sm font-medium text-gray-700">
														Website
													</label>
													<div class="mt-1 flex rounded-md shadow-sm">
														<span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
															http://
														</span>
														<input type="text" name="company-website" id="company-website" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="www.example.com" />
													</div>
												</div>
											</div>

											<div>
												<label for="about" class="block text-sm font-medium text-gray-700">
													About
												</label>
												<div class="mt-1">
													<textarea id="about" name="about" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="you@example.com" />
												</div>
												<p class="mt-2 text-sm text-gray-500">
													Brief description for your profile. URLs are hyperlinked.
												</p>
											</div>

											<div>
												<label class="block text-sm font-medium text-gray-700">
													Photo
												</label>
												<div class="mt-1 flex items-center">
													<span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
														<svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
															<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
														</svg>
													</span>
													<button type="button" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
														Change
													</button>
												</div>
											</div>

											<div>
												<label class="block text-sm font-medium text-gray-700">
													Cover photo
												</label>
												<div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
													<div class="space-y-1 text-center">
														<svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
															<path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
														</svg>
														<div class="flex text-sm text-gray-600">
															<label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
																<span>Upload a file</span>
																<input id="file-upload" name="file-upload" type="file" class="sr-only" />
															</label>
															<p class="pl-1">or drag and drop</p>
														</div>
														<p class="text-xs text-gray-500">
															PNG, JPG, GIF up to 10MB
														</p>
													</div>
												</div>
											</div>
										</div>
										<div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
											<button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
												Save
											</button>
										</div>
									</div>
								</form>
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
			saved: {}
		}
	},
	components: {
		Toggle
	},
	watch: {
		's': { // get guild info and posts if guild changes
			handler() {
				this.changed = (JSON.stringify(this.s) !== JSON.stringify(this.saved))
			},
			deep: true
		}
	},
	methods: {
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