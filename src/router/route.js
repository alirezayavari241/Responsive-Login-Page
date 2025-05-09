import { createRouter, createWebHistory } from 'vue-router';
import Dashbord from '../pages/Dashbord.vue';
import Main from '../pages/Main.vue';
import { useUserStore } from '../stores/useUserStore';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Main
  },
  {
    path: '/dashbord',
    name: 'Dashbord',
    component: Dashbord,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
});

router.beforeEach((to, from, next) => {
  const store = useUserStore();
  if (to.meta.requiresAuth && !store.isLogged) {
    next('/'); 
  } else {
    next(); 
  }
});

export default router;
