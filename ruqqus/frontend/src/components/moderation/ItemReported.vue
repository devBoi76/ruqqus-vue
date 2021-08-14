<template>

	<div class="d-flex flex-column reported-item" :class="{ 'active overflow-hidden': details, 'darkMode': darkMode }">

    <div class="position-relative d-flex justify-content-between flex-wrap align-items-center h-min-16 px-3 py-2 rounded shadow-sm">

      <div class="d-flex align-items-center z-index-2">

       <b-form-checkbox
       :id="id"
       v-model="selected"
       size="lg"
       name="items"
       aria-label="Individual Item"
       >
     </b-form-checkbox>

     <div v-show="!details" :class="{ 'd-flex align-items-center': !details }">
       <b-avatar
       src="https://i.imgur.com/YlxnPih.png"
       variant="light"
       rounded
       size="32px"
       alt="avatar"
       class="mx-2"
       ></b-avatar>
       <div>
        <b-link class="font-weight-bold">anders</b-link>
        <div class="text-muted text-sm">#News<span class="dot"></span>25 min ago</div>
      </div>
    </div>

  </div>

  <div :class="{ 'ml-2': details }" @click="showDetails">
    <b-badge variant="red-300" class="py-1 px-2 mr-2">
      <i class="fas fa-circle text-danger text-extra-sm mr-1"></i>
      Rule 3
    </b-badge>
    <span class="font-weight-bold stretched-link" :class="{'text-gray-100':darkMode}"
    >I hate +Playstation. Here's an Xbox post you. Seeth...</span>
  </div>

  <div :class="{ 'ml-auto': details }">
    <span class="text-white text-sm">4 reports</span>
  </div>

  <div class="mod-actions z-index-2" :class="{ 'd-flex ml-auto': details }">

    <b-button variant="link" size="lg" class="px-1 py-0 text-decoration-none" v-b-tooltip.hover title="Resolve"
    :class="darkMode ? 'text-gray-100' : 'text-muted'">
    <i class="far fa-check-circle w-8"></i>
  </b-button>

  <b-button variant="link" size="lg" class="px-1 py-0 text-decoration-none" v-b-tooltip.hover title="Kick post"
  :class="darkMode ? 'text-gray-100' : 'text-muted'">
  <i class="far fa-door-open w-8"></i>
</b-button>

<b-button variant="link" size="lg" class="px-1 py-0 text-decoration-none" v-b-tooltip.hover title="Kick and mark as spam"
:class="darkMode ? 'text-gray-100' : 'text-muted'">
<i class="far fa-stamp w-8"></i>
</b-button>

<b-button variant="link" size="lg" class="px-1 py-0 text-decoration-none" v-b-tooltip.hover title="Exile user"
:class="darkMode ? 'text-gray-100' : 'text-muted'">
<i class="far fa-gavel w-8"></i>
</b-button>

<b-dropdown size="lg" variant="link" :toggle-class="['px-1 py-0 text-decoration-none', darkMode ? 'text-gray-100' : 'text-muted']" menu-class="bg-gray-800 shadow-sm z-index-2" no-caret dropleft text="Drop-Left" v-b-tooltip.hover title="More">
  <template v-slot:button-content>
    <i class="far fa-ellipsis-v w-6"></i>
  </template>
  <b-dropdown-item link-class="font-weight-bold text-white"><i class="far fa-clipboard w-4 mr-3 text-center"></i>Copy link</b-dropdown-item>
  <b-dropdown-divider></b-dropdown-divider>
  <b-dropdown-item-button button-class="font-weight-bold text-danger" v-b-modal="'base-modal'"><i class="far fa-radiation-alt w-4 mr-3 text-center"></i>Emergency remove and report</b-dropdown-item-button>
</b-dropdown>

</div>

</div>

<div v-show="details" class="px-3 py-4" :class="darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white'">

  <div class="d-flex mb-3">
    <b-avatar
    src="https://i.imgur.com/YlxnPih.png"
    variant="light"
    rounded
    size="32px"
    alt="avatar"
    class="mr-2"
    ></b-avatar>
    <div class="mt-n1">
      <b-link class="font-weight-bold">anders</b-link>
      <div class="text-muted text-sm">#News<span class="dot"></span>25 min ago</div>
    </div>
  </div>

  <h5 class="h4 mb-4">I hate +Playstation. Here's an Xbox post you. Seethe more.</h5>

  <Embed class="mb-5"/>

  <p>When you click a reported item entry, you can view the entire post contents. Here's the post body text right here.</p>

  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

</div>

</div>

</template>

<script>
//Import components
import Embed from "@/components/embeds/Link.vue";

export default {
  props: {
    id: String,
    selected: Array
  },
  components: {
    Embed
  },
  data() {
   return {
    status: 'not_checked',
    details: false
  }
},
computed: {
  darkMode() {
    return this.$store.state.persist.darkMode
  }
},
methods: {
  showDetails() {
    this.details = !this.details
  }
}
}
</script>

<style scoped>
.h-min-16 {
  min-height: 4rem;
}

/*
.reported-item {
  background-color: $white;
  margin-bottom: 0.5rem;
  .mod-actions {
    visibility: hidden;
  }
  &:hover,
  &:focus,
  &.active {
    background-color: lighten($gray-50, 1.1);
    .mod-actions {
      display: flex;
      background-color: lighten($gray-50, 1.1);
      visibility: visible;
    }
    .log-date {
      visibility: hidden;
    }
  }
}
*/

.reported-item:last-child {
  border-bottom: 0;
}
</style>