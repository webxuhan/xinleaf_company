<template>
<div>
	<el-row class="reg-wrap">
		<el-col :span="12" :offset="6">
			<el-form ref="form" :model="form" label-width="100px">
			  <el-form-item label="用户姓名：">
			    <el-input v-model="form.name" placeholder="请输入用户姓名"></el-input>
			  </el-form-item>
			  <el-form-item label="用户密码：">
			    <el-input type="password" v-model="form.password" placeholder="请输入用户密码"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="register">立即注册</el-button>
			  </el-form-item>
			</el-form>
		</el-col>
	</el-row>
</div>
</template>
<script>
export default {
data() {
  return {
    form: {
      name: '',
      password: ''
    }
  }
},
methods: {
  register() {

    this.$http.post('http://study.jameschun.cc/data.php').then(function(res){
    	console.log(res);
    });
  }
}
}
</script>
<style>
.reg-wrap{
	padding:10px 0;
}
</style>