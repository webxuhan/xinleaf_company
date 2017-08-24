import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	userInfo: {}
}

const mutations = {
	setUserInfo(state,userInfo){
		state.userInfo = userInfo;
	},
	logout(state){
		state.userInfo = {};
	}
}

const actions = {
	setUserInfo({commit},user){
		commit('setUserInfo', user);
	},
	logout({commit}){
		commit('logout');
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations
})