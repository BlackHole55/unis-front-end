import { createRouter, createWebHistory } from 'vue-router'

import MainApp from '../components/MainApp.vue'
import DormsApp from '../components/DormsApp.vue'
import SpecialtiesApp from '../components/SpecialtiesApp.vue'
import NotFound from '../components/NotFound.vue'
import UniversityApp from '../components/UniversityApp.vue'
import LoginAdmin from '../components/LoginAdmin.vue'
import AdminMain from '../components/AdminMain.vue'

const routes = [
    {
        path: '/',
        name: 'MainApp',
        component: MainApp
    },
    {
        path: '/dorms',
        name: 'DormsApp',
        component: DormsApp
    },
    {
        path: '/specialties',
        name: 'SpecialtiesApp',
        component: SpecialtiesApp
    },
    {
        path: '/universities/:id',
        name: 'UniversityApp',
        component: UniversityApp
    },
    {
        path: '/login',
        name: 'LoginAdmin',
        component: LoginAdmin
    },
    {
        path: '/admin/main',
        name: 'AdminMain',
        component: AdminMain
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;