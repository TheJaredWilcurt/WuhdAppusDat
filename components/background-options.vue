<template>
  <div class="pill-form-container center">
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

    <image-button
      v-model="backgroundImage"
      label="Edge Bar"
      image="images/edge-bar.png"
    ></image-button>

    <image-button
      v-model="backgroundImage"
      label="Rounded Bar"
      image="images/rounded-bar.png"
    ></image-button>

    <image-picker
      v-model="backgroundImage"
      label="Background image"
    ></image-picker>

    <check-box
      v-model="backgroundFlipHorizontal"
      label="Flip Horizontal"
    ></check-box>

    <check-box
      v-model="backgroundFlipVertical"
      label="Flip Vertical"
    ></check-box>

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
      :min="-100"
      :max="100 * SATURATION_UPPER_MULTIPLIER"
      :default-value="DEFAULT_BACKGROUND_SATURATION"
    ></range-slider>
  </div>
</template>

<script>
const {
  DEFAULT_BACKGROUND_BRIGHTNESS,
  DEFAULT_BACKGROUND_CONTRAST,
  DEFAULT_BACKGROUND_HUE_ROTATE,
  DEFAULT_BACKGROUND_SATURATION,
  SATURATION_UPPER_MULTIPLIER
} = window.require('./scripts/global-constants.js');
const { mapSettings } = window.require('./scripts/computeds.js');

module.exports = {
  name: 'background-options',
  components: {
    'check-box': httpVueLoader('components/form-fields/check-box.vue'),
    'image-button': httpVueLoader('components/form-fields/image-button.vue'),
    'image-picker': httpVueLoader('components/form-fields/image-picker.vue'),
    'range-slider': httpVueLoader('components/form-fields/range-slider.vue')
  },
  data: function () {
    return {
      DEFAULT_BACKGROUND_BRIGHTNESS,
      DEFAULT_BACKGROUND_CONTRAST,
      DEFAULT_BACKGROUND_HUE_ROTATE,
      DEFAULT_BACKGROUND_SATURATION,
      SATURATION_UPPER_MULTIPLIER
    };
  },
  computed: {
    ...mapSettings([
      'backgroundBrightness',
      'backgroundContrast',
      'backgroundHueRotate',
      'backgroundImage',
      'backgroundSaturation',
      'backgroundFlipHorizontal',
      'backgroundFlipVertical'
    ])
  }
};
</script>
