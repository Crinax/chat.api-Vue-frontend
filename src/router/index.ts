import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Room from '../components/Room.vue'
import Chat from '../components/Chat.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/room/:id',
    name: 'Chat Room',
    component: Room
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
