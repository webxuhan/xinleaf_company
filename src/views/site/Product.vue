<template>
<div>
  <nv-head></nv-head>
  <el-row>
    <el-col :span="24">
      <div class="container">
        <h2 class="title">产品中心</h2>
        <div class="box">
          <ul class="product_list">
            <li>
              <a href="#">
                <img src="../../assets/product_01.jpg">
                <p>2'直径50mm灰铁壳氨压表</p>
              </a>
            </li>
            <li>
              <a href="#">
                <img src="../../assets/product_01.jpg">
                <p>2'直径50mm灰铁壳氨压表</p>
              </a>
            </li><li>
              <a href="#">
                <img src="../../assets/product_01.jpg">
                <p>2'直径50mm灰铁壳氨压表</p>
              </a>
            </li><li>
              <a href="#">
                <img src="../../assets/product_01.jpg">
                <p>2'直径50mm灰铁壳氨压表</p>
              </a>
            </li><li>
              <a href="#">
                <img src="../../assets/product_01.jpg">
                <p>2'直径50mm灰铁壳氨压表</p>
              </a>
            </li><li>
              <a href="#">
                <img src="../../assets/product_01.jpg">
                <p>2'直径50mm灰铁壳氨压表</p>
              </a>
            </li><li>
              <a href="#">
                <img src="../../assets/product_01.jpg">
                <p>2'直径50mm灰铁壳氨压表</p>
              </a>
            </li>
          </ul>

          <div class="pager">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
          </div>

        </div>
      </div>
    </el-col>
  </el-row>
  <nv-foot></nv-foot>
</div>
</template>
<script>
import nvHead from '../../components/head'
import nvFoot from '../../components/foot'
export default {
  components: {
    nvHead,
    nvFoot
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  data() {
    return {
      currentPage4: 4
    };
  }
}
</script> 

<style lang="less" scoped>
@import '../../style/common.less';
@import '../../style/mixin';
.container{
  width:960px; 
  margin:0 auto;
  h2{
    background:#f24429;
    font-size:15px; 
    color:#fff;
    height:32px; 
    line-height:32px;
    padding:0 15px;
    text-align:center;
    display:inline-block;
    margin:0;
  }
  .box{
    width:100%; 
    border:1px solid #e0e1e0;
    box-sizing:border-box;
    margin-bottom:20px;
    .product_list{
      display:flex;
      flex-direction:row;
      flex-wrap: wrap;
      padding:30px 50px; 
      li{
        box-sizing:border-box;
        width:33%;
        padding:0 10px;
        margin-bottom:20px;
        a{
          display:block;
          width:100%;
          border:1px solid #e0e1e1;
          color:#555; 
          img{
            max-width:100%;
          }
          p{
            text-align:center; 
            font-size:12px; 
            margin-bottom:5px;
          }
          &:hover{
            border:1px solid red;
            color:red;
          }
        }
      }
    }
    .pager{
      margin:5px auto 20px;
      text-align:center;
    }
  }
}
</style>




