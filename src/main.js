import { createApp } from 'vue';
import { createPinia } from 'pinia';
import * as Realm from "realm-web";
import App from './App.vue';
import router from './router';
import FacebookPlugin from './facebook.js';
import GooglePlugin from './google.js'; // Import the Google plugin

// Initialize Realm
new Realm.App({ id: "application-1-yyltwyf" });

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(FacebookPlugin);
app.use(GooglePlugin); // Use the Google plugin

app.mount('#app');
