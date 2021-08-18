<template>
	<div class="relative flex flex-col items-center justify-center text-center min-h-[200px] max-h-[240px] md:min-h-[270px] md:max-h-[340px] z-50">
		<img class="absolute w-full h-full bottom-0 top-0 left-0 right-0 object-cover" :src="banner.image" alt="banner">
		<h1 class="z-10 text-white mb-4">
			{{ banner.title }}
		</h1>
		<p class="z-10 text-white text-3xl text-opacity-80 max-w-[600px] mx-auto">
			{{ banner.subtitle }}
		</p>
	</div>
</template>

<script>
	export default {
		props: {
			banner: {
				type: Object,
				default: function () {
					return {
						image: 'https://i.imgur.com/AgS5BXJ.jpg',
						title: 'Ruqqus',
						subtitle: 'The open-source platform for independent communities'
					}
				}
			}
		}
	}
</script>