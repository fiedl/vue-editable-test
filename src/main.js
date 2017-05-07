import Vue from 'vue'
import App from './App.vue'
import store from './store'

import Editable from './Editable.vue'
import EditBox from './EditBox.vue'

Vue.component('editable', Editable)
Vue.component('edit-box', EditBox)

app = new Vue({
  el: '#app',
  store: store,
  render: h => h(App)
})
