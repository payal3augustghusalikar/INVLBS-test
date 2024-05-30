import { createRouter, createWebHistory } from 'vue-router'
import ParentComponent from '../components/ParentComponent.vue'
import UsersList from '../components/UsersList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/question1',
      name: 'ParentComponent',
      component: ParentComponent
    },
    {
      path: '/question2',
      name: 'UsersList',
      component: UsersList
    }
  ]
})

export default router
