<template>
	<div>
		<Notification v-for="notification in notifications" :key="notification.id" :notification="notification"/>
	</div>
</template>

<script>
	import Notification from "@/components/notifications/Notification.vue"
	//import { mapState } from "vuex";

	export default {
		props: {
			notifications: Array
		},
		components: {
			Notification
		},
		computed: {
			//...mapState("notifications", ["notifications"])
		}
	}
</script>