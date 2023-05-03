import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    name: '',
    path: '/',
    components: {
      default: () => import('../views/Home/HomePage.vue')
    },
    props: true,
  }
]

const router = createRouter({
  mode: "history",
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes
})

export default router