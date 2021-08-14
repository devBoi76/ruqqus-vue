<template>
	<div class="flex flex-grow">

		<div class="hidden md:flex flex-col flex-shrink-0 w-80 bg-gray-50 border-r dark:bg-gray-800 dark:border-white dark:border-opacity-10">

			<div class="flex items-center justify-between flex-shrink-0 h-16 p-4 bg-white border-b">
				<div>
					<div class="text-lg font-bold dark:text-gray-100">Messages</div>
				</div>
				<button class="flex items-center justify-center rounded-sm bg-purple-500 hover:bg-purple-600 border border-purple-500 px-3 py-1.5 font-bold text-sm text-white transform active:scale-95">
					<i class="fas fa-envelope pr-2"></i>Compose
				</button>
			</div>

			<vue-scroll>
				<router-link :to="{ name: 'personal-conversation-view' }" class="flex items-center flex-shrink-0 h-16 px-3 py-2 active unread border-b border-white-13">
					<img src="https://placekitten.com/300/300" class="flex-shrink-0 w-9 h-9 rounded-sm mr-2"/>
					<div>
						<div class="font-bold text-purple-500">@calmcat</div>
						<div class="text-xs text-gray-500 dark:text-gray-400">Thanks for the li...</div>
					</div>
					<div class="ml-auto text-gray-400 text-sm">1 day</div>
				</router-link>
			</vue-scroll>

		</div>

		<!-- Main content section -->
		<router-view></router-view>

	</div>
</template>

<script>
	export default {
		name: "GuildSettingsView",
		components: {
		//Leftbar,
		//Sidebar
	},
	computed: {
		darkMode() {
			return this.$store.state.persist.darkMode
		}
	}
}
</script>