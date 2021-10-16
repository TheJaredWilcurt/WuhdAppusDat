<template>
  <div id="background-container" class="pill-form-container">
    <image-picker
      v-model="backgroundImage"
      label="Background image"
    ></image-picker>

    <image-button
      v-model="backgroundImage"
      label="Leaves"
      image="images/leaves.png"
    ></image-button>

    <image-button
      v-model="backgroundImage"
      label="Spikes"
      image="images/spikes.png"
    ></image-button>

    <image-button
      v-model="backgroundImage"
      label="Pink Bubbles"
      image="images/bubbles.png"
    ></image-button>

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
const { mapSettings } = window.require('./scripts/computeds.js');

module.exports = {
  name: 'background-options',
  components: {
    'image-button': httpVueLoader('components/form-fields/image-button.vue'),
    'image-picker': httpVueLoader('components/form-fields/image-picker.vue'),
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
    ...mapSettings([
      'backgroundBrightness',
      'backgroundContrast',
      'backgroundHueRotate',
      'backgroundImage',
      'backgroundSaturation'
    ])
  }
};
</script>

<style>
</style>
