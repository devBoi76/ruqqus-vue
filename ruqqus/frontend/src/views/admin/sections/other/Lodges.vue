<template>
  <!-- Main content section -->
  <b-container class="pt-4 px-md-4">
    <b-row :class="{'text-gray-100':darkMode}">
      <b-col>
        <div class="d-md-flex justify-content-between align-items-end">
          <div>
            <h1 class="h2">Lodges</h1>
            <p class="mb-md-0" :class="darkMode ? 'text-white-65' : 'text-muted'">
              Lodges are guild sub-categories users can post to. You can manage your guild's lodges here.
            </p>
          </div>
          <div>
            <b-button :variant="darkMode ? 'gray-700' : 'secondary'">
              <i class="far fa-plus mr-2"></i>Create new lodge
            </b-button>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row class="py-4">
      <b-col cols="12">
        <div class="border rounded overflow-hidden" :class="{ 'border-white-13':darkMode }">
          <div class="d-flex align-items-center px-3 py-2 border-bottom"
          :class="darkMode ? 'bg-white-10 border-white-13 text-gray-200' : 'bg-white'">
            <div class="w-72 font-weight-bold text-sm">Lodge name</div>
            <div class="d-none d-xl-block pl-xl-4 font-weight-bold text-sm">Description</div>
          </div>
          <LodgeRow v-for="lodge of lodges" :key="lodge.id" :id="lodge.id" :name="lodge.name"/>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// Import components
import LodgeRow from "@/components/moderation/LodgeRow.vue";

import { mapState } from "vuex";

export default {
  name: "ModerationLodgesView",
  components: {
    LodgeRow
  },
  data() {
    return {
      reorder: false
    }
  },
  computed: {
    ...mapState("persist", ["darkMode"]),
    ...mapState("guild", ["lodges"])
  }
};
</script>
