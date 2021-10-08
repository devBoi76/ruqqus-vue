<template>
	<div class="fixed mx-auto bottom-4 md:top-18 md:right-4 w-full space-y-3 z-50">
		<Notification v-for="notification in notifications" :key="notification.id" :notification="notification"/>
	</div>
</template>

<script>
	import Notification from "@/components/notifications/Toast.vue"
	import { mapState } from "vuex";

	export default {
		components: {
			Notification
		},
		computed: {
			...mapState("toasts", ["notifications"])
		}
	}
</script>