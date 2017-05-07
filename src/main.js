import Vue from 'vue'
import App from './App.vue'
import Editable from './Editable.vue'
import EditBox from './EditBox.vue'

Vue.component('editable', Editable)
Vue.component('edit-box', EditBox)

new Vue({
  el: '#app',
  render: h => h(App)
})
