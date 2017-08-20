import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = r => require.ensure([], () => r(require('@/views/site/Home')), 'Home');
const Register = r => require.ensure([], () => r(require('@/views/site/Register')), 'Register');
const Login = r => require.ensure([], () => r(require('@/views/site/Login')), 'Login');
const Admin = r => require.ensure([], () => r(require('@/views/admin/Login')), 'Admin');

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
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '*',
      component: Home
    }
  ]
})
