<template>
  <div class="container post-box-blog">
    <!-- <h3 class="custom">Danh sách bài viết</h3> -->
    <div class="all-page-title page-breadcrumb">
		<div class="container text-center">
			<div class="row">
				<div class="col-lg-12">
					<h1>Blog</h1>
				</div>
			</div>
		</div>
	</div>
  <div class="blog-box">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<div class="heading-title text-center">
						<h2>{{ articles.category }}</h2>
					</div>
				</div>
			</div>
			<div class="row">
				<div v-for="article in articles" :key="article.id" class="col-lg-4 col-md-6 col-12">
					<div class="blog-box-inner">
						<div class="blog-img-box">
							<img class="img-fluid" :src="`/${article.images}`" alt="" style="height: 355px; width:100%;">
						</div>
						<div class="blog-detail">
							<h4>{{article.title}}</h4>
							<ul>
								<li><span>Đăng bởi Bảo Ly</span></li>
								<li>|</li>
								<li><span>{{article.postedDate}}</span></li>
							</ul>
							<a class="btn btn-lg btn-circle btn-outline-new-white" @click="goToDetail(article.id)">Xem thêm</a>
						</div>
					</div>
				</div>
      </div>
    </div>
  </div>
  </div>
  <!-- <div>
    <ul>
      <li v-for="article in articles" :key="article.id">
        <a @click="goToDetail(article.id)">{{ article.title }}</a>
        <p>{{ article.short_description }}</p>
      </li>
    </ul>
  </div> -->
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import router from '../router';
const route = useRoute();
const articles = ref([]);

// Hàm gọi API
const fetchArticles = (category) => {
  axios
    .get(`http://localhost:8082/Backend_new/BackEnd/listArticle/${category}`)
    .then((response) => {
      articles.value = response.data.articles;
    })
    .catch((error) => {
      console.error("Error fetching articles:", error);
    });
};

// Gọi API khi component được render
onMounted(() => {
  fetchArticles(route.params.category);
});

// Theo dõi khi URL thay đổi
watch(
  () => route.params.category,
  (newCategory) => {
    fetchArticles(newCategory);
  }
);

const goToDetail = (id) => {
  // Điều hướng đến route chi tiết
  router.push({ name: 'article-detail', params: { id: id } });
};
</script>

<style scoped>
/* Style nếu cần */
.custom {
  margin-bottom: 100px;
}
</style>
