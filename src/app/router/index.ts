import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Login/LoginView.vue'
import SignupView from '../views/SignUp/SignupView.vue'
import WorkSpaceView from '../views/WorkSpace/WorkSpaceView.vue'
import DocumentsView from '../views/Documents/DocumentsView.vue'
import CustomersView from '../views/Customers/CustomersView.vue'
import CaseView from '../views/Cases/CasesView.vue'
import { userIsLogged } from '../utils/isLoggedUtil'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { hideSideBar: false, requiresAuth: false }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
      meta: { hideSideBar: false, requiresAuth: false }
    },
    {
      path: '/',
      name: '',
      component: WorkSpaceView,
      meta: { requiresAuth: true }
    },
    {
      path: '/documents',
      name: 'documents',
      component: DocumentsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/customer',
      name: 'customer',
      component: CustomersView,
      meta: { requiresAuth: true }
    },
    {
      path: '/cases',
      name: 'cases',
      component: CaseView,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (userIsLogged()) {
      next()
    } else {
      alert('Faça login primeiro!')
      router.push('/login')
    }
  } else {
    next()
  }
})

export default router
