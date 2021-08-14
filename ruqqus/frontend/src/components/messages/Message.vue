<template>
	<div class="group flex relative mb-4 px-5 py-2" :class="selected.id === message.id ? 'shadow-inset-primary bg-gray-100' : 'hover:bg-gray-100'">
		<img
		:src="message.profile_url"
		class="w-10 h-10 object-cover flex-shrink-0 mr-3 rounded-sm"
		alt="profile-picture"
		/>
		<div class="dark:text-gray-100">
			<div class="space-x-1 text-sm leading-4 mb-0.5">
				<span class="font-bold">
					{{ message.username }}
				</span>
				<span class="text-xs text-gray-500 font-normal">
					Just now
				</span>
			</div>
			<span v-html="message.text">
			</span>
		</div>
		<!-- Actions -->
		<div class="absolute right-5 -top-4 flex items-center bg-white border rounded-sm transform scale-0 group-hover:scale-100 transition duration-200">
			<button class="h-7 px-2 text-xs text-gray-700 hover:text-gray-900 font-medium capitalize" @click="reply()">
				<i class="fas fa-reply fa-sm fa-fw mr-1"></i>
				Reply
			</button>
		</div>
	</div>
</template>

<script>
// Import components
import { mapState, mapActions } from "vuex"

export default {
	props: {
		message: Object
	},
	data() {
		return {
		};
	},
	components: {
	},
	computed: {
		...mapState('chat', ['selected'])
	},
	methods: {
		...mapActions('chat', ['pushMessage']),
		reply() {
			this.pushMessage(this.message)
		}
	}
};
</script>

<style scoped>
p {
	@apply last:mb-0;
}
.shadow-inset-primary {
	box-shadow: inset 2px 0 0 rgba(var(--color-primary))
}
</style>
