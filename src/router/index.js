import Vue from 'vue'
import VueRouter from 'vue-router'
import decode from 'jwt-decode';
import axios from 'axios';
import store from '../store'

Vue.use(VueRouter)

function isSignedIn() {
  const token = localStorage.getItem("token");
  if (!token) {
    return false
  }
  try {
    const { exp: expiration } = decode(token)
    const isExpired = !!expiration && Date.now() > expiration * 1000;

    if (isExpired) {
      store.state.userData.access_token = undefined
      return false;
    }

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;

    return true;
  } catch (_) {
    store.state.userData.access_token = undefined
    return false
  }
}


const routes = [
  {
    name: 'home',
    path: '/',
    components: {
      default: () => import('../views/Home/HomePage.vue')
    },
    props: true,
    beforeEnter(to, from, next) {
      if (isSignedIn()) {
        next()
        return
      }
      next('/')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
