<template>
  <div id="user-popover-container">
    <!-- Our popover title and content render container -->
    <!-- We use placement 'auto' so popover fits in the best spot on viewport -->
    <!-- We specify the same container as the trigger button, so that popover is close to button -->
    <b-popover
    :target="'popover-user-' + user.name"
    triggers="hover"
    placement="auto"
    container="user-popover-container"
    custom-class="w-80 bg-gray-600 border-0 shadow-lg overflow-hidden"
    offset="2"
    :delay="{show: 500, hide: 100}"
    >
    <div class="h-24 position-relative popover-bg" style="background-image:url('https://i.imgur.com/QEFFQk9.jpg');">
      <div class="position-absolute bg-popover-overlay w-100 h-100"></div>
      <div class="position-absolute d-flex align-items-center" style="right: 0.75rem; top: 0.75rem;">
        <b-button variant="link" size="sm" class="h-8 mr-2">
        <i class="far fa-ellipsis-h text-white text-lg align-middle"></i>
      </b-button>
      <b-button variant="white" size="sm" class="h-8">
        <i class="far fa-heart mr-2"></i>Follow
      </b-button>
    </div>
    </div>

    <div class="py-2">
      <div class="d-flex align-items-end mt-n4 mb-2 px-3 z-index-2">
        <b-avatar
        :src="user.avatar"
        variant="transparent"
        rounded
        size="64px"
        badge
        badge-variant="success"
        badge-offset="-6px"
        class="mr-3 flex-shrink-0"
        ></b-avatar>

        <div>
          <div class="h6 font-weight-bold"><a href="#" class="text-gray-100">{{ user.name }}</a></div>
          <div>
            <b-badge variant="blue-300" class="text-extra-sm align-middle">
              <span class="align-middle">1000 rep club</span>
            </b-badge>
          </div>
        </div>

      </div>

      <div class="px-3 py-2">
        <p class="mb-0 text-base text-gray-100">
         {{ user.bio }}
       </p>
     </div>

     <div class="d-flex flex-wrap">
      <div class="px-3 py-2">
        <div class="font-weight-bold text-sm text-gray-200 mb-1">Guild Rep</div>
        <div class="h6 mb-0 text-gray-100">
          {{ user.guild_rep }}
        </div>
      </div>
      <div class="px-3 py-2">
        <div class="font-weight-bold text-sm text-gray-200 mb-1">Subscribers</div>
        <div class="h6 mb-0 text-gray-100">
          43
        </div>
      </div>
    </div>

    <div class="px-3 py-2">
      <div class="font-weight-bold text-sm text-gray-200 mb-1">Joined Ruqqus</div>
      <div class="h6 mb-0 text-gray-100">
        21 June, 2020
      </div>
    </div>

    </div>
  </b-popover>
</div>
</template>

<script>
  export default {
    name: "UserDetails",
    data() {
      return {
        //popoverShow: true
      }
    },
    computed: {
      user() {
        return this.$store.state.misc.hoveredUser[0]
      },
      show() {
        return this.$store.state.misc.showUserPopover
      }
    },
    methods: {
      //onClose() {
        //this.popoverShow = false
      //}
    }
  }
</script>

<style lang="scss" scoped>
.popover-bg {
  background-size: cover;
  background-position: center;
}
::v-deep .b-avatar .b-avatar-badge {
    font-size: 11px;
    min-height: 18px;
    min-width: 18px;
    border: 3px solid $gray-600;
}
</style>
