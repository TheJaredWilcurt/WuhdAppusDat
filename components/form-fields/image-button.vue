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
.pill-button {
  width: 40px;
  height: 40px;
  max-width: 40px;
  max-height: 40px;
  min-width: 40px;
  min-height: 40px;
  background-color: transparent;
  background-position: center center;
  background-repeat: no-repeat;
  border: none;
  border-radius: 100px;
}
.pill-button-leaves {
  background-image: url('../../images/leaves.png');
  background-size: 455px;
  background-position: -39px -10px;
}
.pill-button-spikes {
  background-image: url('../../images/spikes.png');
  background-size: 455px;
  background-position: -39px -10px;
}
.pill-button-bubbles {
  background-image: url('../../images/bubbles.png');
  background-size: 345px;
}
</style>
