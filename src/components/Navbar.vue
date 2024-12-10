<template>
  <header class="top-navbar">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="/">
          <img src="../../public/images/logoResto.png" alt="" width="100px" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbars-rs-food"
          aria-controls="navbars-rs-food"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbars-rs-food">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="fetchArticles('Khai Vị')">Khai vị</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="fetchArticles('Đồ Ăn Sáng')">
                Ăn Sáng
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="fetchArticles('Món Chính')">
                Món Chính
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="fetchArticles('Tráng Miệng')">
                Tráng Miệng
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="fetchArticles('Đồ Uống')">Đồ Uống</a>
            </li>
            <li v-if="isAuthenticated" class="nav-item">
              <a class="nav-link" href="/update">Tài khoản</a>
            </li>
            <li v-if="isAdmin" class="nav-item">
            <a class="nav-link" href="/management">Quản lý</a>
          </li>
          <ul v-if="!isAuthenticated" class="navbar-nav">
            <li class="nav-item ml-auto">
              <a class="nav-link" href="/login">Login</a>
            </li>
          </ul>
          <ul v-else class="navbar-nav">
            <li class="nav-item ml-auto">
              <a class="nav-link" @click="logout">Logout</a>
            </li>
          </ul>

          </ul>
          
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import router from "../router"; // Import router để điều hướng
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "NavBar",
  setup() {
    // const fetchArticles = (category) => {
    //   // Mã hóa category và điều hướng
    //   const encodedCategory = encodeURIComponent(category);
    //   router.push({ name: "articles", params: { category: encodedCategory } });
    // };

    // return {
    //   fetchArticles,
    // };
    const store = useStore();

    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    const isAdmin = computed(() => store.getters.isAdmin);

    console.log('isAuthenticated navbar:', isAuthenticated.value);
  console.log('isAdmin navbar:', isAdmin.value);  // Kiểm tra giá trị của isAdmin

    const logout = () => {
      store.dispatch("logout");
      router.push("/");
    };

    const fetchArticles = (category) => {
      const encodedCategory = encodeURIComponent(category);
      router.push({ name: "articles", params: { category: encodedCategory } });
    };

    return {
      isAuthenticated,
      isAdmin,
      logout,
      fetchArticles,
    };
  },
};
</script>

<style>
/* Thêm style nếu cần */
</style>
