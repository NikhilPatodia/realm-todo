import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogIn from '../views/LogIn.vue'
import SignUp from '../views/SignUp.vue'
import { useAppState } from '@/realmState'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: LogIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    }
  ]
})

router.beforeEach((to, from, next)=>{
  const { isLoggedIn } = useAppState();
  if(to.fullPath === "/login"){
    if(isLoggedIn.value){
      next('/');
    }

    // }
  }
  if(to.fullPath === "/"){
    if(!isLoggedIn.value){
      next('login');
    }
  }
  if(to.fullPath === '/signup'){
    if(isLoggedIn.value){
      next('/');
    }
  }

  next();
})
router.beforeEach((to, from, next) => {
  // Reinitialize Google One Tap on route change
  initializeGoogleOneTap();
  next();
});

export default router
