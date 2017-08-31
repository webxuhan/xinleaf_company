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
	saveAdminInfo(state,adminInfo){
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
	},*/
	getAdminData({commit}){
		try{
			axios.get('http://localhost:1225/admin/getAdminInfo')
			    .then(function(res){
			        if(res.data.status == 1){
			        	commit('saveAdminInfo',res.data.data);
			        }else if(res.data.status == 0){
			        	commit('signout');
			        }
			    })
		}catch(err){
			console.log('您尚未登陆或者session失效')
		}
	},
	signout({commit}){
		commit('signout');
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations
})