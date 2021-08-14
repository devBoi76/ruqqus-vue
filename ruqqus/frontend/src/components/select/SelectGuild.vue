<template>
	<t-rich-select
	:fetch-options="fetchGuild"
	:placeholder="'+' + $route.params.name"
	value-attribute="full_name"
	text-attribute="full_name"
	:minimum-input-length="1"
	maxHeight="240px"
	class="max-w-sm mx-auto"
	noResultsText="No matching guilds my lord :/"
	>

	<template slot="label" slot-scope="{ option }">
		<div class="flex items-center truncate">
			<span class="flex-shrink-0">
				<img
				class="w-4 h-4 rounded-sm bg-primary"
				:src="option.raw.profile_url"
				>
			</span>
			<div class="flex flex-col w-full ml-2 text-gray-800">
				<span class="font-bold">
					+{{ option.raw.name }}
				</span>
			</div>
		</div>
	</template>

	<template slot="option" slot-scope="{ index, isHighlighted, isSelected, className, option }">
		<div :class="className">
			<span class="flex-shrink-0">
				<img
				class="w-9 h-9 rounded-sm bg-primary"
				:src="option.raw.profile_url"
				>
			</span>
			<div class="flex flex-col w-full ml-2 text-gray-800">
				<span class="font-bold">
					+{{ option.raw.name }}
					<span v-if="isSelected">- selected</span>
				</span>
				<span class="flex items-center space-x-1 text-xs leading-tight text-gray-500">
					<span>{{ option.raw.subscriber_count }} members</span>
				</span>
			</div>
		</div>
	</template>
</t-rich-select>
</template>

<script>
	export default {
		data() {
			return {
				results: []
			}
		},
		components: {
		},
		computed: {
		},
		methods: {
			fetchGuild (query) {
				if (!query) {
					let name = this.$route.params.name || 'general'
					return fetch('/api/vue/core/+' + name)
					.then((response) => response.json())
					.then((data) => ({ results: data.data }))
				}

				return fetch('/api/vue/search?q=%2B' + query)
				.then((response) => response.json())
				.then((data) => ({ results: data.data }))
			}
		},
		created() {
			this.fetchGuild();
		}
	}
</script>