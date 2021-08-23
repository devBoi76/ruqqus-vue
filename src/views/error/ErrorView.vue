<template>
	<!-- Error Template -->
	<div class="w-full overflow-y-auto">
		<div class="relative flex flex-col items-center justify-center text-center h-full z-50">
			<img class="absolute w-full h-full bottom-0 top-0 left-0 right-0 object-cover" src="https://i.imgur.com/AgS5BXJ.jpg" alt="banner"/>
			<div v-if="statusCode" class="z-10 uppercase tracking-wide font-semibold text-white text-opacity-60 mb-2">
				{{ statusCode }}
			</div>
			<h1 class="z-10 text-white mb-4">
				{{ heading || 'An error occured' }}
			</h1>
			<p class="z-10 text-white text-2xl sm:text-3xl text-opacity-80 max-w-[600px] mx-auto">
				{{ message || 'Some sort of error occured...' }}
			</p>
			<div class="z-10 mx-auto mt-4">
				<router-link to="/" custom v-slot="{ navigate }">
					<button class="button white" @click="navigate" @keypress.enter="navigate" role="link">
						Back to the homepage
					</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			statusCode: String,
			heading: String,
			message: String
		}
	}
</script>
