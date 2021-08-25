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
				<h1 class="h3"><i class="far fa-user-circle mr-3"></i>Security Settings</h1>
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
							<div class="h5">Email</div>
							<p class="text-gray-500">Add or update the email on your account.</p>
							<Form :model="{ email:v.email }" :post-url="``" @success="onSuccess" class="bg-white border border-gray-300 rounded-sm overflow-hidden">
								<template v-slot:form>
									<div class="px-4 py-5 md:p-5">
										<t-input-group label="Email" class="relative">
											<input class="form-input purple500" v-model="v.email" :placeholder="v.email || 'ruqqie@example.com'" type="text"/>
										</t-input-group>
										<p class="mt-2 text-sm text-gray-500">
											Only the guild name capitalization can be changed.
										</p>
									</div>
								</template>
							</Form>
						</div>

						<div>
							<div class="h5">Password</div>
							<p class="text-gray-500">Change your account password.</p>
							<Form :model="{ new_password:newPassword }" :post-url="``" @success="onSuccess" class="bg-white border border-gray-300 rounded-sm overflow-hidden">
								<template v-slot:form>
									<div class="px-4 py-5 md:p-5">
										<t-input-group label="Current Password">
											<input class="form-inpu" placeholder="Enter your current password" type="password"/>
										</t-input-group>
										<t-input-group label="New Password" class="relative mt-4">
											<input class="form-input" v-model="newPassword" placeholder="Enter a new password" :type="showPassword ? 'text' : 'password'"/>
											<button type="button" class="flex items-center absolute text-gray-400 right-1 bottom-0 p-2 transform active:scale-95 origin-center" @click="showPassword = !showPassword">
												{{ showPassword ? '&#128585;' : '&#128584;' }}
											</button>
										</t-input-group>
									</div>
								</template>
							</Form>
						</div>

						<div>
							<div class="h5">Additional Security</div>
							<p class="text-gray-500">Increase your account's defenses. For extra secure ruqqies.</p>
							<Form :model="{ is_private:v.is_private }" :post-url="``" @success="onSuccess" class="bg-white border border-gray-300 rounded-sm overflow-hidden">
								<template v-slot:form>
									<div class="px-4 py-5 md:p-5">
										<div class="flex items-start">
											<t-toggle v-model="v.is_private"/>
											<div class="ml-5 -mt-1">
												<label class="label">2-step login</label>
												<p class="mt-1 text-sm text-gray-500">
													Enable to require a 6-digit code when logging in.
												</p>
											</div>
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
			newPassword: '',
			loading: true,
			errored: false,
			v: [],
		}
	},
	computed: {
		emailField() {
			if (!this.v.email) {
				return "ruqqie@example.com"
			} else {
				return this.v.email
			}
		}
	},
	methods: {
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
