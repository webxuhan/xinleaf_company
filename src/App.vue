<template>
  <div id="app">
    <nv-head></nv-head>
    <div class="wrap">
      <router-view></router-view>
    </div>
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
.wrap{
  margin:10px auto;
}
</style>
