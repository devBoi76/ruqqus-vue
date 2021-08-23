<template>
	<div class="flex flex-wrap -mt-2 -mx-2 overflow-hidden">
		<div v-for="(item, index) in integrations" :key="index" class="my-2 px-2 w-full overflow-hidden md:w-1/2">
			<div class="justify-between sm:p-4 p-5 bg-white border rounded-sm" :class="item.isActive ? 'hidden' : 'flex'">
				<div class="flex">
					<img :src="item.logo" class="w-9 h-9 md:w-12 md:h-12 object-cover"/>
					<div class="pl-4 pr-8">
						<div class="font-semibold">
							{{ item.name }}
						</div>
						<p class="text-sm text-gray-500 mt-1">
							{{ item.description }}
						</p>
					</div>
				</div>
				<button class="button gray200">
					Connect
				</button>
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
				<button class="button linkGray400">
					Manage
					<i class="far fa-chevron-right fa-fw pl-1"></i>
				</button>
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
</template>

<script>

export default {
	name: "AdminIntegrationsView",
	data() {
		return {
			changed: false,
			loading: false,
			errored: false,
			s: {},
			saved: {},
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