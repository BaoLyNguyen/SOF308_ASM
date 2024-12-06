import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';

const app = createApp(App);

axios.defaults.baseURL = 'http://localhost:8080'; // URL server của bạn
axios.defaults.withCredentials = true;

window.axios = axios; 

app.use(router);
app.mount('#app');