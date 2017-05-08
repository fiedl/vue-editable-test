import Vue from 'vue'
import App from './App.vue'

import { store } from './store'

import Editable from './Editable.vue'
import EditableRow from './EditableRow.vue'
import EditBox from './EditBox.vue'

Vue.component('editable', Editable)
Vue.component('editable-row', EditableRow)
Vue.component('edit-box', EditBox)

app = new Vue({
  el: '#app',
  render: h => h(App),
  store: store
})
