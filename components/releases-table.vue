<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="(header, headerIndex) in headers"
          v-text="header"
          :key="'header' + headerIndex"
        ></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Version</td>
        <td>Download</td>
        <td>Size</td>
        <td>OS</td>
        <td>Released</td>
        <td>Downloads</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
module.exports = {
  name: 'releases-table',
  data: function () {
    return {
      headers: [
        'Version',
        'Download',
        'Size',
        'OS',
        'Released',
        'Downloads'
      ],
      releases: []
    };
  },
  methods: {
    getData: function () {
      const url = 'https://api.github.com/repos/TheJaredWilcurt/WuhdAppusDat/releases';
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.releases = data;
          data?.[0]?.assets?.forEach(function (asset) {
            if (asset.name.startsWith('LIN')) {
              window.downloadButtons.releases['Linux'] = asset?.browser_download_url;
            }
            if (asset.name.startsWith('WIN')) {
              window.downloadButtons.releases['Windows'] = asset?.browser_download_url;
            }
            if (asset.name.startsWith('OSX')) {
              window.downloadButtons.releases['OSX'] = asset?.browser_download_url;
            }
          });
        });
    }
  },
  created: function () {
    this.getData();
  }
};
</script>
