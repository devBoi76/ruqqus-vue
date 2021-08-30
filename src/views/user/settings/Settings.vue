<template>
	<div class="w-full overflow-y-auto">
		<div class="grid grid-cols-12 xl:grid-cols-10">
			<div class="col-span-full xl:col-start-3 xl:col-end-9 flex flex-col gap-4 sm:p-6 my-2.5 sm:my-0">
				<h1 class="h3 font-semibold mb-0">
					Settings
				</h1>
				<!-- Main Content Section -->
				<div class="w-full space-y-8">
					<div class="relative">
						<div class="z-10 absolute top-4 right-4 md:top-6 md:right-6">
							<button v-show="!editAppearance" class="button white" @click="toggleAppearance()">
								Edit appearance
							</button>
							<div v-show="editAppearance" class="flex items-center space-x-2">
								<button type="button" class="button linkWhite" @click="toggleAppearance()" tabindex="0">
									Cancel
								</button>
								<button type="button" class="button white" tabindex="0">
									Save
								</button>
							</div>
						</div>
						<div class="relative">
							<img :src="banner" class="w-full h-56 lg:h-72 object-cover sm:rounded-sm"/>
							<div v-show="editAppearance" class="absolute bottom-0 flex items-center justify-center w-full h-full bg-black bg-opacity-30 sm:rounded-sm">
								<button type="button" class="w-9 h-9 flex items-center justify-center px-2 py-0 text-white bg-transparent hover:bg-black hover:bg-opacity-50 rounded-sm transition duration-100 ease-in-out" tabindex="0">
									<i class="far fa-pen fa-lg"></i>
								</button>
							</div>
						</div>
						<div class="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex items-center">
							<div class="relative rounded overflow-hidden w-20 h-20 flex-shrink-0">
								<img :src="v.profile_url" class="object-cover" alt="profile-picture"/>
								<div v-show="editAppearance" class="absolute bottom-0 flex items-center justify-center w-full h-full bg-black bg-opacity-30">
									<button type="button" class="w-9 h-9 flex items-center justify-center text-white px-2 py-0 bg-transparent hover:bg-black hover:bg-opacity-50 rounded-sm transition duration-100 ease-in-out" tabindex="0">
										<i class="far fa-pen fa-lg"></i>
									</button>
								</div>
							</div>
							<div class="z-10 ml-4 font-semibold text-2xl text-white" :class="{'text-opacity-30':editAppearance}">
								{{ v.username }}
							</div>
						</div>
					</div>
					<div>
						<div class="flex justify-between px-4 sm:px-0">
							<div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2">
								Profile
							</div>
							<div class="text-xs text-gray-400">
								<i class="fas fa-globe-americas fa-sm pr-0.5"></i>
								<span>
									Visible to everyone
								</span>
							</div>
						</div>
						<form class="border-t border-b border-gray-100 dark:border-transparent sm:border sm:border-gray-200 sm:rounded-sm bg-white divide-y" @submit.prevent="onSubmit">
							<div class="p-4">
								<div class="flex items-center justify-between">
									<div>
										<div class="font-semibold leading-tight">
											Profile details
										</div>
										<p class="text-sm text-gray-500 mt-1">
											Change your appearance
										</p>
									</div>
									<button class="flex items-center justify-center px-2 w-8 h-8 text-lg text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-sm" @click="editProfile = !editProfile" aria-expanded="active">
										<i class="far fa-fw" :class="editProfile ? 'fa-compress-alt' : 'fa-pen'"></i>
									</button>
								</div>
								<div v-if="editProfile" class="space-y-6 mt-6">
									<div class="grid grid-cols-3 gap-6">
										<div class="col-span-3 sm:col-span-2">
											<label class="label">
												Display name
											</label>
											<div class="flex items-center space-x-2">
												<input required class="form-input light pr-8" v-model="v.username" :placeholder="v.username" type="text"/>
												<ColorPicker :color="usernameColor" :color.sync="usernameColor"/>
											</div>
											<p class="text-sm text-gray-500 mt-1">
												Your original username will always be reserved:
												<span class="text-primary">
													{{ v.username }}
												</span>
											</p>
										</div>
										<div class="col-span-3 sm:col-span-2">
											<label class="label">
												Title
											</label>
											<div class="flex items-center space-x-2">
												<input required class="form-input light pr-8" v-model="title" :placeholder="title" type="text"/>
												<ColorPicker :color="titleColor" :color.sync="titleColor"/>
											</div>
											<p class="text-sm text-gray-500 mt-1">
												Titles are decorative text next to your username
											</p>
										</div>
										<div class="col-span-3 sm:col-span-2">
											<label class="label">
												Persona preview
											</label>
											<div class="p-3 bg-white border rounded">
												<div class="flex items-center mb-3">
													<img :src="v.profile_url" class="w-9 h-9 rounded-sm bg-white bg-opacity-20 mr-2" alt="avatar">
													<div class="text-xs font-semibold text-gray-900 leading-tight" :style="{ 'color': usernameColor }">
														{{ v.username }}
													</div>
												</div>
												<div class="h-4 w-3/4 rounded-sm bg-gray-100 mb-2"></div>
												<div class="h-4 w-1/3 rounded-sm bg-gray-100"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="grid grid-cols-3 gap-6 p-4">
								<div class="col-span-3">
									<label class="label">
										Bio
									</label>
									<Editor @input="getEditorContent()" min-height="10rem" :limit="1000" :value="bio"/>
									<p class="text-sm text-gray-500 mt-1">
										<i class="fab fa-markdown fa-sm pr-0.5"></i>
										markdown supported
									</p>
								</div>
							</div>
						</form>
					</div>


					<div>
						<div class="flex justify-between px-4 sm:px-0">
							<div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2">
								Security
							</div>
							<div class="text-xs text-gray-400">
								<i class="fas fa-lock-alt fa-sm pr-0.5"></i>
								<span>
									Only you can see these details
								</span>
							</div>
						</div>
						<div class="border-t border-b border-gray-100 dark:border-transparent sm:border sm:border-gray-200 sm:rounded-sm bg-white divide-y">
							<ToggleForm @change="handleChange">
								<template v-slot:default="{active, toggle}">
									<div class="p-4">
										<div class="flex items-center justify-between">
											<div>
												<div class="font-semibold leading-tight">
													Password
												</div>
												<p class="text-sm text-gray-500 mt-1">
													Change your password
												</p>
											</div>
											<button class="flex items-center justify-center px-2 w-8 h-8 text-lg text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-sm" @click="toggle" aria-expanded="active">
												<i class="far fa-fw" :class="active ? 'fa-compress-alt' : 'fa-pen'"></i>
											</button>
										</div>
										<div v-if="active" class="space-y-6 mt-6">
											<div class="grid grid-cols-3 gap-6">
												<div class="col-span-3">
													<label class="label">
														Current password
													</label>
													<input required class="form-input light" v-model="password" placeholder="Enter your current password" type="password"/>
												</div>
												<div class="col-span-3">
													<label class="label">
														New password
													</label>
													<div class="relative">
														<input required class="form-input light pr-10" v-model="newPassword" placeholder="Enter a new password" :type="showPassword ? 'text' : 'password'" :disabled="!password"/>
														<button type="button" class="flex items-center absolute text-gray-400 right-1 bottom-0 p-2 transform active:scale-95 origin-center" @click="showPassword = !showPassword">
															{{ showPassword ? '&#128585;' : '&#128584;' }}
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</template>
							</ToggleForm>
							<ToggleForm @change="handleChange">
								<template v-slot:default="{active, toggle}">
									<div class="p-4">
										<div class="flex items-center justify-between">
											<div>
												<div class="font-semibold leading-tight">
													Email
												</div>
												<p class="text-sm text-gray-500 mt-1">
													{{ v.email || 'You have not verified an email with this account'}}
												</p>
											</div>
											<button class="flex items-center justify-center px-2 w-8 h-8 text-lg text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-sm" @click="toggle" aria-expanded="active">
												<i class="far fa-fw" :class="active ? 'fa-compress-alt' : 'fa-pen'"></i>
											</button>
										</div>
										<div v-if="active" class="space-y-6 mt-6">
											<div class="grid grid-cols-3 gap-6">
												<div class="col-span-3">
													<label class="label">
														Email address
													</label>
													<input required class="form-input light" v-model="v.email" :placeholder="v.email || `john@example.com`" type="email"/>
													<p class="text-sm text-gray-500 mt-1">
														Used for password resets and opt-in announcements
													</p>
												</div>
											</div>
										</div>
									</div>
								</template>
							</ToggleForm>
						</div>
					</div>
					<div>
						<div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2 px-4 sm:px-0">
							Email alerts
						</div>
						<form class="border-t border-b border-gray-100 dark:border-transparent sm:border sm:border-gray-200 sm:rounded-sm bg-white divide-y" :class="{ 'opacity-50 pointer-events-none':!v.email }">
							<div class="grid grid-cols-3 gap-6 p-4">
								<div class="col-span-3">
									<div class="flex flex-grow items-center justify-between">
										<div>
											<div class="font-semibold leading-tight">
												Announcements
											</div>
											<p class="text-sm text-gray-500 mt-1">
												Receive official site announcements via email
											</p>
										</div>
										<Toggle v-model="v.is_private"/>
									</div>
								</div>
							</div>
						</form>
					</div>
					<div>
						<div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2 px-4 sm:px-0">
							Privacy
						</div>
						<form class="border-t border-b border-gray-100 dark:border-transparent sm:border sm:border-gray-200 sm:rounded-sm bg-white divide-y">
							<div class="grid grid-cols-3 gap-6 p-4">
								<div class="col-span-3">
									<div class="flex flex-grow items-center justify-between">
										<div>
											<div class="font-semibold leading-tight">
												Private profile
											</div>
											<p class="text-sm text-gray-500 mt-1">
												Cloak my posting history and ask search engines not to index my profile
											</p>
										</div>
										<Toggle v-model="v.is_private"/>
									</div>
								</div>
							</div>
							<div class="grid grid-cols-3 gap-6 p-4">
								<div class="col-span-3">
									<div class="flex flex-grow items-center justify-between">
										<div>
											<div class="font-semibold leading-tight">
												Disable followers
											</div>
											<p class="text-sm text-gray-500 mt-1">
												Prevent others from following me
											</p>
										</div>
										<Toggle v-model="v.is_private"/>
									</div>
								</div>
							</div>
						</form>
					</div>
					<div>
						<div class="uppercase tracking-wide font-semibold text-sm md:text-xs text-gray-400 mb-2 px-4 sm:px-0">
							Notifications
						</div>
						<form class="border-t border-b border-gray-100 dark:border-transparent sm:border sm:border-gray-200 sm:rounded-sm bg-white divide-y">
							<div class="grid grid-cols-3 gap-6 p-4">
								<div class="col-span-3">
									<div class="flex flex-grow items-center justify-between">
										<div>
											<div class="font-semibold leading-tight">
												Followers
											</div>
											<p class="text-sm text-gray-500 mt-1">
												When someone follows me
											</p>
										</div>
										<Toggle v-model="v.is_private"/>
									</div>
								</div>
							</div>
							<div class="grid grid-cols-3 gap-6 p-4">
								<div class="col-span-3">
									<div class="flex flex-grow items-center justify-between">
										<div>
											<div class="font-semibold leading-tight">
												Posts
											</div>
											<p class="text-sm text-gray-500 mt-1">
												When someone I follow posts
											</p>
										</div>
										<Toggle v-model="v.is_private"/>
									</div>
								</div>
							</div>
							<div class="grid grid-cols-3 gap-6 p-4">
								<div class="col-span-3">
									<div class="flex flex-grow items-center justify-between">
										<div>
											<div class="font-semibold leading-tight">
												Replies
											</div>
											<p class="text-sm text-gray-500 mt-1">
												When someone replies to my post or comment
											</p>
										</div>
										<Toggle v-model="v.is_private"/>
									</div>
								</div>
							</div>
							<div class="grid grid-cols-3 gap-6 p-4">
								<div class="col-span-3">
									<div class="flex flex-grow items-center justify-between">
										<div>
											<div class="font-semibold leading-tight">
												Mentions
											</div>
											<p class="text-sm text-gray-500 mt-1">
												When someone mentions me by @username
											</p>
										</div>
										<Toggle v-model="v.is_private"/>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// Import Components
import { defineAsyncComponent } from 'vue'
import { mapState } from 'vuex';
import Editor from "@/components/editors/Editor_V2.vue";
import Toggle from "@/components/forms/Toggle.vue";
const ToggleForm = defineAsyncComponent(() => import('@/components/Toggle.vue'));
import ColorPicker from "@/components/popovers/ColorPicker.vue";

export default {
	name: "UserSettingsView",
	data() {
		return {
			usernameColor: '#C53030',
			titleColor: '#C53030',
			title: '',
			editProfile: false,
			editAppearance: false,
			bio: '',
			isEmailSubscribed: false,
			password: '',
			showPassword: false
		}
	},
	components: {
		Editor,
		Toggle,
		ToggleForm,
		ColorPicker
	},
	computed: {
		...mapState("persist", ["v"]),
		banner() {
			//return this.v.banner_url || 'https://i.imgur.com/AgS5BXJ.jpg'
			return 'https://i.imgur.com/AgS5BXJ.jpg'
		}
	},
	methods: {
		getEditorContent(value) {
			this.bio = value;
		},
		toggleAppearance() {
			this.editAppearance = !this.editAppearance;
		}
	},
	created() {
		console.log(this.v)
	}
}
</script>