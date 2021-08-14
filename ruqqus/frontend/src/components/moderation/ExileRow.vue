<template>

	<div class="d-flex flex-column exiled-user" :class="{ 'active overflow-hidden': details }">

    <div class="position-relative d-flex flex-wrap align-items-center justify-content-between justify-content-md-start h-min-16 px-3 py-2"
    :class="{'bg-gray-400 shadow-sm': details }">

    <div class="d-flex align-items-center w-md-25 z-index-2">

     <div class="d-flex align-items-center">
       <b-avatar
       src="https://i.imgur.com/YlxnPih.png"
       variant="light"
       rounded
       size="32px"
       alt="avatar"
       class="mr-2"
       ></b-avatar>
       <div>
        <div class="text-gray-100 font-weight-bold">anders</div>
        <div class="d-md-none mt-1 text-muted text-sm">Exiled on 20 July, 2020<span class="dot"></span>Rule 3</div>
      </div>
    </div>

  </div>

  <div class="stretched-link d-none d-md-block" @click="showDetails">
    <span class="text-gray-100">Banned for violating rule 3</span>
  </div>

  <div class="exile-date d-none d-md-block ml-md-auto">
    <span class="text-gray-100 text-sm">20 July, 2020</span>
  </div>

  <b-button variant="link" size="sm" class="d-md-none" @click="showDetails">
    <i class="far fa-chevron-down text-gray-100 transition" :class="{ 'rotate': details }"></i>
  </b-button>

  <div class="d-none d-md-block">
    <div class="mod-actions z-index-2" :class="{ 'd-flex bg-gray-400': details }">
      <b-button variant="link" size="lg" class="px-1 py-0 text-decoration-none" v-b-tooltip.hover title="Pardon user">
        <i class="far fa-check-circle text-gray-100 w-8"></i>
      </b-button>
      <b-dropdown size="lg" variant="link" toggle-class="px-1 py-0 text-decoration-none" menu-class="bg-gray-800 shadow-sm z-index-2" no-caret dropleft text="Drop-Left" v-b-tooltip.hover title="More">
        <template v-slot:button-content>
          <i class="far fa-ellipsis-v text-gray-100 w-6"></i>
        </template>
        <b-dropdown-item link-class="font-weight-bold text-gray-100"><i class="far fa-user-circle w-4 mr-3 text-center"></i>View profile</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item-button button-class="font-weight-bold text-success" v-b-modal="'base-modal'"><i class="far fa-check-circle w-4 mr-3 text-center"></i>Pardon user</b-dropdown-item-button>
      </b-dropdown>
    </div>
  </div>

</div>

<div v-show="details" class="px-3 py-4">

  <div class="text-sm text-gray-200 font-weight-bold">Notes:</div>

  <p class="text-gray-100">Banned for violating rule 3. This user was repeadetely violating rule 3 so I exiled them after ample warning in the comments.</p>

  <div class="text-sm text-muted">
    Exiled by <b-link class="font-weight-bold text-gray-100">david</b-link>
    <span class="dot"></span>July 20, 2020
    <span class="dot"></span>Rule 3
  </div>

  <div class="d-flex align-items-center justify-content-between mt-3 mb-n2 pt-3 border-top">
    <div class="d-md-none"><span class="font-weight-bold text-muted text-sm">Pardon this user?</span></div>
    <div>
      <b-button variant="green-400" size="sm" class="mr-2">
        <i class="far fa-check mr-2"></i>Pardon
      </b-button>
      <b-button variant="outline-secondary" size="sm" class="w-20 text-gray-100" @click="showDetails">
        Close
      </b-button>
    </div>
  </div>

</div>

</div>

</template>

<script>

//Import components

export default {
  components: {
  },
  data() {
   return {
    details: false
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

.z-index-2 {
  z-index: 2;
}
/*
.exiled-user {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: $gray-400;
  .mod-actions {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: none;
    background-color: $gray-500;
  }
  &:hover,
  &:focus,
  &.active {
    background-color: lighten($gray-500, 1.1);
    .mod-actions {
      display: flex;
      background-color: lighten($gray-500, 1.1);
    }
    .exile-date {
      visibility: hidden;
    }
  }
}
*/

.exiled-user:last-child {
  border-bottom: 0;
}

.transition {
  transition: all 0.15s linear;
}
.rotate {
  transform: rotate(180deg);
}

</style>