<template>
  <div class="flex items-center space-x-1">
    <!-- Set listings to card -->
    <button class="text-lg" :class="this.isCard ? 'text-primary' : 'text-gray-300'" @click="switchView()">
      <i class="fas fa-square fa-fw"></i>
    </button>
    <!-- Set listings to compact -->
    <button class="text-lg" :class="this.isCard ? 'text-gray-300' : 'text-primary'" @click="switchView()">
      <i class="far fa-bars fa-fw"></i>
    </button>
  </div>
</template>

<script>
//Import components
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    flex: String
  },
  data() {
    return {
    };
  },
  computed: {
   ...mapState("persist", ["isCard", "darkMode"]),
 },
 methods: {
  ...mapActions("persist",["toggle_card"]),
    // onClick() {
    //     // Close the menu and (by passing true) return focus to the toggle button
    //     this.$refs.dropdown.hide(true);
    //   },
    switchView() {
      // console.log(this.isCard)
      this.toggle_card()
    }
  }
};
</script>
