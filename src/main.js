import './assets/main.css'
import FacebookPlugin from './facebook.js';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as Realm from "realm-web";
import vue3GoogleLogin from 'vue3-google-login'
import App from './App.vue'
import router from './router'
new Realm.App({ id: "application-1-yyltwyf" });
const app = createApp(App)

app.use(createPinia())
app.use(FacebookPlugin);

app.use(router)
router.afterEach((to, from) => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: '104231573976-2gras7klqs117s3qvr3tm2k3q8h69h1i.apps.googleusercontent.com',
        callback: (response) => console.log(response)
      });
      window.google.accounts.id.prompt();
    }
  });
// app.use(vue3GoogleLogin, {
//     clientId: '104231573976-2gras7klqs117s3qvr3tm2k3q8h69h1i.apps.googleusercontent.com'
//   })
app.mount('#app')
