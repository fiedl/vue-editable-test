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
    props: ['value', 'editing'],
    methods: {
      edit() {
        this.editing = true
      },
      save() {
        this.editing = false
      }
    }
  }
</script>