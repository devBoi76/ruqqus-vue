<template>
	<div class="flex flex-col flex-grow">
		<!-- Post Sorting and Display Toggle -->
		<div class="flex items-center flex-shrink-0 sm:rounded-sm sm:shadow-xs mb-2.5 sm:mb-4 px-4 py-3 bg-white dark:bg-gray-800">
			<div class="flex items-center justify-between flex-grow">
				<div class="text-xl font-bold capitalize leading-none dark:text-gray-200">
					Saved
				</div>
				<div class="flex flex-wrap items-center space-x-6">
					<ListingToggle/>
				</div>
			</div>
		</div>
		<!-- End Post Sorting and Display Toggle -->

		<!-- Listings -->
		<ItemList/>
		<!-- End Listings -->
	</div>
</template>

<script>
// Import components
import { defineAsyncComponent } from 'vue'
const ItemList = defineAsyncComponent(() => import('@/views/ItemList.vue'));
const ListingToggle = defineAsyncComponent(() => import('@/components/forms/ListingToggle.vue'));

export default {
	name: "SavedView",
	data() {
		return {
		};
	},
	components: {
		ItemList,
		ListingToggle
	},
	computed: {
	}
}
</script>
