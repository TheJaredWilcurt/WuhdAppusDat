const methods = {
  displayLabel: function (label) {
    label = label.split(' ').join('&nbsp;');
    return label + ':';
  },
  forId: function (label) {
    label = label.toLowerCase().split(' ').join('-');
    return label + '-input';
  }
};

module.exports = methods;
