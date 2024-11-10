import { createRouter, createWebHistory } from 'vue-router';
import IndexPage from '../components/IndexPage.vue';
import BlogDetail from '../components/detail.vue';
import loginPage from '../components/log.vue';
import management from '../components/crud.vue';
// import Lab1PY00011 from '../components/lab1.vue';


const routes = [
    { path: '/', component: IndexPage },
    {path: '/blogdetail', component: BlogDetail},
    {path: '/login', component: loginPage},
    {path: '/management', component: management}
    // { path: '/lab2/bai1', component: Lab2Bai1 },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;