Vue.config.devtools = true;

window.App = new Vue({
  el: '#app',
  template: '<app-composition />',
  components: {
    'app-composition': httpVueLoader('components/app-composition.vue')
  }
});
