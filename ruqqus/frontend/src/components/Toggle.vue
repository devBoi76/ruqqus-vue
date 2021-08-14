<template>  
	<component :is="tag">
		<slot :active="active" :toggle="toggle"></slot>
	</component>
</template>

<script>
	export default {
		props: {
			tag: {
				type: String,
				default: 'div'
			}
		},
		data() {
			return {
				active: false
			}
		},
		methods: {
			toggle() {
				this.active = !this.active;
				this.$emit("change", this.active);
			}
		}
	}
</script>