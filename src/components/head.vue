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
	<el-row>
		<el-col :span="24">
			<el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			  <el-menu-item index="1"><router-link to="Home">Home</router-link></el-menu-item>
			  <el-submenu index="2">
			    <template slot="title">Products</template>
			    <el-menu-item index="2-1">pressure gauge</el-menu-item>
			    <el-menu-item index="2-2">tie guage</el-menu-item>
			    <el-menu-item index="2-3">pressure gauge</el-menu-item>
			  </el-submenu>
			  <el-menu-item index="3"><router-link to="About">About us</router-link></el-menu-item>
			  <el-menu-item index="3"><router-link to="About">Marketing</router-link></el-menu-item>
			  <el-menu-item index="3"><router-link to="About">Consultation</router-link></el-menu-item>
			  <el-menu-item index="3"><router-link to="About">Contact Us</router-link></el-menu-item>
			</el-menu>
		</el-col>
	</el-row>
</div>	
</template>
<script>
export default {
  data() {
    return {
      search: '',
      activeIndex: '1'
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
