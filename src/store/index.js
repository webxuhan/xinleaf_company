import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
	userInfo: {},
	adminInfo: {}
}

const mutations = {
	setUserInfo(state,userInfo){
		state.userInfo = userInfo;
	},
	logout(state){
		state.userInfo = {};
	},
	setAdminInfo(state,adminInfo){
		state.adminInfo = adminInfo;
	},
	signout(state){
		state.adminInfo = {};
	}
}

const actions = {
	/*setUserInfo({commit},user){
		commit('setUserInfo', user);
	},
	logout({commit}){
		commit('logout');
	},
	setAdminInfo({commit},user){
		commit('setAdminInfo', user);
	}*/
	getAdminData({commit}){
		try{
			axios.post('http://localhost:1225/admin/getAdminInfo')
		    .then(function(res){
		        console.log(res);
		    })
			// const res = await getAdminInfo()
			/*this.$http.post('http://localhost:1225/admin/getAdminInfo').then((res) => {
				console.log(res);
			});*/

			/*if (res.status == 1) {
				commit('saveAdminInfo', res.data);
			}else{
				throw new Error(res)
			}*/
		}catch(err){
			console.log('您尚未登陆或者session失效')
		}
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations
})