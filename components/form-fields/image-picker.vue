<template>
  <div class="pill-form">
    <label
      v-html="displayLabel(label)"
      class="pill-label"
      :for="forId(label, id)"
    ></label>
    <label class="pill-content">
      <input
        :id="forId(label, id)"
        type="file"
        class="hidden"
        @input="emitInput($event)"
        :key="value"
      >
      <span class="truncate">
        {{ value }}
      </span>
    </label>
    <button
      class="pill-end last-pill-section"
      title="Set to none"
      @click="$emit('input', 'images/none.png')"
    >&times;</button>
  </div>
</template>

<script>
const computed = window.require('./scripts/form-field-computeds.js');
const methods = window.require('./scripts/methods.js');

module.exports = {
  name: 'image-picker',
  props: {
    value: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: true
    }
  },
  methods: {
    ...methods,
    emitInput: function ($event) {
      let file = (
        $event &&
        $event.currentTarget &&
        $event.currentTarget.files &&
        $event.currentTarget.files[0] &&
        $event.currentTarget.files[0].path
      );
      file = file || this.defaultValue;
      this.$emit('input', file);
    }
  },
  computed
};
</script>
