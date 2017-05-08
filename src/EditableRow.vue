<template>
  <tr>
    <th v-on:mouseenter="suggestEdit" v-on:click="editAndFocus">{{label}}</th>
    <td><editable :property="property" :type="type" :initial-value="initialValue"></editable></td>
  </tr>
</template>

<script>
  export default {
    props: ["label", "property", "type", "initialValue"],
    methods: {
      switchOnPartialEditing() { this.$parent.switchOnPartialEditing() },
      switchOffPartialEditing() { this.$parent.switchOffPartialEditing() },
      edit() { this.editable.edit() },
      focus() { this.editable.focus() },
      editAndFocus() { this.edit(); this.focus() },
      save() { this.editable.save() },
      saveAll() { this.$parent.saveAll() },
      cancel() { this.editable.cancel() },
      cancelAll() { this.$parent.cancelAll() },
      suggestEdit() { this.editable.suggestEdit() }
    },
    computed: {
      value: {
        get() { return this.editable.value },
        set(v) { this.editable.value = v }
      },
      editable() { return this.$children[0] }
    }
  }
</script>