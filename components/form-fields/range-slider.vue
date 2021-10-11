<template>
  <div class="pill-form">
    <label
      v-html="displayLabel"
      class="pill-label"
      :for="forId"
    ></label>
    <span class="pill-content">
      <input
        :value="value"
        type="range"
        :id="forId"
        :min="min"
        :max="max"
        @input="emitInput($event)"
      >
    </span>
    <span>
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
    emitInput: function ($event) {
      this.$emit('input', $event.target.value);
    }
  },
  computed: {
    displayLabel: function () {
      let label = this.label.split(' ').join('&nbsp;');
      return label + ':';
    },
    forId: function () {
      let label = this.label.toLowerCase().split(' ').join('-');
      return label + '-input';
    }
  }
};
</script>

<style>
</style>
