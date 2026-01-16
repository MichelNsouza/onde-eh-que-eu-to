import Login from '@/views/Login.vue'
import ReadingList from '@/views/ReadingList.vue'
import Registrar from '@/views/Register.vue'
import { createRouter, createWebHistory } from 'vue-router'

import { supabase } from '@/config/supabase'

const routes = [
  {
    path: '/login',
    component: Login
  },
    {
    path: '/registrar',
    component: Registrar
  },
  {
    path: '/lista',
    component: ReadingList,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/lista'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const { data } = await supabase.auth.getSession()
    if (!data.session) {
      return '/login'
    }
  }
})

export default router