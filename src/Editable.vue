<template>
  <div>
    <transition name="fade" mode="out-in">
      <div key="3" class='read' v-on:click="edit" v-on:mouseover="suggestEdit" v-if="!showEditField">
        {{value}}
      </div>
      <div key="1" class='edit' v-if="showEditField" v-on:click="edit" v-on:keyup.enter="saveAll" v-on:keyup="pushPropertyToStore" v-on:mouseout="cancelSuggestEditWithDelay">
        <input type="text" v-model="value" v-on:keydown="edit" autofocus />
      </div>
    </transition>
  </div>
</template>

<script>
  import { propertyStore } from './propertyStore'

  export default {
    props: ['initialValue', 'property'],
    data() { return {
      editing: false,
      suggestingEdit: false,
      value: null,
      valueBeforeEdit: null
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
          this.$parent.switchOnPartialEditing()
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
      suggestEdit() {
        this.suggestingEdit = true
      },
      cancel() {
        this.value = this.valueBeforeEdit
        this.editing = false
        this.suggestingEdit = false
      },
      cancelSuggestEdit() {
        this.suggestingEdit = false
      },
      cancelSuggestEditWithDelay() {
        setTimeout(this.cancelSuggestEdit, 1500)
      },
      submitSave() {
        alert(`Submitting ${this.value}.`)
      },
      pushPropertyToStore() {
        propertyStore.updateProperty(this)
      }
    },
    computed: {
      showEditField() {
        return (this.editing || this.suggestingEdit)
      },
    }
  }
</script>