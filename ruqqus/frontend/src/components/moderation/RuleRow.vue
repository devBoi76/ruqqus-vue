<template>

  <div class="d-flex flex-column rule" :class="{ 'active overflow-hidden': details && !reorder && !readonly, 'darkMode': darkMode }">

    <div class="position-relative d-flex flex-wrap align-items-center h-min-16 px-3 py-2" :class="{'active': details && !reorder && !readonly }">

      <div class="w-80">
        <div class="d-inline-block w-min-56 px-2 py-2 rounded text-break">
          <div>
            <span class="font-weight-bold text-capitalize" :class="{'text-gray-100':darkMode}">
              <span class="font-weight-normal text-muted">1. </span>
              {{ rule.name.text }}
            </span>
          </div>
        </div>
      </div>

      <div class="d-none d-xl-block pl-xl-4">
        <span :class="{'text-gray-100':darkMode}">
          {{ rule.description.text | truncate(72) }}
        </span>
      </div>

      <div v-if="!readonly" class="ml-auto">
        <b-button v-show="!reorder" variant="link" size="lg" class="px-1 py-0 text-decoration-none"
        :class="darkMode ? 'text-gray-100' : 'text-muted'" v-b-tooltip.hover title="Edit rule"
        @click="showDetails">
        <i class="far fa-edit w-8"></i>
      </b-button>

      <b-button v-show="!reorder" variant="link" size="lg" class="px-1 py-0 text-decoration-none"
      :class="darkMode ? 'text-gray-100' : 'text-muted'" v-b-tooltip.hover title="Delete rule">
      <i class="far fa-trash-alt w-8"></i>
    </b-button>

    <b-button v-show="reorder" variant="link" size="lg" class="px-1 py-0 text-decoration-none"
    :class="darkMode ? 'text-gray-100' : 'text-muted'" v-b-tooltip.hover title="Drag">
    <i class="far fa-grip-lines w-8" :class="{ 'handle': reorder }"></i>
  </b-button>
</div>

</div>

<b-row v-if="!readonly" v-show="details && !reorder" class="px-3 py-4" :class="darkMode ? 'bg-gray-800' : 'bg-white'">
  <b-col lg="6">

    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
      <b-form-group
      id="input-group-1"
      label="Rule Name"
      :label-class="['h6', {'text-gray-100':darkMode}]"
      label-for="input-1"
      class="mb-4"
      >
      <b-form-input
      v-model="rule.name.text"
      id="input-1"
      type="text"
      required
      placeholder="Enter a name (required)"
      class="w-100 text-gray-100"
      :class="{ 'border-danger': rule.name.text == '' && rule.name.focused == true, 'dark':darkMode }"
      aria-describedby="rule-text-help-block"
      maxlength=32
      @focus.once="rule.name.focused = true"
      ></b-form-input>
      <b-form-text :id="'rule-text-help-block-' + id" :text-variant="ruleNameLength == 32 ? 'danger' : 'muted'">
        {{ 32 - ruleNameLength }}/32
      </b-form-text>
      <b-form-invalid-feedback :state="rule.name.text !== '' || rule.name.focused == false">Whoops. Text or emoji is required</b-form-invalid-feedback>
    </b-form-group>

    <b-form-group
    id="input-group-1"
    label="Rule Description"
    :label-class="['h6', {'text-gray-100':darkMode}]"
    label-for="input-1"
    class="mb-4"
    >
    <b-form-textarea
    v-model="rule.description.text"
    id="input-1"
    type="text"
    required
    placeholder="Give the rule a description. (required)"
    class="w-100 text-gray-100"
    :class="{ 'border-danger': rule.description.text == '' && rule.description.focused == true, 'dark':darkMode }"
    aria-describedby="rule-description-help-block"
    maxlength=280
    @focus.once="rule.description.focused = true"
    ></b-form-textarea>
    <b-form-text :id="'rule-description-help-block-' + id" :text-variant="ruleDescLength == 280 ? 'danger' : 'muted'">
      {{ 280 - ruleDescLength }}/280
    </b-form-text>
    <b-form-invalid-feedback :state="rule.description.text !== '' || rule.description.focused == false">Whoops. A description is required</b-form-invalid-feedback>
  </b-form-group>

  <b-button type="submit" variant="primary" v-show="validated">Save</b-button>
  <b-button variant="gray-300" disabled v-show="!validated">Save</b-button>

  <b-button
  type="reset"
  variant="link"
  class="font-weight-bold text-white-65"
  @click="showDetails"
  >Cancel</b-button>
</b-form>

<div class="text-sm text-muted d-none">
  Last edited by <b-link class="font-weight-bold text-gray-100">david</b-link>
  <span class="dot"></span>July 20, 2020
</div>
</b-col>
</b-row>

</div>

</template>

<script>

// Import components

// Import styles
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
  },
  data() {
    return {
      //focused: false,
      details: false,
      rule: {
        name: { text: '', focused: false },
        description: { text: '', focused: false }
      }
    }
  },
  computed: {
    ...mapState("persist", ["darkMode"]),
    validated() {
      return (this.rule.description.text && this.rule.name.text) !== ''
    },
    ruleNameLength() {
      return this.rule.name.text.length
    },
    ruleDescLength() {
      return this.rule.description.text.length
    },
    ...mapState("moderation", ["rules"]),
    form_name: {
      get(){return this.rules.name},
      set(val){this.UPDATE_FORM_rule({'key':'name', 'val': val})}
    },
    form_descr: {
      get(){return this.rules.descr},
      set(val){this.UPDATE_FORM_rule({'key':'descr', 'val': val})}
    },
    form_color: {
      get(){return this.rules.color},
      set(val){this.UPDATE_FORM_rule({'key':'color', 'val': val})}
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
    ...mapActions('moderation', ['deleteruleForm', 'submitruleForm', 'toggleruleChange']),
    ...mapMutations('moderation', ['UPDATE_FORM_rule'])
  }
}
</script>

<style scoped>
/*
.rule {
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
    .exile-date {
      visibility: hidden;
    }
  }
}

.rule.darkMode {
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
    .exile-date {
      visibility: hidden;
    }
  }
}
*/

.rule:last-child {
  border-bottom: 0;
}
</style>
