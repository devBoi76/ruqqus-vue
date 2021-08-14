<template>
  <div class="flex">
    <!-- User Avatar -->
    <img v-show="!is_reply" :src="v.profile_url" class="w-8 h-8 object-fit rounded-sm bg-gray-200 dark:bg-gray-800 mr-3 hidden sm:block"/>
    <div class="flex-grow">
      <!-- Placeholder Faux-Input -->
      <!-- When clicked, the functional rich-text editor is rendered -->
      <div v-show="!visible && !is_reply" @click="$emit('change', true)" class="flex items-center px-4 py-3 bg-white dark:bg-gray-950 border dark:border-gray-700 dark:border-opacity-70 rounded-sm hover:border-primary">
        <p class="text-sm text-gray-500 dark:text-gray-300 mb-0">
          What do you think of this thread?
        </p>
      </div>
      <div v-if="visible">
        <div class="w-100 h-auto p-0 form-control active">
          <!-- TipTap Editor -->
          <Editor @input="getEditorContent" :limit="5000"/>
          <div class="flex items-center justify-end mt-3">
            <!-- Close Button -->
            <t-button variant="linkGray500" class="w-24" @click="$emit('change', false)">
              Close
            </t-button>
            <!-- Submit Button -->
            <t-button variant="primary" class="w-24">
              {{ is_reply ? 'Reply' : 'Comment' }}
            </t-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import components
const Editor = () => import('@/components/editors/Editor_V2.vue')

import { mapState } from "vuex";

export default {
  components: {
    Editor
  },
  props: {
    is_reply: Boolean,
    visible: Boolean
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState("persist", ["v"])
  },
  methods: {
    getEditorContent(value) { // custom event on TipTap editor passes editor's contents on input
      console.log(value);
    },
  }
};
</script>
