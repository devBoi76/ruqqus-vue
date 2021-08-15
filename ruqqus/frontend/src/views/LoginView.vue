<template>
	<div class="w-full h-full relative bg-cover" :style="{ backgroundImage: `url(${selectedImage.src})` }">
		<div class="w-full h-full relative bg-black bg-opacity-70">
			<div class="container flex flex-col items-center justify-center mx-auto px-4 h-screen">
				<div>
					<div class="hidden md:flex flex-row-reverse justify-center items-center">

						<div class="hidden w-80 text-left p-3 bg-gray-100 rounded-sm">
							<div class="mb-2">
								<span class="bg-purple-500 text-white">ProTip:</span>
							</div>
							<ul class="pl-0 no-bullets">
								<li class="flex items-center mb-4">
									<span>
										<i class="far fa-image w-8 mr-3 text-center text-purple-500 text-xl"></i>
									</span>
									<span>You can create image posts by dragging and dropping an image.</span>
								</li>
							</ul>
						</div>

						<div class="w-400 px-8 py-6 text-center bg-white rounded-sm shadow-lg">

							<h1 v-show="!mfa" class="text-3xl font-medium mb-5">Welcome back</h1>

							<div v-show="mfa" class="text-center">
								<div class="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-sm-lg bg-purple-100">
									<i class="fas fa-lock-alt text-purple-400"></i>
								</div>
								<h5>2 Step Authentication</h5>
								<p class="text-gray-400">Enter the 6-digit login code from your authenticator app.</p>
							</div>

							<div v-show="!mfa" class="mt-3 text-left">

								<div class="flex flex-col space-y-3 mb-3">
									<div>
										<label class="label" label-for="username-desktop">
											Username or Email
										</label>
										<input class="form-input" placeholder="Your username or email" name="username-desktop" v-model="form.name"/>
									</div>
									<div>
										<label class="label" label-for="password-desktop">
											Password
										</label>
										<input class="form-input" placeholder="Your password" type="password" required name="password-desktop" v-model="form.password"/>
										<a href="/register" class="block mt-2 text-xs text-purple-500 hover:text-purple-600">Forgot password?</a>
									</div>
								</div>
								<t-button class="w-full mt-6" @click="auth_v(form)">Log in</t-button>
							</div>

							<div v-show="mfa" class="mt-4 text-left">
								<label class="block mb-1 text-black text-xs uppercase tracking-wide font-medium" label-for="mfa">
									Authentication Code
								</label>
								<input class="form-input" id="input-4" v-model="form.mfa" type="numbers" required placeholder="123456" name="mfa"/>
								<t-button class="w-full mt-4" @click="verify_mfa(form)">Log in</t-button>
							</div>

							<div class="mt-6 text-gray-500 text-sm">
								Not on Ruqqus? <a href="/register" class="text-purple-500 font-medium">Create an account</a>
							</div>

						</div>

					</div>

					<div class="block md:hidden px-5 text-center">

						<div class="mb-4">
							<h1 class="h3 text-white">Welcome back, Ruqqie ;)</h1>
						</div>

						<div class="w-400 p-8 text-center bg-white rounded-sm shadow-lg">

							<h1 v-show="!mfa" class="text-3xl font-medium text-purple-500 mb-6">ruqqus</h1>

							<div v-show="mfa" class="text-center">
								<div class="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-sm-lg bg-purple-100">
									<i class="fas fa-lock-alt text-purple-400"></i>
								</div>
								<h5>2 Step Authentication</h5>
								<p class="text-gray-400">Enter the 6-digit login code from your authenticator app.</p>
							</div>

							<div v-show="!mfa" class="mt-3 text-left">

								<div class="flex flex-col space-y-4 mb-3">
									<div>
										<label class="block mb-1 text-black text-xs uppercase tracking-wide font-medium" label-for="username-desktop">
											Username or Email
										</label>
										<input class="form-input" placeholder="Your username or email" name="username-desktop" v-model="form.name"/>
									</div>
									<div>
										<label class="block mb-1 text-black text-xs uppercase tracking-wide font-medium" label-for="password-desktop">
											Password
										</label>
										<input class="form-input" placeholder="Your password" type="password" required name="password-desktop" v-model="form.password"/>
										<a href="/register" class="block mt-2 text-xs text-purple-500 hover:text-purple-600">Forgot password?</a>
									</div>
								</div>

								<t-button class="w-full mt-4" @click="auth_v(form)">Log in</t-button>

							</div>

							<div v-show="mfa" class="mt-3 text-left">
								<label class="block mb-1 text-black text-xs uppercase tracking-wide font-medium" label-for="mfa">
									Authentication Code
								</label>
								<input class="form-input" id="input-4" v-model="form.mfa" type="numbers" required placeholder="123456" name="mfa"/>
								<t-button class="w-full mt-4" @click="verify_mfa(form)">Log in</t-button>
							</div>

							<div class="mt-6 text-gray-500 text-sm">
								Not on Ruqqus? <a href="/register" class="text-purple-500 font-medium">Create an account</a>
							</div>

						</div>

					</div>

					<div class="text-center text-white text-opacity-80 text-sm mt-6">
						<div class="font-bold">
							<i class="fas fa-bolt pr-2"></i>ProTip
						</div>
						<p class="mt-1">{{ selectedTip.text }}</p>
					</div>


				</div>
			</div>

			<div v-if="userSuggested" class="absolute bottom-3 right-3 text-xs text-white">
				<div class="flex items-center justify-content-end">
					<span>Background suggested by</span>
					<img class="w-6 h-6 object-fit mx-2 rounded-sm" :src="selectedImage.profile_url"/>
					<router-link :to="`/${selectedImage.username}`" class="text-white font-bold hover:text-gray-300">
						@{{ selectedImage.username }}
					</router-link>
				</div>
			</div>
			<div v-if="imageAttribution" class="absolute bottom-3 right-3 text-sm text-white-25">
				<div class="flex items-center justify-content-end">
					<div>Image source:</div>
					<a :href="this.selectedImage.link" class="pl-2 text-white-50 font-bold">{{ this.selectedImage.domain }}</a>
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
