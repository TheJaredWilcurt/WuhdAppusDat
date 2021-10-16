<template>
  <div class="pill-form">
    <label
      v-html="displayLabel(label)"
      class="pill-label"
      :for="forId(label)"
    ></label>
    <span class="pill-content">
      <input
        :id="forId(label)"
        :value="value"
        type="range"
        :min="min"
        :max="max"
        @input="emitInput($event)"
      >
    </span>
    <span class="range-value">
      {{ visibleValue }}
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
      type: [String, Number],
      default: 0
    },
    max: {
      type: [String, Number],
      default: 100
    },
    multiplier: {
      type: Number,
      default: 1
    },
    toFixed: {
      type: Number,
      default: 0
    },
    defaultValue: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...methods,
    emitInput: function ($event) {
      let amount = $event && $event.target && $event.target.value;
      amount = parseInt(amount || this.min);
      this.$emit('input', amount);
    }
  },
  computed: {
    visibleValue: function () {
      return (this.value * this.multiplier).toFixed(this.toFixed);
    }
  }
};
</script>

<style>
.range-value {
  min-width: 51px;
  justify-content: flex-end;
}
</style>
