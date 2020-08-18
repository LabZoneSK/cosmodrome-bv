import Vue from 'vue'
import SingleFileComponent from './single-file-components/SingleFileComponent.vue'
import { store } from './store/store';

new Vue({
  el: `#vueApp`,
  components: {
    'SingleFileComponent': SingleFileComponent
  },
  store
})
