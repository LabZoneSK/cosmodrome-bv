import Vue from 'vue';

// standAloneComponent constructor
const standAloneComponent = Vue.extend({
  template: `<div class="standalone-component">
    Stand alone component with multiple instances
  </div>`,
  data: function() {
    return {}
  },
});

const nodes = document.querySelectorAll('.standalone-component');
nodes.forEach(node => {
  new standAloneComponent({
    el: node,
  })
})



