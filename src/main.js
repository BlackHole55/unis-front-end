import { createApp, computed } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";

window.axios = axios;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.baseURL = 'http://localhost:8000/api/v1/';

const getToken = computed(() => store.getters["admin/getToken"]); 

if (getToken.value) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${getToken.value}`;
    console.log(getToken.value);
}

// Handle token expiration or invalid tokens:
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // localStorage.removeItem('token');
            axios.defaults.headers.common['Authorization'] = 'Bearer';
            router.push({ name: 'LoginAdmin' });
        }
        return Promise.reject(error);
    }
);

createApp(App).use(store).use(router).mount('#app')
