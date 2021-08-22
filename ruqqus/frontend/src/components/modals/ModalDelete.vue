<!-- Delete confirmation modal for various types of content -->
<!-- For documentation on this component, visit https://headlessui.dev/vue/dialog -->

<template>
  <Dialog :open="isOpen" @close="setIsOpen">
    <DialogOverlay />

    <DialogTitle>Delete {{ content }}</DialogTitle>
    <DialogDescription>
      This will permanently delete your {{ content }}
    </DialogDescription>

    <p>
      Are you sure you want to delete your {{ content }}? This action cannot be undone.
    </p>

    <button @click="setIsOpen(false)">Delete</button>
    <button @click="setIsOpen(false)">Cancel</button>
  </Dialog>
</template>

<script>
  import { ref } from "vue";
  import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    DialogDescription,
  } from "@headlessui/vue";

  export default {
    components: { Dialog, DialogOverlay, DialogTitle, DialogDescription },
    setup() {
      let isOpen = ref(true);

      return {
        isOpen,
        setIsOpen(value) {
          isOpen.value = value;
        },
      };
    },
  };
</script>