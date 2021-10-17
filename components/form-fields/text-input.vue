<template>
  <div class="pill-form">
    <label
      v-html="displayLabel(label)"
      class="pill-label"
      :for="forId(label)"
    ></label>
    <input
      :id="forId(label)"
      :value="value"
      class="pill-content"
      type="text"
      @input="emitInput($event)"
    >
    <button
      class="pill-end last-pill-section"
      title="Reset to default"
      @click="$emit('input', defaultValue)"
    >&times;</button>
  </div>
</template>

<script>
const methods = window.require('./scripts/methods.js');

module.exports = {
  name: 'text-input',
  props: {
    value: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: true
    },
    defaultValue: {
      type: String,
      required: true
    }
  },
  methods: {
    ...methods,
    emitInput: function ($event) {
      this.$emit('input', $event.currentTarget.value);
    }
  }
};
</script>
