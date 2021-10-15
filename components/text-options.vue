<template>
  <div id="text-container" class="pill-form-container">
    <div class="pill-form">
      <label class="pill-label" for="text-color-input">
        Text&nbsp;color:
      </label>
      <span id="faux-text-color" class="pill-content">
        <input id="text-color-input" type="color" class="hidden">
      </span>
      <button id="clear-text-color" class="pill-end last-pill-section" title="Reset to default">&times;</button>
    </div>

    <drop-down
      v-model="textShadow"
      :options="textShadowOptions"
      label="Text shadow"
    ></drop-down>

    <div class="pill-form">
      <label class="pill-label" for="font-input">
        Font:
      </label>
      <input id="font-input" class="pill-content" type="text">
      <button id="clear-font" class="pill-end last-pill-section" title="Reset to default">&times;</button>
    </div>

    <div class="pill-form">
      <label class="pill-label" for="font-size-input">
        Font&nbsp;Size:
      </label>
      <span class="pill-content">
        <input
          id="font-size-input"
          type="range"
          min="1"
          max="100"
        >
      </span>
      <span id="faux-font-size">
        15
      </span>
      <button id="clear-font-size" class="pill-end last-pill-section" title="Reset to default">&times;</button>
    </div>

    <div class="pill-form pill-form-checkbox">
      <label class="pill-label" for="font-style-input">
        Italics:
      </label>
      <span id="faux-font-style" class="pill-content last-pill-section">
        <input id="font-style-input" type="checkbox">
      </span>
    </div>

    <div class="pill-form">
      <label class="pill-label" for="font-weight-input">
        Font&nbsp;Weight:
      </label>
      <span class="pill-content">
        <input
          id="font-weight-input"
          type="range"
          min="1"
          max="9"
        >
      </span>
      <span id="faux-font-weight">
        4
      </span>
      <button id="clear-font-weight" class="pill-end last-pill-section" title="Reset to default">&times;</button>
    </div>

    <div class="pill-form">
      <label class="pill-label" for="text-position-input">
        Text&nbsp;Position:
      </label>
      <span class="pill-content">
        <input
          id="text-position-input"
          type="range"
          min="0"
          max="800"
        >
      </span>
      <span id="faux-text-position">
        400
      </span>
      <button id="clear-text-position" class="pill-end last-pill-section" title="Reset to default">&times;</button>
    </div>
  </div>
</template>

<script>
const { mapSettings } = window.require('./scripts/computeds.js');

module.exports = {
  name: 'text-options',
  components: {
    'drop-down': httpVueLoader('components/form-fields/drop-down.vue')
  },
  data: function () {
    return {
      textShadowOptions: [
        {
          label: 'None',
          value: 'none'
        },
        {
          label: 'Black',
          value: 'black'
        },
        {
          label: 'White',
          value: 'white'
        }
      ]
    };
  },
  computed: {
    ...mapSettings([
      'textShadow'
    ])
  }
};
</script>

<style>
</style>
