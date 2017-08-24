<template>
<div id="head">
	<el-row class="head-wrap">
		<el-col :span="16">
			<div class="logo"><img src="../assets/logo.jpg"></div>
		</el-col>
		<el-col :span="8" class="user-info">
			<!-- <div class="phone">
				<div class="p-top"></div>
				<div class="p-bottom">
					<el-input placeholder="请输入内容" icon="search" v-model="search" :on-icon-click="handleIconClick"></el-input>
				</div>
			</div> -->
			<!-- <el-button type="primary" icon="search">登录</el-button>
			<el-button type="primary" icon="search">注册</el-button> -->
			<div v-if="userInfo.userId">
				<span class="welcome">欢迎您，{{userInfo.name}}</span>
				<span class="logout" @click="logout">退出</span>
			</div>
			<div v-if="!userInfo.userId">
				<router-link to="Register">注册</router-link>
				<router-link to="Login">登录</router-link>
			</div>
			
			
		</el-col>
	</el-row>
	<el-row>
		<el-col :span="24" class="nav-bg">
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			  <el-menu-item index="1"><router-link to="Main">首页</router-link></el-menu-item>
			  <el-submenu index="2">
			    <template slot="title">产品中心</template>
			    <el-menu-item index="2-1">pressure gauge</el-menu-item>
			    <el-menu-item index="2-2">tie guage</el-menu-item>
			    <el-menu-item index="2-3">pressure gauge</el-menu-item>
			  </el-submenu>
			  <el-menu-item index="3"><router-link to="About">关于我们</router-link></el-menu-item>
			  <el-menu-item index="3"><router-link to="About">营销网络</router-link></el-menu-item>
			  <el-menu-item index="3"><router-link to="About">在线留言</router-link></el-menu-item>
			  <el-menu-item index="3"><router-link to="About">联系我们</router-link></el-menu-item>
			</el-menu>
		</el-col>
	</el-row>
	<el-row>
		<el-col :span="24">
			<div class="grid-content">
		        <el-carousel indicator-position="outside">
		          <el-carousel-item v-for="item in sliders" :key="item">
		            <img :src="item">
		          </el-carousel-item>
		        </el-carousel>
		      </div>
		</el-col>
	</el-row>
</div>	
</template>
<script>
import {mapActions, mapState} from 'vuex'

export default {
  data() {
    return {
      search: '',
      activeIndex: '1',
      sliders:[
      	require('../assets/banner-home-1.jpg'),
      	require('../assets/banner-home-2.jpg'),
      	require('../assets/banner-home-3.jpg')
      ]
    }
  },
  computed: {
	...mapState(['userInfo'])
  },
  methods: {
  	...mapActions(['logout']),
    handleIconClick(ev) {
      console.log(this.search);
    },
    handleSelect(key,keyPath){
    	console.log(key,keyPath);
    }
  }
}
</script>
<style lang="less" scoped>
	@import '../style/mixin';
	.head-wrap{
		.wh(960px,102px);
		margin: 0px auto;
		.user-info{
			height:102px; 
			line-height:102px;
			.welcome{
				margin-right:5px; 
				color:red;
			} 
		}
	}
	.nav-bg{
		background:rgb(133,133,133);
		.el-menu-demo{
			background:none; 
			width:960px; 
			margin:0 auto; 
		}
	}
</style>
