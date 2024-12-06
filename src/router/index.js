import { createRouter, createWebHistory } from 'vue-router';
import IndexPage from '../components/IndexPage.vue';
import BlogDetail from '../components/detail.vue';
import loginPage from '../components/logIn.vue';
import postManagement from '../components/crud.vue';
import demo from '../components/demo.vue';
import ArticleDetailPage from '../components/detail.vue';
// import Lab1PY00011 from '../components/lab1.vue';


const routes = [
    { path: '/', component: IndexPage },
    {path: '/blogdetail', component: BlogDetail},
    {path: '/login', component: loginPage},
    {path: '/management', component: postManagement},
    { path: '/article/:id', name: 'article-detail', component: ArticleDetailPage },
    {path: '/demo', component: demo}
    
    // { path: '/lab2/bai1', component: Lab2Bai1 },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;