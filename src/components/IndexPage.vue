<template>
  <!-- Start slides -->
	<Slideshow />
	<!-- End slides -->
	
	<!-- Start About -->
	<div class="about-section-box">
		<div class="container">
			<div class="row">
				<div class="col-lg-6 col-md-6 col-sm-12">
					<img src="images/about-img.jpg" alt="" class="img-fluid">
				</div>
				<div class="col-lg-6 col-md-6 col-sm-12 text-center">
					<div class="inner-column">
						<h1>Welcome To <span>Resto</span></h1>
						<h4>Little Story</h4>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque auctor suscipit feugiat. Ut at pellentesque ante, sed convallis arcu. Nullam facilisis, eros in eleifend luctus, odio ante sodales augue, eget lacinia lectus erat et sem. </p>
						<p>Sed semper orci sit amet porta placerat. Etiam quis finibus eros. Sed aliquam metus lorem, a pellentesque tellus pretium a. Nulla placerat elit in justo vestibulum, et maximus sem pulvinar.</p>
						<!-- <a class="btn btn-lg btn-circle btn-outline-new-white" href="#">Reservation</a> -->
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
					<p class="lead ">
						" If you're not the one cooking, stay out of the way and compliment the chef. "
					</p>
					<span class="lead">Michael Strahan</span>
				</div>
			</div>
		</div>
	</div>
	<!-- End QT -->
	
	<!-- Start Menu -->
	<div class="menu-box">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<div class="heading-title text-center">
						<h2>Special cooking recipes</h2>
					</div>
				</div>
			</div>
				
			<div class="row special-list">
				<div v-for="(a) in articles" :key="a.id" class="col-lg-4 col-md-6 special-grid drinks">
					<div class="gallery-single fix">
						<img :src="`/${a.images}`" class="img-fluid" alt="Image" style="height: 510px;;">
						<div class="why-text d-flex align-items-center justify-content-center ">
							<h4 class="">{{a.title}}</h4>
							<button @click="goToDetail(a.id)" class="btn btn-lg btn-circle btn-outline-new-white">Xem thêm</button>
						</div>
					</div>
				</div>
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
						<p class="lead">
							0901 943 596
						</p>
					</div>
				</div>
				<div class="col-md-4">
					<i class="fa fa-envelope"></i>
					<div class="overflow-hidden">
						<h4>Email</h4>
						<p class="lead">
							lyntbpy00011@gmail.com
						</p>
					</div>
				</div>
				<div class="col-md-4">
					<i class="fa fa-map-marker"></i>
					<div class="overflow-hidden">
						<h4>Location</h4>
						<p class="lead">
							Quy Nhon, Binh Dinh, Viet Nam
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- End Contact info -->
   
</template>

<script>
import Slideshow from './slideshow.vue';

export default {
  name: 'IndexPage',
  components:{
    Slideshow,
  }
};
</script>
<script setup>
import axios from 'axios';
import { ref } from 'vue';
import router from '../router'; // Đường dẫn chính xác tới file router/index.js

const articles = ref([]);

// const isEditing = ref(false);
// const fileInput = ref(null); 
// const onFileChange = (event) => {
//   const file = event.target.files[0]; // Chọn file từ input
//   if (file) {
//     article.value.images = file; // Lưu file vào article.image
//   }
// };

const getPosts = () => {
  axios
    .get('http://localhost:8082/Backend_new/BackEnd/index')
    .then((response) => {
      articles.value = response.data.articles;
    })
    .catch((error) => {
      console.log(error);
    });
};
const goToDetail = (id) => {
  // Điều hướng đến route chi tiết
  router.push({ name: 'article-detail', params: { id: id } });
};

getPosts();
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
