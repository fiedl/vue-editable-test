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
        <tr>
          <th>Name</th>
          <td><editable property="username" initial-value="John Doe"></editable></td>
        </tr>
        <tr>
          <th>Favorite Fast Food</th>
          <td><editable initial-value="Burgers"></editable></td>
        </tr>
      </table>
    </edit-box>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
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
