<template>
    <div id="slides" class="cover-slides">
      <ul class="slides-container">
        <li class="text-center" v-for="(slide, index) in slides" :key="index">
          <img :src="slide.image" alt="">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <h1 class="m-b-20"><strong>Chào mừng đến với <br> Yamifood Restaurant</strong></h1>
                <p class="m-b-40">Xem cách người dùng trải nghiệm trang web của bạn theo thời gian thực hoặc xem xu hướng để thấy sự thay đổi trong hiệu suất.</p>
                <!-- <p><a class="btn btn-lg btn-circle btn-outline-new-white" href="#">Đặt bàn</a></p> -->
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="slides-navigation">
        <a href="#" class="next"><i class="fa fa-angle-right" aria-hidden="true"></i></a>
        <a href="#" class="prev"><i class="fa fa-angle-left" aria-hidden="true"></i></a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name:'slideShow',
    data() {
      return {
        slides: [
          { image: '/images/slider-01.jpg' },
          { image: '/images/slider-02.jpg' },
          { image: '/images/slider-03.jpg' }
        ]
      };
    },
    mounted() {
  // Kiểm tra xem jQuery đã được tải chưa
  if (window.$) {
    // Khởi tạo SuperSlides sau khi DOM được tải
    window.$('#slides').superslides({
      play: 5000, // Chuyển slide mỗi 5 giây
      animation: 'fade'
    });
  } else {
    console.error("jQuery chưa được tải");
  }
}

  };
  </script>
  
  <style scoped>
  /* Thêm các style cần thiết cho slideshow ở đây */
  </style>
  