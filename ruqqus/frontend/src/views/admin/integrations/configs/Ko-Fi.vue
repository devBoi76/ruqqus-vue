<template>
	<!-- Header content section -->
	<div class="grid grid-cols-12 sticky top-0 z-10">
		<div class="col-span-full 2xl:col-start-2 2xl:col-end-10">
			<div class="flex items-center justify-between px-4 py-3 bg-gray-50 sm:bg-gray-100">
				<div class="flex items-center">
					<h1 class="text-2xl capitalize mb-0">
						Integrations
					</h1>
					<div class="pl-4 flex items-center space-x-4">
						<i class="fal fa-chevron-right fa-lg text-gray-400"></i>
						<h2 class="text-2xl capitalize mb-0">
							Ko-Fi
						</h2>
					</div>
				</div>
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
	<!-- Error state if community data fails to load -->
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
	<!-- Content -->
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
						<div class="sm:rounded-sm border-t border-b sm:border bg-white">
							<div class="flex flex-col md:flex-row p-4">
								<div class="flex flex-col flex-shrink-0">
									<img src="https://i.imgur.com/j87KTfH.png" class="w-14 h-14 md:w-32 md:h-32 object-cover p-4 bg-white border border-gray-100 rounded shadow-inner" alt="kofi logo"/>
									<div class="hidden md:block mt-2">
										<a href="https://ko-fi.com" target="_blank" class="button gray100 text-center">
											Learn more
										</a>
									</div>
								</div>
								<div class="md:pl-4">
									<div class="h4 font-semibold">
										Ko-Fi
									</div>
									<span class="px-2 mb-2 inline-flex uppercase tracking-wide text-2xs leading-5 font-medium rounded-sm bg-gray-100 text-gray-800">
										finance
									</span>
									<p class="text-gray-600">
										Artists, Writers, Podcasters, and all kinds of creators use Ko-fi. It can be a simple tip-jar, a place to build a membership community or a super-easy way to sell products and commissions with just a link! Ko-fi is for anyone who wants to start making an income directly from fans of what they do.
									</p>
								</div>
							</div>
						</div>
						
						<div>
							<div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2">
								Configuration
							</div>
							<div class="sm:rounded-sm border-t border-b sm:border bg-white">
								<div class="p-4 space-y-5 divide-y">
									<div class="grid grid-cols-3 gap-6">
										<div class="col-span-3 sm:col-span-2">
											<label class="label">
												Webhook
											</label>
											<input class="form-input light" v-model="webhook" placeholder="Enter your Ko-Fi account webhook" type="text"/>
											<p class="text-sm text-gray-500 mt-1">
												Webhooks can be found in
												<a href="https://ko-fi.com/manage/webhooks" target="_blank" class="hover:underline">
													Ko-Fi settings
												</a>
											</p>
										</div>
									</div>
									<div class="grid grid-cols-3 gap-6">
										<div class="col-span-3">
											<div class="flex flex-grow items-center justify-between">
												<div>
													<div class="font-semibold leading-tight">
														Designate users who donate
													</div>
													<p class="text-sm text-gray-500 mt-1">
														Applies a 'hasDonated' attribute to members who have donated via Ko-Fi
													</p>
												</div>
												<Toggle v-model="hasDonationAttr"/>
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
	</div>
</template>

<script>
	import Toggle from "@/components/forms/Toggle.vue";

	export default {
		name: "AdminIntegrationsKofiView",
		data() {
			return {
				webhook: '',
				hasDonationAttr: true,
				changed: false,
				loading: false,
				errored: false,
			}
		},
		components: {
			Toggle
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
	}
};
</script>