<template>
  <div>
    <div class="edit-box" v-bind:class="boxClass" v-on:click.self="saveAll">
      <div class="edit-tools">
        <button v-on:click.stop="toggle">{{buttonLabel}}</button>
      </div>
      <slot></slot>
    </div>
    <transition name="fade">
      <div class="edit-modal-bg" v-if="editMode" v-on:click.self="saveAll"></div>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        editMode: false
      }
    },
    methods: {
      saveAll() {
        this.editMode = false
        this.$children.forEach(c => c.save())
      },
      editAll() {
        this.editMode = true
        this.$children.forEach(c => c.edit())
      },
      cancelAll() {
        this.editMode = false
        this.$children.forEach(c => c.cancel())
      },
      toggle() {
        this.editMode = ! this.editMode
        if (this.editMode == true) {
          this.editAll()
        } else {
          this.saveAll()
        }
      },
      switchOnPartialEditing() {
        this.editMode = true
        this.$children.forEach(c => c.suggestingEdit = false)
      },
      switchOffPartialEditing() {
        this.editMode = false
      }
    },
    computed: {
      boxClass() {
        if (this.editMode) { return "edit-mode" } else { return "" }
      },
      buttonLabel() {
        if (this.editMode) { return "Save" } else { return "Edit" }
      }
    }
  }
</script>

<style lang="sass">
  .edit-box
    background: #ddd
    margin: 10px
    padding: 10px
    border-radius: 3px
    font-family: Helvetica Neue
    min-height: 400px
  .edit-box.edit-mode
    z-index: 6000
    position: relative
  .edit-tools
    text-align: right
  .edit-modal-bg
    position: fixed
    top: 0px
    left: 0px
    right: 0px
    bottom: 0px
    z-index: 5000
    background: black
    opacity: 0.6
  .fade-enter-active, .fade-leave-active
    transition: opacity 0.25s ease-out
  .fade-enter, .fade-leave-to
    opacity: 0
</style>