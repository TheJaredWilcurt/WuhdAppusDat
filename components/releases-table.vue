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
      <template v-for="(release, releaseIndex) in releases">
        <tr
          v-for="(asset, assetIndex) in release.assets"
          :class="{
            'release-separator': assetIndex === 0 && releaseIndex !== 0,
            'first-asset': assetIndex === 0,
            'last-asset': assetIndex === (release.assets.length - 1)
          }"
          :key="'release' + releaseIndex + 'asset' + assetIndex"
        >
          <td>{{ release.tag_name }}</td>
          <td><a
            v-text="asset.name"
            :href="asset.browser_download_url"
            target="_blank"
            title="Download this version"
          ></a></td>
          <td
            class="right"
            :title="fileSizeFormatKb(asset.size)"
          >
            {{ fileSizeFormatMb(asset.size) }}
          </td>
          <td class="center">
            <os-icon :name="asset.name"></os-icon>
          </td>
          <td class="center">
            <a
              v-text="dateFormat(release.published_at)"
              :href="release.html_url"
              target="_blank"
              title="View Release Notes"
            ></a>
          </td>
          <td class="center">
            {{ asset.download_count }}
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
module.exports = {
  name: 'releases-table',
  components: {
    'os-icon': httpVueLoader('components/os-icon.vue')
  },
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
    },
    fileSizeFormatKb: function (size) {
      let kb = Math.round(size / 1024);
      return kb.toLocaleString() + ' KB';
    },
    fileSizeFormatMb: function (size) {
      let mb = size / 1024 / 1024;
      mb = Math.round(mb * 100) / 100;
      return mb.toFixed(2) + ' MB';
    },
    dateFormat: function (date) {
      date = new Date(date);
      return date.toLocaleDateString();
    }
  },
  created: function () {
    this.getData();
  }
};
</script>
