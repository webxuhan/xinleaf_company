<template>
<div id="head">
	<el-row class="head-wrap">
		<el-col :span="8">
			<div class="logo">1</div>
		</el-col>
		<el-col :span="8">
			<!-- <div class="phone">
				<div class="p-top"></div>
				<div class="p-bottom">
					<el-input placeholder="请输入内容" icon="search" v-model="search" :on-icon-click="handleIconClick"></el-input>
				</div>
			</div> -->
		</el-col>
		<el-col :span="8">
			<router-link to="Register">注册</router-link>
			<router-link to="Login">登录</router-link>
		</el-col>
	</el-row>
</div>	
</template>
<script>
export default {
  data() {
    return {
      search: ''
    }
  },
  methods: {
    handleIconClick(ev) {
      console.log(this.search);
    },
    handleSelect(key,keyPath){
    	console.log(key,keyPath);
    }
  }
}
</script>
<style>
	.head-wrap{
		margin-bottom: 10px;
	}
</style>
