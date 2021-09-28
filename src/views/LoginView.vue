<template>
	<div class="flex flex-grow bg-white">
		<div class="relative w-full" :class="{ 'lg:w-2/4 shadow':site.unsplash.isActive }">
			<!-- Form section -->
			<div class="flex flex-col h-full justify-center mx-auto p-12 md:p-0 md:w-96">
				<!-- Username and password form -->
				<div v-if="!mfa">
					<h1 class="text-3xl font-medium mb-5">
						Welcome back to {{ site.name }}.
					</h1>
					<div class="mt-3">
						<form @submit.prevent="onSubmit" class="flex flex-col space-y-4 mb-3">
							<div>
								<label class="label" label-for="username-desktop">
									Username or Email
								</label>
								<input required type="text" class="form-input light" placeholder="Your username or email" name="username-desktop" v-model="form.name"/>
							</div>
							<div>
								<div class="flex items-center justify-between">
									<label class="label" label-for="password-desktop">
										Password
									</label>
									<a href="/register" class="mb-1 text-xs text-purple-500 hover:text-purple-600">Forgot password?</a>
								</div>
								<input required type="password" class="form-input light" placeholder="Your password" name="password-desktop" v-model="form.password"/>
							</div>
						</form>
						<button class="button primary w-full mt-6" @click="auth_v(form)">
							Log in
						</button>
					</div>
				</div>
				<!-- 2-step form -->
				<div v-if="mfa">
					<div>
						<div class="flex items-center justify-center w-12 h-12 mx-auto mb-6 rounded-sm bg-gray-100">
							<i class="fas fa-lock-alt text-purple-500"></i>
						</div>
						<h5>
							2 Step Authentication
						</h5>
						<p class="text-gray-400">
							Enter the 6-digit login code from your authenticator app.
						</p>
					</div>
					<form @submit.prevent="onSubmit" class="mt-4">
						<label class="block mb-1 text-black text-xs uppercase tracking-wide font-medium" label-for="mfa">
							Authentication Code
						</label>
						<input required id="input-4" class="form-input light" v-model="form.mfa" type="number" placeholder="123456" maxlength="6" name="mfa"/>
						<button class="button primary w-full mt-4" @click="verify_mfa(form)">
							Log in
						</button>
					</form>
				</div>
				<!-- Sign up micro CTA -->
				<div class="mt-6 text-gray-700 text-sm">
					New to {{ site.name }}?
					<router-link to="/register" class="text-purple-500 font-semibold">
						Create an account
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
	import { mapState, mapActions } from "vuex";
	import { getRandomPhoto } from "../helpers/unsplash";

	export default {
		data() {
			return {
				image: {},
				form: {
					email: '',
					name: '',
					password: '',
					mfa: '',
					checked: []
				},
			}
		},
		computed: {
			...mapState("persist", ["mfa"]),
			site() {
				return this.$store.getters['site/getSite'];
			}
		},
		methods: {
			...mapActions("persist", ["auth_v", "verify_mfa"]),
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