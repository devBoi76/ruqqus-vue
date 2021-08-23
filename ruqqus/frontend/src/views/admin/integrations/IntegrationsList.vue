<template>
	<!-- Header content section -->
	<div class="grid grid-cols-12 sticky top-0 z-10">
		<div class="col-span-full 2xl:col-start-2 2xl:col-end-10">
			<div class="flex items-center justify-between px-4 py-3 bg-gray-50 sm:bg-gray-100">
				<div class="flex items-center">
					<h1 class="text-2xl capitalize mb-0">
						Integrations
					</h1>
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
						<div class="flex flex-wrap -mt-2 -mx-2 overflow-hidden">
							<div v-for="(item, index) in integrations" :key="index" v-show="!item.isActive" class="my-2 px-2 w-full overflow-hidden md:w-1/4">
								<div class="flex flex-col justify-between h-full sm:p-4 p-5 bg-white border rounded-sm">
									<div class="flex flex-col items-center mb-4">
										<img :src="item.logo" class="w-9 h-9 object-cover"/>
										<div class="text-center mt-2">
											<div class="font-semibold">
												{{ item.name }}
											</div>
											<p class="text-sm text-gray-500 mt-1">
												{{ item.description }}
											</p>
										</div>
									</div>
									<router-link :to="`/admin/integrations/${item.name}`" custom v-slot="{ navigate }">
										<button class="button gray100" @click="navigate" @keypress.enter="navigate" role="link">
											Connect
										</button>
									</router-link>
								</div>
							</div>
						</div>
						<div>
							<div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2">
								Your Integrations
							</div>
							<div v-if="activeIntegrations.length" class="sm:rounded-sm border-t border-b sm:border bg-white hover:bg-gray-50 divide-y">
								<div v-for="(item, index) in activeIntegrations" :key="index" class="flex items-center justify-between px-4 py-3">
									<div class="flex items-center">
										<img :src="item.logo" class="w-9 h-9 object-cover"/>
										<div class="pl-4 pr-8">
											<div class="flex items-center">
												<span class="font-semibold">
													{{ item.name }}
												</span>
												<span class="ml-2 px-2 inline-flex text-xs leading-5 font-medium rounded-sm bg-green-100 text-green-800">
													active
												</span>
											</div>
											<p class="text-sm text-gray-500 mt-1">
												{{ item.description }}
											</p>
										</div>
									</div>
									<router-link :to="`/admin/integrations/${item.name}`" custom v-slot="{ navigate }">
										<button class="button linkGray400" @click="navigate" @keypress.enter="navigate" role="link">
											Manage
											<i class="far fa-chevron-right fa-fw pl-1"></i>
										</button>
									</router-link>
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
</template>

<script>
	export default {
		name: "AdminIntegrationsListView",
		data() {
			return {
				loading: false,
				errored: false,
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
				},
				{
					logo: 'https://i.imgur.com/ds1CNei.png',
					name: 'PayPal',
					description: 'Collect one-time payments',
					isActive: true
				},
				{
					logo: 'https://i.imgur.com/j87KTfH.png',
					name: 'Ko-Fi',
					description: 'Collect one-time and recurring donations with zero fees',
					isActive: false
				}
				]
			}
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
		}
	};
</script>