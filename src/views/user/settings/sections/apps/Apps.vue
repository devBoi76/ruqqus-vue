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
				<h1 class="h3"><i class="far fa-user-circle mr-3"></i>Apps</h1>
			</div>
		</div>

		<div v-show="loading" class="col-span-full px-4 my-4 dark:text-gray-100">
			<div class="flex flex-col w-full space-y-3 animate-pulse">
				<div class="rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 w-1/6 h-4"></div>
				<div class="rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 w-2/6 h-4"></div>
				<div class="rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 w-full h-44"></div>
			</div>
		</div>

		<div v-if="!loading" class="col-span-full px-4 my-4 dark:text-gray-100">
			<div>
				<div class="md:grid md:grid-cols-3 md:gap-6">
					<div class="mt-5 md:mt-0 md:col-span-3 space-y-8">

						<div>
							<div class="h5">Request API Keys</div>
							<p class="text-gray-500">Request a new API key for development.</p>
							<Form :model="{ username:v.username, name:app.name, uri:app.uri, description:app.description }" :post-url="``" @success="onSuccess" class="bg-white border border-gray-300 rounded-sm overflow-hidden">
								<template v-slot:form>
									<div class="px-4 py-5 md:p-5 space-y-4">
										<t-input-group label="Username" class="relative">
											<input class="form-input purple500" v-model="v.username" :placeholder="v.username" type="text" disabled/>
										</t-input-group>
										<t-input-group label="App Name" class="relative">
											<input class="form-input purple500" v-model="app.name" placeholder="Give your app a name" type="text"/>
										</t-input-group>
										<div>
											<t-input-group label="Redirect URI" class="relative">
												<input class="form-input purple500" v-model="app.uri" placeholder="Enter a redirect URI" type="text"/>
											</t-input-group>
											<p class="mt-2 text-sm text-gray-500">
												A custom URI scheme can be used. Seperate options with a comma.
											</p>
										</div>
										<div>
											<t-input-group label="Short Description" class="relative">
												<textarea class="form-textarea purple500" v-model="app.description" type="text" rows="3" maxlength="140" placeholder="Briefly describe your app..."/>
												<div v-if="app.description" class="absolute text-xs font-semibold text-gray-400 right-3 bottom-2 select-none" :class="{'text-red-500':app.description.length >= 140}">
													{{ 140 - app.description.length }}
												</div>
											</t-input-group>
											<p class="mt-2 text-sm text-gray-500">
												Describe the purpose of your app. Visible to admins during the app review process.
											</p>
										</div>
									</div>
								</template>
							</Form>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// Import components
import axios from 'axios'
import { mapState } from "vuex";

const Form = () => import('@/components/forms/Input.vue')

export default {
	name: "UserSettingsSecurityView",
	components: {
		Form
	},
	data() {
		return {
			showPassword: false,
			changePassword: false,
			newPassword: null,
			loading: true,
			errored: false,
			app: {
				name: null,
				uri: null,
				description: null
			}
		}
	},
	computed: {
		...mapState("persist", ["v"]),
		emailField() {
			if (!this.v.email) {
				return "ruqqie@example.com"
			} else {
				return this.v.email
			}
		},
		activeApps() {
			const activeApps = this.apps.filter(function(elem){
				if(elem.active == true)
					return elem
			});
			if (activeApps.length > 0) {
				return activeApps
			} else {
				return {}
			}
		}
	},
	methods: {
	},
	created() {
		axios
		.get('/settings/app_info')
		.then(response => {
			console.log(response)
		})
		.catch(error => {
			console.log(error)
			this.errored = true
		})
		.finally(() => this.loading = false)
	} 
};
</script>

