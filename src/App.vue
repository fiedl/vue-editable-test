<template>
  <div id="app">
    <edit-box>
      <table>
        <tr>
          <th></th>
          <td><h1>
            <editable property="username" initial-value="John Doe"></editable>
          </h1></td>
        </tr>
        <editable-row property="username" label="Name" initial-value="John Doe"></editable-row>
        <editable-row label="Favorite Fast Food" initial-value="Burgers"></editable-row>
        <editable-row label="Bio" initial-value="" type="textarea"></editable-row>

        <editable-row v-for="profile_field in profile_fields" key="profile_field.id" :label="profile_field.label" :initialValue="profile_field.value" :property="profile_field.property"></editable-row>

        <tr>
          <td></td><td><button @click="addProfileField">Add</button></td>
        </tr>

      </table>
    </edit-box>

    <edit-box>
      <h2>Additional info</h2>
      <editable help="Thanks for adding more info. You can add anything you want here!"></editable>
    </edit-box>
  </div>
</template>

<script>

// http://stackoverflow.com/a/12675966/2066546
Array.prototype.first = function() { return this[0] }
Array.prototype.last = function() {
  return this[this.length-1];
}

export default {
  name: 'app',
  data () {
    return {
      profile_fields: [
        {id: 123, property: 'phone', label: 'Phone', value: '123'},
        {id: 124, property: 'email', label: 'Email', value: 'foo@example.com'}
      ]
    }
  },
  methods: {
    addProfileField() {
      self = this
      self.profile_fields.push({id: null, label: "New", value: ""})
      setTimeout(function() { self.editables.last().editAndFocus() }, 200)
    }
  },
  computed: {
    editables() {
      return this.$children.first().$children
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

table {
  border-spacing: 10px;
}

table th {
  text-align: right;
}
</style>
