<template>
  <div>
    <div class='read' v-on:click="edit" v-if="!editing">
      {{value}}
    </div>
    <div class='edit' v-if="editing" v-on:keyup.enter="save">
      <input type="text" v-model="value">
    </div>
  </div>
</template>

<script>
  export default {
    props: ['initialValue'],
    data() { return {
      editing: false,
      value: null
    } },
    created() {
      this.value = this.initialValue
    },
    methods: {
      edit() {
        this.editing = true
        this.$parent.switchOnPartialEditing()
      },
      save() {
        this.editing = false
      }
    },
  }
</script>