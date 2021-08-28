<template>
	<div class="flex flex-col flex-grow overflow-y-auto">

		<!-- Header content section -->
		<div class="grid grid-cols-12 sticky top-0 z-10">
			<div class="col-span-full 2xl:col-start-2 2xl:col-end-10">
				<div class="flex items-center justify-between p-6 md:px-8 bg-white">
					<h1 class="text-2xl capitalize mb-0">
						Design
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

			<div v-if="!loading && !errored" class="col-span-full 2xl:col-start-2 2xl:col-end-10 p-4 md:px-8">
				<div class="md:grid md:grid-cols-3 md:gap-6">
					<div class="mt-5 md:mt-0 md:col-span-3 space-y-8">
						<div>
							<div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2">
								Community Colors
							</div>
							<div class="sm:rounded-sm border-t border-b sm:border bg-white">
								<Toggle @change="handleChange">
									<template v-slot:default="{active, toggle}" class="p-4">
										<div class="p-4">
											<div class="flex items-center justify-between">
												<div>
													<div class="font-medium leading-tight">
														Primary color
													</div>
													<p class="text-sm text-gray-500 mt-1">
														The primary color for your community's look
													</p>
												</div>
												<button class="flex items-center justify-center px-2 w-8 h-8 text-lg text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-sm" @click="toggle" aria-expanded="active">
													<i class="far fa-fw" :class="active ? 'fa-compress-alt' : 'fa-pen'"></i>
												</button>
											</div>
											<div v-if="active" class="space-y-6 mt-6">
												<div class="grid grid-cols-3 gap-6">
														<div class="col-span-3 md:col-span-1">
														<ul class="flex flex-wrap -m-1 mb-2 md:w-[289px]">
															<li v-for="swatch in primarySwatches" :key="swatch" class="p-1">
																<label :for="swatch" class="flex flex-shrink-0 w-6 h-6 shadow-inner rounded-sm" :style="{ 'background-color': swatch }">
																	<input type="checkbox" class="invisible" :id="swatch" :value="swatch" v-model="primaryColor"/>
																</label>
															</li>
														</ul>
														<input type="text" v-model="primaryColor" placeholder="#FFFFFF" class="form-input light sm:w-[200px]"/>
													</div>
												</div>
											</div>
										</div>
									</template>
								</Toggle>
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
const Toggle = defineAsyncComponent(() => import('@/components/Toggle.vue'));

export default {
	name: "AdminDesignView",
	components: {
		Toggle
	},
	data() {
		return {
			loading: false,
			errored: false,
			primaryColor: null,
			primarySwatches: ['#C53030', '#F97316', '#ECC94B', '#22C55E', '#14B8A6', '#0EA5E9', '#6366F1', '#8B5CF6', '#EC4899', '#9B2C2C', '#C2410C', '#B7791F','#15803D', '#0F766E', '#0369A1', '#4338CA', '#5B21B6', '#9D174D']
		}
	},
	computed: {
		// g() {
		// 	return this.$store.getters['guild/getGuild'](this.$route.params.name);
		// }
	},
	watch: {
		// '$route.params.name': { // get guild info and posts if guild changes
		// 	handler() {
		// 		if (this.g == null) {
		// 			this.loading = true;
		// 			this.errored = false;
		// 			this.getGuildInfo()
		// 		} else {
		// 			this.loading = false;
		// 		}
		// 	},
		// 	immediate: true
		// }
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