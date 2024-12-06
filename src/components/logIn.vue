<template>
  <div class="post-management">
    <div :class="{ 'blur-background': showSignUp || showForgotPassword }">
      <!-- Form Login -->
      <div class="row">
        <div class="col-lg-12">
          <div class="heading-title text-center custom">
            <h2>Log In</h2>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="help-block ">{{ error }}</div>
          <form id="contactForm" class="custom-form" @submit.prevent="submitLogin">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Username:</label>
                  <input type="text" class="form-control" id="username" name="username" placeholder="Username" v-model="username" required data-error="Please enter username">
                  <div class="help-block with-errors"></div>
                </div>                                 
              </div>

              <div class="col-md-12">
                <div class="form-group">
                  <label>Password:</label>
                  <input type="password" class="form-control" id="password" name="password" placeholder="********"
                    v-model="password"
                    required data-error="Please enter password">
                </div>                                 
              </div>

              <div class="submit-button text-center">
                <button class="btn btn-common" type="submit">Log In</button>
              </div>  
            </div>
            <div class="no-account">
            <p>Don't have an account? &ensp;
              <a class="signup" @click="showSignUp = true">Sign Up</a>
            </p>
          </div>         
          </form>
          
        </div>
      </div>
    </div>

    <!-- Modal Sign Up -->
    <div v-if="showSignUp" class="modal-overlay">
      <div class="form-custom modal-content">
        <div>
          <button type="button" class="close" @click="showSignUp = false">&times;</button>
          <h4 align="center">Sign Up</h4>
        </div>
        <form id="contactForm" class="custom-form" @submit.prevent="submitSignUp">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label>Username:</label>
                <input type="text" class="form-control" placeholder="Username" v-model="signupUsername" required>
                <div class="help-block with-errors"></div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group">
                <label>Password:</label>
                <input type="password" class="form-control" placeholder="********" v-model="signupPassword" required>
              </div>                       
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <label>Fullname:</label>
                <input type="text" class="form-control" placeholder="Fullname" v-model="signupFullname" required>						
                <div class="help-block with-errors"></div>
              </div>
            </div>
              <div class="col-md-12">
              <div class="form-group">
                <label>Email:</label>
                <input type="email" class="form-control" placeholder="Email" v-model="signupEmail" required>
              </div>                       
            </div>
          </div>
          <div class="submit-button text-center">
            <button class="btn btn-common" type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
// import { ref } from 'vue';
export default {
  data() {
    return {
      username: "",
      password: "",
      signupUsername: "",
      signupPassword: "",
      signupFullname: "",
      signupEmail: "",
      error: "",
      showSignUp: false,
    };
  },
  methods: {
    submitLogin() {
  axios
    .post('http://localhost:8082/Backend_new/BackEnd/user/login', {
      userName: this.username,
      pass: this.password,
    })
    .then((response) => {
      // Xử lý thành công
      alert("Login successful");
      console.log(response.data); // Kiểm tra dữ liệu trả về
      // Reset các trường input
      this.username = "";
      this.password = "";
      this.error = ""; // Xóa lỗi trước đó
    })
    .catch((error) => {
      // Kiểm tra kỹ cấu trúc của error để tránh lỗi undefined
      if (error.response && error.response.data && error.response.data.error) {
        this.error = error.response.data.error; // Lưu lỗi từ server
        alert(this.error); // Hiển thị lỗi
      } else {
        // Lỗi không mong đợi
        this.error = "Login failed. Please check your username and password.";
        alert(this.error);
      }
    });
}

,
submitSignUp() {
  axios
    .post('http://localhost:8082/Backend_new/BackEnd/user/register', {
      userName: this.signupUsername,
      pass: this.signupPassword,
      fullname: this.signupFullname,
      email: this.signupEmail,
    })
    .then((response) => {
      alert(response.data.message); // Hiển thị thông báo thành công
      this.showSignUp = false; // Đóng modal đăng ký
      // Reset các trường input
      this.signupUsername = "";
      this.signupPassword = "";
      this.signupFullname = "";
      this.signupEmail = "";
      this.error = ""; // Xóa lỗi trước đó
    })
    .catch((error) => {
      // Kiểm tra kỹ cấu trúc của error để tránh lỗi undefined
      if (error.response && error.response.data && error.response.data.error) {
        this.error = error.response.data.error; // Lưu lỗi vào biến error
        alert(this.error); // Hiển thị lỗi
      } else {
        // Lỗi không mong đợi
        this.error = "Registration failed. Please try again.";
        alert(this.error);
      }
    });
}

  },
  name: "loginPage",
};
</script>

<style scoped>
.post-management {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.custom {
  margin-top: 120px;
  margin-bottom: 20px;
}

.custom h2 {
  font-size: 40px;
}

.custom-form {
  max-width: 500px;
  padding: 50px;
  padding-top: 0;
  padding-bottom: 0;
}

.custom-form label {
    font-size: 20px;
    color: black;
    font-family: "Arbutus Slab", serif;
  }
  
  .checkbox-label {
    display: inline-flex;
    align-items: center; /* Căn giữa checkbox với văn bản */
    gap: 8px; /* Khoảng cách giữa checkbox và văn bản */
  }
  
  .submit-button {
    display: inline-block;
    width: 100%;
    text-align: center; /* Căn giữa nội dung */
    margin-top: 10px;
  }
  
  .btn {
    margin-bottom: 10px;
  }
  
  form {
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  

.blur-background {
  filter: blur(5px);
  pointer-events: none; /* Disable interaction with the background when modal is open */
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: flex-start; /* Đặt modal bắt đầu từ trên */
  align-items: center;
  justify-content: center;
  padding-top: 50px; /* Khoảng cách từ trên cùng */
  z-index: 1000;
  overflow-y: auto; /* Bật cuộn nếu modal quá cao */
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  height: auto; /* Tự động điều chỉnh theo nội dung */
  position: relative;
}

.modal-content .close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  background-color: red;
  border: 1px solid red;
  border-radius: 3px;
  padding: 2px 5px;
  font-size: 24px;
  color: white;
  cursor: pointer;
}

.form-custom h4{
    font-family: "Arbutus Slab", serif;
    padding-bottom: 10px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 40px;
  }

  .no-account{
    font-size: 20px;
    margin-top:10px;
text-align: center;
  }

  .no-account p a{
    color: #d0a772;
  }

  .no-account p a:hover{
    color: red;
    text-decoration: underline !important;
  }
</style>
