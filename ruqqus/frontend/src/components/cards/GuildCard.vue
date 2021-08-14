<template>
	<router-link :to="`/+${guild.name}`" class="group relative block rounded-sm transition duration-100">
		<img
		v-lazy="guild.banner_url"
		class="block w-full h-36 object-cover rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 group-hover:shadow-sm"
		:alt="`${guild.name}-banner`"
		/>
		<div class="p-3 -mt-9">
			<div class="inline-block p-1 bg-white rounded-md mb-1 shadow-sm">
				<img v-lazy="guild.profile_url" class="w-11 h-11 rounded-sm object-cover flex-shrink-0" :alt="`${guild.name}-icon`"/>
			</div>
			<div class="text-lg text-gray-900 font-bold">+{{ guild.name }}</div>
			<p class="text-sm text-gray-500 mt-1">{{ guild.description || 'No description :/' }}</p>
		</div>
		<div class="p-3 space-y-2">
			<div class="flex items-center space-x-4 text-xs text-gray-500 leading-tight capitalize">
				<span>
					<i class="far fa-user fa-sm fa-fw pr-1"></i>{{ guild.subscriber_count || 0 }} {{ guild.subscriber_count === 1 ? 'member' : 'members'}}
				</span>
				<span>
					<i class="far fa-hashtag fa-sm fa-fw pr-1"></i>{{ guild.category || 'Uncategorized' }}
				</span>
			</div>
			<t-button variant="outlineGray200" class="hidden w-full">Join</t-button>
		</div>
	</router-link>
</template>

<script>
// import components

export default {
	props: {
		route: Object,
		guild: Object
	},
	components: {
	},
	data() {
		return {
		}
	},
	computed: {
	},
	methods: {
	}
};
</script>