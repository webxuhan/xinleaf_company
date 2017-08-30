<template>
	<div>
		<head-top></head-top>
		<el-row class="reg-wrap">
			<el-col :span="12" :offset="6">
				<el-form :model="staffForm" :rules="rules" ref="staffForm" label-width="100px" class="demo-ruleForm">
				  <el-form-item label="员工姓名：" prop="userName">
				    <el-input v-model="staffForm.userName" placeholder="请输入用户姓名"></el-input>
				  </el-form-item>
				  <el-form-item label="手机号码：" prop="phoneNum">
				    <el-input v-model="staffForm.phoneNum" placeholder="请输入手机号码"></el-input>
				  </el-form-item>
				  <el-form-item label="员工邮箱：" prop="email">
				    <el-input v-model="staffForm.email" placeholder="请输入员工邮箱"></el-input>
				  </el-form-item>
				  <el-form-item label="员工角色：">
				    <el-radio-group v-model="staffForm.role">
				      <el-radio label="1">管理人员</el-radio>
				      <el-radio label="2">普通人员</el-radio>
				    </el-radio-group>
				  </el-form-item>
				  <el-form-item label="员工密码：" prop="password">
				    <el-input type="password" v-model="staffForm.password" auto-complete="off" placeholder="请输入用户密码"></el-input>
				  </el-form-item>
				  <el-form-item label="确认密码：" prop="repassword">
				    <el-input type="password" v-model="staffForm.repassword" auto-complete="off" placeholder="请重复输入密码"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="addStaff('staffForm')">添加</el-button>
				  </el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import headTop from '../../components/headTop';
	export default{
		data(){
			// var validatePass = (rule, value, callback) => {
			//     if (value === '') {
			//       callback(new Error('请输入密码'));
			//     } else {
			//       if (this.staffForm.repassword !== '') {
			//         this.$refs.staffForm.validateField('repassword');
			//       }
			//       callback();
			//     }
			//   };
			// var validatePass2 = (rule, value, callback) => {
		 //        if (value === '') {
		 //          callback(new Error('请再次输入密码'));
		 //        } else if (value !== this.staffForm.password) {
		 //          callback(new Error('两次输入密码不一致!'));
		 //        } else {
		 //          callback();
		 //        }
		 //      };
			return {
				staffForm: {
					userName: '',
					phoneNum: '',
					email: '',
					role: '',
					password: '',
					repassword: '' 
				},
				rules:{
					userName: [
						{required: true, message: '请输入用户名', trigger: 'blur'},
						{min: 3,max: 10, message: '长度在3到10个字符', trigger: 'blur'}
					],
					phoneNum: [
						{required: true, message: '请输入手机号码', trigger: 'blur'},
					]
					// password: [
					// 	{validator: validatePass, trigger: 'blur'}
					// ],
					// repassword: [
					// 	{validator: validatePass2, trigger: 'blur'}
					// ]
				}
			}
		},
		methods:{
			addStaff(formName){
				this.$refs[formName].validate((valid) => {
					if(valid){
						this.$http.post('http://localhost:1225/admin/addStaff',this.staffForm).then((res) => {
							if( res.data.success ) {
								this.$message({
									type: 'success',
									message: '员工信息添加成功'
								});
								this.staffForm = {
									userName: '',
									phoneNum: '',
									email: '',
									role: '',
									password: '',
									repassword: '' 
								}
							} else {
								this.$message({
				    			type: 'error',
				    			message: res.data.msg
			    				});
							}
						});	
					} else {
						this.$notify.error({
			  				title: '错误',
			  				message: '请完善员工信息',
			  				offset: 100
			  			});
			  			return false;
					}
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