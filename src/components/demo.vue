<template>
  <div class="mt-5">
    
    <h1>Danh Sách Người Dùng</h1>
    <table border='1'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Họ và Tên</th>
          <th>Email</th>
          <th>Quyền Admin</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.fullname }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.admin ? "Có" : "Không" }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="getPosts">button</button>
  </div>
  
</template>

<script>
export default {
    name:"deMo",
}
</script>

<script setup>
import {ref } from 'vue';
const users = ref();
//function;
const getPosts = () =>{
// Make a request for a user with a given ID
// eslint-disable-next-line no-undef
axios
  .get('http://localhost:8082/PY00011_LAB3_LAB4_LAB5/ketNoi')
  .then((response) => {
    // handle success
    users.value = response.data;
  })
  .catch((error) => {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

};
</script>

<style>

</style>