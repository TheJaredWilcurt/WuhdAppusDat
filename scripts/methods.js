const methods = {
  displayLabel: function (label) {
    label = label.split(' ').join('&nbsp;');
    return label + ':';
  },
  forId: function (label, id) {
    label = label.toLowerCase().split(' ').join('-');
    return label + '-input' + '-' + id;
  }
};

module.exports = methods;
