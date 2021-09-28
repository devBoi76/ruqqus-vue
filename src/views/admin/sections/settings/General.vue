<template>
	<div class="flex flex-col flex-grow overflow-y-auto">

		<!-- Header content section -->
		<div class="grid grid-cols-12 sticky top-0 z-10">
			<div class="col-span-full 2xl:col-start-2 2xl:col-end-10">
				<div class="flex items-center justify-between p-6 md:px-8 bg-white">
					<h1 class="text-2xl mb-0">
						General
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
								Community Info
							</div>
							<div class="sm:rounded-sm border-t border-b sm:border bg-white">
								<ToggleForm @change="handleChange">
									<template v-slot:default="{active, toggle}">
										<div class="p-4">
											<div class="flex items-center justify-between">
												<div>
													<div class="font-semibold leading-tight">
														Name & Description
													</div>
													<p class="text-sm text-gray-500 mt-1">
														The name and description of your community, publicly visible on the web
													</p>
												</div>
												<button class="flex items-center justify-center px-2 w-8 h-8 text-lg text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-sm" @click="toggle" aria-expanded="active">
													<i class="far fa-fw" :class="active ? 'fa-compress-alt' : 'fa-pen'"></i>
												</button>
											</div>
											<div v-if="active" class="space-y-6 mt-6">
												<div class="grid grid-cols-3 gap-6">
													<div class="col-span-3 sm:col-span-2">
														<label class="label">
															Community name
														</label>
														<input class="form-input light" v-model="innerSite.name" :placeholder="$route.params.name" type="text"/>
														<p class="text-sm text-gray-500 mt-1">
															This does not affect your community web address
														</p>
													</div>
												</div>
												<div class="grid grid-cols-3 gap-6">
													<div class="col-span-3 sm:col-span-2">
														<div class="relative">
															<label class="label">
																Community tagline
															</label>
															<textarea class="form-textarea light" v-model="innerSite.tagline" type="text" rows="3" maxlength="140" placeholder="A community residing on the world wide web."/>
															<div v-if="innerSite.tagline" class="absolute text-xs font-semibold text-gray-400 right-3 bottom-2" :class="{'text-red-500':innerSite.tagline.length >= 140}">
																{{ 140 - innerSite.tagline.length }}
															</div>
														</div>
														<p class="text-sm text-gray-500 mt-1">
															Descriptive text used in social images and banner artwork
														</p>
													</div>
												</div>
