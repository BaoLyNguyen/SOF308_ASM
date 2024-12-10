import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';
import store from './store'; // Import store

const storedUser = JSON.parse(localStorage.getItem('user'));
if (storedUser) {
  store.commit('setUser', storedUser); // Gửi thông tin vào Vuex
}

const app = createApp(App);

axios.defaults.baseURL = 'http://localhost:8080'; // URL server của bạn
axios.defaults.withCredentials = true;

window.axios = axios;

app.use(router); // Kết nối router
app.use(store);  // Kết nối Vuex store
app.mount('#app'); // Mount ứng dụng
