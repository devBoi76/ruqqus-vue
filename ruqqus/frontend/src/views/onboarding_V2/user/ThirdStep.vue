<template>
	<div class="flex flex-col flex-grow h-full">
		<div class="bg-white shadow-xs rounded overflow-hidden">
			<div class="flex justify-between p-4 border-b bg-gray-50">
				<div>
					<h2 class="text-2xl leading-5 mb-0">
						Customize your profile
					</h2>
					<p class="text-gray-600 mt-1">
						You can update these settings at any time, so don't sweat it.
					</p>
				</div>
				<Navigation :validated="true" :skippable="true" :current-step="currentStep"/>
			</div>
			<div class="p-4">

				<div class="md:grid md:grid-cols-3 md:gap-6">
					<div class="md:col-span-1">
						<div class="px-4 sm:px-0">
							<h3 class="text-lg font-medium leading-5 text-gray-900">Profile</h3>
							<p class="mt-1 text-gray-500">
								This information will be displayed publicly.
							</p>
						</div>
					</div>
					<div class="mt-5 md:mt-0 md:col-span-2">
						<div class="px-4 py-5 space-y-4 md:p-5 bg-white border rounded-sm overflow-hidden">
							<div>
								<label class="block text-sm font-bold text-gray-900 mb-1">Avatar</label>
								<div class="flex">
									<img :src="v.profile_url" class="w-16 h-16 object-fit rounded-sm" alt="profile picture"/>
									<div class="ml-3">
										<t-button variant="outlineGray200">Randomize</t-button>
										<p class="text-sm text-gray-600 mt-2 leading-none">
											Note: You can upload a custom image later on.
										</p>
									</div>
								</div>
							</div>
							<div>
								<t-input-group label="Bio" class="relative">
									<t-textarea v-model="v.bio" type="text" rows="4" placeholder="An extraordinary stranger surfing the cybers. Markdown supported :)"/>
									<div v-if="v.bio" class="absolute text-xs font-semibold text-gray-400 right-3 bottom-2 select-none" :class="{'text-red-500':v.bio.length >= 256}">
										{{ 256 - v.bio.length }}
									</div>
								</t-input-group>
							</div>
						</div>
					</div>
				</div>

				<div class="hidden sm:flex flex-col items-center" aria-hidden="true">
					<div class="py-8 w-full">
						<div class="border-t border-gray-200"></div>
					</div>
					<div class="-mt-12 bg-white">
						<t-button class="w-44" variant="outlineGray200" @click="showMore = !showMore">
							<i class="far fa-sm pr-2" :class="showMore ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
							{{ showMore ? 'Hide' : 'Show' }} advanced
						</t-button>
					</div>
				</div>

				<div v-show="showMore" class="mt-4">

					<div class="md:grid md:grid-cols-3 md:gap-6">
						<div class="md:col-span-1">
							<div class="px-4 sm:px-0">
								<h3 class="text-lg font-medium leading-5 text-gray-900">Content Filters</h3>
								<p class="mt-1 text-gray-500">
									Adjust the visibility of certain content.
								</p>
							</div>
						</div>
						<div class="mt-5 md:mt-0 md:col-span-2">
							<div class="px-4 py-5 space-y-6 md:p-5 bg-white border rounded-sm overflow-hidden">
								<div class="flex items-start">
									<t-toggle v-model="v.over_18"/>
									<div class="ml-5 -mt-1">
										<label class="label">NSFW</label>
										<p class="mt-1 text-sm text-gray-600">
											Check if you are over 18 and are okay with viewing mature content.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="hidden sm:block" aria-hidden="true">
						<div class="py-4">
							<div class="border-t border-gray-200"></div>
						</div>
					</div>

					<div class="md:grid md:grid-cols-3 md:gap-6">
						<div class="md:col-span-1">
							<div class="px-4 sm:px-0">
								<h3 class="text-lg font-medium leading-5 text-gray-900">Privacy</h3>
								<p class="mt-1 text-gray-500">
									Set privacy options for your account.
								</p>
							</div>
						</div>
						<div class="mt-5 md:mt-0 md:col-span-2">
							<div class="px-4 py-5 space-y-6 md:p-5 bg-white border border-gray-300 rounded-sm overflow-hidden">
								<div class="flex items-start">
									<t-toggle v-model="v.is_private"/>
									<div class="ml-5 -mt-1">
										<label class="label">Private Profile</label>
										<p class="mt-1 text-sm text-gray-600">
											Cloak your post and comment history from others. Still visible to some search engines.
										</p>
									</div>
								</div>
								<div class="flex items-start">
									<t-toggle v-model="v.is_nofollow"/>
									<div class="ml-5 -mt-1">
										<label class="label">Disable Followers</label>
										<p class="mt-1 text-sm text-gray-600">
											Nobody will be able to follow your profile. Disables existing followers' ability to see your latest posts.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>


	</div>
</template>

<script>
	import { mapState } from "vuex"

	import Navigation from '@/components/navigation/OnboardUserButtons.vue';

	export default {
		data() {
			return {
				showMore: false,
				loading: false,
				errored: false
			};
		},
		props: {
		},
		components: {
			Navigation
		},
		watch: {
		},
		computed: {
			...mapState("persist", ["v"]),
			isFirst() {
				return this.$route.name === 'onboard-user-first-step'
			},
			isSecond() {
				return this.$route.name === 'onboard-user-second-step'
			},
			isThird() {
				return this.$route.name === 'onboard-user-third-step'
			},
			isLast() {
				return this.$route.name === 'onboard-user-fourth-step'
			},
			currentStep() {
				if (this.isFirst) {
					return 1
				} else if (this.isSecond) {
					return 2
				} else if (this.isThird) {
					return 3
				} else {
					return 4
				}
			},
			currentStepText() {
				if (this.isFirst) {
					return 'interests'
				} else if (this.isSecond) {
					return 'communities'
				} else {
					return 'profile'
				}
			},
			canSkip() {
				return false
			},
			validated() {
				return true
			},
		},
		methods: {
		}
	}
</script>