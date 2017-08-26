import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Main = r => require.ensure([], () => r(require('@/views/site/Home')), 'Home');
const Register = r => require.ensure([], () => r(require('@/views/site/Register')), 'Register');
const Login = r => require.ensure([], () => r(require('@/views/site/Login')), 'Login');
const Product = r => require.ensure([], () => r(require('@/views/site/Product')), 'Product');

const manage = r => require.ensure([], () => r(require('@/views/admin/manage')), 'manage');
const adminLogin = r => require.ensure([], () => r(require('@/views/admin/adminLogin')), 'adminLogin');
const home = r => require.ensure([], () => r(require('@/views/admin/home')), 'home');
const categoryList = r => require.ensure([], () => r(require('@/views/admin/categoryList')), 'categoryList');
const addCategory = r => require.ensure([], () => r(require('@/views/admin/addCategory')), 'addCategory');
const goodsList = r => require.ensure([], () => r(require('@/views/admin/goodsList')), 'goodsList');
const addGood = r => require.ensure([], () => r(require('@/views/admin/addGood')), 'addGood');
const staffList = r => require.ensure([], () => r(require('@/views/admin/staffList')), 'staffList');
const addStaff = r => require.ensure([], () => r(require('@/views/admin/addStaff')), 'addStaff');
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/Main',
      redirect: '/'
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
      path: '/Product',
      name: 'Product',
      component: Product
    },
    {
      path: '/adminLogin',
      component: adminLogin,
      meta: []
    },
    {
      path: '/manage',
      name: 'manage',
      component: manage,
      children: [
      {
        path: '',
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
      },
      {
        path: 'goodsList',
        component: goodsList,
        meta: ['商品管理','商品列表']
      },
      {
        path: 'addGood',
        component: addGood,
        meta: ['商品管理','添加商品']
      },
      {
        path: 'staffList',
        component: staffList,
        meta: ['员工管理','员工列表']
      },
      {
        path: 'addStaff',
        component: addStaff,
        meta: ['员工管理','添加员工']
      }
      ]
    }
  ]
})
