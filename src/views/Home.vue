<template>
<div>
  <nv-head></nv-head>
  <el-row>
    <el-col :span="24">
      主体区域内容
    </el-col>
  </el-row>
  <nv-foot></nv-foot>
</div>
</template>
<script>
import nvHead from '../components/head'
import nvFoot from '../components/foot'
export default {
  components: {
    nvHead,
    nvFoot
  }
}
</script>

<style>

</style>