import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

import './style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App.vue';
import router from './routes/index.js';

const app = createApp(App);
const pinia = createPinia();
pinia.use(
  createPersistedState({
    auto: true,
  })
);

app.use(router);
app.use(pinia);
app.mount('#app');
