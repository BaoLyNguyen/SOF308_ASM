<template>
  <div class="post-management">
    <div class="row">
      <div class="col-lg-12">
        <div class="heading-title text-center custom">
          <h2>Post Management</h2>
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
          <div class="row">
            <input
              type="hidden"
              v-model="article.id"
              name="id"
              readonly
            />
            <div class="col-md-12">
              <div class="form-group">
                <label>Title:</label>
                <input
  type="text"
  v-model="article.title"
  class="form-control"
  id="title"
  :name="'title'"
  placeholder="Title"
  required
  data-error="Please enter title"
/>

                <div class="help-block with-errors"></div>
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <label>Category:</label>
                <select
                  class="custom-select d-block form-control"
                  id="category"
                  v-model="article.category"
                  name="category"
                  required
                  data-error="Please Select Category"
                >
                  <option v-for="category in categories" :key="category.name" :value="category.name">
                    {{ category.name }}
                  </option>
                </select>
                <div class="help-block with-errors"></div>
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <label>Content:</label>                
                <textarea
                  class="form-control"
                  v-model="article.content"
                  id="content"
                  placeholder="Content*"
                  rows="4"
                  data-error="Write Content"
                  required
                ></textarea>
                <div class="help-block with-errors"></div>
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <label>Image:</label>
                <input
                  type="file"
                  @change="onFileChange"
                  class="form-control"
                  id="images"
                  ref="fileInput"
                  name="images"
                />
                <div class="help-block with-errors"></div>
              </div>
              <div v-if="article.images">
                <!-- <img :src="`/images/${article.images}`" alt="Image" style="width:100%" /> -->
        <img
          v-if="typeof article.images === 'string'"
          :src="`/${article.images}`"
          alt="Current image"
          style="width:50%;"
        />
      </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    v-model="article.home"
                    class="form-control small-checkbox"
                    name="home"
                    value="true"
                  />
                  Post to the front page?</label>
                <div class="help-block with-errors"></div>
              </div>
            </div>

            <div class="submit-button text-center">

              <button type="button" class="btn btn-common" @click.prevent="createArticle">
              Add
            </button>


<button type="button" class="btn btn-common" @click.prevent="updateArticle">
              Update
            </button>

<button type="button" class="btn btn-common" @click.prevent="deleteArticle">
  Delete
</button>
<button type="button" class="btn btn-common" @click.prevent="resetArticle">
  Reset
</button>

              <div id="msgSubmit" class="h3 text-center hidden"></div>
              <div class="clearfix"></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="table-all">
    <div class="heading-title text-center custom-table">
      <h2>Post List</h2>
    </div>
    <table>
      <thead>
        <tr>
          <th>STT</th>
          <th>Title</th>
          <th>Posted Date</th>
          <th>Category</th>
          <th>Front page?</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(a,index) in articles" :key="a.id">
          <td>{{ index+1 }}</td>
          <td>{{a.title}}</td>
          <td>{{a.postedDate}}</td>
          <td>{{a.category}}</td>
          <td>{{ a.home ? "Có" : "Không" }}</td>
          <td>
            <button class="btn btn-common" @click="editArticle(a.id)">
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "postManagement",
};
</script>
<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const articles = ref([]);
const categories = ref([]);
const article = ref({
  id: '',
  title: '',
  content: '',
  category: '',
  images: null, // Khởi tạo giá trị là null, khi chọn file sẽ lưu trữ file ở đây
  home: false,
});

const isEditing = ref(false);
const fileInput = ref(null); 
const onFileChange = (event) => {
  const file = event.target.files[0]; // Chọn file từ input
  if (file) {
    article.value.images = file; // Lưu file vào article.image
  }
};

const getPosts = () => {
  axios
    .get('http://localhost:8082/Backend_new/BackEnd/crud_article')
    .then((response) => {
      articles.value = response.data.articles;
      categories.value = response.data.categories;
    })
    .catch((error) => {
      console.log(error);
    });
};

