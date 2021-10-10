<template>
  <div id="background-container" class="pill-form-container">
    <div class="pill-form">
      <label class="pill-label" for="background-image-input">
        Background&nbsp;image:
      </label>
      <span class="pill-content" id="faux-background-input">
        <span id="current-background-image" class="truncate"></span>
        <input type="file" id="background-image-input" class="hidden">
      </span>
      <button id="clear-background" class="pill-end last-pill-section" title="Set to none">&times;</button>
    </div>

    <button id="background-leaves" title="Leaves Background" class="pill-form pill-button pill-button-leaves"></button>
    <button id="background-spikes" title="Spikes Background" class="pill-form pill-button pill-button-spikes"></button>
    <button id="background-bubbles" title="Pink Bubbles Background" class="pill-form pill-button pill-button-bubbles"></button>

    <div class="pill-form">
      <label class="pill-label" for="background-hue-input">
        Background&nbsp;Hue:
      </label>
      <span class="pill-content">
        <input type="range" id="background-hue-input" min="0" max="360">
      </span>
      <span id="faux-background-hue">
        0
      </span>
      <button id="clear-background-hue" class="pill-end last-pill-section" title="Reset to default">&times;</button>
    </div>

    <div class="pill-form">
      <label class="pill-label" for="background-brightness-input">
        Background&nbsp;Brightness:
      </label>
      <span class="pill-content">
        <input type="range" id="background-brightness-input" min="0" max="100">
      </span>
      <span id="faux-background-brightness">
        1
      </span>
      <button id="clear-background-brightness" class="pill-end last-pill-section" title="Reset to default">&times;</button>
    </div>

    <div class="pill-form">
      <label class="pill-label" for="background-contrast-input">
        Background&nbsp;Contrast:
      </label>
      <span class="pill-content">
        <input type="range" id="background-contrast-input" min="0" max="100">
      </span>
      <span id="faux-background-contrast">
        1
      </span>
      <button id="clear-background-contrast" class="pill-end last-pill-section" title="Reset to default">&times;</button>
    </div>

    <div class="pill-form">
      <label class="pill-label" for="background-saturation-input">
        Background&nbsp;Saturation:
      </label>
      <span class="pill-content">
        <input type="range" id="background-saturation-input" min="0" max="100">
      </span>
      <span id="faux-background-saturation">
        1
      </span>
      <button id="clear-background-saturation" class="pill-end last-pill-section" title="Reset to default">&times;</button>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: 'background-options',
  data: function () {
    return {
    };
  }
};
</script>

<style>
</style>
