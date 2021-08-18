<template>
	<div class="mt-5 first:mt-0">
		<!-- List of Comments -->
		<div v-if="comments.length">
			<Comment v-for="comment in comments" :key="comment.id" :comment="comment" :offset="offset" :limit="windowWidth >= 640 ? 7 : 3"></Comment>
		</div>
		<!-- Skeleton Loading -->
		<div v-else>
			<div v-for="i in 2" :key="i" class="mb-6 last:mb-0">
				<div class="flex animate-pulse">
					<div class="mr-2">
						<div class="flex-shrink-0 bg-gray-200 dark:bg-white dark:bg-opacity-10 rounded-sm w-8 h-8"></div>
					</div>
					<div class="w-full">
						<div class="bg-gray-200 dark:bg-white dark:bg-opacity-10 rounded-sm mb-3 w-32 h-3"></div>
						<div class="bg-gray-200 dark:bg-white dark:bg-opacity-10 mb-3 w-4/5 sm:w-2/3 h-3 rounded-sm"></div>
						<div class="bg-gray-200 dark:bg-white dark:bg-opacity-10 w-3/5 sm:w-1/3 h-3 rounded-sm"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'comment-list',
		props: {
			comments: Array,
			offset: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				windowWidth: window.innerWidth,
				txt: ''
			}
		},
		components: {
			Comment: () => import('@/components/comment/Comment.vue') // import using this syntax to solve recursive component importing issue
		},
		// watch: {
		// 	windowWidth(newWidth, oldWidth) { // watch windowWidth and update txt
		// 		this.txt = `it changed to ${newWidth} from ${oldWidth}`;
		// 	}
		// },
		methods: {
			onResize() { // set windowWidth to browser window width
				this.windowWidth = window.innerWidth
			}
		},
		mounted() { // when component mounts, add an event listener
			this.$nextTick(() => {
				window.addEventListener('resize', this.onResize);
			})
		},
		beforeUnmount() { // when component is destroyed, remove the event listener
			window.removeEventListener('resize', this.onResize); 
		},
	}
</script>
