<template>
  <div class="flex flex-col flex-grow overflow-y-auto">

    <!-- Header content section -->
    <div class="grid grid-cols-12 sticky top-0 z-10">
      <div class="col-span-full 2xl:col-start-2 2xl:col-end-10">
        <div class="flex items-center justify-between px-4 py-3 bg-gray-50 sm:bg-gray-100">
          <h1 class="text-2xl capitalize mb-0">
            Titles
          </h1>
          <div v-show="!loading && !errored" class="col-span-full mt-4 px-4">
            <div class="flex space-x-2">
              <button v-show="!reorder" class="button white" @click="reorderTitles">
                Reorder
              </button>
              <button v-show="reorder" class="button green500" @click="reorderTitles">
                Done
              </button>
              <button>
                <i class="far fa-feather mr-2"></i>Create new title
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content section -->

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

    <div v-show="loading && !errored" class="col-span-full 2xl:col-start-2 2xl:col-end-10">
      <div class="flex flex-col w-full p-4 space-y-3 animate-pulse">
        <div class="rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 w-1/6 h-3"></div>
        <div class="rounded-sm bg-gray-200 dark:bg-white dark:bg-opacity-20 w-full h-20"></div>
      </div>
    </div>

    <div v-if="!loading && !errored" class="grid grid-cols-12 gap-4">

      <div class="col-start-1 col-span-full px-4 my-4 dark:text-gray-100">
        <div class="bg-white border rounded-sm overflow-hidden">
          <div class="flex align-center px-3 py-2 bg-gray-50 border-b">
            <div class="text-2xs font-bold uppercase tracking-wide text-gray-500">Title name</div>
          </div>
          <draggable @start="drag=true" @end="drag=false" v-bind="{ghostClass: 'ghost', chosenClass: 'chosen', dragClass: 'drag'}" handle=".handle">
            <TitleRow v-for="title of titles" :key="title.id" :reorder=reorder :id="title.id"/>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import components
import draggable from "vuedraggable";
import axios from 'axios'
import TitleRow from "@/components/moderation/TitleRow.vue";

export default {
  name: "UserSettingsBasicInfoView",
  components: {
    TitleRow,
    draggable
  },
  data() {
    return {
      loading: true,
      errored: false,
      g: [],
      reorder: false,
      titles: [
      {
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      },
      {
        id: 4
      },
      {
        id: 5
      },
      {
        id: 6
      },
      {
        id: 7
      },
      {
        id: 8
      }
      ]
    }
  },
  computed: {
  },
  methods: {
    reorderTitles() {
      this.reorder = !this.reorder
    }
  },
  created() {
    axios
    .get(`/core/+${this.$route.params.name}`)
    .then(response => {
      this.g = response.data
    })
    .catch(error => {
      console.log(error)
      this.errored = true
    })
    .finally(() => this.loading = false)
  }
};
</script>

<style scoped>
.ghost {
  opacity: 0.45;
  transform: scale(1.0125);
  transition: all .15s ease-in-out;
}
.chosen {
  transform: scale(1.0125);
  transition: all .15s ease-in-out;
}
.drag {
  opacity: 0.5;
  transition: all .15s ease-in-out;
}
</style>