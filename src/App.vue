<template>
  <div id="app">
    <nv-head></nv-head>
    <router-view></router-view>
    <nv-foot></nv-foot>
  </div>
</template>

<script>
import nvHead from './components/head'
import nvFoot from './components/foot'
export default {
  name: 'app',
  components: {
    nvHead,
    nvFoot
  }
}
</script>

<style>
body{
  margin:0;
  padding:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
