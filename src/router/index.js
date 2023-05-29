import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Users from '../views/Users.vue'
import axios from 'axios'


function AdminAuth(to, from, next){
  if(localStorage.getItem('token') != undefined){
    var req = {
      headers:{
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }
    console.log(req)
    axios.post("http://localhost:8686/validate", {}, req).then(res =>{
      console.log(res);
      next()
    }).catch(err =>{
      console.log(err.response);
      next("/login");
    })
    next();
  }else{
    next("login")
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin/users',
    name: 'users',
    component: Users,
    beforeEnter: AdminAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
