import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    editMode: false,
    editBoxes: []
  }
})

export default {
  store
}