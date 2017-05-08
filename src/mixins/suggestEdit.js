import Vue from 'vue'

export default {
  data() { return {
    suggestingEdit: false
  } },
  methods: {
    suggestEdit() {
      if (! this.$parent.editMode) {
        this.suggestingEdit = true
        this.cancelSuggestEditWithDelay()
      }
    },
    cancelSuggestEdit() {
      this.suggestingEdit = false
    },
    cancelSuggestEditWithDelay() {
      setTimeout(this.cancelSuggestEdit, 1500)
    },
    save() {
      this.suggestingEdit = false
    },
    cancel() {
      this.suggestingEdit = false
    }
  },
  computed: {
    editingClass() {
      if (this.suggestingEdit && !this.editing) { return "suggesting" } else { return "" }
    }
  }
}