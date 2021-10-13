function mapSetting (setting) {
  return {
    [setting]: {
      get: function () {
        return this.$store.state.settings[setting];
      },
      set: function (value) {
        this.$store.commit('mutateSetting', { setting, value });
      }
    }
  };
}

module.exports = {
  mapSetting
};
