<template>
  <tr>
    <th v-on:mouseenter="suggestEdit" v-on:click="editAndFocus" @dblclick="editLabel">{{label}}</th>
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
      suggestEdit() { this.editable.suggestEdit() },
      editLabel() {
        var newLabel = prompt(`Rename the label of ${this.label}`, this.label)
        this.label = newLabel
      }
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