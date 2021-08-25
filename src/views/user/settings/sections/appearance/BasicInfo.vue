<template>
	<!-- Main content section -->
	<div class="grid grid-cols-12 gap-4">
		<div class="sm:hidden border-b mb-4 py-2 dark:text-gray-100">
			<div>
				<div class="flex items-center">
					<b-button to="/settings" variant="link" size="lg" class="ml-n3 text-white-65">
						<i class="far fa-chevron-left mr-3"></i><span class="font-normal">Settings</span>
					</b-button>
				</div>
			</div>
		</div>
		<div class="sm:hidden dark:text-gray-100">
			<div>
				<h1 class="h3"><i class="far fa-user-circle mr-3"></i>Profile Settings</h1>
			</div>
		</div>

		<div v-show="loading" class="col-span-full my-4 px-4 dark:text-gray-100">
			<div class="flex flex-col w-full space-y-3 animate-pulse">
				<div class="rounded-sm bg-gray-100 dark:bg-white dark:bg-opacity-20 w-1/6 h-4"></div>
				<div class="rounded-sm bg-gray-100 dark:bg-white dark:bg-opacity-20 w-2/6 h-4"></div>
				<div class="rounded-sm bg-gray-100 dark:bg-white dark:bg-opacity-20 w-full h-44"></div>
			</div>
		</div>

		<div v-if="!loading" class="col-span-full my-4 px-4 dark:text-gray-100">

			<div class="relative">
				<div class="z-10 absolute top-4 right-4">
					<button v-show="!editAppearance" type="button" class="button white" @click="toggleAppearance">Edit appearance</button>
					<div v-show="editAppearance" class="flex items-center space-x-2">
						<button type="button" class="button black30" @click="toggleAppearance" tabindex="0">Cancel</button>
						<button type="button" class="button white" tabindex="0">Save</button>
					</div>
				</div>
				<div class="relative">
					<img :src="v.banner_url" class="w-full h-56 lg:h-72 object-cover"/>
					<div v-show="editAppearance" class="absolute bottom-0 flex items-center justify-center w-full h-full bg-black bg-opacity-30">
						<button type="button" class="w-9 h-9 flex items-center justify-center px-2 py-0 text-white bg-transparent hover:bg-black hover:bg-opacity-50 rounded-sm transition duration-100 ease-in-out" tabindex="0">
							<i class="fas fa-pencil fa-lg"></i>
						</button>
					</div>
				</div>
				<div class="flex px-4 -mt-12">
					<div class="relative rounded-sm overflow-hidden w-20 h-20 flex-shrink-0">
						<img :src="v.profile_url" class="object-cover" alt="profile-picture"/>
						<div v-show="editAppearance" class="absolute bottom-0 flex items-center justify-center w-full h-full bg-black bg-opacity-30">
							<button type="button" class="w-9 h-9 flex items-center justify-center text-white px-2 py-0 bg-transparent hover:bg-black hover:bg-opacity-50 rounded-sm transition duration-100 ease-in-out" tabindex="0">
								<i class="fas fa-pencil fa-lg"></i>
							</button>
						</div>
					</div>
					<div class="z-10 ml-4 pt-3 font-bold text-lg text-white" :class="{'text-opacity-30':editAppearance}">{{ v.username }}</div>
				</div>
			</div>

			<div class="hidden sm:block" aria-hidden="true">
				<div class="py-8">
					<div class="border-t border-gray-200"></div>
				</div>
			</div>

			<div class="md:grid md:grid-cols-5 md:gap-6 px-4">
				<div class="md:col-span-1">
					<div class="px-4 sm:px-0">
						<h3 class="text-lg font-medium leading-5 text-gray-900">Profile</h3>
					</div>
				</div>
				<div class="md:mt-0 md:col-span-4">
					<Form :model="{ bio:v.bio }" :post-url="endpoint" @success="onSuccess">
						<template v-slot:form>
							<t-input-group label="Bio" class="relative">
								<textarea class="form-textarea" v-model="v.bio" type="text" rows="4" placeholder="An extraordinary stranger surfing the cybers."/>
								<div v-if="v.bio" class="absolute text-xs font-semibold text-gray-400 right-3 bottom-2 select-none" :class="{'text-red-500':v.bio.length >= 256}">
									{{ 256 - v.bio.length }}
								</div>
							</t-input-group>
							<p class="mt-2 text-sm text-gray-500">
								Brief description for yourself. Markdown supported :)
							</p>
						</template>
					</Form>
				</div>
			</div>

			<div class="hidden sm:block" aria-hidden="true">
				<div class="py-8">
					<div class="border-t border-gray-200"></div>
				</div>
			</div>

			<div class="md:grid md:grid-cols-5 md:gap-6 px-4">
				<div class="md:col-span-1">
					<div class="px-4 sm:px-0">
						<h3 class="text-lg font-medium leading-5 text-gray-900">Privacy</h3>
					</div>
				</div>
				<div class="md:mt-0 md:col-span-4">
					<Form :model="{ private:v.is_private, nofollow:v.is_nofollow }" :post-url="endpoint" @success="onSuccess">
						<template v-slot:form>
							<div class="space-y-6">
								<div class="flex items-start">
									<t-toggle v-model="v.is_private"/>
									<div class="ml-5 -mt-0.5">
										<label class="label">Private profile</label>
										<p class="mt-1 text-sm text-gray-500">
											Cloak your post and comment history from others. Still visible to some search engines.
										</p>
									</div>
								</div>
								<div class="flex items-start">
									<t-toggle v-model="v.is_nofollow"/>
									<div class="ml-5 -mt-0.5">
										<label class="label">Disable followers</label>
										<p class="mt-1 text-sm text-gray-500">
											Nobody will be able to follow your profile. Disables existing followers' ability to see your latest posts.
										</p>
									</div>
								</div>
							</div>
						</template>
					</Form>
				</div>
			</div>

			<div class="hidden sm:block" aria-hidden="true">
				<div class="py-8">
					<div class="border-t border-gray-200"></div>
				</div>
			</div>

			<div class="md:grid md:grid-cols-5 md:gap-6 px-4">
				<div class="md:col-span-1">
					<div class="px-4 sm:px-0">
						<h3 class="text-lg font-medium leading-5 text-gray-900">Connections</h3>
					</div>
				</div>
				<div class="md:mt-0 md:col-span-4">
					<ul v-if="Object.keys(connectedApps).length !== 0" class="space-y-4">
						<li v-for="app of connectedApps" :key="app.id" class="flex border-b pb-4 last:border-b-0 last:pb-0">
							<div class="flex items-center">
								<div class="flex items-center justify-center w-11 h-11 rounded-sm mr-3" :style="{ backgroundColor: app.color }">
									<i class="fa-lg text-gray-100" :class="app.icon"></i>
								</div>
								<div>
									<div class="font-bold leading-4 text-gray-800 capitalize">{{ app.name }}</div>
									<div class="mt-1 text-sm text-gray-500 dark:text-white dark:text-opacity-65">
										Manage your <span class="capitalize">{{ app.name }}</span> account connection
									</div>
								</div>
							</div>
							<button class="button outlineRed500 ml-auto">
								Disconnect
							</button>
						</li>
					</ul>
					<div v-else class="text-center text-gray-500">
						<i class="fad fa-ghost h2"></i>
						<div>You have not connected any apps to your Ruqqus account...</div>
					</div>
				</div>
			</div>

			<div class="hidden sm:block" aria-hidden="true">
				<div class="py-8">
					<div class="border-t border-gray-200"></div>
				</div>
			</div>

			<div class="md:grid md:grid-cols-5 md:gap-6 px-4 mb-4">
				<div class="md:col-span-1">
					<div class="px-4 sm:px-0">
						<h3 class="text-lg font-medium leading-5 text-gray-900">Referalls</h3>
					</div>
				</div>
				<div class="md:mt-0 md:col-span-4">
					<div>
						<div class="flex">
							<label class="label">Your referall code</label>
							<div class="text-sm text-gray-500 ml-auto">
								Total referalls: <span class="text-purple-500 font-bond">{{ v.referral_count || 0 }}</span>
							</div>
						</div>
						<input class="form-input" disabled :value="`https://ruqqus.com/signup?ref=${v.username}`" type="text"/>
						<p class="mt-2 text-sm text-gray-500">
							Share this link with anyone and unlock cosmetics for your profile.
							<a class="text-purple-500 hover:underline" href="/help/referalls">
								Learn more
							</a>
						</p>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
