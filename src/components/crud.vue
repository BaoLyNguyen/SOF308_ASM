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
          method="post"
          enctype="multipart/form-data"
        >
          <div class="row">
            <input
              type="hidden"
              value="${item.idNews}"
              name="idNews"
              readonly
            />
            <div class="col-md-12">
              <div class="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  name="title"
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
                  name="category"
                  required
                  data-error="Please Select Category"
                >
                  <option disabled selected>Please Select Person*</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <!-- <c:forEach var="b" items="${dsca}" varStatus="vs">
            <option value="${b.id}" ${b.id == item.categoryId ? 'selected' : ''}>${b.name}</option>
        </c:forEach> -->
                </select>
                <div class="help-block with-errors"></div>
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <label>Content:</label>
                <textarea
                  class="form-control"
                  id="content"
                  placeholder="Content*"
                  rows="4"
                  data-error="Write Content"
                  required
                ></textarea>
                <!-- <textarea rows="10" cols="40" required name="content">${item.content}</textarea> -->
                <div class="help-block with-errors"></div>
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <label>Image:</label>
                <input
                  type="file"
                  class="form-control"
                  id="image"
                  name="image"
                  placeholder="Image"
                  data-error="Please enter image"
                />
                <div class="help-block with-errors"></div>
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    class="form-control small-checkbox"
                    name="home"
                    value="true"
                  />
                  Post to the front page?</label
                >
                <!-- <label>
	<input type="checkbox" class="form-check-input" name="home" value="true" ${item.home ? 'checked' : ''}>
    &emsp;Đăng bài lên trang nhất?</label> -->
                <div class="help-block with-errors"></div>
              </div>
            </div>

            <div class="submit-button text-center">
              <button class="btn btn-common" formaction="${path}/create">
                Add
              </button>
              <button class="btn btn-common" formaction="${path}/update">
                Edit
              </button>
              <button class="btn btn-common" formaction="${path}/delete">
                Delete
              </button>
              <button class="btn btn-common" formaction="${path}/reset">
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
          <th>Author</th>
          <th>Category</th>
          <th>Front page?</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td><a href="${path}/edit/${a.idNews}" class="edit-link">Edit</a></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td><a href="${path}/edit/${a.idNews}" class="edit-link">Edit</a></td>
        </tr>
        <!-- <c:forEach var="a" items="${list}" varStatus="vs">
            <tr>
                <td>${vs.count}</td>
                <td>${a.idNews}</td>
                <td>${a.title}</td>
                <td>${a.postDate}</td>
                <td>${a.author}</td>
                <td>${a.viewCount}</td>
                <td><c:forEach var="b" items="${dsca}" varStatus="vs">
                <c:if test="${b.id == a.categoryId}">
                                ${b.name}
                            </c:if>     
        </c:forEach></td>
                <td>${a.home? "true":"false"}</td>
                <td><a href="${path}/edit/${a.idNews}" class="edit-link">Edit</a></td>
            </tr>
            </c:forEach> -->
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "postManagement",
};
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

.edit-link {
  color: black; /* Màu chữ cho link "Edit" */
  text-decoration: none; /* Loại bỏ gạch chân */
}

.edit-link:hover {
  color: #d0a772;
  text-decoration: underline !important; /* Gạch chân khi hover */
}
</style>
