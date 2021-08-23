<template>
	<div class="flex flex-col flex-grow overflow-y-auto">
		<router-view></router-view>
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
			}
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