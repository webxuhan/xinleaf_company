<template>
	<div>
		<head-top></head-top>
		<!-- 员工展示列表 -->
		<el-row class="reg-wrap">
			<el-table :data="tableData" border :span="12" >
			    <el-table-column prop="_id" label="分类ID"></el-table-column>
			    <el-table-column prop="category_name" label="分类名称"></el-table-column>
			    <el-table-column prop="sort_order" label="优先级"></el-table-column>
			    <el-table-column prop="is_show" label="是否显示">
			    	<template scope="scope">
			        	<el-tag :type="scope.row.is_show ? 'primary' : 'success'" close-transition>{{scope.row.is_show ? '显示':'隐藏'}}</el-tag>
		  		 </template>
			    </el-table-column>
		   		<el-table-column label="操作" v-if='this.adminInfo.role==0'>
			      <template scope="scope">
			        <el-button
			          size="small"
			          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
			        <el-button
			          size="small"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
			      </template>
			    </el-table-column>
			  <!--   </span> -->
			</el-table>
		</el-row>
		<!-- 员工编辑弹出层 -->
		<el-dialog title="分类信息编辑" :visible.sync="dialogFormVisible">
		  <el-form :model="editForm" :rules="rules" ref="editForm" class="demo-ruleForm">
		    <el-form-item label="分类名称" :label-width="formLabelWidth" prop="category_name">
		      <el-input v-model="editForm.category_name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="分类排序" :label-width="formLabelWidth" prop="sort_order">
		      <el-input v-model="editForm.sort_order" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="是否显示" :label-width="formLabelWidth">
		  	  <el-radio class="radio" v-model="editForm.is_show" label="true">显示</el-radio>
  			  <el-radio class="radio" v-model="editForm.is_show" label="false">隐藏</el-radio>
		  	</el-form-item>
		  	<el-form-item :label-width="formLabelWidth">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="editCategory('editForm')">确 定</el-button>
			  </el-form-item>
		  </el-form>
		</el-dialog>
		<!-- 员工删除提示弹出层 -->
	</div>
</template>
<script>
	import headTop from '../../components/headTop'
	import {mapActions, mapState} from 'vuex'
	import {getParentId,delParentId,editCategory} from '@/api/getData'
	export default{
		data() {
			return {
				tableData : [{
					_id:'',
					category_name:'',
					sort_order:'',
					is_show:''
				}],
		        dialogFormVisible: false,
		        dialogVisible: false,
		        editForm: {
		          category_name:'',
				  sort_order:'',
				  is_show:''
		        },
		        formLabelWidth: '120px',
		        rules:{
					category_name: [
						{required: true, message: '请输入分类名称', trigger: 'blur'}
					]
				}
			}
		},
		computed:{
			...mapState(['adminInfo'])
		},
		mounted(){
			this.initData();
		},
		methods: {
			async initData(){
				const res = await getParentId();
				this.tableData = res[0];
			},
			handleEdit(index, row) {  //编辑操作
				this.dialogFormVisible = true;
				this.editForm = JSON.parse(JSON.stringify(row));
				this.editForm.is_show = this.editForm.is_show.toString();
			},
			handleDelete(index, row) { 	//删除操作

				this.$confirm('此操作将永久删除该分类信息, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	delParentId({_id:row._id}).then((res) =>{
		        		console.log(res);
		        		if(res.success){
			        		this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.initData();
			        	}else{
			        		this.$message({
								type: 'error',
								message: '删除失败!'
							});
			        	}
		        	});
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
	            });          
		        });
			},
			editCategory(editForm) {
				this.$refs[editForm].validate((valid) =>{
					if(valid){
						// console.log(this.editForm);
						editCategory(this.editForm).then((res) => {
							if(res.success){
								this.$message({
						            type: 'info',
						            message: res.msg
					            }); 
								this.dialogFormVisible = false;
								this.initData();
							}else{
								this.$message({
						            type: 'error',
						            message: res.msg
					            }); 
							}
						});
						
					}else{
			  			return false;
			  		}
				})	
			}
		},
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
