<template>
	<div class="flex flex-grow bg-white">
		<div class="relative w-full" :class="{ 'md:w-2/4 shadow':site.unsplash.isActive }">
			<!-- Form section -->
			<div class="flex flex-col h-full justify-center mx-auto p-12 md:p-0 md:w-96">
				<!-- Username and password form -->
				<div v-if="!mfa">
					<h1 class="text-4xl font-medium mb-5">
						Welcome back!
					</h1>
					<div class="mt-3">
						<form @submit.prevent="onSubmit" class="flex flex-col space-y-3 mb-3">
							<div>
								<label class="label" label-for="username-desktop">
									Username or Email
								</label>
								<input required type="text" class="form-input light" placeholder="Your username or email" name="username-desktop" v-model="form.name"/>
							</div>
							<div>
								<label class="label" label-for="password-desktop">
									Password
								</label>
								<input required type="password" class="form-input light" placeholder="Your password" name="password-desktop" v-model="form.password"/>
								<a href="/register" class="block mt-2 text-xs text-purple-500 hover:text-purple-600">Forgot password?</a>
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
					Not on Ruqqus?
					<router-link to="/register" class="text-purple-500 font-semibold">
						Create an account
					</router-link>
				</div>
			</div>
		</div>
		<!-- Background artwork -->
		<div v-show="site.unsplash.isActive" class="relative hidden md:block w-2/4">
			<!-- Background image -->
			<div class="absolute w-full h-full bg-cover bg-center bg-purple-500" :style="{ backgroundImage: `url(${selectedImage.src})` }"/>
			<!-- Gradient -->
			<div class="absolute w-full h-full bg-violet-500 bg-gradient-to-br from-transparent via-purple-600 to-purple-900 opacity-70"/>
			<!-- User suggestion -->
			<div v-if="selectedImage.profile_url" class="absolute bottom-3 right-3 text-xs text-white">
				<div class="flex items-center justify-content-end">
					<span>Background suggested by</span>
					<img class="w-6 h-6 object-fit mx-2 rounded-sm" :src="selectedImage.profile_url"/>
					<router-link :to="`/${selectedImage.username}`" class="text-white font-bold hover:text-gray-300">
						@{{ selectedImage.username }}
					</router-link>
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
			site: {
				unsplash: {
					isActive: true,
					query: 'dog'
				}
			},
			selectedImage: null,
			imageAttribution: false,
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
				this.selectedImage = response.data.urls.regular
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