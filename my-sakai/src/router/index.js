import AppLayout from '@/layout/AppLayout.vue';
import { useAuthStore } from '@/stores/authStores';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue'),
                    meta :{
                        requiredAuth:true
                      }
                },
                {
                    path: '/test',
                    name: 'test',
                    component: () => import('@/views/test/TestCoba.vue'),
                    meta :{
                        requiredAuth:true
                      }
                },
                {
                    path: '/uikit/formlayout',
                    name: 'formlayout',
                    component: () => import('@/views/uikit/FormLayout.vue')
                },
                {
                    path: '/pages/crud',
                    name: 'crud',
                    component: () => import('@/views/pages/Crud.vue')
                },
                {
                    path: '/documentation',
                    name: 'documentation',
                    component: () => import('@/views/pages/Documentation.vue')
                },
                {
                    path: '/myaset',
                    name: 'myaset',
                    component: () => import('@/views/test/Myaset.vue'),
                    meta :{
                        requiredAuth:true
                      }
                }
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },

        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/logout',
            name: 'logout',
            component: () => import('@/views/pages/auth/Logout.vue')
        },
    ]
});

router.beforeEach(async(to,from)=>{
    const authStore = await useAuthStore()
    if(to.meta.requiredAuth && !authStore.currentUser){
      alert("Anda harus login dulu untuk mengakses halaman ini")
      return{
        path:'/login'
      }
    }
  })
export default router;
