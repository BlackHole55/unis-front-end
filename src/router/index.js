import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios';

import MainApp from '@/components/MainApp.vue'
import AdminMain from '@/components/AdminMain.vue'


import UniversityApp from '@/components/UniversityApp.vue'
import PostUniversity from '@/components/PostUniversity.vue'
import UpdateUniversity from '@/components/UpdateUniversity.vue'

import DormsApp from '@/components/DormsApp.vue'
import AdminDorms from '@/components/AdminDorms.vue'
import PostDorm from '@/components/PostDorm.vue'
import UpdateDorm from '@/components/UpdateDorm.vue'

import SpecialtiesApp from '@/components/SpecialtiesApp.vue'
import AdminSpecialties from '@/components/AdminSpecialties.vue'
import PostSpecialties from '@/components/PostSpeciality.vue'
import UpdateSpeciality from '@/components/UpdateSpeciality.vue'

import ExamsApp from '@/components/ExamsApp.vue'
import AdminExams from '@/components/AdminExams.vue'
import PostExam from '@/components/PostExam.vue'
import UpdateExam from '@/components/UpdateExam.vue'

import NotFound from '@/components/NotFound.vue'

import LoginAdmin from '@/components/LoginAdmin.vue'


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
    //Main routes
    {
        path: '/',
        name: 'MainApp',
        component: MainApp
    },
    {
        path: '/admin/main',
        name: 'AdminMain',
        component: AdminMain,
        beforeEnter: (to, from, next) => {
            guard(to, from, next);
        }
    },
    //Universities routes
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
    //Dorms routes
    {
        path: '/dorms',
        name: 'DormsApp',
        component: DormsApp
    },
    {
        path: '/admin/dorms',
        name: 'AdminDorms',
        component: AdminDorms,
        beforeEnter: (to, from, next) => {
            guard(to, from, next);
        }
    },
    {
        path: '/admin/university/:id/dorms/post',
        name: 'PostDorms',
        component: PostDorm,
        beforeEnter: (to, from, next) => {
            guard(to, from, next);
        }
    },
    {
        path: '/admin/dorms/:id/update',
        name: 'UpdateDorm',
        component: UpdateDorm,
        beforeEnter: (to, from, next) => {
            guard(to, from, next);
        }
    },
    //Specialties routes
    {
        path: '/specialties',
        name: 'SpecialtiesApp',
        component: SpecialtiesApp
    },
    {
        path: '/admin/specialties',
        name: 'AdminSpecialties',
        component: AdminSpecialties,
        beforeEnter: (to, from, next) => {
            guard(to, from, next);
        }
    },
    {
        path: '/admin/specialties/post',
        name: 'PostSpecialties',
        component: PostSpecialties,
        beforeEnter: (to, from, next) => {
            guard(to, from, next);
        }
    },
    {
        path: '/admin/specialties/:id/update',
        name: 'UpdateSpeciality',
        component: UpdateSpeciality,
        beforeEnter: (to, from, next) => {
            guard(to, from, next);
        }
    },
    //Exams routes
    {
        path: '/exams',
        name: 'ExamsApp',
        component: ExamsApp        
    },
    {
        path: '/admin/exams',
        name: 'AdminExams',
        component: AdminExams,
        beforeEnter: (to, from, next) => {
            guard(to, from, next);
        }
    },
    {
        path: '/admin/exams/post',
        name: 'PostExam',
        component: PostExam,
        beforeEnter: (to, from, next) => {
            guard(to, from, next);
        }
    },
    {
        path: '/admin/exams/:id/update',
        name: 'UpdateExam',
        component: UpdateExam,
        beforeEnter: (to, from, next) => {
            guard(to, from, next);
        }
    },
    //Admin routes
    {
        path: '/login',
        name: 'LoginAdmin',
        component: LoginAdmin
    },
    //404 route
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