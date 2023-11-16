import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

import './style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App.vue';
import router from './routes/index.js';

const pinia = createPinia();
const app = createApp(App);

pinia.use(
  createPersistedState({
    key: (id) => `__persisted__${id}`,
    auto: true,
  })
);

app.use(pinia);
app.use(router);
app.mount('#app');
