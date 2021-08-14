<template>
  <div class="bg-white dark:bg-gray-800 dark:text-gray-100" :class="customInputClass">
    <div class="flex justify-between items-center">
      <div class="flex-grow">
        <div class="text-lg ont-medium mb-2"><slot name="name"/></div>
        <p class="mb-0 text-gray-600 dark:text-white dark:text-opacity-70"><slot name="description"/></p>
      </div>
      <div class="ml-3">
        <t-toggle/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      customClass: String
    },
    data() {
      return {
        form: {
          email: "",
          name: "",
          food: null,
          checked: []
        },
        show: true
      };
    },
    computed: {
      darkMode() {
        return this.$store.state.persist.darkMode;
      },
      customInputClass() {
        return this.customClass ? this.customClass : 'px-4 py-3 mb-1 rounded-sm'
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        alert(JSON.stringify(this.form));
      },
      onReset(evt) {
        evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>