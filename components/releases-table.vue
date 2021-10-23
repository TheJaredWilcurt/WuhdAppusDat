<template>
  <table>
    <thead>
      <tr>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
module.exports = {
  name: 'releases-table',
  data: function () {
    return {
    };
  },
  methods: {
    getData: function () {
      const url = 'https://api.github.com/repos/TheJaredWilcurt/WuhdAppusDat/releases';
      console.log(url);
    }
  },
  created: function () {
    this.getData();
  }
};
</script>
