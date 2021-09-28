<template>
	<div class="flex flex-grow bg-white">
		<div class="relative w-full md:w-2/4 shadow">
			<!-- Form section -->
			<div class="flex flex-col h-full justify-center mx-auto p-12 md:p-0 md:w-96">
				<!-- Username and password form -->
				<div>
					<h1 class="text-3xl font-medium mb-5">
						Create an account
					</h1>
					<div class="mt-3">
						<form @submit.prevent="onSubmit" class="flex flex-col space-y-3 mb-3">
							<div>
								<label class="label" label-for="username-desktop">
									Username
								</label>
								<input required type="text" class="form-input light" placeholder="i.e. SandTurtle" name="username-desktop" v-model="form.name"/>
							</div>
							<div>
								<label class="label" label-for="username-desktop">
									Email address
								</label>
								<input required type="text" class="form-input light" placeholder="john@example.com (optional)" name="username-desktop" v-model="form.email"/>
							</div>
							<div>
								<label class="label" label-for="password-desktop">
									Password
								</label>
								<input required type="password" class="form-input light" placeholder="Enter something secretive" name="password-desktop" v-model="form.password"/>
							</div>
						</form>
						<button class="button primary w-full mt-6">
							Create account
						</button>
					</div>
				</div>
				<!-- Sign up micro CTA -->
				<div class="mt-6 text-gray-700 text-sm">
					Already on {{ site.name }}?
					<router-link to="/login" class="text-purple-500 font-semibold">
						Log in
					</router-link>
				</div>
			</div>
		</div>
		<!-- Background artwork -->
		<div v-if="site.unsplash.isActive" class="relative hidden lg:block w-2/4">
			<!-- Background image -->
			<div class="absolute w-full h-full bg-cover bg-center bg-purple-500" :style="{ backgroundImage: `url(${image.urls.regular})` }">
			</div>
			<!-- Gradient -->
			<div class="absolute w-full h-full bg-violet-500 bg-gradient-to-br from-transparent via-purple-600 to-purple-900 opacity-70">
			</div>
			<!-- User attribution -->
			<div class="absolute bottom-3 right-3 text-xs text-white">
				<div class="flex items-center justify-content-end space-x-1">
					<span>Photo by</span>
					<a :href="`https://unsplash.com/@${image.user.username}?utm_source=ruqqus&utm_medium=desktop`" class="text-white font-semibold">
						{{ image.user.name }}
					</a>
					<span>on</span>
					<a href="https://unsplash.com/?utm_source=ruqqus&utm_medium=desktop" class="text-white">
						Unsplash
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { getRandomPhoto } from "../helpers/unsplash";

	export default {
		data() {
			return {
				image: {},
				form: {
					email: '',
					name: '',
					password: '',
					checked: []
				},
			}
		},
		computed: {
			site() {
				return this.$store.getters['site/getSite'];
			}
		},
		methods: {
			randomItem (items) {
				return items[Math.floor(Math.random()*items.length)];
			},
			fetchRandomPhoto() {
				let query = this.site.unsplash.query
				getRandomPhoto(query)
				.then(response => {
					this.image = response.data
				})
			}
		},
		created() {
			if (this.site.unsplash.isActive) {
				this.fetchRandomPhoto()
			}
		}
	}
</script>