<!-- 													<div class="grid grid-cols-3 gap-6">
														<div class="col-span-3 sm:col-span-2">
															<div class="relative">
																<Editor @input="getEditorContent" v-model="innerSite.description" :limit="5000" @click.prevent/>
																<div v-if="innerSite.description" class="absolute text-xs font-semibold text-gray-400 right-3 bottom-2" :class="{'text-red-500':innerSite.description >= 1000}">
																	{{ 1000 - innerSite.description }}
																</div>
															</div>
															<p class="text-sm text-gray-500 mt-1">
																A full description of the guild. <i class="fab fa-markdown"></i> markdown supported
															</p>
														</div>
													</div> -->
												</div>
											</div>
										</template>
									</ToggleForm>
								</div>
							</div>

							<div>
								<div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2">
									Community Branding
								</div>
								<div class="sm:rounded-sm border-t border-b sm:border bg-white divide-y">
									<div class="p-4">
										<div class="flex items-center justify-between">
											<div>
												<div class="font-semibold leading-tight">
													Icon
												</div>
												<p class="text-sm text-gray-500 mt-1">
													The artwork used to represent your community
												</p>
											</div>
											<img :src="innerSite.iconUrl" class="w-11 h-11 rounded-sm bg-gray-100 object-cover" alt="guild icon artwork"/>
										</div>
									</div>
									<div class="p-4">
										<div class="flex items-center justify-between">
											<div>
												<div class="font-semibold leading-tight">
													Cover
												</div>
												<p class="text-sm text-gray-500 mt-1">
													The cover artwork displayed across your community
												</p>
											</div>
											<img :src="innerSite.coverUrl" class="w-48 h-11 rounded-sm bg-gray-100 object-cover" alt="guild cover artwork"/>
										</div>
									</div>
									<div class="p-4">
										<div class="flex flex-grow items-center justify-between">
											<div>
												<div class="font-semibold leading-tight">
													Display icon in site header
												</div>
												<p class="text-sm text-gray-500 mt-1">
													Enable to display the icon in the navigation bar
												</p>
											</div>
											<Toggle v-model:enabled="innerSite.hasIcon"/>
										</div>
									</div>
									<div class="p-4">
										<div class="flex flex-grow items-center justify-between">
											<div>
												<div class="font-semibold leading-tight">
													Display cover artwork
												</div>
												<p class="text-sm text-gray-500 mt-1">
													Enable to display the cover with the site name and tagline
												</p>
											</div>
											<Toggle v-model:enabled="innerSite.hasBanner"/>
										</div>
									</div>
								</div>
							</div>

							<div>
								<div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2">
									Community Meta Details
								</div>
								<div class="sm:rounded-sm border-t border-b sm:border bg-white">
									<ToggleForm @change="handleChange">
										<template v-slot:default="{active, toggle}">
											<div class="p-4">
												<div class="flex items-center justify-between">
													<div>
														<div class="font-semibold leading-tight">
															Meta data
														</div>
														<p class="text-sm text-gray-500 mt-1">
															Additional site details for search engines
														</p>
													</div>
													<button class="flex items-center justify-center px-2 w-8 h-8 text-lg text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-sm" @click="toggle" aria-expanded="active">
														<i class="far fa-fw" :class="active ? 'fa-compress-alt' : 'fa-pen'"></i>
													</button>
												</div>
												<div v-if="active" class="space-y-6 mt-6">
													<div class="grid grid-cols-3 gap-6">
														<div class="col-span-3 sm:col-span-2">
															<label class="label">
																Meta title
															</label>
															<div class="relative">
																<input class="form-input light" v-model="innerSite.meta.title" :placeholder="innerSite.name" type="text"/>
																<div v-if="innerSite.meta.title.length" class="absolute text-xs font-semibold text-gray-400 right-3 bottom-2" :class="{'text-yellow-500':innerSite.meta.title.length >= 60}">
																	{{ 60 - innerSite.meta.title.length }}
																</div>
															</div>
															<p class="text-sm text-gray-500 mt-1">
																We recommend 60 characters or less
															</p>
														</div>
													</div>
													<div class="grid grid-cols-3 gap-6">
														<div class="col-span-3 sm:col-span-2">
															<div class="relative">
																<label class="label">
																	Meta description
																</label>
																<textarea class="form-textarea light" v-model="innerSite.meta.description" type="text" rows="3" maxlength="140" placeholder="A community residing on the world wide web."/>
																<div v-if="innerSite.meta.description.length" class="absolute text-xs font-semibold text-gray-400 right-3 bottom-2" :class="{'text-red-500':innerSite.meta.description.length >= 140}">
																	{{ 140 - innerSite.meta.description.length }}
																</div>
															</div>
															<p class="text-sm text-gray-500 mt-1">
																Briefly describe what your community is about
															</p>
														</div>
													</div>
													<div class="grid grid-cols-3 gap-6">
														<div class="col-span-3 sm:col-span-2">
															<label class="label">
																Search engine preview
															</label>
															<div class="p-5 bg-white border rounded">
																<div class="text-xs text-gray-900 leading-tight mb-1">
																	https://{{ innerSite.domain }}
																</div>
																<div class="text-[#1a0dab] text-xl font-medium">
																	{{ innerSite.meta.title || innerSite.name }}
																</div>
																<p class="text-sm text-gray-700 mt-1">
																	{{ innerSite.meta.description || `${innerSite.name} - A community powered by Ruqqus` }}
																</p>
															</div>
														</div>
													</div>
												</div>
											</div>
										</template>
									</ToggleForm>
								</div>
							</div>

							<div>
								<div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2">
									Community Rating
								</div>
								<div class="sm:rounded-sm border-t border-b sm:border bg-white">
									<div class="p-4">
										<div class="flex flex-grow items-center justify-between">
											<div>
												<div class="font-semibold leading-tight">
													NSFW
												</div>
												<p class="text-sm text-gray-500 mt-1">
													Enable if your community contains NSFW content suitable only for adults
												</p>
											</div>
											<Toggle v-model:enabled="innerSite.isNsfw"/>
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
import { defineAsyncComponent } from 'vue'

import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';

const Toggle = defineAsyncComponent(() => import('@/components/forms/Toggle.vue'));
const ToggleForm = defineAsyncComponent(() => import('@/components/Toggle.vue'));
const Editor = defineAsyncComponent(() => import('@/components/editors/Editor_V2.vue'));

export default {
	name: "SiteSettingsGeneral",
	components: {
		Toggle,
		ToggleForm,
		Editor
	},
	data() {
		return {
			loading: false,
			errored: false,
			isDifferent: false,
			site: this.$store.getters['site/getSite'],
			innerSite: {}
		}
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
	methods: {
		getSite() {
			this.$store.dispatch('site/fetchSite')
			.then(() => {
				this.innerSite = cloneDeep(this.site);
			})
			.catch(error => {
				console.error(error)
				this.errored = true

			})
			.finally(() => this.loading = false)
		},
		// save() {
		// 	this.$store.dispatch('site/submitSiteSettings', this.innerSite)
		// 	.then(() => {
		// 		console.log("submitSiteSettings dispatch successful");
		// 		this.innerSite = cloneDeep(this.site);
		// 		console.log(this.innerSite);
		// 	})
		// 	.catch(error => {
		// 		console.error(error)
		// 		this.errored = true

		// 	})
		// 	.finally(() => this.loading = false)
		// }
	},
	created() {
		this.getSite()
		//this.innerSite = {...this.site}
		this.isDifferent = false;
	}
};
</script>