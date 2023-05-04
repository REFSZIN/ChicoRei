import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    name: 'HomePage',
    path: '/',
    components: {
      default: () => import('../views/Home/HomePage.vue')
    },
    props: true,
  },
  {
    name: 'CheckoutPage',
    path: '/checkout',
    components: {
      default: () => import('../views/Checkout/CheckoutPage.vue')
    },
    props: true,
  }
]

const router = createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes
})

export default router