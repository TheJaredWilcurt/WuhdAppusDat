<template>
  <div class="pill-form">
    <label
      v-html="displayLabel(label)"
      class="pill-label"
      :for="forId(label)"
    ></label>
    <span class="pill-content">
      <input
        :value="value"
        type="range"
        :id="forId(label)"
        :min="min"
        :max="max"
        @input="emitInput($event)"
      >
    </span>
    <span class="range-value">
      {{ value }}
    </span>
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
  name: 'range-slider',
  props: {
    value: {
      type: [String, Number],
      required: false
    },
    label: {
      type: String,
      required: true
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: [String, Number],
      default: 100
    },
    defaultValue: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...methods,
    emitInput: function ($event) {
      this.$emit('input', $event.target.value);
    }
  }
};
</script>

<style>
.range-value {
  min-width: 49px;
  justify-content: flex-end;
}
</style>
