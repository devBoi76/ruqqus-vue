<template>

  <div class="d-flex flex-column h-min-16"
  :class="[customRowClass, {'active overflow-hidden': details, 'shadow-sm': shadow }, 'member-'+variant]">

  <div class="position-relative d-flex flex-grow-1 justify-content-between flex-wrap align-items-center">

    <div class="d-flex align-items-center z-index-1">

     <div class="d-flex align-items-center">
       <b-avatar
       :src="this.member.profile_url"
       variant="light"
       rounded
       size="32px"
       alt="avatar"
       :badge="this.member.is_online"
       badge-variant="success"
       badge-offset="-4px"
       >
     </b-avatar>
     <div class="ml-1 pl-2" :class="{'text-gray-100':darkMode}">
      <b-link
      :to="'/' + this.member.username"
      class="font-weight-bold d-flex align-items-center"
      :class="darkMode ? 'text-gray-100' : 'text-black'">{{ this.member.username }}
      <span v-if="this.isGuildmaster" class="text-yellow-600 text-extra-sm pl-1"><i class="fas fa-crown fa-sm"></i></span>
    </b-link>
    <div class="text-muted text-sm">
      {{ this.member.total_rep }} Guild Rep<span v-show="this.isGuildmaster"><span class="dot text-gray-400"></span>Full Permissions</span>
    </div>
  </div>
</div>

</div>

</div>

</div>

</template>

<script>
//Import components

export default {
  props: {
    member: Object,
    padding: String,
    shadow: Boolean,
    rowClass: String,
    noHover: Boolean,
    dropdownAnimate: Boolean,
    dropdownIcon: String,
    isGuildmaster: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      defalt: 'transparent'
    }
  },
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    darkMode() {
      return this.$store.state.persist.darkMode
    },
    // hoverEffect() {
    //   const dark = this.darkMode ? 'bg-gray-900' : 'bg-white';
    //   return this.noHover ? dark : 'member';
    // },
    customRowClass() {
      return this.rowClass ? this.rowClass : 'px-3 py-3 rounded'
    }
  },
  methods: {
  }
}
</script>

<style scoped>
/*
@each $variant, $color in $theme-colors {
    .member-#{$variant} {
      background-color: $color;
    //margin-bottom: 0.5rem;
    ::v-deep .b-avatar .b-avatar-badge {
      border: 3px solid $color;
    }
    &:hover,
    &:focus,
    &.active {
      background-color: lighten($color, 1.1);
      .member-actions {
        display: flex;
        background-color: lighten($color, 1.1);
      }
      .member-date {
        visibility: hidden;
      }
      ::v-deep .b-avatar .b-avatar-badge {
        border: 3px solid lighten($color, 1.1);
      }
    }
  }
}

.member:last-child {
  margin-bottom: 0;
}
::v-deep .b-avatar .b-avatar-badge {
  font-size: 10px;
  min-height: 16px;
  min-width: 16px;
  border: 3px solid $gray-500;
}
*/
</style>