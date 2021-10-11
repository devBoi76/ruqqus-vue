<template>
	<div class="fixed bottom-4 left-0 right-0 block w-96 bg-clip-padding z-100 mx-auto">
		<div class="space-y-3">
			<transition-group name="toasts"
			enter-active-class="transition-all duration-200 ease-in"
			enter-from-class="opacity-0 translate-y-10"
			enter-to-class="opacity-100"
			leave-active-class="transition-all duration-200 ease-out"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0">
				<Notification v-for="notification in notifications" :key="notification.id" :notification="notification"/>
			</transition-group>
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