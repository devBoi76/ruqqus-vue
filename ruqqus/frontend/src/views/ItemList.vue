<template>
	<div>
		<!-- Skeleton loading -->
		<div v-if="!items.length">
			<div v-if="!isCard || compact">
				<div v-for="i in 4" :key="i" class="mb-2 last:mb-0 p-2.5 sm:px-4 sm:py-3 sm:rounded-sm bg-white border border-transparent dark:bg-gray-800">
					<div class="animate-pulse">
						<div class="flex items-center w-full mb-4">
							<div class="flex-shrink-0 bg-gray-200 dark:bg-white dark:bg-opacity-10 rounded-sm w-9 h-9 sm:w-8 sm:h-8 mr-2"></div>
							<div class="bg-gray-200 dark:bg-white dark:bg-opacity-10 rounded-sm w-32 h-3"></div>
						</div>
						<div class="bg-gray-200 dark:bg-white dark:bg-opacity-10 mb-3 w-3/4 h-3 rounded-sm"></div>
						<div class="bg-gray-200 dark:bg-white dark:bg-opacity-10 w-32 h-3 rounded-sm"></div>
					</div>
				</div>
			</div>
			<div v-if="isCard && !compact">
				<div v-for="i in 4" :key="i" class="flex mb-4 last:mb-0">
					<div class="hidden md:block mr-4 animate-pulse">
						<div class="bg-gray-200 dark:bg-white dark:bg-opacity-20 sm:rounded-sm w-16 h-16"></div>
					</div>
					<div class="w-full p-2.5 sm:p-4 sm:rounded-sm bg-white border border-transparent dark:bg-gray-800">
						<div class="flex flex-col animate-pulse">
							<div class="hidden sm:flex flex-col w-full justify-between mb-6">
								<div class="bg-gray-200 dark:bg-white dark:bg-opacity-10 mb-2 w-40 h-3 rounded-sm"></div>
								<div class="bg-gray-200 dark:bg-white dark:bg-opacity-10 mb-0 w-32 h-3 rounded-sm"></div>
							</div>
							<div class="bg-gray-200 dark:bg-white dark:bg-opacity-10 mb-3 w-3/4 h-3 rounded-sm"></div>
							<div class="bg-gray-200 dark:bg-white dark:bg-opacity-10 mb-4 w-32 h-3 rounded-sm"></div>
							<div class="bg-gray-200 dark:bg-white dark:bg-opacity-10 w-full h-20 sm:h-24 rounded-sm"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Posts -->
		<div v-if="items.length">
			<keep-alive v-for="item in items" :key="item">
				<component :is="itemComponent" :id="item" :moderating="moderating" class="mb-2.5 sm:mb-2 last:mb-0"/>
			</keep-alive>
		</div>

		<div v-show="items.length" class="flex w-full justify-center mt-4 px-4 sm:px-8">
			<t-button variant="gray200" @click="loadMore()">
				<span :class="{'animate-pulse':loading}">
					{{ loading ? 'Loading...' : 'Load more posts' }}
				</span>
			</t-button>
		</div>

		<!-- <virtual-list
		v-if="items.length"
		:data-key="'items'"
		:data-sources="items"
		:data-component="itemComponent"
		:keeps="25"
		:estimate-size="162"
		:page-mode="true"
		:item-class="'mb-2.5 sm:mb-2 last:mb-0'"
		:wrap-style="{ padding: '0px' }"
		>
		<div slot="footer" class="flex w-full justify-center mt-4 px-4 sm:px-8">
			<t-button variant="gray200" @click="loadMore()">
				Load more posts
			</t-button>
		</div>
	</virtual-list> -->

</div>
</template>

<script>
	import { mapState } from "vuex";

	const ItemListing = () => import('@/components/item/ItemListing.vue')
	const ItemListingCompact = () => import('@/components/item/ItemListingCompact.vue')

	//import ItemListingCompact from "@/components/item/ItemListingCompact.vue";

	export default {
		name: "item-list",
		props: {
			ids: Array,
			compact: Boolean,
			moderating: Boolean,
			loading: Boolean
		},
		data() {
			return {
				page: this.$route.query.page || 1
			};
		},
		components: {
			ItemListing,
			ItemListingCompact
		},
		computed: {
			...mapState("persist", ["isCard"]),
			items() {
				return this.ids || this.$store.getters['items/getIds'];
			},
			itemComponent() {
				if (this.isCard === true && !this.compact) {
					return ItemListing;
				} else {
					return ItemListingCompact;
				}
			}
		},
		methods: {
			loadMore() {
				this.$emit('paginate')
			}
		}
	};
</script>
