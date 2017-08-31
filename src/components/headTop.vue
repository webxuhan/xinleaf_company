<template>
    <div class="header_container">

		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-dropdown menu-align='start' @command="handleCommand">
			<img src="" class="avator">
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="home">首页</el-dropdown-item>
				<el-dropdown-item command="signout">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
	data() {
		return {
			
		}
	},
	created() {
		if(!this.adminInfo.userName){
			this.getAdminData()
		};
		//console.log('adminInfo=>',this.adminInfo);
	},
	computed: {
		...mapState(['adminInfo'])
	},
	methods: {
		...mapActions(['getAdminData']),
		handleCommand(command) {
			if (command == 'home') {
				this.$router.push('/manage');
			}else if(command == 'signout'){
				// 退出系统
				this.$http.post('http://localhost:1225/admin/signout').then((res) => {

					if (res.data.success) {
						this.$message({
	                        type: 'success',
	                        message: '退出成功'
	                    });
	                    this.$store.dispatch('signout');
	                    this.$router.push('/adminLogin');
					}else{
						this.$message({
	                        type: 'error',
	                        message: res.data.message
	                    });
					}
				});
			}
		}
	},
	watch: {
		adminInfo: {
			handler: function (newValue){
				if (!newValue.userName) {
					this.$message({
	                    type: 'error',
	                    message: 'session失效，请重新登录'
	                });
					this.$router.push('/adminLogin')
				}
			},
			deep: true
		}
	}
}
    
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.header_container{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
</style>
