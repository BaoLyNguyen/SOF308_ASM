<template>
  <!-- Start slides -->
  <Slideshow />
  <!-- End slides -->

  <!-- Start About -->
  <div class="about-section-box">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-12">
          <img
            src="images/about-img.jpg"
            alt=""
            class="img-fluid"
            style="height: 90%"
          />
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 text-center">
          <div class="inner-column">
            <h1>Đây là <span>Resto</span></h1>
            <h4>Mẫu chuyện nhỏ</h4>
            <p>
              Chào mừng bạn đến với trang nấu ăn của Resto, nơi cung cấp công
              thức và hình ảnh hướng dẫn nấu ăn dinh dưỡng và nhanh gọn cho mọi
              người!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End About -->

  <!-- Start QT -->
  <div class="qt-box qt-background">
    <div class="container">
      <div class="row">
        <div class="col-md-8 ml-auto mr-auto text-left">
          <p class="lead">
            “Tôi tin rằng mọi người đều xứng đáng được thưởng thức những món ăn
            ngon nhất, bữa tiệc tuyệt vời nhất mỗi ngày”.
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Start Menu -->
  <div class="menu-box">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="heading-title text-center">
            <h2>Công thức nổi bật</h2>
          </div>
        </div>
      </div>

      <div class="row special-list">
        <div
          v-for="a in paginatedArticles"
          :key="a.id"
          class="col-lg-4 col-md-6 special-grid drinks"
        >
          <div class="gallery-single fix">
            <img
              :src="`/${a.images}`"
              class="img-fluid"
              alt="Image"
              style="height: 355px; width: 100%"
            />
            <div
              class="why-text d-flex flex-column align-items-center justify-content-center"
            >
              <h4>{{ a.title }}</h4>
              <button
                @click="goToDetail(a.id)"
                class="btn btn-lg btn-circle btn-outline-new-white mt-3"
              >
                Xem thêm
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <button
          class="btn btn-common"
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          Previous
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          class="btn btn-common"
          :class="{ active: page === currentPage }"
          @click="changePage(page)"
        >
          {{ page }}
        </button>

        <button
          class="btn btn-common"
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
  <!-- End Menu -->

  <!-- Start Contact info -->
  <div class="contact-imfo-box">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <i class="fa fa-volume-control-phone"></i>
          <div class="overflow-hidden">
            <h4>Phone</h4>
            <p class="lead">0901 943 596</p>
          </div>
        </div>
        <div class="col-md-4">
          <i class="fa fa-envelope"></i>
          <div class="overflow-hidden">
            <h4>Email</h4>
            <p class="lead">lyntbpy00011@gmail.com</p>
          </div>
        </div>
        <div class="col-md-4">
          <i class="fa fa-map-marker"></i>
          <div class="overflow-hidden">
            <h4>Location</h4>
            <p class="lead">Quy Nhon, Binh Dinh, Viet Nam</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Contact info -->
</template>

<script>
import Slideshow from "./slideshow.vue";

export default {
  name: "IndexPage",
  components: {
    Slideshow,
  },
};
</script>
<script setup>
import axios from "axios";
import { ref, computed } from "vue";
import router from "../router"; // Đường dẫn chính xác tới file router/index.js

const articles = ref([]);
// Dữ liệu phân trang
const currentPage = ref(1);
const itemsPerPage = 6; // Số công thức mỗi trang

const getPosts = () => {
  axios
    .get("http://localhost:8082/Backend_new/BackEnd/index")
    .then((response) => {
      articles.value = response.data.articles;
    })
    .catch((error) => {
      console.log(error);
    });
};
const goToDetail = (id) => {
  // Điều hướng đến route chi tiết
  router.push({ name: "article-detail", params: { id: id } });
};
// Tính toán bài viết hiển thị trên mỗi trang
const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return articles.value.slice(start, end);
});

// Tổng số trang
const totalPages = computed(() => {
  return Math.ceil(articles.value.length / itemsPerPage);
});

// Chuyển trang
const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
getPosts();
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.why-text {
  display: flex;
  flex-direction: column; /* Sắp xếp theo cột */
  align-items: center; /* Căn giữa nội dung theo chiều ngang */
  justify-content: center; /* Căn giữa nội dung theo chiều dọc */
  text-align: center; /* Căn giữa text bên trong */
  height: 100%; /* Đảm bảo chiếm toàn bộ chiều cao container */
}

.why-text h4 {
  margin: 0; /* Loại bỏ khoảng cách mặc định của tiêu đề */
}

.why-text button {
  margin-top: 16px; /* Tạo khoảng cách giữa tiêu đề và nút */
}
.btn-outline-new-white {
  color: black;
  background-color: white;
}

.btn-outline-new-white:hover {
  background-color: black;
  color: white;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination .btn {
  padding: 8px 12px;
  margin: 0 5px;
  cursor: pointer;
}

.pagination .btn.active {
  background-color: #d0a772;
  color: white;
  font-weight: bold;
}

.pagination .btn:disabled {
  cursor: not-allowed;
  background-color: #ddd;
}
</style>
