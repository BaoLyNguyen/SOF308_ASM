import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import IndexPage from '../components/IndexPage.vue';
import BlogDetail from '../components/detail.vue';
import loginPage from '../components/logIn.vue';
import postManagement from '../components/crud.vue';
import ArticleDetailPage from '../components/detail.vue';
import ArticleList from '../components/listArticle.vue'; // Đảm bảo import đúng tên component
import updateUser from '../components/updateUser.vue';

const routes = [
    { path: '/',name: 'Home', component: IndexPage },
    { path: '/blogdetail', component: BlogDetail },
    { path: '/login', component: loginPage },
    {path:'/update', component: updateUser},
    {
        path: '/management',
        component: postManagement,
        meta: { requiresAdmin: true }, // Chỉ admin mới được truy cập
      },
    {
        path: '/article/:id',
        name: 'article-detail',
        component: ArticleDetailPage,
         // Yêu cầu đăng nhập để bình luận
      },
    {
        path: '/articles/:category', // Đường dẫn hiển thị danh mục
        name: 'articles',
        component: ArticleList, // Component để hiển thị danh sách bài viết
        props: true, // Truyền `category` qua props
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Middleware để kiểm tra quyền trước khi vào route
router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters.isAuthenticated;
    const isAdmin = store.getters.isAdmin;
  
    if (to.meta.requiresAuth && !isAuthenticated) {
      // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
      next('/login');
    } else if (to.meta.requiresAdmin && !isAdmin) {
      // Chuyển hướng nếu không phải admin
      next('/');
    } else {
      next(); // Cho phép truy cập
    }
  });

export default router;
