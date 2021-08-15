<template>
	<div class="flex flex-grow bg-white">
		<div class="relative w-full md:w-2/4 shadow">
			<!-- Form section -->
			<div class="flex flex-col h-full justify-center mx-auto p-12 md:p-0 md:w-96">
				<!-- Username and password form -->
				<div v-show="!mfa">
					<h1 class="text-4xl font-medium mb-5">
						Welcome back!
					</h1>
					<div class="mt-3">
						<div class="flex flex-col space-y-3 mb-3">
							<div>
								<label class="label" label-for="username-desktop">
									Username or Email
								</label>
								<input type="text" class="form-input" placeholder="Your username or email" name="username-desktop" v-model="form.name"/>
							</div>
							<div>
								<label class="label" label-for="password-desktop">
									Password
								</label>
								<input type="password" class="form-input" placeholder="Your password" required name="password-desktop" v-model="form.password"/>
								<a href="/register" class="block mt-2 text-xs text-purple-500 hover:text-purple-600">Forgot password?</a>
							</div>
						</div>
						<button class="button w-full mt-6" @click="auth_v(form)">
							Log in
						</button>
					</div>
				</div>
				<!-- 2-step form -->
				<div v-show="mfa">
					<div>
						<div class="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-sm-lg bg-purple-100">
							<i class="fas fa-lock-alt text-purple-400"></i>
						</div>
						<h5>
							2 Step Authentication
						</h5>
						<p class="text-gray-400">
							Enter the 6-digit login code from your authenticator app.
						</p>
					</div>
					<div class="mt-4">
						<label class="block mb-1 text-black text-xs uppercase tracking-wide font-medium" label-for="mfa">
							Authentication Code
						</label>
						<input id="input-4" class="form-input" v-model="form.mfa" type="number" required placeholder="123456" name="mfa"/>
						<button class="button button-primary w-full mt-4" @click="verify_mfa(form)">
							Log in
						</button>
					</div>
				</div>
				<!-- Sign up micro CTA -->
				<div class="mt-6 text-gray-700 text-sm">
					Not on Ruqqus? <a href="/register" class="text-purple-500 font-medium">Create an account</a>
				</div>
			</div>
		</div>
		<!-- Background artwork -->
		<div class="relative hidden md:block w-2/4">
			<!-- Background image -->
			<div class="absolute w-full h-full bg-cover bg-center bg-purple-500" :style="{ backgroundImage: `url(${selectedImage.src})` }"/>
			<!-- Gradient -->
			<div class="absolute w-full h-full bg-violet-500 bg-gradient-to-br from-transparent via-purple-600 to-purple-900 opacity-70"/>
			<!-- User suggestion -->
			<div v-if="userSuggested" class="absolute bottom-3 right-3 text-xs text-white">
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
//import axios from "axios";
import { mapState, mapActions } from "vuex";

export default {
	data() {
		return {
			images: [
			{
				src: 'https://i.ibb.co/z66GQsv/giphy.gif',
				username: 'VILLAIN',
				profile_url: 'https://i.ibb.co/WPFY0kQ/Image.png',
				domain: 'giphy.com',
				link: 'http://gph.is/1kADt78',
			},
			{
				src: 'https://i.ibb.co/z66GQsv/giphy.gif',
				username: 'carpatheonflourist',
				profile_url: 'https://i.ibb.co/KL3Tmyb/image.png',
				domain: 'giphy.com',
				link: 'http://gph.is/1kADt78',
			},
			{
				src: 'https://i.ibb.co/bNkzQ6c/ezgif-7-e403a730f379.gif',
				username: 'asinineporcupine',
				profile_url: 'https://i.ibb.co/2gZZ8NR/image.png',
				domain: 'giphy.com',
				link: 'https://gph.is/2RELZf3',
			},
			{
				src: 'https://i.ibb.co/SxGWMZG/decorate.jpg',
				username: 'asinineporcupine',
				profile_url: 'https://i.ibb.co/2gZZ8NR/image.png',
				domain: 'pixiv.net',
				link: 'https://www.pixiv.net/en/artworks/77003769',
			}
			],
			selectedImage: null,
			userSuggested: true,
			imageAttribution: false,
			form: {
				email: '',
				name: '',
				password: '',
				mfa: '',
				checked: []
			},
			tips: [
			{
				id: 1,
				text: 'You can post by pasting a valid URL anywhere into ruqqus.'
			},
			{
				id: 2,
				text: 'You can cloak your profile history from other users.'
			},
			{
				id: 3,
				text: 'Auto-hide posts and comments by visiting your filter settings.'
			},
			{
				id: 4,
				text: 'Visit +BackgroundSubmissions to suggest a background!'
			},
			{
				id: 5,
				text: 'Visit +BackgroundSubmissions to suggest a background!'
			},
			{
				id: 6,
				text: 'Ruqqus was founded in July of 2019.'
			},
			{
				id: 7,
				text: "Visit 2020.ruqqus.com for our Year in Review."
			},
			{
				id: 8,
				text: "Vue was originally slated for a 2032 release date."
			},
			{
				id: 9,
				text: "Ruqqus beta launched in February 2020."
			},
			{
				id: 10,
				text: "'Porpl' is the official Ruqqus purple."
			},
			{
				id: 11,
				text: "Ruqqus users are called 'ruqqies'."
			},
			{
				id: 12,
				text: "You can upload .GIFs as profile pics!"
			},
			{
				id: 13,
				text: "All Ruqqus communities have public moderation logs."
			},
			{
				id: 14,
				text: "At one point, Ruqqus' brand color was green."
			}
			]
		}
	},
	computed: {
		...mapState("persist", ["v", "is_authenticated", "mfa"]),
		splashStyle() {
			return {
				background: `url(${this.selectedImage.src})rgba(0, 0, 0, 0.65) no-repeat center center fixed`,
				webkitBackgroundSize: 'cover',
				mozBackgroundSize: 'cover',
				backgroundSize: 'cover',
				width: '100%',
				height: '100%',
				position: 'fixed',
				backgroundBlendMode: 'color'

			}
		}
	},
	beforeCreate: function () {
		document.body.className = 'register';
	},
	methods: {
		...mapActions("persist", ["auth_v", "verify_mfa"]),
		randomItem (items) {
			return items[Math.floor(Math.random()*items.length)];
		}
	},
	created() {
		this.selectedImage = this.randomItem(this.images);
		this.selectedTip = this.randomItem(this.tips)
	}
}
</script>

<style scoped>
.w-400 {
	width: 400px;
}
.user-attribution {
	position: absolute;
	bottom: 1rem;
	left: 1rem;
}
.image-attribution {
	position: absolute;
	bottom: 1rem;
	right: 1rem;
}
</style>
