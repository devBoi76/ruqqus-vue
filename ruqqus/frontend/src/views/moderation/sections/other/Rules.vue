<template>
	<div class="flex flex-col flex-grow overflow-y-auto">

		<!-- Header content section -->
		<div class="grid grid-cols-12 sticky top-0 z-10">
			<div class="col-span-full 2xl:col-start-2 2xl:col-end-10">
				<div class="flex items-center justify-between px-4 py-3 bg-gray-50 sm:bg-gray-100">
					<h1 class="text-2xl capitalize mb-0">
						Rules
					</h1>
					<div v-show="!loading && !errored" class="flex space-x-2">
						<button v-show="reorder" class="button green500" @click="reorder = !reorder">
							Done
						</button>
						<button v-show="!reorder" class="button white" @click="reorder = !reorder">
							Reorder
						</button>
						<button v-show="!reorder" class="button purple500" @click="addRow()">
							<i class="far fa-plus fa-fw mr-1"></i>
							New rule
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Main content section -->

		<!-- Error state if guild data fails to load -->
		<div v-show="errored && !loading" class="w-full h-2/3 px-4">
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

			<div v-show="loading && !errored" class="col-span-full 2xl:col-start-2 2xl:col-end-10">
				<div class="flex flex-col w-full p-4 space-y-3 animate-pulse">
					<div class="rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 w-1/6 h-3"></div>
					<div class="rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 w-full h-20"></div>
				</div>
			</div>

			<div v-if="!loading && !errored" class="col-span-full 2xl:col-start-2 2xl:col-end-10">

				<div class="col-span-full">
					<div class="flex flex-col hidden md:flex p-4">
						<table class="table-fixed min-w-full divide-y divide-gray-200 rounded-sm shadow-xs bg-white">
							<thead class="bg-gray-50 border-b rounded-t-sm">
								<tr>
									<th class="w-1/3 px-6 py-3 text-xs font-medium uppercase tracking-wider text-left text-gray-400 dark:text-gray-400">
										Rule
									</th>
									<th class="w-1/3 px-6 py-3 text-xs font-medium uppercase tracking-wider text-left text-gray-400 dark:text-gray-400">
										Author
									</th>
									<th class="w-1/3 px-6 py-3 text-xs font-medium uppercase tracking-wider text-left text-gray-400 dark:text-gray-400">
										Last updated
									</th>
									<th class="px-6 py-3">
									</th>
								</tr>
							</thead>
							<tbody class="border-b last:border-0">
								<template v-for="(rule, index) in rules" :key="rule.id">
									<tr class="border-t first:border-0" :class="{'bg-gray-50':rule.active}">
										<td class="px-6 py-4 whitespace-no-wrap text-sm font-medium leading-5 text-gray-900">
											<div class="text-gray-900">
												{{ rule.name }}
											</div>
										</td>
										<td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
											<div class="flex items-center">
												<img :src="v.profile_url" class="w-6 h-6 rounded-sm object-cover mr-2" :alt="`${v.username} avatar`"/>
												<span class="text-gray-500">
													{{ rule.author }}
												</span>
											</div>
										</td>
										<td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
											<div class="flex items-center space-x-2">
												<span class="text-gray-500">
													{{ rule.date }}
												</span>
											</div>
										</td>
										<td class="px-6 py-4">
											<div v-show="!rule.unsaved" class="flex space-x-2">
												<button class="flex items-center justify-center px-2 w-8 h-8 text-lg text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-sm">
													<i class="far fa-trash-alt"></i>
												</button>
												<button class="flex items-center justify-center px-2 w-8 h-8 text-lg text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-sm" @click="rule.active = !rule.active">
													<i class="far" :class="rule.active ? 'fa-compress-alt' : 'fa-pen'"></i>
												</button>
											</div>
										</td>
									</tr>
									<tr v-if="rule.active" :key="rule.id">
										<td colspan="4">
											<div class="space-y-6 p-6">
												<div class="grid grid-cols-3 gap-6">
													<div class="col-span-full md:col-span-2 lg:col-span-1">
														<div class="relative">
															<input class="form-input" v-model="rule.name" type="text" placeholder="Enter a name..." maxlength="32"/>
															<div v-if="rule.name" class="absolute text-xs font-semibold text-gray-400 right-3 bottom-2" :class="{'text-red-500':rule.name.length >= 32}">
																{{ 32 - rule.name.length }}
															</div>
														</div>
														<p class="text-sm text-gray-500 mt-1">
															Give the rule a name
														</p>
													</div>
												</div>
												<div class="grid grid-cols-3 gap-6">
													<div class="col-span-full md:col-span-2 lg:col-span-1">
														<div class="relative">
															<textarea class="form-textarea" v-model="rule.description" type="text" rows="3" maxlength="140" placeholder="Enter a description..."/>
															<div v-if="rule.description" class="absolute text-xs font-semibold text-gray-400 right-3 bottom-2" :class="{'text-red-500':rule.description.length >= 280}">
																{{ 280 - rule.description.length }}
															</div>
														</div>
														<p class="text-sm text-gray-500 mt-1">
															Describe the rule in a couple sentences
														</p>
													</div>
												</div>
												<div class="grid grid-cols-3 gap-6">
													<div class="col-span-full md:col-span-2 lg:col-span-1">
														<div class="flex space-x-2">
															<button class="button purple500">
																Save
															</button>
															<button class="button gray100" @click="cancel(index)">
																Cancel
															</button>
														</div>
													</div>
												</div>
											</div>
										</td>
									</tr>
								</template>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// Import components
