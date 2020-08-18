import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'

Vue.use(Vuex);

// Vuex store
export default new Vuex.Store({
  state: {
    storeVariable: 'default'
  },
  getters,
  mutations,
  actions,
})

export const store = new Vuex.Store({})




