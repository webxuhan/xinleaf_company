<template>
<div>
	<nv-head></nv-head>
	<el-row class="reg-wrap">
		<el-col :span="12" :offset="6">
			<el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="用户姓名：" prop="name">
			    <el-input v-model="form.name" placeholder="请输入用户姓名"></el-input>
			  </el-form-item>
			  <el-form-item label="手机号码：" prop="phoneNum">
			    <el-input v-model="form.phoneNum" placeholder="请输入手机号码"></el-input>
			  </el-form-item>
			  <el-form-item label="用户密码：" prop="password">
			    <el-input type="password" v-model="form.password" auto-complete="off" placeholder="请输入用户密码"></el-input>
			  </el-form-item>
			  <el-form-item label="重复密码：" prop="repassword">
			    <el-input type="password" v-model="form.repassword" auto-complete="off" placeholder="请重复输入密码"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="register('form')">立即注册</el-button>
			  </el-form-item>
			</el-form>
		</el-col>
	</el-row>
	<nv-foot></nv-foot>
</div>
</template>
<script>
import nvHead from '../../components/head'
import nvFoot from '../../components/foot'
export default {
data() {
	var validatePass = (rule, value, callback) => {
	    if (value === '') {
	      callback(new Error('请输入密码'));
	    } else {
	      if (this.form.repassword !== '') {
	        this.$refs.form.validateField('repassword');
	      }
	      callback();
	    }
	  };
	var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
  return {
    form: {
      name: '',
      phoneNum: '',
      password: '',
      repassword: ''
    },
    rules:{
		name: [
			{required: true, message: '请输入用户名', trigger: 'blur'},
			{min: 3,max: 10, message: '长度在3到10个字符', trigger: 'blur'}
		],
		password: [
			{validator: validatePass, trigger: 'blur'}
		],
		repassword: [
			{validator: validatePass2, trigger: 'blur'}
		]
	}
  }
},
methods: {
  register(formName) {
  	this.$refs[formName].validate((valid) => {
  		if(valid){
  			
  			this.$http.post('http://localhost:1225/users/doReg',this.form).then((res) => {
		    	if(res){
		    		console.log(res.data);
		    	}
		    })
		    .catch((error) => {
		    	console.log(error);
		    });

  		}else{
  			console.log('error');
  			return false;
  		}
  	});

  }
},
components: {
	nvHead,
	nvFoot
	}
}
</script>
<style>
.reg-wrap{
	padding:10px 0;
}
</style>