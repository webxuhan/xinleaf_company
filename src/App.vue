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
.wrap{
  margin:10px auto;
}
</style>
