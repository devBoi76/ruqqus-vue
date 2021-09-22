<template>
	<div>
		<slot :loading="loading" :success="success" :errored="errored"/>
	</div>
</template>

<script>
	export default {
		name: "DeletePostButton",
		props: {
			id: String
		},
		data() {
			return {
				loading: false,
				success: false,
				errored: false,
			};
		},
		methods: {
			deletePost() {
				this.loading = true
				let id = this.id
				this.$store.dispatch('items/deleteItem', id)
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