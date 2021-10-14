<template>
  <div id="background-container" class="pill-form-container">
    <div class="pill-form">
      <label class="pill-label" for="background-image-input">
        Background&nbsp;image:
      </label>
      <span id="faux-background-input" class="pill-content">
        <span id="current-background-image" class="truncate"></span>
        <input id="background-image-input" type="file" class="hidden">
      </span>
      <button id="clear-background" class="pill-end last-pill-section" title="Set to none">&times;</button>
    </div>

    <button id="background-leaves" title="Leaves Background" class="pill-form pill-button pill-button-leaves"></button>
    <button id="background-spikes" title="Spikes Background" class="pill-form pill-button pill-button-spikes"></button>
    <button id="background-bubbles" title="Pink Bubbles Background" class="pill-form pill-button pill-button-bubbles"></button>

    <range-slider
      v-model="backgroundHueRotate"
      label="Background Hue"
      max="360"
      :default-value="DEFAULT_BACKGROUND_HUE_ROTATE"
    ></range-slider>

    <range-slider
      v-model="backgroundBrightness"
      label="Background Brightness"
      :default-value="DEFAULT_BACKGROUND_BRIGHTNESS"
    ></range-slider>

    <range-slider
      v-model="backgroundContrast"
      label="Background Contrast"
      :default-value="DEFAULT_BACKGROUND_CONTRAST"
    ></range-slider>

    <range-slider
      v-model="backgroundSaturation"
      label="Background Saturation"
      :default-value="DEFAULT_BACKGROUND_SATURATION"
    ></range-slider>
  </div>
</template>

<script>
const {
  DEFAULT_BACKGROUND_BRIGHTNESS,
  DEFAULT_BACKGROUND_CONTRAST,
  DEFAULT_BACKGROUND_HUE_ROTATE,
  DEFAULT_BACKGROUND_SATURATION
} = window.require('./scripts/global-constants.js');
const { mapSetting } = window.require('./scripts/computeds.js');

module.exports = {
  name: 'background-options',
  components: {
    'range-slider': httpVueLoader('components/form-fields/range-slider.vue')
  },
  data: function () {
    return {
      DEFAULT_BACKGROUND_BRIGHTNESS,
      DEFAULT_BACKGROUND_CONTRAST,
      DEFAULT_BACKGROUND_HUE_ROTATE,
      DEFAULT_BACKGROUND_SATURATION
    };
  },
  computed: {
    ...mapSetting('backgroundHueRotate'),
    ...mapSetting('backgroundBrightness'),
    ...mapSetting('backgroundContrast'),
    ...mapSetting('backgroundSaturation')
  }
};
</script>

<style>
</style>
