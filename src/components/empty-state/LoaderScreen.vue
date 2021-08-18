<!-- Full screen loading state -->

<template>
	<div v-show="loading" class="absolute w-full h-full bottom-0 flex flex-col sm:hidden justify-center items-center px-6 text-center bg-gray-50 dark:bg-gray-950 z-50">
		<!-- Copy Text -->
		<h4 class="-mt-16 dark:text-gray-200">
			{{ selectedCopy.text }}
		</h4>
		<!-- Copy Text Author -->
		<p class="text-gray-500 dark:text-gray-400 mt-1">
			- {{ selectedCopy.author }}
		</p>
		<!-- Loading Dots Animation -->
		<div class="loader flex space-x-2 p-2 mt-6">
			<div class="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
			<div class="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
			<div class="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "loader-screen",
		props: {
			loading: Boolean
		},
		data() {
			return {
				copy: [ // Copy text
				{
					text: 'Hazmat suit required',
					author: '@deauthorize'
				},
				{
					text: 'Switching to your sidearm is faster than reloading',
					author: '@VILLAIN'
				},
				{
					text: 'Wizards are busy brewing',
					author: '@movie'
				},
				{
					text: 'Reticulating splines...',
					author: '@Spy'
				},
				{
					text: 'Please enjoy the error screens',
					author: '@1ethanhansen'
				},
				{
					text: 'Don\'t ruq and drive!',
					author: '@jBoi76'
				},
				{
					text: 'Type the name of a user, guild, or [something else], and Ruqqus will open it for you.',
					author: 'Ruqqie'
				},
				{
					text: 'Paste a link anywhere into Ruqqus to quickly create a post',
					author: 'Ruqqie'
				},
				{
					text: 'Pivoting...',
					author: 'Ruqqie'
				},
				{
					text: 'Memoizing the Ruqqus lexical environment...',
					author: 'Ruqqie'
				},
				{
					text: 'Polling the Ruqqus closures for interdimensional beings...',
					author: 'Ruqqie'
				},
				{
					text: 'Extinguishing dumpster fires...',
					author: 'Ruqqie'
				},
				{
					text: 'Performing Gauss-Seidel operations to solve the Ruqqus system of 503 equations...',
					author: 'Ruqqie'
				},
				{
					text: 'Pushing straight to Master...',
					author: 'Ruqqie'
				},
				{
					text: 'Extending variable scope beyond the space-time continuum...',
					author: 'Ruqqie'
				},
				{
					text: 'Fixing schema.sql...',
					author: 'Ruqqie'
				},
				{
					text: 'Now with 5.03% uptime!',
					author: '@nuvpr'
				}
				],
				selectedCopy: {}
			}
		},
		methods: {
			randomItem (items) { // lookup item by random index
				return items[Math.floor(Math.random()*items.length)];
			}
		},
		created() { // when component is created, run randomizer method on copy array
			this.selectedCopy = this.randomItem(this.copy)
		}
	}
</script>

<style scoped>
.loader div {
	animation-duration: 0.5s;
}

.loader div:first-child {
	animation-delay: 0.1s;
}

.loader div:nth-child(2) {
	animation-delay: 0.3s;
}

.loader div:nth-child(3) {
	animation-delay: 0.6s;
}
</style>