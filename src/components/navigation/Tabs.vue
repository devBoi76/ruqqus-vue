<template>
  <div>

    <!-- Desktop Navigation -->
    <div class="hidden md:flex items-end"> <!-- removed "tab-shadow" class -->
      <router-link
      v-for="tab in tabs"
      :key="tab.id"
      :to="tab.route"
      class="px-3 pb-3 w-24 text-center capitalize font-medium"
      :class="tabTextColor"
      :active-class="tabColor"
      :exact="tab.exact"
      >
      {{ tab.name }}
      <span v-if="tab.number" class="hidden lg:inline-block ml-1 px-2 py-1 bg-primary text-2xs tracking-wide uppercase font-medium">
        {{ tab.number }}
      </span>
    </router-link>
  </div>

  <!-- Mobile Navigation -->
  <div class="flex md:hidden items-center" :class="tabs.length >= 4 ? 'justify-between' : 'justify-around'">
    <router-link
    v-for="tab in tabs"
    :key="tab.id"
    :to="tab.route"
    class="pb-3 text-center text-sm uppercase font-medium"
    :class="tabTextColor"
    :active-class="tabColor"
    :exact="tab.exact"
    >
    {{ tab.name }}
    <span v-if="tab.number" class="hidden lg:inline-block ml-1 px-2 py-1 bg-primary text-2xs tracking-wide uppercase font-medium">
      {{ tab.number }}
    </span>
  </router-link>
</div>

</div>
</template>

<script>
  export default {
    props: {
      tabs: {
        type: Array,
        default: () => [{ name: '/' }]
      },
      tabColor: {
        type: String,
        default: () => 'shadow-inset-white'
      },
      light: Boolean
    },
    data() {
      return {};
    },
    computed: {
      darkMode() {
        return this.$store.state.persist.darkMode
      },
      tabTextColor() {
        if(this.light) {
          return 'text-gray-100'
        } else {
          return this.darkMode ? 'text-gray-100' : 'text-black'
        }
      }
    }
  };
</script>

<style scoped>

.tab-shadow {
  box-shadow: 0 2px rgba(0,0,0,0.25);
}
.tab-shadow-light {
  box-shadow: 0 2px rgba(255,255,255,.13);
}
.w-min-40 {
  min-width: 10rem;
}
</style>