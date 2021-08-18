<template>
  <div class="flex flex-col flex-grow space-y-4">
    <div class="w-full bg-black bg-opacity-40 rounded-sm">
      <div class="flex itesm-center justify-between px-4 py-3 border-b border-black">
        <div class="text-gray-300 text-lg leading-6">
          Posts
        </div>
        <div class="flex flex-wrap items-center space-x-6">
          <ItemSort/>
          <ListingToggle/>
        </div>
      </div>
      <ItemList class="p-4"/>
    </div>
  </div>
</template>

<script>
// Import our components
import ItemList from "@/views/ItemList.vue";
import ItemSort from "@/components/dropdowns/ItemSort.vue";
import ListingToggle from "@/components/forms/ListingToggle.vue"

export default {
  name: "user-profile-posts",
  components: {
    ItemList,
    ItemSort,
    ListingToggle
  }
};
</script>