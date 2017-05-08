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

<script lang="coffee">
EditBox = {
  data: ->
    { editMode: false }
  methods:
    saveAll: ->
      @editMode = false
      @$children.forEach (c) ->
        c.save()
        return
      return
    editAll: ->
      @editMode = true
      @$children.forEach (c) ->
        c.edit()
      firstEditable = @$children[0]
      setTimeout (->
        firstEditable.focus()
      ), 300
    cancelAll: ->
      @editMode = false
      @$children.forEach (c) ->
        c.cancel()
    toggle: ->
      @editMode = !@editMode
      if @editMode == true
        @editAll()
      else
        @saveAll()
    switchOnPartialEditing: ->
      @editMode = true
      @$children.forEach (c) ->
        c.suggestingEdit = false
    switchOffPartialEditing: ->
      @editMode = false
  computed:
    boxClass: ->
      if @editMode
        'edit-mode'
      else
        ''
    buttonLabel: ->
      if @editMode
        'Save'
      else
        'Edit'
}

`export default EditBox`
</script>

<style lang="sass">
  .edit-box
    background: #ddd
    margin: 10px
    padding: 10px
    border-radius: 3px
    font-family: Helvetica Neue
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
    transition: opacity 0.10s ease-out
  .fade-enter, .fade-leave-to
    opacity: 0
</style>