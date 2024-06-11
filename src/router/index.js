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
    }else{
      
       // Reinitialize Google Sign-In button
       const gIdOnLoad = document.getElementById('g_id_onload');
       if (gIdOnLoad) {
         gIdOnLoad.remove();
       }
       const gIdSignIn = document.querySelector('.g_id_signin');
       if (gIdSignIn) {
         gIdSignIn.innerHTML = '';
       }
       const script = document.createElement('script');
       script.src = 'https://accounts.google.com/gsi/client';
       script.onload = () => {
         window.google.accounts.id.initialize({
           client_id: '104231573976-2gras7klqs117s3qvr3tm2k3q8h69h1i.apps.googleusercontent.com',
           callback: handleCredentialResponse,
         });
         window.google.accounts.id.renderButton(
           gIdSignIn,
           { theme: 'outline', size: 'large' }
         );
       };
       document.head.appendChild(script);
     
    }
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

export default router
