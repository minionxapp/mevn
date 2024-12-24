import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DasboardView from '@/views/DasboardView.vue'
import { useAuthStore } from '@/stores/authStores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
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
