<template>
	<div class="flex flex-col flex-grow overflow-y-auto">

		<!-- Header content section -->
		<div class="grid grid-cols-12 sticky top-0 z-10">
			<div class="col-span-full 2xl:col-start-2 2xl:col-end-10">
				<div class="flex items-center justify-between px-4 py-3 bg-gray-50 sm:bg-gray-100">
					<h1 class="text-2xl mb-0">
						General
					</h1>
					<button v-if="!loading && !errored" class="button purple500">
						Save
					</button>
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
									Community Info
								</div>
								<div class="sm:rounded-sm sm:shadow-xs border-t border-b sm:border-0 bg-white">
									<ToggleForm @change="handleChange">
										<template v-slot:default="{active, toggle}">
											<div class="p-4">
												<div class="flex items-center justify-between">
													<div>
														<div class="font-bold leading-tight">
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
															<input class="form-input" v-model="s.name" :placeholder="$route.params.name" type="text"/>
															<p class="text-sm text-gray-500 mt-1">
																This does not affect your community web address
															</p>
														</div>
													</div>
													<div class="grid grid-cols-3 gap-6">
														<div class="col-span-3 sm:col-span-2">
															<div class="relative">
																<textarea class="form-textarea" v-model="s.tagline" type="text" rows="3" maxlength="140" placeholder="A community residing on the world wide web."/>
																<div v-if="s.tagline" class="absolute text-xs font-semibold text-gray-400 right-3 bottom-2" :class="{'text-red-500':s.tagline.length >= 140}">
																	{{ 140 - s.tagline.length }}
																</div>
															</div>
															<p class="text-sm text-gray-500 mt-1">
																Used for search engine results. Markdown not supported
															</p>
														</div>
													</div>
													<div class="grid grid-cols-3 gap-6">
														<div class="col-span-3 sm:col-span-2">
															<div class="relative">
																<Editor @input="getEditorContent" v-model="s.description" :limit="5000" @click.prevent/>
																<div v-if="s.description" class="absolute text-xs font-semibold text-gray-400 right-3 bottom-2" :class="{'text-red-500':s.description >= 1000}">
																	{{ 1000 - s.description }}
																</div>
															</div>
															<p class="text-sm text-gray-500 mt-1">
																A full description of the guild. <i class="fab fa-markdown"></i> markdown supported
															</p>
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
									Community Branding
								</div>
								<div class="sm:rounded-sm sm:shadow-xs border-t border-b sm:border-0 bg-white">
									<div class="p-4 border-b">
										<div class="flex items-center justify-between">
											<div>
												<div class="font-bold leading-tight">
													Icon
												</div>
												<p class="text-sm text-gray-500 mt-1">
													The artwork used to represent your community
												</p>
											</div>
											<img :src="s.iconUrl" class="w-11 h-11 rounded-sm bg-gray-100 object-cover" alt="guild icon artwork"/>
										</div>
									</div>
									<div class="p-4">
										<div class="flex items-center justify-between">
											<div>
												<div class="font-bold leading-tight">
													Cover
												</div>
												<p class="text-sm text-gray-500 mt-1">
													The cover artwork displayed across your community
												</p>
											</div>
											<img :src="s.bannerUrl" class="w-48 h-11 rounded-sm bg-gray-100 object-cover" alt="guild cover artwork"/>
										</div>
									</div>
								</div>
							</div>

							<div>
								<div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2">
									Content Rating
								</div>
								<div class="sm:rounded-sm sm:shadow-xs border-t border-b sm:border-0 bg-white">
									<div class="p-4">
										<div class="flex flex-grow items-center justify-between">
											<div>
												<div class="font-bold leading-tight">
													NSFW
												</div>
												<p class="text-sm text-gray-500 mt-1">
													Enable if your community contains NSFW content suitable only for adults
												</p>
											</div>
											<toggle v-model="s.isNsfw"/>
										</div>
									</div>
								</div>
							</div>

							<div>
								<div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2">
									Miscellaneous
								</div>
								<div class="sm:rounded-sm sm:shadow-xs border-t border-b sm:border-0 bg-white">
									<div class="p-4">
										<div class="flex flex-grow items-center justify-between">
											<div>
												<div class="font-bold leading-tight">
													Disable Downvotes
												</div>
												<p class="text-sm text-gray-500 mt-1">
													Removes downvote buttons from all content (posts and comments)
												</p>
											</div>
											<Toggle v-model="s.canDownvote"/>
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
import { defineAsyncComponent } from 'vue'
import Toggle from "@/components/forms/Toggle.vue";

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
			errored: false
		}
	},
	computed: {
		s() {
			return this.$store.getters['site/getSite'];
		}
	},
	methods: {
		// getGuildInfo() {
		// 	let guild = this.$route.params.name
		// 	this.$store.dispatch('guild/fetchGuild', guild)
		// 	.then(() => {
		// 		console.log("getGuild dispatch successful")
		// 	})
		// 	.catch(error => {
		// 		console.error(error)
		// 		this.errored = true

		// 	})
		// 	.finally(() => this.loading = false)
		// }
	}
};
</script>