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

// Initialize Google One Tap after mounting the app
initializeGoogleOneTap();

// Function to initialize Google One Tap
export function initializeGoogleOneTap() {
  if (window.google && window.google.accounts) {
    window.google.accounts.id.initialize({
      client_id: '104231573976-2gras7klqs117s3qvr3tm2k3q8h69h1i.apps.googleusercontent.com', // Replace with your actual Google client ID
      callback: (response) => handleCredentialResponse(response)
    });
  }
}

// Example handler for Google One Tap response
// function handleCredentialResponse(response) {
//   console.log('Google One Tap response:', response);
//   // Handle the response as needed
// }
app.mount('#app')
