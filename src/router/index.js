import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Balance from '../components/Balance.vue';
import Admin from '../components/Admin.vue';
import Qrcode from '../components/Qrcode.vue';

const routes = [
    {
        path: '/',
        redirect: '/homePage' // เพิ่มการเปลี่ยนเส้นทางจากเส้นทางรากไปยัง /homePage
    },
    {
        path: '/homePage',
        name: 'homePage',
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
    },
    {
        path: '/qrcodeTopup',
        name: 'qrcodeTopup',
        component: Qrcode
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
