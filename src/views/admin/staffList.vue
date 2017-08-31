<template>
	<div>
		<head-top></head-top>
		<!-- 员工展示列表 -->
		<el-row class="reg-wrap">
			<el-table :data="tableData"   border :span="12" >
			    <el-table-column prop="register_time" label="日期" sortable width="180"></el-table-column>
			    <el-table-column prop="userName" label="员工姓名" width="180"></el-table-column>
			    <el-table-column prop="phoneNum" label="手机号码" ></el-table-column> 
			    <el-table-column prop="email" label="邮箱" ></el-table-column> 
			    <el-table-column prop="role" label="员工角色" width="100" 
			     :filters="[{ text: '管理人员', value: '1' }, { text: '普通人员', value: '2' }]"
			      :filter-method="filterTag" filter-placement="bottom-end">
			      <template scope="scope">
			        <el-tag :type="scope.row.role === '1' ? 'primary' : 'success'" close-transition>{{scope.row.role == 1?'管理人员':'普通人员'}}</el-tag>
		  		 </template>
		   		</el-table-column>
		   		<el-table-column label="操作">
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
		<!-- 列表分页 -->
		<el-row >
			<el-col :span='12' :offset='12'>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="totalNum">
				</el-pagination>
			</el-col>
		</el-row>
		<!-- 员工编辑弹出层 -->
		<el-dialog title="员工信息编辑" :visible.sync="dialogFormVisible">
		  <el-form :model="editForm" :rules="rules" ref="editForm" class="demo-ruleForm">
		    <el-form-item label="员工姓名" :label-width="formLabelWidth" prop="userName">
		      <el-input v-model="editForm.userName" auto-complete="off" :disabled="true"></el-input>
		    </el-form-item>
		    <el-form-item label="手机号码" :label-width="formLabelWidth" prop="phoneNum">
		      <el-input v-model="editForm.phoneNum" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="邮箱" :label-width="formLabelWidth">
		      <el-input v-model="editForm.email" auto-complete="off"></el-input>
		    </el-form-item>
		  	<el-form-item label="员工角色" :label-width="formLabelWidth">
		  	  <el-radio class="radio" v-model="editForm.role" label="1">管理人员</el-radio>
  			  <el-radio class="role" v-model="editForm.role" label="2">普通人员</el-radio>
		  	</el-form-item>
		  	<el-form-item :label-width="formLabelWidth">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="editStaff('editForm')">确 定</el-button>
			  </el-form-item>
		  </el-form>
		</el-dialog>
		<!-- 员工删除提示弹出层 -->
	</div>
</template>
<script>
	import headTop from '../../components/headTop';
	export default{
		data() {
			return {
				tableData : [{
					register_time: '',
					userName: '',
					phoneNum:'',
					email:'',
					role:''
				}],
				currentPage: 1, //当前页
				pageSize:11, //当前每页数据条数
				totalNum: 0, 	//当前数据总条数
		        dialogFormVisible: false,
		        dialogVisible: false,
		        editForm: {
		          userName: 'test',
		          phoneNum: '',
		          email:'',
				  role:'2',
		          delivery: false,
		          type: [],
		          resource: '',
		          desc: ''
		        },
		        formLabelWidth: '120px',
		        rules:{
					phoneNum: [
						{required: true, message: '请输入手机号码', trigger: 'blur'}
					]
				}
			}
		},
		mounted(){
			this.initData();
		},
		methods: {
			async initData(){
				this.$http.post('http://localhost:1225/admin/getStaffList',{currentPage:this.currentPage,pageSize:this.pageSize}).then((res) =>{
					const data = res.data.data;
					console.log('res:',res);
					console.log('res.data:',res.data.data.results);
					this.tableData = data.results;
					this.totalNum = data.count;
				});
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.initData();
			},
			formatter(row, column) {
			return row.address;
			},
			filterTag(value, row) {
			console.log(row.role === value)
			return row.role == value;
			},
			handleEdit(index, row) {  //编辑操作
			this.dialogFormVisible = true;
			// console.log(index, row.userName);
			// this.editForm = row;
			this.editForm = JSON.parse(JSON.stringify(row));
			this.editForm.role = this.editForm.role.toString();
			console.log(typeof this.editForm.role);
			console.log(this.editForm);
			},
			handleDelete(index, row) { 	//删除操作
				console.log("预定删除id：",row._id);
				 this.$confirm('此操作将永久删除该员工信息, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
	        	    this.$http.post('http://localhost:1225/admin/delStaffById',{_id:row._id}).then((res) =>{
	        	    	console.log(res,res.success);
						if( res.data.success ) {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
						} else {
							this.$message({
								type: 'error',
								message: '删除失败!'
							});
						}
					});
		        }).catch(() => {
	        	  console.log('取消删除');
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
	            });          
		        });
			},
			editStaff(editForm) {
				this.$refs[editForm].validate((valid) =>{
					if(valid){
						console.log('test:',this.editForm);
						this.$http.post('http://localhost:1225/admin/editStaff',this.editForm).then((res) => {
							console.log('res.data:',res.data);
							if(res.data.success){
								console.log('修改成功');
								this.$message({
						            type: 'info',
						            message: res.data.msg
					            }); 
								this.dialogFormVisible = false;
							}else{
								console.log(res.data.msg);
								this.$message({
						            type: 'error',
						            message: res.data.msg
					            }); 
							}
						})
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
