<template>
  <div class="pill-form pill-form-checkbox">
    <label
      v-html="displayLabel(label)"
      class="pill-label"
      :for="forId(label, id)"
    ></label>
    <span
      class="pill-content last-pill-section"
      @click="$emit('input', !value)"
    >
      <input
        :id="forId(label, id)"
        :checked="value"
        type="checkbox"
        @click.stop
        @input="$emit('input', !value)"
      >
    </span>
  </div>
</template>

<script>
const computed = window.require('./scripts/form-field-computeds.js');
const methods = window.require('./scripts/methods.js');

module.exports = {
  name: 'check-box',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    }
  },
  methods,
  computed
};
</script>

<style>
.pill-form-checkbox {
  flex-grow: 0;
}
</style>
