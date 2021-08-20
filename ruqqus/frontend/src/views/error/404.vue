<template>
	<!-- 404 Template -->
	<div class="w-full overflow-y-auto">
		<div class="relative flex flex-col items-center justify-center text-center h-full z-50">
			<img class="absolute w-full h-full bottom-0 top-0 left-0 right-0 object-cover" src="https://i.imgur.com/AgS5BXJ.jpg" alt="banner">
			<div class="z-10 uppercase tracking-wide font-semibold text-gray-400 mb-2">
				404
			</div>
			<h1 class="hidden sm:block z-10 text-white mb-4">
				Page not found :/
			</h1>
			<p class="z-10 text-white text-2xl sm:text-3xl text-opacity-80 max-w-[600px] mx-auto">
				The page you were looking for simply does not exist.
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
