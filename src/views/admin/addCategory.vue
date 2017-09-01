<template>
	<div>
		<head-top></head-top>
		<el-row class="reg-wrap">
			<el-col :span="12" :offset="6">
					<el-form :model="categoryForm" :rules="rules" ref="categoryForm" label-width="100px" class="demo-ruleForm">
					  <el-form-item label="分类名称：" prop="category_name">
					    <el-input v-model="categoryForm.category_name" placeholder="请输入分类名称"></el-input>
					  </el-form-item>
					  <el-form-item label="父级分类：" prop="parent_id">
					    <el-select v-model="categoryForm.parent_id" placeholder="请选择">
						    <el-option v-for="item in options"  :key="item.parent_id" :label="item.label" :value="item.parent_id">
						    </el-option>
					  	</el-select>
					  </el-form-item>
					  <el-form-item label="优先级：" prop="sort_order">
					  	<el-input v-model="categoryForm.sort_order" placeholder="请输入优先级（0为最高，默认为0）"></el-input>
					  </el-form-item>
				      <el-form-item label="是否显示：" prop="is_show">
					  	<el-radio class="radio" v-model="categoryForm.is_show" label="0">隐藏</el-radio>
 						<el-radio class="radio" v-model="categoryForm.is_show" label="1">显示</el-radio>
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
		data() {
	      return {
	      	categoryForm:{
	      		category_name:'',
		        parent_id:'0',
	      		is_show:'1',
	      		sort_order:'0'
	      	},
	      	options: [{
	            parent_id: '0',
	            label: '无'
		     }],
	      	rules:{
	      		category_name: [
	      			{required:true,message:'请输入分类名称',trigger: 'blur'}
	      		]
	      	}
	      };
	    },
		methods: {
	     	initParentId(){
	     		this.$http.get('http://localhost:1225/admin/getParentId').then((res) =>{
	     			console.log(res.data);
	     		})
	     	},
	     	addCategory(formName){
	     		this.$refs[formName].validate((valid) => {
	     			this.$http.post('http://localhost:1225/admin/addCategory',this.categoryForm).then((res) => {
	     				console.log(res.data)
	     			})
	     		})
	     	}
	    },
	    // mounted:{

	    // },
		components:{
			headTop
		}
		
	}
</script>
<style>
.reg-wrap{
	padding:10px 0;
}
</style>