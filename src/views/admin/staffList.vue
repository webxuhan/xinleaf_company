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
			        <el-tag :type="scope.row.role === '1' ? 'primary' : 'success'" close-transition>{{scope.row.role}}</el-tag>
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
		<!-- 员工编辑弹出层 -->
		<el-dialog title="员工信息编辑" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
		    <el-form-item label="活动名称" :label-width="formLabelWidth">
		      <el-input v-model="form.name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="活动区域" :label-width="formLabelWidth">
		      <el-select v-model="form.region" placeholder="请选择活动区域">
		        <el-option label="区域一" value="shanghai"></el-option>
		        <el-option label="区域二" value="beijing"></el-option>
		      </el-select>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
		  </div>
		</el-dialog>
		<!-- 员工删除提示弹出层 -->
	</div>
</template>
<script>
	import headTop from '../../components/headTop';
	export default{
		mounted(){
			this.$http.post('http://localhost:1225/admin/getStaffList').then((res) =>{
				// console.log(res.data.data);
				this.tableData = res.data.data[0];
				// console.log('tableData:',this.tableData);
			})
		},
		data() {
			return {
				tableData : [{
					register_time: '',
					userName: '',
					phoneNum:'',
					email:'',
					role:''
				}],
		        dialogFormVisible: false,
		        dialogVisible: false,
		        form: {
		          name: '',
		          region: '',
		          date1: '',
		          date2: '',
		          delivery: false,
		          type: [],
		          resource: '',
		          desc: ''
		        },
		        formLabelWidth: '120px'
			}
		},
		methods: {
			formatter(row, column) {
			return row.address;
			},
			filterTag(value, row) {
			console.log(row.role === value)
			return row.role == value;
			},
			handleEdit(index, row) {
			this.dialogFormVisible = true;
			console.log(index, row);
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