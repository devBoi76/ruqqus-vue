<template>
	<div class="flex flex-col h-full shadow-sm bg-gray-200 dark:bg-gray-700">
		<!-- Header content section -->
		<div class="flex items-center justify-between flex-shrink-0 h-16 md:px-4 border-b border-gray-300 bg-white dark:border-white dark:border-opacity-10 dark:bg-gray-700">
			<div>
				<div class="text-base font-bold dark:text-gray-100">Audit Log</div>
				<p class="text-sm text-gray-600 dark:text-white dark:text-opacity-65 mb-0">
					Automagically keeping tabs on guild master actions
				</p>
			</div>
			<div class="flex items-center space-x-1">
				<button class="w-9 h-9 flex items-center justify-center px-2 py-0 text-gray-500 bg-white dark:bg-gray-700 rounded-sm" :class="filtersVisible ? 'lg:bg-gray-100' : 'hover:bg-gray-100'" @click="filtersVisible = !filtersVisible">
					<i class="fas fa-sliders-h"></i>
				</button>
			</div>
		</div>

		<!-- Main Content Desktop -->

		<vue-scroll class="hidden md:block">
			<div class="md:px-4 py-4">
				<div class="flex space-x-4">
					<div class="w-full" :class="{ 'lg:w-2/3':filtersVisible }">
						<div class="hidden lg:flex items-center justify-between mb-2" v-show="filtersVisible">
							<!-- <t-dropdown :classes="{dropdown: 'origin-top-left left-0 bg-white w-56 py-2'}" text="Menu">
								Trigger
								<div slot="trigger" slot-scope="{ mousedownHandler, focusHandler, blurHandler, keydownHandler }">
									<button class="font-bold text-gray-600" id="sort-logs-menu" aria-label="User menu" aria-haspopup="true" @mousedown="mousedownHandler" @focus="focusHandler" @blur="blurHandler" @keydown="keydownHandler">
										Most recent<i class="fas fa-chevron-down fa-sm pl-2"></i>
									</button>
								</div>
								Menu
								<div slot-scope="{ hide }">
									<router-link to="?sort=hot" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @blur="hide">
										<span>Oldest</span>
									</router-link>
									<router-link to="?sort=newest" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @blur="hide">
										<span>Most recent</span>
									</router-link>
								</div>
							</t-dropdown> -->
						</div>
						<LogRow v-for="log in logs" v-bind:key="log.permalink" :log="log"/>
						<!-- skeleton loading logs -->
						<div v-show="loading">
							<div v-for="i in 6" :key="i" class="mb-2 last:mb-0 px-3 py-2 rounded-sm bg-white dark:bg-gray-800">
								<div class="flex items-center w-full animate-pulse">
									<div class="mr-3">
										<div class="bg-gray-200 dark:bg-white dark:bg-opacity-20 rounded-full w-10 h-10"></div>
									</div>
									<div class="mr-2">
										<div class="bg-gray-200 dark:bg-white dark:bg-opacity-20 rounded-sm w-10 h-10"></div>
									</div>
									<div class="flex flex-col w-full space-y-2">
										<div class="rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 w-36 h-3"></div>
										<div class="rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 w-24 h-2.5"></div>
									</div>
								</div>
							</div>
						</div>
						<div v-show="!loading && !logs.length">
							<div class="flex items-center justify-center p-5 rounded-sm bg-white dark:bg-black dark:bg-opacity-13">
								<div class="text-center">
									<i class="fad fa-ghost text-gray-400 text-4xl mb-2"></i>
									<p class="text-gray-400">There are no logs, so here's a ghost instead ;)</p>
								</div>
							</div>
						</div>
						<!-- more button -->
						<button v-show="!loading && logs.length > 24" class="flex items-center justify-center w-full bg-white mt-3 py-3 rounded text-gray-600 font-bold text-sm">
							Load more<i class="fas fa-caret-down pl-2"></i>
						</button>
					</div>
					<div class="hidden lg:block lg:w-1/3" v-show="filtersVisible">
						<div class="flex flex-col flex-shrink-0 space-y-6">
							<div>
								<div class="flex items-center justify-between mb-2">
									<div class="text-sm font-bold">Filters</div>
									<button class="hidden text-sm text-red-500 hover:text-red-700" @click="filtersVisible = false">
										Clear
									</button>
								</div>
								<div class="text-sm text-gray-500 mb-4 pb-1 border-b border-gray-300">Guild Masters</div>
					</div>
					<div>
						<div class="text-sm text-gray-500 mb-4 pb-1 border-b border-gray-300">Moderation Type</div>
						<t-checkbox-group name="example" :options="['Content', 'Members', 'Appearance']"></t-checkbox-group>
					</div>
					<div>
						<div class="text-sm text-gray-500 mb-4 pb-1 border-b border-gray-300">Date</div>
						<t-datepicker placeholder="Logs made between..." range clearable/>
					</div>
				</div>
			</div>
		</div>
	</div>
</vue-scroll>

<!-- Main Content Mobile -->

<div class="md:hidden px-4 py-4">
	<div>
		<div>
			<div class="flex flex-row-reverse">
				<div class="w-full">
					<LogRow v-for="log in logs" v-bind:key="log.permalink" :log="log"/>
					<button class="flex items-center justify-center w-full bg-white mt-3 py-3 rounded text-gray-600 font-bold text-sm">
						Load more<i class="fas fa-caret-down pl-2"></i>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

</div>
</template>

<script>
	// Import components
	//import GuildSidebar from "@/components/guild/sidebar/GuildSidebar.vue";
	//import LogList from "@/views/moderation/LogList.vue";
	import axios from 'axios'

	import LogRow from "@/components/moderation/LogRow.vue";
	import { mapState } from "vuex";

	export default {
		data() {
			return {
				filtersVisible: false,
				loading: true,
				errored: false,
				logs: []
			};
		},
		computed: {
			darkMode() {
				return this.$store.state.persist.darkMode
			},
			...mapState("guild", ["guild", "guildmasters"])
		},
		components: {
			//Sidebar,
			//GuildSidebar,
			LogRow
		},
		created() {
			axios
			.get('/api/vue/+' + this.$route.params.name + '/mod/log')
			.then(response => {
				this.logs = response.data.actions
			})
			.catch(error => {
				console.log(error)
				this.errored = true
			})
			.finally(() => this.loading = false)
		}
	};
</script>