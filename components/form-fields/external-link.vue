<template>
  <a
    v-text="text"
    href="#"
    :title="url"
    class="external"
    @click.prevent="openInDefaultBrowser(url)"
  ></a>
</template>

<script>
module.exports = {
  name: 'check-box',
  props: {
    text: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  methods: {
    openInDefaultBrowser: function (url) {
      window.nw.Shell.openExternal(url);
    }
  }
};
</script>

<style>
a.external {
  color: #C24F42;
}
a.external:hover {
  color: salmon;
}
</style>
