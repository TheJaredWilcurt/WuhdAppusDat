<template>
  <div class="pill-form">
    <label
      v-html="displayLabel(label)"
      class="pill-label"
      :for="forId(label, id)"
    ></label>

    <input
      :id="forId(label, id)"
      :list="forId(label, id)"
      :value="value"
      class="pill-content"
      type="text"
      @input="emitInput($event)"
      @focus="emitFocus"
    >
    <datalist :id="forId(label, id)">
      <option
        v-for="(option, optionIndex) in options"
        :key="'option' + optionIndex"
      >
        {{ option }}
      </option>
    </datalist>
  </div>
</template>

<script>
const computed = window.require('./scripts/form-field-computeds.js');
const methods = window.require('./scripts/methods.js');

module.exports = {
  name: 'type-ahead',
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
          return typeof(item) === 'string';
        });
        return valid;
      }
    },
    label: {
      type: String,
      required: true
    }
  },
  methods: {
    ...methods,
    emitFocus: function () {
      this.$emit('focus');
    },
    emitInput: function ($event) {
      this.$emit('input', $event.target.value);
    }
  },
  computed
};
</script>

<style>
datalist {
  display: none !important;
}
</style>
