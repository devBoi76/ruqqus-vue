<template>
	<div class="flex flex-col">
		<div class="h5 capitalize">Description</div>
		<div v-if="!loading && g" v-html="g.description_html" class="p-4 bg-white sm:shadow-xs sm:rounded-sm"></div>
		<div v-show="loading" class="sm:p-4 bg-white sm:rounded-sm space-y-6">
			<div>
				<div class="bg-gray-100 dark:bg-white dark:bg-opacity-20 mb-2 w-2/4 h-4 rounded-sm"></div>
				<div class="bg-gray-100 dark:bg-white dark:bg-opacity-20 w-1/4 h-4 rounded-sm"></div>
			</div>
			<div>
				<div class="bg-gray-100 dark:bg-white dark:bg-opacity-20 mb-2 w-3/4 h-3 rounded-sm"></div>
				<div class="bg-gray-100 dark:bg-white dark:bg-opacity-20 w-1/3 h-3 rounded-sm"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "GuildAboutView",
		data() {
			return {
				loading: true,
				errored: false
			};
		},
		computed:{
			g() {
				return this.$store.getters['guild/getGuild'](this.$route.params.name);
			}
		},
		watch: {
		'$route.params.name': { // get guild info and posts if guild changes
			handler() {
				if (this.g == null) {
					this.loading = true;
					this.errored = false;
					this.getGuildInfo()
				} else {
					this.loading = false;
				}
			},
			immediate: true
		}
	},
	methods: {
		getGuildInfo() {
			let guild = this.$route.params.name
			this.$store.dispatch('guild/fetchGuild', guild)
			.then(() => {
				console.log("getGuild dispatch successful")
			})
			.catch(error => {
				console.error(error)
				this.errored = true

			})
			.finally(() => this.loading = false)
		}
	}
}
</script>