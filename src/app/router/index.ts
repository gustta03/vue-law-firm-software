import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Login/LoginView.vue'
import HomeView from '../views/Home/HomeView.vue'
import WorkSpaceView from '../views/WorkSpace/WorkSpaceView.vue'
import DocumentsView from '../views/Documents/DocumentsView.vue'
import CustomerView from '../views/Customers/CustomersView.vue'
import CaseView from '../views/Cases/CasesView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/workspace',
      name: 'workspace',
      component: WorkSpaceView
    },
    {
      path: '/documents',
      name: 'documents',
      component: DocumentsView
    },
    {
      path: '/customers',
      name: 'customer',
      component: CustomerView
    },
    {
      path: '/cases',
      name: 'cases',
      component: CaseView
    }
  ]
})

export default router
