<template>
  <div class="pill-form">
    <label
      v-html="displayLabel(label)"
      class="pill-label"
      :for="forId(label, id)"
    ></label>
    <span class="pill-content">
      <input
        :id="forId(label, id)"
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
const computed = window.require('./scripts/form-field-computeds.js');
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
      // Possible bug: parseInt(0 || 6) will give 6
      amount = parseInt(amount || this.min);
      this.$emit('input', amount);
    }
  },
  computed: {
    ...computed,
    visibleValue: function () {
      let value = parseFloat(this.value);
      return (value * this.multiplier).toFixed(this.toFixed);
    }
  }
};
</script>

<style>
input[type=range] {
  width: 100%;
  -webkit-appearance: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 300px;
  height: 5px;
  background: #BBB;
  border: none;
  border-radius: 3px;
}
input[type=range]::-webkit-slider-thumb {
  width: 16px;
  height: 16px;
  background: salmon;
  border: none;
  border-radius: 50%;
  margin-top: -4px;
  -webkit-appearance: none;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: #CCC;
}

.range-value {
  min-width: 55px;
  justify-content: flex-end;
}
</style>