//import draggable from "vuedraggable";
import { mapState } from 'vuex';
import { getGuild } from '@/api/Guild.js';
//const Toggle = () => import('@/components/Toggle.vue')
//import TitleRow from "@/components/moderation/TitleRow.vue";

export default {
	name: "UserSettingsBasicInfoView",
	components: {
		//Toggle
		//TitleRow,
		//draggable
	},
	data() {
		return {
			loading: true,
			errored: false,
			saved: {},
			g: {},
			reorder: false,
			rules: [
			{
				id: 1,
				name: 'test',
				description: 'test',
				author: 'me',
				date: 'Mon Jul 05 2021',
				active: false
			},
			{
				id: 2,
				name: 'test 2',
				description: 'test',
				author: 'me',
				date: 'Mon Jul 05 2021',
				active: false
			},
			{
				id: 3,
				name: 'test 3',
				description: 'test',
				author: 'me',
				date: 'Mon Jul 05 2021',
				active: false
			}
			]
		}
	},
	computed: {
		...mapState("persist", ["v"]),
	},
	watch: {
		'$route.params.name': { // get guild info and posts if guild changes
			handler() {
				this.getGuildInfo()
			},
			immediate: true
		}
	},
	methods: {
		getGuildInfo() {
			let guild = this.$route.params.name;
			getGuild(guild)
			.then(response => {
				let data = response.data;
				this.saved = Object.assign({}, data);
				this.g = data;
			})
			.catch(error => {
				console.error(error)
				this.errored = true
			})
			.finally(() => this.loading = false)
		},
		addRow() {
			let id = this.rules.length + 1;
			this.rules.push({id: id, name: '' , description: '', author: 'me', date: 'Today', active: true, unsaved: true });
		},
		removeRow(index){
			this.rules.splice(index, 1)
		},
		cancel(index) {
			let rule = this.rules[index]
			if (rule.unsaved) {
				this.removeRow(index)
			} else {
				rule.active = false
			}
		}
	}
};
</script>

<style scoped>
.ghost {
	opacity: 0.45;
	transform: scale(1.0125);
	transition: all .15s ease-in-out;
}
.chosen {
	transform: scale(1.0125);
	transition: all .15s ease-in-out;
}
.drag {
	opacity: 0.5;
	transition: all .15s ease-in-out;
}
</style>