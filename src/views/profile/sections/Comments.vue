<template>
	<div class="flex flex-col flex-grow space-y-4">
		<div class="w-full bg-black bg-opacity-40 rounded-sm overflow-hidden">
			<div class="px-4 py-3 text-gray-300 text-lg leading-6 border-b border-black">
				Comments
			</div>
			<div v-if="!loading && comments.length">
				<Comment v-for="comment in comments.slice(0, 10)" :key="comment.id" :comment="comment"/>
			</div>

			<!-- Loading state -->
			<div v-if="loading && !errored" class="p-4">
				<span class="loading text-gray-400 text-sm">
					{{loadingCopy[Math.floor(Math.random() * loadingCopy.length)]}}
				</span>
			</div>

			<!-- Errored state -->
			<div v-if="!loading && errored" class="p-4">
				<span class="loading text-gray-400 text-sm">
					Unable to load comments right now... please try agian later.
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import Comment from "@/components/comment/CommentCompact.vue"

	export default {
		data() {
			return {
				loading: true,
				errored: false,
				comments: [],
				loadingCopy: [
				'Spinning the comment hamster wheel',
				'Pinging Ruqqie for comments',
				'Fetching comments from the Ruqqus castle',
				'Plucking comments from the potato servers',
				'Rummaging for comments',
				'Parsing the comments with fairy dusty',
				'Notifying the comment elves',
				'Sprinkling fairy dust over comments',
				'Summoning comments through wizardry',
				'Using interweb magic to fetch comments',
				'Cleaning up unicorn vomit before displaying comments'
				]
			};
		},
		components: {
			Comment
		},
		computed: {
		},
		methods: {
			getComments()  {
				axios
				//.get(`/api/vue/user/@${this.$route.params.username}/comments`)
				.get(`/user/@kek/comments`)
				.then(response => {
					this.comments = response.data.listing
				//console.log(this.u)
			})
				.catch(error => {
					console.log(error)
					this.errored = true
				})
				.finally(() => this.loading = false)
			}
		},
		mounted() {
			console.log('comments section mounted')
			this.getComments()
		} 
	}
</script>