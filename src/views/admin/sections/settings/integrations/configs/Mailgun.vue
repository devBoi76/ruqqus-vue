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
							Mailgun
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
				<div class="md:grid md:grid-cols-3 md:gap-6">
					<div class="md:col-span-3 space-y-8">
						<div class="pb-4 border-b">
							<div class="flex">
								<div class="flex flex-col flex-shrink-0">
									<img src="https://i.imgur.com/LVtkHwo.png" class="w-20 h-20 md:w-32 md:h-32 object-cover p-4 bg-white border rounded shadow-inner" alt="kofi logo"/>
								</div>
								<div class="pl-4">
									<div class="h4 font-semibold">
										Mailgun
									</div>
									<span class="px-2 mb-2 inline-flex uppercase tracking-wide text-2xs leading-5 font-medium rounded-sm bg-gray-200 text-gray-800">
										communication
									</span>
									<p class="text-gray-900">
										Easily send transactional emails to communicate with your users at scale.
									</p>
									<ul class="flex flex-wrap leading-4 space-x-4" role="none">
										<li class="" role="none">
											<span class="font-semibold text-sm text-gray-700">
												Website
											</span>
											<a href="https://mailgun.com" class="text-xs text-gray-500 hover:underline pl-1" role="none">
												mailgun.com
											</a>
										</li>
										<li class="" role="none">
											<span class="font-semibold text-sm text-gray-700">
												Docs
											</span>
											<a href="https://documentation.mailgun.com/en/latest/" class="text-xs text-gray-500 hover:underline pl-1" role="none">
												documentation.mailgun.com
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
								<div v-show="!isActive & !formVisible" class="absolute w-full h-full rounded-sm bg-white bg-opacity-90 backdrop-blur-sm z-10">
									<div class="w-full h-full flex flex-col items-center justify-center">
										<p class="text-gray-500">
											You have not configured Mailgun with your site
										</p>
										<button class="button green500" @click="toggleForm()">
											Get started
										</button>
									</div>
								</div>
								<form class="divide-y">
									<div class="grid grid-cols-3 gap-6 p-4">
										<div class="col-span-3 sm:col-span-2">
											<label class="label">
												API key
												<span class="text-xs text-orange-500">
													(required)
												</span>
											</label>
											<input required class="form-input light" v-model="webhook" placeholder="Enter your Mailgun API key" type="text"/>
											<p class="text-sm text-gray-500 mt-1">
												Mailgun api keys are granted after you link a sub-domain in the Mailgun
												<a href="https://app.mailgun.com/app/dashboard" target="_blank" class="hover:underline">
													dashboard
												</a>
											</p>
										</div>
									</div>
									<div class="grid grid-cols-3 gap-6 p-4">
										<div class="col-span-3 sm:col-span-2">
											<label class="label">
												Mailgun domain
												<span class="text-xs text-orange-500">
													(required)
												</span>
											</label>
											<input required class="form-input light" v-model="webhook" placeholder="e.g. mail.example.com" type="text"/>
											<p class="text-sm text-gray-500 mt-1">
												The custom sub-domain that you linked in the Mailgun dashboard
											</p>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "AdminIntegrationsMailgunView",
		data() {
			return {
				formVisible: false,
				isActive: false,
				webhook: '',
				hasDonationAttr: true,
				changed: false,
				loading: false,
				errored: false,
			}
		},
		components: {
		},
		methods: {
			toggleForm() {
				this.formVisible = !this.formVisible
			}
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