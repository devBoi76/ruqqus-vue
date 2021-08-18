<template>
	<div class="flex flex-grow">
		<div class="w-full">
			<div class="grid grid-cols-12 xl:grid-cols-7">
				<div class="col-span-full xl:col-start-2 xl:col-end-7 flex gap-6 md:p-4 xl:p-0 xl:my-4">
					<!-- Main content section -->
					<div class="w-full">
						<keep-alive :max='5'>
							<router-view :key="$route.fullPath"></router-view>
						</keep-alive>
					</div>
					<!-- Right Bar -->
					<div class="hidden lg:block flex-shrink-0 w-72 sticky top-4">
						<div class="space-y-6">
							<div class="flex flex-col">
								<ul class="mb-0">
									<li v-for="item in navigation" :key="item.name" class="border-b last:border-0">
										<router-link v-slot="{ href, navigate, isActive }" :to="item.route">
											<a :href="href" @click="navigate" class="block px-3 py-2" :class="{'bg-gray-200':isActive}">
												<div class="text-sm text-gray-900 font-bold capitalize">
													{{ item.name }}
												</div>
												<p class="text-xs text-gray-500">
													{{ item.description }}
												</p>
											</a>
										</router-link>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<!-- End Right bar -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// Import Components
import { mapState } from 'vuex';

export default {
	name: "GuildSettingsView",
	data() {
		return {
			navigation: [
				{
					name: 'notifications',
					description: 'Activity, replies, and more',
					route: {
						path: '/notifications'
					},
					icon: 'fa-bell',
					textCase: 'capitalize'
				},
				{
					name: 'following',
					description: 'Your favorite ruqqies',
					route: {
						path: '/following'
					},
					icon: 'fa-user-friends',
					textCase: 'capitalize'
				},
				{
					name: 'saved',
					description: 'Saved content',
					route: {
						path: '/saved'
					},
					icon: 'fa-backpack',
					textCase: 'capitalize'
				},
				{
					name: 'account settings',
					description: 'The settings',
					route: {
						path: '/settings'
					},
					icon: 'fa-cog',
					textCase: 'capitalize'
				}
				]
			};
		},
		computed: {
			...mapState("persist", ["v"])
		}
	}
</script>
