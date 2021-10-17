<template>
  <div class="pill-form-container">
    <color-picker
      v-model="textColor"
      label="Text Color"
      :default-value="DEFAULT_TEXT_COLOR"
    ></color-picker>

    <drop-down
      v-model="textShadow"
      :options="textShadowOptions"
      label="Text shadow"
    ></drop-down>

    <text-input
      v-model="fontFamily"
      label="Font"
      :default-value="DEFAULT_FONT_FAMILY"
    ></text-input>

    <range-slider
      v-model="fontSize"
      label="Font Size"
      min="1"
      :default-value="DEFAULT_FONT_SIZE"
    ></range-slider>

    <check-box
      v-model="fontItalics"
      label="Italics"
    ></check-box>

    <range-slider
      v-model="fontWeight"
      label="Font Weight"
      min="1"
      max="9"
      :multiplier="100"
      :default-value="DEFAULT_FONT_WEIGHT"
    ></range-slider>

    <range-slider
      v-model="textPosition"
      label="Text Position"
      min="-400"
      max="400"
      :default-value="DEFAULT_TEXT_POSITION"
    ></range-slider>
  </div>
</template>

<script>
const {
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_TEXT_COLOR,
  DEFAULT_TEXT_POSITION
} = window.require('./scripts/global-constants.js');
const { mapSettings } = window.require('./scripts/computeds.js');

module.exports = {
  name: 'text-options',
  components: {
    'check-box': httpVueLoader('components/form-fields/check-box.vue'),
    'color-picker': httpVueLoader('components/form-fields/color-picker.vue'),
    'drop-down': httpVueLoader('components/form-fields/drop-down.vue'),
    'range-slider': httpVueLoader('components/form-fields/range-slider.vue'),
    'text-input': httpVueLoader('components/form-fields/text-input.vue')
  },
  data: function () {
    return {
      DEFAULT_FONT_FAMILY,
      DEFAULT_FONT_SIZE,
      DEFAULT_FONT_WEIGHT,
      DEFAULT_TEXT_COLOR,
      DEFAULT_TEXT_POSITION,

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
      'fontFamily',
      'fontItalics',
      'fontSize',
      'fontWeight',
      'textColor',
      'textPosition',
      'textShadow'
    ])
  }
};
</script>
