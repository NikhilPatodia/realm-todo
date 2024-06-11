

<template>
  <header>

    <div class="wrapper">

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/login">Log In</RouterLink>
         <button @click="logOut" class="btn" v-if="currentUser">LogOut</button>
         <div v-if="currentUser === null"></div>
        <div v-else-if="currentUser.providerType === 'oauth2-google'">Welcome, {{ currentUser.profile.name}}</div>
        <div v-else>Welcome, {{ currentUser.customData.first }} {{ currentUser.customData.last }}</div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
<script>
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import {useAppState} from './realmState.js'


export default {
  setup() {
    const {logout, user} = useAppState();
   const currentUser = ref(null);
   currentUser.value = user.value;
   const router = useRouter();
     watch(user, (newUser) => {
      currentUser.value = newUser;

    });
   onMounted(async()=>{
     currentUser.value = user.value;
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '438289569066138',
      cookie     : true,
      xfbml      : true,
      version    : 'v20.0'
    });

    FB.AppEvents.logPageView();   
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

   })
   
   const logOut = async()=>{
    await logout();
    router.replace('/login');

   }
    return {  currentUser, logOut };
  }
};
</script>
<style scoped>
nav{
  height: 67px;
  display: flex;
  align-items: center;
  font-size: 23px;
}
nav a{
  /* text-decoration: none; */
  font-weight: bold;
  color: crimson;
  margin-right:10px;
}
.btn{
  margin-right: 10px;
  padding: 8px 12px;
  background: crimson;
  border-radius: 12px;
  color: white;
  font-size: 23px;
  cursor: pointer;
}
.btn:hover{
  background: rgb(230, 51, 87);
}
nav a:hover{
  
  text-decoration: underline; 
    text-decoration-color: orange; 
    text-decoration-thickness: 4px; 
text-underline-offset: 8px; 

}
</style>
