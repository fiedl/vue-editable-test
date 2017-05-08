<template>
  <div v-on:mouseenter="suggestEdit">
    <transition name="fade" mode="out-in">
      <div key="3" class='read' v-on:click="edit" v-if="!showEditField">
        {{value}}
        <span v-if="submitting" class="submitting">•••</span>
        <span v-if="success" class="success">✔</span>
      </div>
      <div key="1" class='edit' v-bind:class="editingClass" v-if="showEditField" v-on:click="edit" v-on:keydown.esc="cancelAll">
        <textarea v-if="typeIsTextarea" v-on:keydown="keydownToBeginEditing" v-model.trim="value" autofocus></textarea>
        <input v-if="!typeIsTextarea" type="text" v-model.trim="value" v-on:keydown="keydownToBeginEditing" v-on:keyup.enter="saveAll" v-on:keyup="pushPropertyToStore" autofocus />
        <div class="help" v-if="help">{{help}}</div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { propertyStore } from './propertyStore'

  export default {
    props: ['initialValue', 'property', 'type', 'help'],
    data() { return {
      editing: false,
      suggestingEdit: false,
      value: null,
      valueBeforeEdit: null,
      success: false,
      submitting: false
    } },
    created() {
      this.value = this.initialValue
      propertyStore.registerEditable(this)
    },
    methods: {
      edit() {
        if (! this.editing) {
          this.valueBeforeEdit = this.value
          this.editing = true
          this.success = false
          this.$parent.switchOnPartialEditing()
        }
      },
      focus() {
        if (this.inputField) {
          self = this
          Vue.nextTick(function() { self.inputField.focus() })
        }
      },
      save() {
        this.suggestingEdit = false
        if (this.editing) {
          this.editing = false
          this.$parent.switchOffPartialEditing()
          if (this.value != this.valueBeforeEdit) {
            this.submitSave()
          }
        }
      },
      saveAll() {
        this.$parent.saveAll()
      },
      cancelAll() {
        this.$parent.cancelAll()
      },
      suggestEdit() {
        if (! this.$parent.editMode) {
          this.suggestingEdit = true
          this.cancelSuggestEditWithDelay()
        }
      },
      cancel() {
        if (this.editing) {
          this.value = this.valueBeforeEdit
          this.editing = false
        }
        this.suggestingEdit = false
      },
      cancelSuggestEdit() {
        this.suggestingEdit = false
      },
      cancelSuggestEditWithDelay() {
        setTimeout(this.cancelSuggestEdit, 1500)
      },
      submitSave() {
        var self = this
        this.submitting = true
        setTimeout(function() {
          self.submitting = false
          self.success = true
        }, 1000)
      },
      pushPropertyToStore() {
        propertyStore.updateProperty(this)
      },
      keydownToBeginEditing(event) {
        if (event.keyCode != 27) { this.edit() }
      }
    },
    computed: {
      showEditField() {
        return (this.editing || this.suggestingEdit)
      },
      typeIsTextarea() {
        return (this.type == "textarea")
      },
      editingClass() {
        if (this.suggestingEdit && !this.editing) { return "suggesting" } else { return "" }
      },
      inputField() {
        return this.$el.getElementsByTagName("input")[0] || this.$el.getElementsByTagName("textarea")[0]
      }
    }
  }
</script>

<style lang="sass">
  input, select, textarea
    border: none
    padding: 0
    margin: 0
    font: inherit
    color: inherit
    line-height: inherit
    font-size: inherit
    text-align: inherit
    vertical-align: top
  .success
    color: green
  .submitting
    color: yellow
  .help
    margin-top: 5px
    margin-bottom: 10px
    font-size: 90%
    max-width: 90%
  .suggesting.edit
    input, textarea
      background: rgba(255,255,255, 0.2)

</style>