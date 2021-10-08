<template>
	<div class="fixed mx-auto bottom-4 md:top-18 md:right-4 space-y-3 w-80 z-100">
		<transition-group name="toasts"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0">
			<Notification v-for="notification in notifications" :key="notification.id" :notification="notification"/>
		<transition-group/>
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