// Import components
import axios from 'axios'

const Form = () => import('@/components/forms/Input.vue')

export default {
	name: "UserSettingsBasicInfoView",
	components: {
		Form
	},
	data() {
		return {
			endpoint: '/api/vue/settings/profile',
			editAppearance: false,
			loading: true,
			errored: false,
			v: [],
			apps: [
			{
				id: 1,
				connected: true,
				name: 'discord',
				color: '#7289DA',
				icon: 'fab fa-discord'
			}
			// {
			//   id: 2,
			//   connected: false,
			//   name: 'reddit',
			//   color: '#FF5700',
			//   icon: 'fab fa-reddit'
			// },
			// {
			//   id: 3,
			//   connected: false,
			//   name: 'github',
			//   color: '#211F1F',
			//   icon: 'fab fa-github'
			// }
			]
		}
	},
	computed: {
		connectedApps() {
			const connectedApps = this.apps.filter(function(elem){
				if(elem.connected == true)
					return elem
			});
			if (connectedApps.length > 0) {
				return connectedApps
			} else {
				return {}
			}
		}
	},
	methods: {
		toggleAppearance() {
			this.editAppearance = !this.editAppearance
		}
	},
	created() {
		axios
		.get('/settings/user_info')
		.then(response => {
			this.v = response.data
		})
		.catch(error => {
			console.log(error)
			this.errored = true
		})
		.finally(() => this.loading = false)
	}
};
</script>
