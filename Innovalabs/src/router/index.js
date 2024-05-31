import { createRouter, createWebHistory } from 'vue-router'
import ParentComponent from '../views/ParentComponent.vue'
import UsersList from '../views/UsersList.vue'
import Form from '../views/Form.vue'

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
    },
    {
      path: '/question3',
      name: 'Form',
      component: Form
    }
  ]
})

export default router
