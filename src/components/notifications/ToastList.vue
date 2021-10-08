<template>
	<div class="fixed left-0 bottom-4 md:top-18 md:right-4 w-72 space-y-3 z-50">
		<div class="mx-auto">
			<Notification v-for="notification in notifications" :key="notification.id" :notification="notification"/>
		</div>
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