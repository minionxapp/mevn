import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DasboardView from '@/views/DasboardView.vue'
import { useAuthStore } from '@/stores/authStores'
import DevView from '../views/Dev/DevView.vue'
import AboutView from '@/views/AboutView.vue'
import DevKolomView from '@/views/Dev/DevKolomView.vue'
import DevCreateCRUD from '@/views/Dev/DevCreateCRUD.vue'

import KelasView from '@/views/Kelas/KelasView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DasboardView,
      meta :{
        requiredAuth:true
      }
    },
    {
      path: '/dev',
      name: 'Dev',
      component: DevView,
    },
    {
      path: '/devkolom',
      name: 'Kolom',
      component: DevKolomView,
    },
    {
      path: '/devcreatecrude',
      name: 'CreateCrud',
      component: DevCreateCRUD,
    },
    {
      path: '/kelas',
      name: 'Kelas',
      component: KelasView,
      meta :{
        requiredAuth:true
      }
    },

  ], 
})

router.beforeEach(async(to,from)=>{
  const authStore = await useAuthStore()
  if(to.meta.requiredAuth && !authStore.currentUser){
    alert("Anda harus login dulu untuk mengakses halaman ini")
    return{
      path:'/'
    }
  }
})
export default router
