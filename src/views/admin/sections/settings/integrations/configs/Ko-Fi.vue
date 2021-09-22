<template>
	<!-- Header content section -->
	<div class="grid grid-cols-12 sticky top-0 z-10">
		<div class="col-span-full 2xl:col-start-2 2xl:col-end-10">
			<div class="flex items-center justify-between p-6 md:px-8 bg-white">
				<div class="flex items-center">
					<h1 class="text-2xl capitalize mb-0">
						<router-link to="/admin/integrations" class="text-gray-900">
							Integrations
						</router-link>
					</h1>
					<div class="pl-4 flex items-center space-x-4">
						<i class="fal fa-chevron-right fa-lg text-gray-400"></i>
						<h2 class="text-2xl capitalize mb-0">
							Ko-Fi
						</h2>
					</div>
				</div>
				<div v-if="isActive" class="flex items-center space-x-4">
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
		<div v-if="!loading && !errored" class="col-span-full 2xl:col-start-2 2xl:col-end-10 p-4 md:px-8">
			<div class="p-4">
				<div class="md:grid md:grid-cols-3 md:gap-6">
					<div class="md:col-span-3 space-y-8">
						<div class="pb-4 border-b">
							<div class="flex">
								<div class="flex flex-col flex-shrink-0">
									<img src="https://i.imgur.com/j87KTfH.png" class="w-20 h-20 md:w-32 md:h-32 object-cover p-4 bg-white border rounded shadow-inner" alt="kofi logo"/>
								</div>
								<div class="pl-4">
									<div class="h4 font-semibold">
										Ko-Fi
									</div>
									<span class="px-2 mb-2 inline-flex uppercase tracking-wide text-2xs leading-5 font-medium rounded-sm bg-gray-200 text-gray-800">
										finance
									</span>
									<p class="text-gray-900">
										Get one-time donations and monthly memberships from fans. No fees.
									</p>
									<ul class="flex flex-wrap leading-4 space-x-4" role="none">
										<li class="" role="none">
											<span class="font-semibold text-sm text-gray-700">
												Website
											</span>
											<a href="https://kofi.com" class="text-xs text-gray-500 hover:underline pl-1" role="none">
												kofi.com
											</a>
										</li>
										<li class="" role="none">
											<span class="font-semibold text-sm text-gray-700">
												Docs
											</span>
											<a href="https://help.ko-fi.com" class="text-xs text-gray-500 hover:underline pl-1" role="none">
												help.ko-fi.com
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div>
							<div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2">
								Configuration
							</div>
							<div class="relative rounded-sm border bg-white">
								<div v-show="!isActive" class="absolute w-full h-full rounded-sm bg-white bg-opacity-90 backdrop-blur-sm z-10">
									<div class="w-full h-full flex flex-col items-center justify-center">
										<p class="text-gray-500">
											You have not configured Ko-Fi with your site
										</p>
										<button class="button green500">
											Get started
										</button>
									</div>
								</div>
								<div class="divide-y">
									<div class="grid grid-cols-3 gap-6 p-4">
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
									<div class="grid grid-cols-3 gap-6 p-4">
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
												<Toggle v-model:enabled="hasDonationAttr"/>
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
				isActive: false,
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