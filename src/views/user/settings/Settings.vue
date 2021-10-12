<template>
	<div class="w-full overflow-y-auto">
		<div class="container mx-auto grid grid-cols-12">
			<div class="col-span-full lg:col-start-3 lg:col-end-11 flex flex-col gap-4 sm:py-6 my-4 sm:my-0">
				<div class="px-4 sm:px-0">
					<h1 class="h3 font-semibold mb-0">
						Settings
					</h1>
				</div>
				<!-- Main Content Section -->
				<div v-if="innerV" class="w-full space-y-8">
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
							<img :src="innerV.bannerUrl" class="w-full h-56 lg:h-72 object-cover sm:rounded-sm"/>
							<div v-show="editAppearance" class="absolute bottom-0 flex items-center justify-center w-full h-full bg-black bg-opacity-30 sm:rounded-sm">
								<button type="button" class="w-9 h-9 flex items-center justify-center px-2 py-0 text-white bg-transparent hover:bg-black hover:bg-opacity-50 rounded-sm transition duration-100 ease-in-out" tabindex="0">
									<i class="far fa-pen fa-lg"></i>
								</button>
							</div>
						</div>
						<div class="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex items-center">
							<div class="relative rounded overflow-hidden w-20 h-20 flex-shrink-0">
								<img :src="innerV.avatarUrl" class="w-full h-full object-cover" alt="profile-picture"/>
								<div v-show="editAppearance" class="absolute bottom-0 flex items-center justify-center w-full h-full bg-black bg-opacity-30">
									<button type="button" class="w-9 h-9 flex items-center justify-center text-white px-2 py-0 bg-transparent hover:bg-black hover:bg-opacity-50 rounded-sm transition duration-100 ease-in-out" tabindex="0">
										<i class="far fa-pen fa-lg"></i>
									</button>
								</div>
							</div>
							<div class="z-10 ml-4 font-semibold text-2xl text-white" :class="{'text-opacity-30':editAppearance}">
								{{ innerV.username }}
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
							<div v-if="site.canEditDisplayName || site.hasCustomTitles" class="p-4">
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
										<div v-if="site.canEditDisplayName" class="col-span-3 sm:col-span-2">
											<label class="label">
												Display name
											</label>
											<div class="flex items-center space-x-2">
												<input class="form-input light pr-8" v-model="innerV.username" :placeholder="innerV.username" type="text"/>
												<ColorPicker v-if="site.canEditUsernameColor" v-model:color="innerV.usernameColor"/>
											</div>
											<p class="text-sm text-gray-500 mt-1">
												Your original username will always be reserved:
												<span class="text-primary">
													{{ innerV.username }}
												</span>
											</p>
										</div>
										<div v-if="site.hasCustomTitles" class="col-span-3 sm:col-span-2">
											<label class="label">
												Title
											</label>
											<div class="flex items-center space-x-2">
												<input class="form-input light pr-8" v-model="innerV.title" :placeholder="innerV.title || 'e.g. UwU'" type="text"/>
												<ColorPicker v-model:color="innerV.titleColor"/>
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
													<img :src="innerV.avatarUrl" class="w-9 h-9 rounded-sm bg-white bg-opacity-20 mr-3" alt="avatar">
													<div class="text-xs font-semibold text-gray-900 leading-tight" :style="{ 'color': innerV.usernameColor }">
														{{ innerV.username }}
													</div>
													<span v-if="innerV.title && site.hasCustomTitles" class="ml-2 px-2 inline-flex text-xs leading-5 font-medium rounded-sm text-gray-900" :style="{ 'background-color': innerV.titleColor }">
														{{ innerV.title }}
													</span>
												</div>
												<div class="h-3 w-3/4 rounded-sm bg-gray-200 mb-2"></div>
												<div class="h-3 w-1/3 rounded-sm bg-gray-200"></div>
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
									<Editor @input="getEditorContent()" min-height="10rem" :limit="1000" :value="innerV.bioHtml"/>
									<a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" class="text-sm text-gray-400 mt-1">
										<i class="fab fa-markdown fa-sm pr-0.5"></i>
										markdown supported
									</a>
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
													{{ innerV.email || 'You have not verified an email with this account'}}
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
													<input required class="form-input light" v-model="innerV.email" :placeholder="innerV.email || `john@example.com`" type="email"/>
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
						<form class="border-t border-b border-gray-100 dark:border-transparent sm:border sm:border-gray-200 sm:rounded-sm bg-white divide-y" :class="{ 'opacity-50 pointer-events-none':!innerV.email }">
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
										<Toggle v-model:enabled="innerV.hasAnnouncements"/>
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
										<Toggle v-model:enabled="innerV.isPrivate"/>
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
										<Toggle v-model:enabled="innerV.hasDisabledFollowers"/>
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
										<Toggle v-model:enabled="innerV.hasNotifications.followers"/>
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
										<Toggle v-model:enabled="innerV.hasNotifications.posts"/>
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
										<Toggle v-model:enabled="innerV.hasNotifications.replies"/>
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
										<Toggle v-model:enabled="innerV.hasNotifications.mentions"/>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div v-show="innerV" class="flex items-center justify-end space-x-4 px-4 sm:px-0">
					<div v-show="isDifferent" class="text-xs text-gray-400">
						You have unsaved changes!
					</div>
					<button v-if="!loading && !errored" :disabled="!isDifferent" class="button purple500" @click="save()">
						Save
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// Import Components
import { defineAsyncComponent } from 'vue'
import { mapState } from 'vuex';

import { getAccountSettings } from '../../../api/Account.js';

import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';

import Editor from "@/components/editors/Editor_V2.vue";
import Toggle from "@/components/forms/Toggle.vue";
const ToggleForm = defineAsyncComponent(() => import('@/components/Toggle.vue'));
const ColorPicker = defineAsyncComponent(() => import('@/components/popovers/ColorPicker.vue'));

export default {
	name: "UserSettingsView",
	data() {
		return {
			loading: false,
			errored: false,
			formLoading: false,
			formErrored: false,
			editProfile: false,
			editAppearance: false,
			showPassword: false,
			password: null,
			isDifferent: false,
			innerV: {}
		}
	},
	components: {
		Editor,
		Toggle,
		ToggleForm,
		ColorPicker
	},
	watch: {
		'innerV': {
			handler() {
				console.log('v obj watcher triggered')
				this.isDifferent = !isEqual(this.v, this.innerV)
			},
			deep: true
		}
	},
	computed: {
		v() {
			return this.$store.getters['persist/getAuthUser']
		},
		site() {
			return this.$store.getters['site/getSite']
		}
	},
	methods: {
		getSettings() {
			let id = this.v.id
			getAccountSettings(id)
			.then(response => {
				let data = response.data
				this.innerV = cloneDeep(data);
			})
			.catch(error => {
				console.error(error)
				this.errored = true

			})
			.finally(() => this.loading = false)
		},
		getEditorContent(value) {
			this.innerV.bio = value;
		},
		toggleAppearance() {
			this.editAppearance = !this.editAppearance;
		},
		save() {
			this.$store.dispatch('account/saveAccountSettings', this.innerV)
			.then(() => {
				console.log("submitUserSettings dispatch successful")
			})
			.catch(error => {
				console.error(error)
				this.formErrored = true

			})
			.finally(() => this.formLoading = false)
		}
	},
	created() {
		this.$store.dispatch('site/fetchSite');
		this.getSettings();
		//this.innerV = cloneDeep(this.v);
		this.isDifferent = false;
	}
}
</script>