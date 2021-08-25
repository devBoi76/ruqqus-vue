<template>
	<div class="flex flex-col flex-grow overflow-y-auto">

		<!-- Header section -->
		<div class="grid grid-cols-12 sticky top-0 z-10">
			<div class="col-span-full 2xl:col-start-2 2xl:col-end-10">
				<div class="flex items-center justify-between px-4 py-3 bg-gray-50 sm:bg-gray-100">
					<h1 class="text-2xl capitalize mb-0">
						{{ $route.params.filter || 'Moderation Queue' }}
					</h1>
				</div>
			</div>
		</div>

		<!-- Sub-header section -->
		<div class="grid grid-cols-12 sticky top-0 z-10">
			<div v-show="!loading && !errored" class="col-span-full mt-4 px-4">
				<!-- Tabs -->
				<div class="flex items-center space-x-4">
					<!-- <t-dropdown :classes="{dropdown: 'origin-top-left left-0 bg-white w-56 py-2'}" text="Menu">
						Trigger
						<div slot="trigger" slot-scope="{ mousedownHandler, focusHandler, blurHandler, keydownHandler }">
							<button class="capitalize text-sm text-gray-500" id="sort-reported-posts-menu" aria-label="User menu" aria-haspopup="true" @mousedown="mousedownHandler" @focus="focusHandler" @blur="blurHandler" @keydown="keydownHandler">
								Posts<i class="fas fa-chevron-down fa-sm pl-2"></i>
							</button>
						</div>
						Menu
						<div slot-scope="{ hide }">
							<router-link to="?sort=newest" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @blur="hide">
								<span>Posts</span>
							</router-link>
							<router-link to="?sort=newest" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" @blur="hide">
								<span>Comments</span>
							</router-link>
						</div>
					</t-dropdown> -->
					<div class="flex items-center bg-white border rounded-sm h-9">
						<label class="flex items-center justify-center w-9">
							<t-checkbox/>
						</label>
						<div v-show="selectedItemsCount" class="flex items-center justify-center w-9 border-l">
							<!-- <t-dropdown text="Menu" :classes="{ dropdown: 'w-56 origin-top-left -left-2 top-1 bg-white py-2' }">
								Trigger
								<div slot="trigger" slot-scope="{ mousedownHandler, focusHandler, blurHandler, keydownHandler }">
									<button class="p-2 leading-tight text-gray-500 hover:text-gray-600 dark:text-gray-200" id="comment-options-menu" aria-label="User menu" aria-haspopup="true" @mousedown="mousedownHandler" @focus="focusHandler" @blur="blurHandler" @keydown="keydownHandler" @click.prevent>
										<i class="fas fa-chevron-down fa-sm"></i>
									</button>
								</div>
								Menu
								<div slot-scope="{ hide, blurHandler }">
									<div class="text-2xs font-bold uppercase tracking-wide text-gray-500 px-4 py-2">Bulk Actions</div>
									<button to="#" class="block w-full text-left px-4 py-2 text-green-600 hover:bg-gray-100 hover:text-green-700" role="menuitem" @blur="blurHandler">
										<i class="fas fa-check fa-fw mr-2"></i><span>
											Approve Items
										</span>
									</button>
									<hr class="my-2">
									<button to="#" class="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 hover:text-red-700" role="menuitem" @blur="blurHandler">
										<i class="fas fa-times fa-fw mr-2"></i>
										<span>
											Kick Posts
										</span>
									</button>
									<button to="#" class="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 hover:text-red-700" role="menuitem" @blur="blurHandler">
										<i class="fas fa-gavel fa-fw mr-2"></i>
										<span>
											Exile Members
										</span>
									</button>
									<hr class="my-2">
									<button to="#" class="group block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 hover:text-red-700" role="menuitem" @blur="blurHandler">
										<i class="fas fa-radiation fa-fw group-hover:animate-spin"></i>
										<span class="pl-2">Report to Admins</span>
									</button>
								</div>
							</t-dropdown> -->
						</div>
					</div>
					<div v-show="selectedItemsCount > 0" class="flex items-center space-x-2 text-sm">
						<span class="font-medium" :class="selectedItemsCount > 9 ? 'text-red-500' : 'text-gray-600'">
							{{ selectedItemsCount === 1 ? '1 item' : `${selectedItemsCount} items` }} selected
						</span>
						<button class="text-gray-500 focus:underline hover:underline" @click="deselectItems()">
							Clear
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Main Content Desktop -->

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

		<!-- Show report queue when guild data has loaded -->
		<div v-if="!errored && !loading" class="md:px-4 py-4">
			<div class="flex space-x-4">
				<div class="w-full">
					<ItemList moderating compact/>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
// Import components
import { defineAsyncComponent } from 'vue'
import axios from 'axios'
import { mapActions } from "vuex";

const ItemList = defineAsyncComponent(() => import('@/views/ItemList.vue'));

export default {
	name: "ModerationReportsView",
	components: {
		ItemList
	},
	data() {
		return {
			loading: false,
			errored: false
		}
	},
	computed: {
		selectedItemsCount() {
			return this.$store.getters['items/selectedItemsCount']
		}
	},
	watch: {
	},
	methods: {
		...mapActions('items', ['deselectItems'])
	},
	created() {
		axios
		.get(`/core/+${this.$route.params.name}`)
		.then(response => {
			this.g = response.data.data
		})
		.catch(error => {
			console.log(error)
			this.errored = true
		})
		.finally(() => this.loading = false)
	}
};
</script>