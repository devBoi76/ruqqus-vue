<template>
	<div>
		<slot>
			<div class="flex justify-between leading-4">
				<div class="flex items-center">
					<!-- Full Thread Link -->
					<!-- Appears when viewing a single threaded discussion (commentId parameter exists in the URL) -->
					<router-link v-if="$route.params.commentId" :to="permalink" class="text-sm font-medium hover:underline">
						View entire thread
					</router-link>
					<div v-else>
						<!-- Labels -->
						<span class="hidden md:block text-gray-900 dark:text-gray-100 font-medium">
							Discussion
						</span>
						<span class="md:hidden text-sm text-gray-900 dark:text-gray-100 font-medium">
							Comments
						</span>
					</div>
				</div>
				<!-- Sort Links (hot, top, new, etc) -->
				<ul class="flex items-center space-x-3 mb-0 text-sm">
					<li v-for="sort in sorts" :key="sort.id">
						<router-link :to="sort.route" custom v-slot="{ isExactActive, navigate }">
							<button @click="navigate" @keypress.enter="navigate" class="capitalize" :class="isExactActive ? 'text-gray-700' : 'text-gray-400 hover:text-gray-500'" role="link">
								{{ sort.text }}
							</button>
						</router-link>
					</li>
				</ul>
			</div>
		</slot>
	</div>
</template>

<script>

	export default {
		props: {
			permalink: String,
			count: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				sorts: [
				{
					id: 1,
					text: "top",
					route: {
						path: this.$route.path,
						query: { sortBy: `top` }
					}
				},
				{
					id: 2,
					text: "newest",
					route: {
						path: this.$route.path,
						query: { sortBy: `latest` }
					}
				},
				{
					id: 3,
					text: "disputed",
					route: {
						path: this.$route.path,
						query: { sortBy: `disputed` }
					}
				}
				]
			};
		}
	}

</script>