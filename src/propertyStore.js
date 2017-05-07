import Vue from 'vue'

export var propertyStore = new Vue({
  data: {
    editables: [],
    properties: {}
  },
  methods: {
    registerEditable(editable) {
      this.editables.push(editable)
    },
    updateProperty(property, value) {
      this.properties[property] = value
      this.notifyEditables(property)
    },
    notifyEditables(property) {
      var value = this.properties[property]
      this.editables.forEach(function(editable) {
        if (editable.property == property) {
          editable.value = value
        }
      })
    }
  }
})
