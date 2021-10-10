<template>
  <div id="text-container" class="pill-form-container">
    <div class="pill-form">
      <label class="pill-label" for="text-color-input">
        Text&nbsp;color:
      </label>
      <span class="pill-content" id="faux-text-color">
        <input type="color" id="text-color-input" class="hidden">
      </span>
      <button id="clear-text-color" class="pill-end last-pill-section" title="Reset to default">&times;</button>
    </div>

    <div class="pill-form">
      <label class="pill-label" for="text-shadow-input">
        Text&nbsp;shadow:
      </label>
      <select class="pill-content last-pill-section" id="text-shadow-input">
        <option value="none">None</option>
        <option value="black">Black</option>
        <option value="white">White</option>
      </select>
    </div>

    <div class="pill-form">
      <label class="pill-label" for="font-input">
        Font:
      </label>
      <input class="pill-content" type="text" id="font-input">
      <button id="clear-font" class="pill-end last-pill-section" title="Reset to default">&times;</button>
    </div>

    <div class="pill-form">
      <label class="pill-label" for="font-size-input">
        Font&nbsp;Size:
      </label>
      <span class="pill-content">
        <input type="range" id="font-size-input" min="1" max="100">
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
        <input type="checkbox" id="font-style-input">
      </select>
    </div>

    <div class="pill-form">
      <label class="pill-label" for="font-weight-input">
        Font&nbsp;Weight:
      </label>
      <span class="pill-content">
        <input type="range" id="font-weight-input" min="1" max="9">
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
        <input type="range" id="text-position-input" min="0" max="800">
      </span>
      <span id="faux-text-position">
        400
      </span>
      <button id="clear-text-position" class="pill-end last-pill-section" title="Reset to default">&times;</button>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: 'text-options',
  data: function () {
    return {
    };
  }
};
</script>

<style>
</style>
