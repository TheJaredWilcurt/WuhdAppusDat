<template>
  <div class="pill-form">
    <label
      v-html="displayLabel(label)"
      class="pill-label"
      :for="forId(label, id)"
    ></label>
    <select
      :id="forId(label, id)"
      :value="value"
      :disabled="disabled"
      class="pill-content last-pill-section"
      @input="emitInput($event)"
    >
      <option
        v-for="(option, optionIndex) in options"
        :value="option.value"
        :key="'option' + optionIndex"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
const computed = window.require('./scripts/form-field-computeds.js');
const methods = window.require('./scripts/methods.js');

module.exports = {
  name: 'drop-down',
  props: {
    value: {
      type: String,
      required: false
    },
    options: {
      type: Array,
      required: true,
      validator: function (arr) {
        let valid = arr.every(function (item) {
          return (
            typeof(item) === 'object' &&
            !Array.isArray(item) &&
            item.value &&
            item.label &&
            typeof(item.value) === 'string' &&
            typeof(item.label) === 'string'
          );
        });
        return arr.length && valid;
      }
    },
    label: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...methods,
    emitInput: function ($event) {
      this.$emit('input', $event.target.value);
    }
  },
  computed
};
</script>
