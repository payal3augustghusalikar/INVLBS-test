import { createRouter, createWebHistory } from 'vue-router'
import ParentComponent from '../components/ParentComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/question1',
      name: 'ParentComponent',
      component: ParentComponent
    }
  ]
})

export default router
