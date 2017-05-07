<template>
  <div class="edit-box" v-on:click="saveAll">
    <div class="edit-tools">
      <button v-on:click.stop="toggle">Edit</button>
    </div>
    Edit-Mode: {{editMode}}
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: ['editMode'],
    methods: {
      saveAll() {
        this.editMode = false
        this.$children[0].$emit('save')
      },
      editAll() {
        this.editMode = true
        this.$children[0].$emit('edit')
      },
      toggle() {
        this.editMode = ! this.editMode
        if (this.editMode == true) {
          this.editAll()
        } else {
          this.saveAll()
        }
      }
    },
    created() {
      this.editMode = false
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
  .edit-tools
    text-align: right
</style>