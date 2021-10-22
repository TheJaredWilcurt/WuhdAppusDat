<template>
  <div class="pill-form">
    <label
      v-html="displayLabel(label)"
      class="pill-label"
      @click="openDialog"
    ></label>
    <span
      class="pill-content pill-content-text truncate"
      :title="fullPath"
      @click="openDialog"
    >
      {{ fullPath }}
    </span>
    <button
      class="pill-end last-pill-section"
      title="Set to none"
      @click="$emit('input', null)"
    >&times;</button>
  </div>
</template>

<script>
const path = window.require('path');

const openFolderExplorer = window.require('nw-programmatic-folder-select');

const { OUTPUT_FILE_NAME } = window.require('./scripts/global-constants.js');
const methods = window.require('./scripts/methods.js');

module.exports = {
  name: 'folder-picker',
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
    openDialog: function () {
      const options = {
        title: 'Select a folder to store output file in'
      };
      if (this.value) {
        options.directory = this.value;
      }
      openFolderExplorer(window, options, (selection) => {
        if (selection) {
          this.$emit('input', selection);
        }
      });
    }
  },
  computed: {
    fullPath: function () {
      if (!this.value) {
        return '';
      }
      return path.join(this.value, OUTPUT_FILE_NAME);
    }
  }
};
</script>

<style>
.pill-content-text {
  display: inline-block;
}
</style>
