import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = r => require.ensure([], () => r(require('@/views/Home')), 'Home');
const Register = r => require.ensure([], () => r(require('@/views/Register')), 'Register');
const Login = r => require.ensure([], () => r(require('@/views/Login')), 'Login');

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
      path: '*',
      component: Home
    }
  ]
})
