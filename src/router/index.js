import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = r => require.ensure([], () => r(require('@/views/site/Home')), 'Home');
const Register = r => require.ensure([], () => r(require('@/views/site/Register')), 'Register');
const Login = r => require.ensure([], () => r(require('@/views/site/Login')), 'Login');

const manage = r => require.ensure([], () => r(require('@/views/admin/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/views/admin/home')), 'home');
const categoryList = r => require.ensure([], () => r(require('@/views/admin/categoryList')), 'categoryList');
const addCategory = r => require.ensure([], () => r(require('@/views/admin/addCategory')), 'addCategory');

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/manage',
      name: 'manage',
      component: manage,
      children: [
      {
        path: 'home',
        component: home,
        meta: []
      },
      {
        path: 'categoryList',
        component: categoryList,
        meta: ['分类管理','分类列表']
      },
      {
        path: 'addCategory',
        component: addCategory,
        meta: ['分类管理','添加分类']
      }
      ]
    }
  ]
})
