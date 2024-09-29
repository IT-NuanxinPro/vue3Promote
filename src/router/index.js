import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/newChat'
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('@/views/chat/index.vue')
    },
    {
      path: '/newChat',
      name: 'newChat',
      component: () => import('@/views/newChat/index.vue')
    }
  ]
})

export default router
