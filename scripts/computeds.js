function mapSettings (settings) {
  const mapped = {};

  settings.forEach(function (setting) {
    mapped[setting] = {
      get: function () {
        return this.$store.state.settings[setting];
      },
      set: function (value) {
        this.$store.commit('mutateSetting', { setting, value });
      }
    };
  });

  return mapped;
}

module.exports = {
  mapSettings
};
