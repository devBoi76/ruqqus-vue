d<template>
	<div class="flex flex-col flex-grow space-y-4 overflow-y-auto">

		<!-- Header content section -->
		<div class="grid grid-cols-12 sticky top-0 z-10">
			<div class="col-span-full 2xl:col-start-2 2xl:col-end-10">
				<div class="flex items-center justify-between p-6 md:px-8 bg-white">
					<h1 class="text-2xl mb-0">
						Members
					</h1>
					<div v-show="!loading && !errored" class="flex space-x-2">
						<form class="relative" @submit.prevent="onSubmit" @submit="search()">
							<div class="absolute left-3 top-[6px]">
								<button class="text-gray-400 hover:text-gray-500" type="submit">
									<i class="far fa-search fa-fw fa-sm"></i>
								</button>
							</div>
							<input required type="text" class="form-input light pl-9" v-model="searchTerm" placeholder="Search members"/>
							<div v-show="searchTerm" class="absolute right-3 top-[6px]">
								<button class="text-gray-400 hover:text-gray-500" @click="searchTerm = ''">
									<i class="far fa-times-circle fa-fw fa-sm"></i>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>

		<!-- Main content section -->

		<!-- Error state if guild data fails to load -->
		<div v-show="errored && !loading" class="w-full h-2/3 p-4 md:px-8">
			<div class="flex flex-col h-full justify-center items-center text-center">
				<i class="block fad fa-ghost text-gray-400 dark:text-gray-200 text-5xl mb-6"></i>
				<div class="h5">
					Unable to Load Moderation Tools
				</div>
				<p class="text-gray-600 dark:text-gray-400">
					Sorry, we're unable to fetch guild reports right now. Please try again later.
				</p>
			</div>
		</div>

		<div class="grid grid-cols-12">

			<!-- Loading state -->
			<div v-show="loading && !errored" class="col-span-full 2xl:col-start-2 2xl:col-end-10 p-4 md:px-8">
				<div class="flex flex-col w-full space-y-3 animate-pulse">
					<div class="rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 w-1/6 h-3"></div>
					<div class="rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 w-full h-20"></div>
				</div>
			</div>

			<!-- Tools -->
			<div v-if="!loading && !errored" class="col-span-full px-4 md:px-8">
				<div class="flex items-center">
					<div class="flex space-x-4">
						<!-- <select class="form-select light capitalize" v-model="sort" :options="routes">
							<option v-for="route in routes" :value="route.id">
								{{ route.text }}
							</option>
						</select> -->
						<div class="flex flex-shrink-0 space-x-2">
							<select class="form-select light capitalize" placeholder="Change role" :disabled="!selected.length" v-model="selectedRole">
								<option v-for="role in roles" :value="role.id">
									{{ role.text }}
								</option>
							</select>
							<button class="button gray200" v-show="!confirmation || !selected.length" :disabled="selectedRole === null || !selected.length"  @click="confirmation = true">
								Change
							</button>
							<button v-if="confirmation && selected.length" @click="editRole()" class="button green500 flex-shrink-0">
								Confirm change
							</button>
						</div>
					</div>
					<!-- <t-pagination
					:total-items="members.length"
					:per-page="25"
					:limit="5"
					:value="1"
					class="ml-auto"
					/> -->
				</div>
			</div>

			<!-- Table -->
			<div v-if="!loading && !errored" class="col-span-full 2xl:col-start-2 2xl:col-end-10 p-4 md:px-8">
				<div class="border overflow-hidden border-b border-gray-200 sm:rounded-sm">
					<table class="min-w-full divide-y divide-gray-200">
						<thead class="bg-gray-50">
							<tr>
								<th class="pl-6 pr-3 py-3">
									<input type="checkbox" class="form-checkbox primary" v-model="selectAll"/>
								</th>
								<th class="w-1/5 pl-3 pr-6 py-2 text-xs font-semibold uppercase tracking-wider text-left text-gray-400 dark:text-gray-400">
									{{ subscriber_count === 1 ? '1 Member' : `${subscriber_count} Members` }}
								</th>
								<th class="w-1/5 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-left text-gray-400 dark:text-gray-400">
									Roles
								</th>
								<th class="w-1/5 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-left text-gray-400 dark:text-gray-400">
									Joined
								</th>
								<th class="w-1/5 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-left text-gray-400 dark:text-gray-400">
									Posts
								</th>
								<th class="w-1/5 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-left text-gray-400 dark:text-gray-400">
									Comments
								</th>
							</tr>
						</thead>
						<tbody class="border-b last:border-0">
							<template v-for="member in members" :key="member.id">
								<tr class="border-t first:border-0 hover:bg-gray-50">
									<td class="pl-6 pr-3 py-3">
										<div class="flex items-center">
											<input type="checkbox" class="form-checkbox primary" v-model="selected" :value="member.id"/>
										</div>
									</td>
									<td class="pl-3 pr-6 py-3 whitespace-no-wrap">
										<div class="flex items-center">
											<router-link :to="`/${member.username}`" target="_blank">
												<img :src="member.profile_url" class="w-8 h-8 rounded-sm object-cover mr-2" :alt="`${member.username} avatar`"/>
											</router-link>
											<div>
												<router-link :to="`/${member.username}`" target="_blank" class="text-gray-900 font-medium">
													{{ member.username }}
												</router-link>
											</div>
										</div>
									</td>
									<td class="px-6 py-4 whitespace-no-wrap leading-5 text-gray-900">
										<span class="px-2 inline-flex text-xs leading-5 font-medium rounded-sm" :class="roleStyle[member.role] || roleStyle.normal">
											{{ roles[member.role].text }}
										</span>
									</td>
									<td class="px-6 py-4 whitespace-no-wrap leading-5 text-gray-600">
										<span>
											{{ member.date }}
										</span>
									</td>
									<td class="px-6 py-4 whitespace-no-wrap leading-5 text-gray-600">
										<span>
											{{ member.post_count }}
										</span>
									</td>
									<td class="px-6 py-4 whitespace-no-wrap leading-5 text-gray-600">
										<span>
											{{ member.comment_count }}
										</span>
									</td>
								</tr>
							</template>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	<!-- End Main content section -->
