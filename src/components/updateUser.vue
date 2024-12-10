<template>
  <div class="post-management">
    <div class="row">
      <div class="col-lg-12">
        <div class="heading-title text-center custom">
          <h2>Thông tin cá nhân</h2>
        </div>
      </div>
    </div>
    <!-- Hero Start -->
    <div class="row">
      <div class="col-lg-12">
        <form
          id="contactForm"
          class="custom-form"
          
          enctype="multipart/form-data"
        >
            <div class="col-md-12">
              <div class="form-group">
                <label>Tên đăng nhập:</label>
                <input
  type="text"
  v-model="user.userName"
  class="form-control"
  id="userName"
  :name="'userName'"
  placeholder="Username"
  required
  data-error="Please enter username"
  disabled
/>

                <div class="help-block with-errors"></div>
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <label>Họ và tên:</label>
                <input
  type="text"
  v-model="user.fullname"
  class="form-control"
  id="fullname"
  :name="'fullname'"
  placeholder="Fullname"
  required
  data-error="Please enter fullname"
/>
                
                <div class="help-block with-errors"></div>
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <label>Mật khẩu:</label>                
                <input
  type="text"
  v-model="user.pass"
  class="form-control"
  id="pass"
  :name="'pass'"
  placeholder="Password"
  required
  data-error="Please enter password"
/>
                <div class="help-block with-errors"></div>
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <label>Ảnh đại diện:</label>
                <input
                  type="file"
                  @change="onFileChange"
                  class="form-control"
                  id="vatar"
                  ref="fileInput"
                  name="avatar"
                />
                <div class="help-block with-errors"></div>
              </div>
              <div v-if="user.avatar">
                <!-- <img :src="`/avatar/${user.avatar}`" alt="Image" style="width:100%" /> -->
        <img
          v-if="typeof user.avatar === 'string'"
          :src="`/${user.avatar}`"
          alt="Current image"
          style="width:50%;height:50%"
        />
      </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <label>Email:</label>                
                <input
  type="text"
  v-model="user.email"
  class="form-control"
  id="email"
  :name="'email'"
  placeholder="Email"
  required
  data-error="Please enter email"
/>
                <div class="help-block with-errors"></div>
              </div>
            </div>

            <div class="submit-button text-center">



<button type="button" class="btn btn-common" @click.prevent="updateuser">
              Update
            </button>

              <div id="msgSubmit" class="h3 text-center hidden"></div>
              <div class="clearfix"></div>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name:"updateUser",
}
</script>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter để xử lý điều hướng

const router = useRouter(); // Khởi tạo router

const user = ref({
  userName: '',
  pass: '',
  fullname: '',
  role: false,
  email: '',
  avatar: '',
});

const fileInput = ref(null);
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    user.value.avatar = file;
  } else {
    alert("Invalid file type. Please upload an image.");
  }
};

const updateuser = () => {
  const formData = new FormData();

  for (const key in user.value) {
    if (user.value[key] !== null) {
      formData.append(key, user.value[key]);
    }
  }

  axios
    .post("http://localhost:8082/Backend_new/BackEnd/user/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      alert('Cập nhật thành công!');
      console.log("Update successful:", response.data);
      router.push({ name: 'Home' }); // Sử dụng router thay cho this.$router
    })
    .catch((error) => {
      console.error("Error updating user:", error);
      alert('Cập nhật thất bại: ' + error.message); // Sửa this.error thành error.message
    });
};

onMounted(() => {
  axios
    .get("http://localhost:8082/Backend_new/BackEnd/user/update")
    .then((response) => {
      user.value = response.data.user;
      console.log("User data:", user.value);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
});
</script>


<style scoped>
.post-management {
  display: flex;
  flex-direction: column;
  align-items: center; /* Canh giữa nội dung */
  padding: 20px; /* Khoảng cách xung quanh */
}
.custom {
  margin-top: 120px;
  margin-bottom: 20px;
}
.custom h2 {
  font-size: 40px;
}

.custom-form {
  padding: 50px;
  padding-top: 0;
  padding-bottom: 0;
}

.custom-form label {
  font-size: 20px;
  color: black;
  font-family: "Arbutus Slab", serif;
}


.submit-button {
  display: inline-block;
  width: 100%;
  text-align: center; /* Căn giữa nội dung */
  padding-top: 20px;
}

.submit-button .btn {
  margin-right: 5px; /* Khoảng cách giữa các nút */
}

form {
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>