const { generateUniqueId } = window.require('./scripts/helpers.js');

const computed = {
  id: function () {
    return generateUniqueId();
  }
};

module.exports = computed;
