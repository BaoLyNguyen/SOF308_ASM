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
        <div class="col-6 ">
          <div class="blog-inner-details-page">
            <div class="blog-inner-box">
              <div class="side-blog-img">
                <img
                  :src="`/${article.images}`"
                  class="rounded mx-auto d-block"
                  alt="Image" style="height: 400px; padding-top: 30px;"
                />
              </div>
              
            </div>
            
          </div>
        </div>
        <div class="col-6 ">
          <div class="blog-inner-details-page">
            <div class="blog-inner-box"></div>
        <div class="inner-blog-detail details-page">
                <h3>{{ article.title }}</h3>
                <p v-html="article.content"></p>
              </div>
          </div>
        </div>
        <div class="blog-comment-box">
              <h3>Bình luận<span v-if="comments.length > 0">({{ comments.length }})</span></h3>
              <div
                v-for="comment in comments"
                :key="comment.id"
                class="comment-item"
              >
                <div class="comment-item-left">
                  <img class="rounded-circle" style="width:100%;height:100%;" :src="`http://localhost:8080/${comment.user.avatar}`" alt="Avatar" />

                </div>
                <div class="comment-item-right">
                  <div class="pull-left">
                    <a>{{ comment.user.fullname }}</a>
                  </div>
                  <div class="pull-right">
                    <i class="fa fa-clock-o" aria-hidden="true"></i>
                    {{ formatCommentDateUTC(comment.dateCmt) }}
                  </div>
                  <div class="des-l">
                    <p>{{ comment.content }}</p>
                  </div>
                </div>
              </div>

              <div class="comment-respond-box" v-if="isAuthenticated">
                <h3>Gửi bình luận</h3>
                <div class="comment-respond-form ">
                  <form
                    id="commentrespondform"
                    class="comment-form-respond row"
                    @submit.prevent="submitComment"
                  >
                  <div class="col-lg-12 col-md-12 col-sm-12 d-flex align-items-center">
  <input 
    type="text" 
    class="form-control me-2" 
    v-model="commentText" 
    placeholder="Your Message"
  />
  <button class="btn btn-submit" type="submit">
    Gửi
  </button>
</div>

                  </form>
                </div>
              </div>
              <div v-else>
                <p>Bạn phải <a href="/login">đăng nhập</a> mới được bình luận.</p>
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
            <p class="lead">+01 123-456-4590</p>
          </div>
        </div>
        <div class="col-md-4">
          <i class="fa fa-envelope"></i>
          <div class="overflow-hidden">
            <h4>Email</h4>
            <p class="lead">yourmail@gmail.com</p>
          </div>
        </div>
        <div class="col-md-4">
          <i class="fa fa-map-marker"></i>
          <div class="overflow-hidden">
            <h4>Location</h4>
            <p class="lead">800, Lorem Street, US</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Contact info -->
</template>

<script>
export default {
  name: "deTail",
};
</script>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const article = ref({});
const comments = ref([]);
const commentText = ref("");
const isAuthenticated = ref(false); // Kiểm tra người dùng đã đăng nhập hay chưa

// Lấy thông tin bài viết và bình luận từ API khi component được khởi tạo
onMounted(() => {
  const articleId = route.params.id; // Lấy ID từ URL
  console.log("Article ID from route:", route.params.id);

  fetchArticleDetail(articleId);
  checkAuthentication(); // Kiểm tra đăng nhập khi component được khởi tạo
});

// Lấy chi tiết bài viết và bình luận từ API
const fetchArticleDetail = (id) => {
  axios
    .get(`http://localhost:8082/Backend_new/BackEnd/detail/${id}`)
    .then((response) => {
      article.value = response.data.article;
      comments.value = response.data.comments;
    })
    .catch((error) => {
      console.error("Error fetching article details:", error);
    });
};

// Kiểm tra tình trạng đăng nhập
const checkAuthentication = () => {
  axios
    .get("http://localhost:8082/Backend_new/BackEnd/user/check-login")
    .then((response) => {
      isAuthenticated.value = response.data.isAuthenticated;
      console.log("kết quả: " + isAuthenticated.value);
    })
    .catch((error) => {
      console.error("Error checking authentication:", error);
    });
};


// Gửi bình luận
// Gửi bình luận
const submitComment = () => {
    if (!commentText.value || !route.params.id) {
        console.error("Content or article ID is missing!");
        return;
    }

    axios.post(`http://localhost:8082/Backend_new/BackEnd/detail/${route.params.id}`, {
    content: commentText.value,
}, {
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    console.log('Comment submitted successfully:', response.data);
    commentText.value = "";
    fetchArticleDetail(route.params.id); // Tải lại danh sách bình luận
})
.catch(error => {
    console.error('Error submitting comment:', error);
});

};

const formatCommentDateUTC = (dateString) => {
      // Chuyển đổi ngày thành UTC và định dạng
      const date = new Date(dateString);
  const formattedDate = date.toLocaleString("vi-VN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Ho_Chi_Minh",
    timeZoneName: "short",
  }).replace(/\s*GMT\+7\s*/, '');
  
  // Thêm khoảng trắng giữa giờ và ngày
  return formattedDate.replace(/(\d{2}:\d{2})(\d{1,2})/, '$1 $2');
    }
 


</script>

<style scoped>
.side-blog-img {
  box-shadow: none !important;;

}

.heading-title {
margin-bottom: 0px;
}

.blog-box {
padding-top: 10px;
}

.inner-blog-detail {
padding-top: 0px;
}

input{
  width:80%;
}


.d-flex {
  display: flex;
  align-items: center;
}

.me-2 {
  margin-right: 8px; /* Tạo khoảng cách giữa input và button */
}

.form-control {
  flex: 1; /* Để input chiếm toàn bộ không gian còn lại */
}

.btn-submit {
  flex-shrink: 0; /* Đảm bảo button không bị thu nhỏ */
}

</style>
