<template>
  <button
    :title="label + ' Background'"
    :class="'pill-form pill-button pill-button-' + className"
    @click.prevent="$emit('input', image)"
  ></button>
</template>

<script>
module.exports = {
  name: 'image-button',
  props: {
    value: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: ''
    }
  },
  computed: {
    className: function () {
      let image = this.image || '';
      image = image.split('\\').join('/');
      // '/images/bubbles.png' => 'bubbles'
      return image.split('/').filter(Boolean)[1].split('.png')[0];
    }
  }
};
</script>

<style>
</style>
