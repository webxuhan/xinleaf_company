<template>
	<div>
		<head-top></head-top>
	  <el-row class="reg-wrap">
      <el-col :span="12" :offset="6">
        <el-form :model="goodForm" :rules="rules" ref="categoryForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="商品名称：" prop="goods_name">
            <el-input v-model="goodForm.goods_name" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addCategory('categoryForm')">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
	</div>
</template>
<script>
	import headTop from '../../components/headTop';
	export default {
		components:{
			headTop
		},
		  data() {
      return {
        goodForm: [{
          goods_name:''
        }]
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
      	console.log('row:',row);
      	console.log('val:',value);
      	console.log(row.tag === value)
        return row.tag === value;
      }
    }
	}
</script>