const createArticle = () => {
  const formData = new FormData();
  for (const key in article.value) {
    // eslint-disable-next-line no-prototype-builtins
    if (article.value.hasOwnProperty(key)) {
      formData.append(key, article.value[key]);
    }
  }
  if (article.value.images) {
    formData.append('images', article.value.images); // Sử dụng article.image trực tiếp
  }
  console.log('Before request:', article.value);
  axios
    .post('http://localhost:8082/Backend_new/BackEnd/crud_article/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((response) => {
      console.log('Response:', response);
      getPosts();
      resetArticle();
    })
    .catch((error) => {
      console.error('Error details:', error.response?.data || error.message);
    });
};


const updateArticle = () => {

  console.log('Data before sending to server:', article.value); // Kiểm tra dữ liệu gửi đi
  // eslint-disable-next-line no-debugger
  debugger;
  const formData = new FormData();
  for (const key in article.value) {
    // eslint-disable-next-line no-prototype-builtins
    if (article.value.hasOwnProperty(key)) {
      formData.append(key, article.value[key]);
    }
  }
  if (article.value.images) {
    formData.append('images', article.value.images);
  }

  axios
    .post('http://localhost:8082/Backend_new/BackEnd/crud_article/update', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((response) => {
      console.log('Response from update:', response);
      getPosts(); // Reload data
      resetArticle(); // Reset form
    })
    .catch((error) => {
      console.log('Error when updating article:', error);
    });
};



const deleteArticle = () => {
  console.log('Data before sending to server:', article.value);
  
  // Sử dụng axios.delete với ID bài viết trong URL
  axios
    .delete(`http://localhost:8082/Backend_new/BackEnd/crud_article/delete/${article.value.id}`)
    .then((response) => {
      console.log(response.data.message);  // Hiển thị thông báo thành công từ server
      getPosts();  // Tải lại danh sách bài viết
      resetArticle();  // Đặt lại form
    })
    .catch((error) => {
      console.log('Error deleting article:', error);
    });
};


const editArticle = (id) => {
  axios
    .get(`http://localhost:8082/Backend_new/BackEnd/crud_article/edit/${id}`)
    .then((response) => {
      article.value = response.data.article;
      console.log(article.value);
    fileInput.value = article.value.images; 
      isEditing.value = true;
    })
    .catch((error) => {
      console.log(error);
    });
};

const resetArticle = () => {
  article.value = {
    id: '',
    title: '',
    content: '',
    category: '',
    images: null,  // Reset lại giá trị image thành null
    home: false,
  };
  // Reset giá trị input file
  if (fileInput.value) {
    fileInput.value.value = ''; // Reset input file
  }
  isEditing.value = false;
};


onMounted(() => {
  getPosts();
});
</script>



<style scoped>
.custom {
  margin-top: 120px;
  margin-bottom: 20px;
}
.custom h2 {
  font-size: 40px;
}
.post-management {
  display: flex;
  flex-direction: column;
  align-items: center; /* Canh giữa nội dung */
  padding: 20px; /* Khoảng cách xung quanh */
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

.checkbox-label {
  display: inline-flex;
  align-items: center; /* Căn giữa checkbox với văn bản */
  gap: 8px; /* Khoảng cách giữa checkbox và văn bản */
}

.small-checkbox {
  width: auto;
  transform: scale(2); /* Thu nhỏ checkbox */
  margin-right: 5px; /* Khoảng cách bên phải checkbox */
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

.table-all {
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 20px;
}

.custom-table {
  margin-top: 10px;
  margin-bottom: 0;
}

.custom-table h2 {
  font-size: 40px;
}

table {
  width: 99%;
  border-collapse: collapse; /* Loại bỏ khoảng cách giữa các ô */
  margin: 5px;
}

th,
td {
  text-align: center; /* Căn giữa chữ trong ô */
  padding: 12px; /* Khoảng cách bên trong ô */
  font-size: 16px; /* Đặt kích thước chữ lớn hơn */
  border: 1px solid white;
}

th {
  background-color: #d0a772; /* Màu nền cho header */
  color: white;
  font-weight: bold; /* Chữ đậm cho header */
  font-size: 18px; /* Kích thước chữ lớn hơn cho header */
}

td {
  font-size: 16px; /* Kích thước chữ cho nội dung bảng */
}

/* tbody tr:nth-child(even) {
  background-color: white;
}

tbody tr:nth-child(odd) {
  background-color: rgba(0, 0, 0, 0.087);
} */

tbody tr {
  background-color: rgba(0, 0, 0, 0.087);
}

</style>
