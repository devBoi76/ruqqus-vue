<template>

  <div class="flex flex-col lodge" :class="{ 'active overflow-hidden': details && !reorder && !readonly, 'darkMode': darkMode }">

    <div class="relative flex flex-wrap items-center h-min-16 px-3 py-2" :class="{'active': details && !reorder && !readonly }">

      <div class="w-72">
        <div
        class="inline-block w-min-54 px-2 py-2 rounded-sm text-break" :style="{ backgroundColor: lodgeColor }"
        >
        <div>
          <span class="font-bold text-lowercase" :class="{'text-gray-100':darkMode}">
            <i class="far fa-hashtag text-sm mr-3 w-4 text-center" :class="icon"></i>
            {{ lodgeName }}

            <!--<input v-model="form_name">-->

          </span>
        </div>
      </div>
    </div>

    <div class="hidden xl:block xl:pl-4">
      <span class="text-gray-100">
        {{ lodgeDesc }}
      </span>
    </div>

    <div class="ml-auto">
      <button size="lg" class="button link px-1 py-0 text-decoration-none text-gray-400 dark:text-gray-100" v-b-tooltip.hover title="Edit lodge" @click="showDetails">
      <i class="far fa-edit w-8"></i>
    </button>

    <button size="lg" class="button link px-1 py-0 text-decoration-none text-gray-400 dark:text-gray-100"
     v-b-tooltip.hover title="Delete lodge">
    <i class="far fa-trash-alt w-8"></i>
  </button>
</div>

</div>

<b-row v-if="!readonly" v-show="details && !reorder" class="px-3 py-4 bg-white dark:bg-gray-800">
  <b-col lg="6">
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">

      <b-form-group
      id="input-group-1"
      label="Lodge Name"
      :label-class="['h6', {'text-gray-100':darkMode}]"
      label-for="input-1"
      class="mb-4"
      >
      <b-form-input
      v-model="lodgeName"
      id="input-1"
      type="text"
      required
      placeholder="Enter a name (required)"
      class="w-full text-gray-100"
      :class="{ 'border-danger': !lodgeValidation && !focusedValidation, 'dark':darkMode }"
      aria-describedby="lodge-text-help-block"
      maxlength=32
      :formatter="formatter"
      @keypress="isLetterOrNumber($event)"
      @focus.once="focused = true"
      ></b-form-input>
      <b-form-text :id="'lodge-text-help-block-' + id">
        {{ 32 - lodgeNameLength }}/32
      </b-form-text>
      <b-form-invalid-feedback :state="lodgeValidation || focusedValidation">Whoops. Text or emoji is required</b-form-invalid-feedback>
    </b-form-group>


    <b-form-group
    id="input-group-1"
    label="Lodge Description"
    :label-class="['h6', {'text-gray-100':darkMode}]"
    label-for="input-1"
    class="mb-4"
    >
    <b-form-textarea
    v-model="lodgeDesc"
    id="input-1"
    type="text"
    placeholder="Give your lodge a short description."
    class="w-full text-gray-100"
    :class="{'dark':darkMode}"
    aria-describedby="lodge-description-help-block"
    maxlength=75
    ></b-form-textarea>
    <b-form-text :id="'lodge-description-help-block-' + id">
      {{ 75 - lodgeDescLength }}/75
    </b-form-text>
  </b-form-group>


  <button type="submit" class="button primary" v-show="lodgeValidation">Save</button>
  <button class="button gray-300" disabled v-show="!lodgeValidation">Save</button>

  <button
  type="reset"
  class="button link font-bold text-white text-opacity-60"
  @click="showDetails"
  >Cancel</button>
</b-form>

<div class="text-sm text-muted d-none">
  Last edited by <b-link class="font-bold text-gray-100">david</b-link>
  <span class="w-1 h-1 rounded-full bg-gray-400"></span>July 20, 2020
</div>

</b-col>
</b-row>

</div>

</template>

<script>

// Import components
//import VSwatches from 'vue-swatches'

// Import styles
//import 'vue-swatches/dist/vue-swatches.css'
import { mapState, mapActions, mapMutations} from "vuex";

export default {
  props: {
    reorder: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number
    },
    name: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  components: {
    //VSwatches
  },
  data() {
    return {
      focused: false,
      details: false,
      lodgeName: "",
      lodgeDesc: "",
      //lodgeNameColor: 'rgba(191, 191, 191, 0.65)',
      //lodgeColor: "",
      //primarySwatches: ['#FC8181', '#F6AD55', '#F6E05E', '#68D391', '#4FD1C5', '#63B3ED', '#7F9CF5', '#B794F4', '#F687B3', '#E2E8F0', '']
    }
  },
  computed: {
    ...mapState("persist", ["darkMode"]),
    focusedValidation() {
      return this.focused == false;
    },
    lodgeValidation() {
      return this.lodgeName !== ''
    },
    lodgeNameLength() {
      return this.lodgeName.length
    },
    lodgeDescLength() {
      return this.lodgeDesc.length
    },
    //lightOrDark() {
    //  return this.lodgeColor == '' ? 'color: rgba(191, 191, 191, 0.65);' : 'color: #1A202C;'
    //},
    ...mapState("moderation", ["lodges"]),
    form_name: {
      get(){return this.lodges.name},
      set(val){this.UPDATE_FORM_LODGE({'key':'name', 'val': val})}
    },
    form_descr: {
      get(){return this.lodges.descr},
      set(val){this.UPDATE_FORM_LODGE({'key':'descr', 'val': val})}
    },
    form_color: {
      get(){return this.lodges.color},
      set(val){this.UPDATE_FORM_LODGE({'key':'color', 'val': val})}
    }
  },
  methods: {
    showDetails() {
      this.details = !this.details
    },
    isLetterOrNumberOrSpace(e) {
      let char = String.fromCharCode(e.keyCode);
      if (/^[A-Za-z0-9-\s]+$/.test(char)) return true;
      else e.preventDefault();
    },
    formatter(value) {
      return value.replace(/\s+/g, "-").replace(/-+/g,'-').toLowerCase()
    },
    ...mapActions('moderation', ['deleteLodgeForm', 'submitLodgeForm', 'toggleLodgeChange']),
    ...mapMutations('moderation', ['UPDATE_FORM_LODGE'])
  }
}
</script>

<style scoped>
/*
.lodge {
  background-color: $white;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: $gray-300;
  .mod-actions {
    position: absolute;
    right: 1rem;
    display: none;
  }
  &:hover,
  &:focus,
  &.active {
    background-color: lighten($gray-50, 1.1);
    .mod-actions {
      display: flex;
      background-color: lighten($gray-50, 1.1);
    }
  }
}

.lodge.darkMode {
  background-color: $gray-800;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: $white-13;
  .mod-actions {
    position: absolute;
    right: 1rem;
    display: none;
  }
  &:hover,
  &:focus,
  &.active {
    background-color: lighten($gray-800, 1.1);
    .mod-actions {
      display: flex;
      background-color: lighten($gray-800, 1.1);
    }
  }
}

*/


.lodge:last-child {
  border-bottom: 0;
}
</style>
