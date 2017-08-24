<template>
<div>
	<nv-head></nv-head>
	<el-row class="reg-wrap">
		<el-col :span="12" :offset="6">
			<el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="用户姓名：" prop="name">
			    <el-input v-model="form.name" placeholder="请输入用户姓名"></el-input>
			  </el-form-item>
			  <el-form-item label="用户密码：" prop="password">
			    <el-input type="password" v-model="form.password" placeholder="请输入用户密码"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="login('form')">立即登录</el-button>
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
	  return {
	    form: {
	      name: '',
	      password: ''
	    },
	    rules: {
	    	name: [
	    		{required: true, message: '请输入用户名', trigger: 'blur'},
				{min: 3,max: 10, message: '长度在3到10个字符', trigger: 'blur'}
	    	],
	    	password: [
	    		{required: true, message: '请输入密码', trigger: 'blur'},
				{min: 6,max: 20, message: '长度在6到20个字符', trigger: 'blur'}
	    	]
	    }
	  }
	},
	methods: {
	  login(formName) {
	  	this.$refs[formName].validate((valid) => {
	  		if(valid){
	  			
	  			this.$http.post('http://localhost:1225/users/doLogin',this.form).then((res) => {
	  				console.log(res);
			    	if(res.data.success){
			    		this.$message({
			    			type: 'success',
			    			message: '登录成功'
			    		});
			    		this.$router.push('Main');
			    	}else{
			    		this.$message({
			    			type: 'error',
			    			message: res.data.msg
			    		})
			    	}
			    });

	  		}else{
	  			this.$notify.error({
	  				title: '错误',
	  				message: '请输入正确的用户名密码',
	  				offset: 100
	  			});
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
<style lang="less" scoped>
@import '../../style/mixin';
.reg-wrap{
	padding:10px 0;
}
</style>