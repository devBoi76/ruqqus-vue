<template>
  <t-modal
  v-model="showModal"
  :hideCloseButton="true"
  :classes="{
    overlay: 'bg-black',
    wrapper: 'max-w-2xl',
    modal: 'bg-white shadow',
    body: '',
    header: 'flex items-center justify-between px-4 py-3 bg-white border-b',
    footer: 'bg-gray-100',
    close: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
    closeIcon: 'fill-current h-4 w-4',
    overlayEnterClass: '',
    overlayEnterActiveClass: 'opacity-0 transition ease-out duration-100',
    overlayEnterToClass: 'opacity-100',
    overlayLeaveClass: 'transition ease-in opacity-100',
    overlayLeaveActiveClass: '',
    overlayLeaveToClass: 'opacity-0 duration-75',
    enterClass: '',
    enterActiveClass: '',
    enterToClass: '',
    leaveClass: '',
    leaveActiveClass: '',
    leaveToClass: ''
  }"
  >
  <template v-slot:header>
    <div class="flex items-center flex-shrink-0 space-x-2">
      <div class="font-medium text-lg">{{ modal.header }}</div>
    </div>
  </template>
  {{ modal.body }}
</t-modal>
</template>

<script>
  import { mapState, mapActions } from "vuex";

  export default {
    components: {
    },
    data() {
      return {
      };
    },
    computed: {
    },
    methods: {
    }
  };
</script>