<template>
<div id="app">
  <HandleLogin/>
</div>
</template>

<script>

import HandleLogin from './components/HandleLogin.vue'

export default {
  name: 'App',
  components: {
    HandleLogin
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
