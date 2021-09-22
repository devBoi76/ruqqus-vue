<template>
	<div>
		<slot :isSaved="isSaved" :isLoading="loading" :hasErrored="errored" :savePost="savePost" :unsavePost="unsavePost"/>
	</div>
</template>

<script>
	export default {
		name: "SavePostButton",
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
		computed: {
			isSaved: {
				get() {
					return this.$store.getters['items/getItemSavedStatus'](this.id);
				},
				set (value) {
					console.log(value)
					this.$store.commit('items/SAVE_ITEM', {type: value, id: this.id});
				}
			}
		},
		watch: {
			errored(newVal, oldVal) {
				if (newVal) {
					this.isSaved = !this.isSaved
				}
				return oldVal
			}
		},
		methods: {
			savePost() {
				this.loading = true
				let id = this.id
				this.$store.dispatch('items/saveItem', id)
				.then(() => {
					this.success = true
					// save success toast
				})
				.catch(error => {
					console.error(error)
					this.errored = true
					// save error toast
				})
				.finally(() => this.loading = false)
			},
			unsavePost() {
				this.loading = true
				let id = this.id
				this.$store.dispatch('items/unsaveItem', id)
				.then(() => {
					this.success = true
					// unsave success toast
				})
				.catch(error => {
					console.error(error)
					this.errored = true
					// unsave error toast
				})
				.finally(() => this.loading = false)
			}
		}
	};
</script>