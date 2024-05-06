import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios';

import MainApp from '@/components/MainApp.vue'
import DormsApp from '@/components/DormsApp.vue'
import SpecialtiesApp from '@/components/SpecialtiesApp.vue'
import NotFound from '@/components/NotFound.vue'
import UniversityApp from '@/components/UniversityApp.vue'
import PostUniversity from '@/components/PostUniversity.vue';
import UpdateUniversity from '@/components/UpdateUniversity.vue';
import LoginAdmin from '@/components/LoginAdmin.vue'
import AdminMain from '@/components/AdminMain.vue'

const guard = function(to, from, next) {
    // check for valid auth token
    axios.get('/auth/admins/check-login').then(response => {
        // Token is valid, so continue
        next();
        return response;
    }).catch(error => {
        // There was an error so redirect
        router.push({ name: 'LoginAdmin' });
        return error;
    })
};

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
        path: '/admin/universities/post',
        name: 'PostUniversity',
        component: PostUniversity,
        beforeEnter: (to, from, next) => {
            guard(to, from, next);
        }
    },
    {
        path: '/admin/universities/:id/update',
        name: 'UpdateUniversity',
        component: UpdateUniversity,
        beforeEnter: (to, from, next) => {
            guard(to, from, next);
        }
    },
    {
        path: '/login',
        name: 'LoginAdmin',
        component: LoginAdmin
    },
    {
        path: '/admin/main',
        name: 'AdminMain',
        component: AdminMain,
        beforeEnter: (to, from, next) => {
            guard(to, from, next);
        }
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