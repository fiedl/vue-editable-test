import Vue from 'vue'
import App from './App.vue'
import Editable from './Editable.vue'

Vue.component('editable', Editable)

new Vue({
  el: '#app',
  render: h => h(App)
})
