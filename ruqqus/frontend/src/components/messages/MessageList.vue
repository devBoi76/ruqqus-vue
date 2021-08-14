<template>
	<div>
		<div v-if="messages">
			<Message v-for="message in messages" :key="message.id" :message="message"/>
		</div>

		<div v-if="!messages">
			<div v-for="i in 4" :key="i" class="mb-2 px-5 py-3 bg-white border border-transparent dark:bg-gray-800">
				<div class="animate-pulse">
					<div class="flex items-center w-full mb-4">
						<div class="flex-shrink-0 bg-gray-100 dark:bg-white dark:bg-opacity-20 rounded-sm w-10 h-10 mr-2"></div>
						<div class="bg-gray-100 dark:bg-white dark:bg-opacity-20 rounded-sm w-32 h-3"></div>
					</div>
					<div class="flex justify-between">
						<div class="w-full">
							<div class="bg-gray-100 dark:bg-white dark:bg-opacity-20 mb-2 w-2/4 h-3 rounded-sm"></div>
							<div class="bg-gray-100 dark:bg-white dark:bg-opacity-20 w-32 h-3 rounded-sm"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Message from "@/components/messages/Message.vue";

	export default {
		name: "message-list",
		props: {
			messages: Array,
			compact: Boolean
		},
		data() {
			return {
			};
		},
		components: {
			Message
		}
	};
</script>
