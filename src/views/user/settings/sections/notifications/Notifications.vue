<template>
	<!-- Main content section -->
	<div class="grid grid-cols-12 gap-4">
		<div class="sm:hidden border-b mb-4 py-2 dark:tetx-gray-100">
			<div>
				<div class="flex items-center">
					<b-button to="/settings" variant="link" size="lg" class="ml-n3 text-white-65">
						<i class="far fa-chevron-left mr-3"></i><span class="font-normal">Settings</span>
					</b-button>
				</div>
			</div>
		</div>
		<div class="sm:hidden dark:tetx-gray-100">
			<div>
				<h1 class="h3"><i class="far fa-user-circle mr-3"></i>Notifications Settings</h1>
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
			<div class="md:grid md:grid-cols-3 md:gap-6">
				<div class="mt-5 md:mt-0 md:col-span-3 space-y-8">

					<div>
						<div class="h5">Content Notifications</div>
						<p class="text-gray-500">Manage notifications related to content and communities.</p>
						<Form :model="{ is_private:v.is_private, is_nofollow:v.is_nofollow }" :post-url="``" @success="onSuccess" class="bg-white border border-gray-300 rounded-sm overflow-hidden">
							<template v-slot:form>
								<div class="px-4 py-5 md:p-5 space-y-6">
									<div class="flex items-start">
										<t-toggle v-model="v.is_private"/>
										<div class="ml-5 -mt-1">
											<label class="label">Followers</label>
											<p class="mt-1 text-sm text-gray-500">
												Receive notifications when someone you follow creates a new post.
											</p>
										</div>
									</div>
									<div class="flex items-start">
										<t-toggle v-model="v.is_nofollow"/>
										<div class="ml-5 -mt-1">
											<label class="label">Guild notifications</label>
											<p class="mt-1 text-sm text-gray-500">
												Receive notifications when your guilds (moderating or joined) receive new posts.
											</p>
										</div>
									</div>
								</div>
							</template>
						</Form>
					</div>

					<div>
						<div class="h5">Account Notifications</div>
						<p class="text-gray-500">Manage noitifcations related to your account.</p>
						<Form :model="{ is_private:v.is_private, is_nofollow:v.is_nofollow }" :post-url="``" @success="onSuccess" class="bg-white border border-gray-300 rounded-sm overflow-hidden">
							<template v-slot:form>
								<div class="px-4 py-5 md:p-5 space-y-6">
									<div v-for="setting in settings" :key="setting.id" class="flex items-start">
										<t-toggle v-model="setting.model"/>
										<div class="ml-5 -mt-1">
											<label class="label">{{ setting.label }}</label>
											<p class="mt-1 text-sm text-gray-500">
												{{ setting.text }}
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
			loading: true,
			errored: false,
			v: [],
			settings: [
			{
				id: 1,
				label: 'Mentions',
				text: 'Receive notifications when someone mentions you in a post or comment.',
				model: 'v.allow_mentions'
			},
			{
				id: 2,
				label: 'Post replies',
				text: 'Receive notifications when someone replies to a post.',
				model: 'v.allow_post_replies'
			},
			{
				id: 3,
				label: 'Comment replies',
				text: 'Receive notifications when someone replies to a comment.',
				model: 'v.allow_comment_replies'
			},
			{
				id: 4,
				label: 'Meta',
				text: 'Receive notifications for guild moderation, ruqqus announcements, and more.',
				model: 'v.allow_meta'
			}
			]
		}
	},
	computed: {
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
