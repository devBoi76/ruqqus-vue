<template>
  <div>
    <div class="mb-1">
      <div class="rounded px-4 py-3 bg-gray-500 text-white">
        <div class="d-flex justify-content-between align-items-center">
          <div class="flex-grow-1">
            <div class="h6 text-white"><slot name="name"/></div>
            <p class="text-white-65 mb-0"><slot name="description"/></p>
          </div>
          <div class="ml-3">
            <!-- Colors -->
            <v-swatches
            v-model="color"

            :swatches="swatches"

            swatch-size="32"
            show-fallback
            shapes="circles"
            popover-x="left"

            :trigger-style="{ width: '32px', height: '32px' }"

            ></v-swatches>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VSwatches from 'vue-swatches'

// Import tyles
import 'vue-swatches/dist/vue-swatches.css'

export default {
  components: { VSwatches },
  data() {
    return {
      color: '#1CA085',
      swatches: ['#FC8181', '#F6AD55', '#F6E05E', '#68D391', '#4FD1C5', '#63B3ED', '#7F9CF5', '#B794F4', '#F687B3']
    }
  },
}
</script>