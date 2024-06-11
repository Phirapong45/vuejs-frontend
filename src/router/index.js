import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Balance from '../components/Balance.vue';
import Admin from '../components/Admin.vue';
// import Users from '../components/Users.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/checkBalance',
        name: 'checkBalance',
        component: Balance
    },
    {
        path: '/adminTopup',
        name: 'adminTopup',
        component: Admin
    }
    // {
    //     path: '/userTopup',
    //     name: 'userTopup',
    //     component: Users
    // }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
