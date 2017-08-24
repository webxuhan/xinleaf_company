import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	userInfo: {
		userName: '',
		isLogin: false
	}
}

const mutations = {
	setLogin(state){
		state.userInfo.isLogin = true;
	},
	logout(state){
		state.userInfo.isLogin = false;
	}
}

const actions = {
	setLogin({commit}){
		commit('setLogin');
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