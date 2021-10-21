<template>
  <div class="pill-form-container">
    <text-input
      v-model="explainerMessage"
      label="Message"
      :placeholder="DEFAULT_EXPLAINER_MESSAGE"
      :default-value="DEFAULT_EXPLAINER_MESSAGE"
    ></text-input>

    <color-picker
      v-model="explainerTextColor"
      label="Text Color"
      :default-value="DEFAULT_EXPLAINER_TEXT_COLOR"
    ></color-picker>

    <drop-down
      v-model="explainerTextShadow"
      :options="textShadowOptions"
      label="Text shadow"
    ></drop-down>

    <text-input
      v-model="explainerFontFamily"
      label="Font"
      :default-value="DEFAULT_EXPLAINER_FONT_FAMILY"
    ></text-input>

    <range-slider
      v-model="explainerFontSize"
      label="Font Size"
      min="1"
      :default-value="DEFAULT_EXPLAINER_FONT_SIZE"
    ></range-slider>

    <check-box
      v-model="explainerFontItalics"
      label="Italics"
    ></check-box>

    <range-slider
      v-model="explainerFontWeight"
      label="Font Weight"
      min="1"
      max="9"
      :multiplier="100"
      :default-value="DEFAULT_EXPLAINER_FONT_WEIGHT"
    ></range-slider>

    <range-slider
      v-model="explainerTop"
      label="Top"
      min="-1080"
      max="1080"
      :default-value="DEFAULT_EXPLAINER_TOP"
    ></range-slider>

    <range-slider
      v-model="explainerLeft"
      label="Left"
      min="-1920"
      max="1920"
      :default-value="DEFAULT_EXPLAINER_LEFT"
    ></range-slider>
  </div>
</template>

<script>
const {
  DEFAULT_EXPLAINER_MESSAGE,
  DEFAULT_EXPLAINER_FONT_FAMILY,
  DEFAULT_EXPLAINER_FONT_SIZE,
  DEFAULT_EXPLAINER_FONT_WEIGHT,
  DEFAULT_EXPLAINER_LEFT,
  DEFAULT_EXPLAINER_TEXT_COLOR,
  DEFAULT_EXPLAINER_TOP
} = window.require('./scripts/global-constants.js');
const { mapSettings } = window.require('./scripts/computeds.js');

module.exports = {
  name: 'expliainer-options',
  components: {
    'check-box': httpVueLoader('components/form-fields/check-box.vue'),
    'color-picker': httpVueLoader('components/form-fields/color-picker.vue'),
    'drop-down': httpVueLoader('components/form-fields/drop-down.vue'),
    'range-slider': httpVueLoader('components/form-fields/range-slider.vue'),
    'text-input': httpVueLoader('components/form-fields/text-input.vue')
  },
  data: function () {
    return {
      DEFAULT_EXPLAINER_MESSAGE,
      DEFAULT_EXPLAINER_FONT_FAMILY,
      DEFAULT_EXPLAINER_FONT_SIZE,
      DEFAULT_EXPLAINER_FONT_WEIGHT,
      DEFAULT_EXPLAINER_LEFT,
      DEFAULT_EXPLAINER_TEXT_COLOR,
      DEFAULT_EXPLAINER_TOP,

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
      'explainerFontFamily',
      'explainerFontItalics',
      'explainerFontSize',
      'explainerFontWeight',
      'explainerLeft',
      'explainerMessage',
      'explainerTextColor',
      'explainerTextShadow',
      'explainerTop'
    ])
  }
};
</script>
