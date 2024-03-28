import { createRouter, createWebHistory } from 'vue-router';
import InicioVue from "@/views/InicioVue.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component:InicioVue
    },
    {
      path: '/favoritos',
      name: 'favoritos',
      component: () => import('../views/FavoritosView.vue')
    }
  ]
})

export default router
