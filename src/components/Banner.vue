<template>
	<div class="relative flex flex-col items-center justify-center text-center min-h-[100px] max-h-[140px] sm:min-h-[270px] sm:max-h-[300px] z-50">
		<img class="absolute w-full h-full bottom-0 top-0 left-0 right-0 object-cover" :src="image || site.coverUrl" alt="banner">
		<h1 class="hidden sm:block z-10 text-white mb-4">
			{{ title || site.name }}
		</h1>
		<p class="z-10 text-white text-2xl sm:text-3xl text-opacity-80 max-w-[600px] mx-auto">
			{{ subtitle || site.tagline }}
		</p>
	</div>
</template>

<script>
	export default {
		props: {
			image: String,
			title: String,
			subtitle: String
		},
		computed: {
			site() {
				return this.$store.getters['site/getSite']
			}
		}
	}
</script>