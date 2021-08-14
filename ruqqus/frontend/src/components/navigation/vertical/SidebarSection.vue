<template>
	<div class="flex flex-col">
		<slot name="title">
			<div v-if="title" class="h5 capitalize dark:text-gray-200">
				{{ title }}
			</div>
		</slot>
		<slot name="body">
		</slot>
	</div>
</template>

<script>
	export default {
		props: {
			title: String
		},
		data() {
			return {
			};
		},
		computed: {
			customHeaderClass() {
				return this.headerClass ? this.headerClass : 'd-flex align-items-center justify-content-between p-3 border-bottom border-white-13'
			}
		}
	}
</script>
