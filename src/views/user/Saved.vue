<template>
	<div class="w-full overflow-y-auto">
		<div class="grid grid-cols-12 xl:grid-cols-10">
			<div class="col-span-full xl:col-start-3 xl:col-end-9 flex flex-col gap-4 sm:p-6 my-2.5 sm:my-0">
				<div class="flex justify-between">
					<h1 class="h3 font-semibold mb-0">
						Saved
					</h1>
					<ListingToggle/>
				</div>
				<div class="flex gap-6">
					<!-- Main Content Section -->
					<div class="w-full">
						<div class="flex flex-grow">
							<div class="w-full bg-white dark:bg-gray-800 sm:rounded-sm sm:border">
								<ItemList/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
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
