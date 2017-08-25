import Vue from 'vue'
import Vuex from 'vuex'

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
	setUserInfo({commit},user){
		commit('setUserInfo', user);
	},
	logout({commit}){
		commit('logout');
	},
	setAdminInfo({commit},user){
		commit('setAdminInfo', user);
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