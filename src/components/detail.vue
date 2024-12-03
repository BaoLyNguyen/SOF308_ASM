<template>
    <!-- Start All Pages -->
	<div class="all-page-title page-breadcrumb">
		<div class="container text-center">
			<div class="row">
				<div class="col-lg-12">
					<h1>Blog</h1>
				</div>
			</div>
		</div>
	</div>
	<!-- End All Pages -->
	
	<!-- Start blog details -->
		<div class="blog-box">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<div class="heading-title text-center">
						<h2>{{ article.title }}</h2>
					</div>
				</div>
			</div>
        <div class="row">
          <div class="col-12 mx-auto">
            <div class="blog-inner-details-page">
              <div class="blog-inner-box">
                <div class="side-blog-img">
                  <img :src="`/${article.images}`" class="img-fluid" alt="Image">
                </div>
                <div class="inner-blog-detail details-page">
                  <h3>{{ article.title }}</h3>
                  <p>{{ article.content }}</p>
                </div>
              </div>
						<div   class="blog-comment-box">
							<h3>Comments</h3>
							<div v-for="comment in comments" :key="comment.id" class="comment-item">
    <div class="comment-item-left">
      <img :src="comment.user.avatar" alt="Avatar">
    </div>
    <div class="comment-item-right">
      <div class="pull-left">
        <a>{{ comment.user.fullname }}</a>
      </div>
      <div class="pull-right">
        <i class="fa fa-clock-o" aria-hidden="true"></i> {{ comment.dateCmt }}
      </div>
      <div class="des-l">
        <p>{{ comment.content }}</p>
      </div>
    </div>
  </div>
							
						<div class="comment-respond-box">
							<h3>Leave your comment </h3>
							<div class="comment-respond-form">
								<form id="commentrespondform" class="comment-form-respond row" method="post">
									<div class="col-lg-6 col-md-6 col-sm-6">
										<div class="form-group">
											<textarea class="form-control" id="textarea_com" placeholder="Your Message" rows="2"></textarea>
										</div>
									</div>
									<div class="col-lg-12 col-md-12 col-sm-12">
										<button class="btn btn-submit">Submit comment</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			
	</div>
			
			</div>
		</div>
	</div>
	<!-- End details -->
	
	<!-- Start Contact info -->
	<div class="contact-imfo-box">
		<div class="container">
			<div class="row">
				<div class="col-md-4">
					<i class="fa fa-volume-control-phone"></i>
					<div class="overflow-hidden">
						<h4>Phone</h4>
						<p class="lead">
							+01 123-456-4590
						</p>
					</div>
				</div>
				<div class="col-md-4">
					<i class="fa fa-envelope"></i>
					<div class="overflow-hidden">
						<h4>Email</h4>
						<p class="lead">
							yourmail@gmail.com
						</p>
					</div>
				</div>
				<div class="col-md-4">
					<i class="fa fa-map-marker"></i>
					<div class="overflow-hidden">
						<h4>Location</h4>
						<p class="lead">
							800, Lorem Street, US
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- End Contact info -->
</template>

<script>
export default {
    name:'deTail',
}
</script>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const article = ref({});
const comments = ref([]);

// Lấy thông tin bài viết và bình luận từ API khi component được khởi tạo
onMounted(() => {
  const articleId = route.params.id; // Lấy ID từ URL
  fetchArticleDetail(articleId);
});

const fetchArticleDetail = (id) => {
  axios
    .get(`http://localhost:8082/Backend_new/BackEnd/detail/${id}`)
    .then((response) => {
      article.value = response.data.article;
      comments.value = response.data.comments;
    })
    .catch((error) => {
      console.error('Error fetching article details:', error);
    });
};
</script>

<style>

</style>