<template>
	<div class="fixed bottom-4 md:top-18 md:right-4 space-y-3 w-80 z-100">
		<transition-group name="toasts"
          enter-active-class="transition-all duration-200 ease-in-out"
          enter-from-class="opacity-70 translate-x-10"
          enter-to-class="opacity-100"
          leave-active-class="transition-all duration-200 ease-in-out"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0 translate-x-10">
			<Notification v-for="notification in notifications" :key="notification.id" :notification="notification" class="mx-auto"/>
		</transition-group>
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