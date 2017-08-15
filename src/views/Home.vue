<template>
<div>
  <nv-head></nv-head>
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in 5" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
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
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>