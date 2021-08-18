<template>
	<div>
		<slot :loading="loading" :success="success" :errored="errored">
		</slot>
	</div>
</template>

<script>
	export default {
		name: "DeletePostButton",
		props: {
			guild: String
		},
		data() {
			return {
				loading: false,
				success: false,
				errored: false
			};
		},
		components: {
		},
		computed: {
		},
		methods: {
			joinGuild() {
				this.loading = true
				let guild = this.guild
				this.$store.dispatch('guilds/joinGuild', guild)
				.then(() => {
					this.success = true
				})
				.catch(error => {
					console.error(error)
					this.errored = true

				})
				.finally(() => this.loading = false)
			},
		}
	};
</script>