</template>

<script>
// Import components
import { mapState } from 'vuex';

export default {
	name: "UserSettingsBasicInfoView",
	components: {
	},
	data() {
		return {
			searchTerm: '',
			subscriber_count: 4503,
			loading: false,
			errored: false,
			reorder: false,
			members: [
			{
				'id': '0',
				'username': 'throwaway420',
				'profile_url': 'https://i.ruqqus.com/users/throwaway420/profile-2.png',
				'role': 1,
				'date': 'Mon Jul 05 2021',
				'reputation': 1024,
				'post_count': 24,
				'comment_count': 240
			},
			{
				'id': '1',
				'username': 'bidpots',
				'profile_url': 'https://i.ruqqus.com/uid/5pr/profile-22.png',
				'role': 2,
				'date': 'Mon Jul 05 2021',
				'reputation': 2048,
				'post_count': 19,
				'comment_count': 290
			},
			{
				'id': '2',
				'username': 'IsaiahIsacc765',
				'profile_url': 'https://i.ruqqus.com/uid/aof/profile-13.png',
				'role': 1,
				'date': 'Mon Jun 28 2021',
				'reputation': 420,
				'post_count': 72,
				'comment_count': 240
			},
			{
				'id': '3',
				'username': 'citwrong',
				'profile_url': 'https://i.ruqqus.com/uid/1ay3/profile-4.png',
				'role': 3,
				'date': 'Mon Jul 05 2021',
				'reputation': 4273,
				'post_count': 82,
				'comment_count': 280
			}
			],
			selected: [],
			selectedRole: null,
			routes: [
			{ id: 'all', text: 'All' },
			{ id: 'member', text: 'Member' },
			{ id: 'approved', text: 'Approved' },
			{ id: 'exile', text: 'Exile' },
			{ id: 'guildmaster', text: 'Guild Master' }
			],
			roles: [
			{ id: 0, text: 'exile' },
			{ id: 1, text: 'member' },
			{ id: 2, text: 'approved' },
			{ id: 3, text: 'guildmaster' }
			],
			roleStyle: {
				0: 'bg-red-100 text-red-800',
				1: 'bg-gray-100 text-gray-800',
				2: 'bg-green-100 text-green-800',
				3: 'bg-yellow-100 text-yellow-800',
				normal: 'bg-gray-100 text-gray-800'
			},
			confirmation: false
		}
	},
	computed: {
		...mapState("persist", ["v"]),
		selectAll: {
			get: function () {
				return this.members ? this.selected.length === this.members.length : false;
			},
			set: function (value) {
				let selected = [];
				if (value) {
					this.members.forEach(function (member) {
						selected.push(member.id);
					});
				}
				this.selected = selected;
			}
		},
		sort: {
			get: function() {
				return this.$route.params.sort
			},
			set: function (value) {
				if (value !== null) {
					this.$router.push({ name: 'moderation-user-management-view', params: { sort: value }});
				}
			}
		}
	},
	watch: {
		'selected': {
			handler() {
				if (this.confirmation && this.selected.length) {
					this.confirmation = true
				} else {
					this.confirmation = false
				}
			}
		}
	},
	methods: {
		editRole() {
			let i = 0;
			if (this.selected.length && this.selectedRole !== null) {
				for (let id of this.selected) {
					this.members[id].role = this.selectedRole;
					i++
				}
				if (i === this.selected.length) {
					this.confirmation = !this.confirmation
					this.selectedRole = null
					this.selected = []
				}
			}
		}
	}
};
</script>