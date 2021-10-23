<template>
  <div class="pill-form">
    <label
      v-html="displayLabel(label)"
      class="pill-label"
      :for="forId(label, id)"
    ></label>
    <label
      class="pill-content"
      :style="'background:' + value"
    >
      <input
        :id="forId(label, id)"
        :value="value"
        type="color"
        class="hidden"
        @input="emitInput($event)"
      >
    </label>
    <button
      class="pill-end last-pill-section"
      title="Reset to default"
      @click="$emit('input', defaultValue)"
    >&times;</button>
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
    },
    defaultValue: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...methods,
    emitInput: function ($event) {
      this.$emit('input', $event.currentTarget.value.toUpperCase());
    }
  },
  computed
};
</script>
