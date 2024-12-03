<template>
    <div class="container mx-auto p-2 row">
     <div class="col-6">
      <h2 class="mb-4">Quản lý Học sinh</h2>
       <!-- Form thêm sinh viên mới -->
      <form class="" @submit.prevent="submitForm">
          <h3 class="mb-4 text-success text-align">Thêm học sinh</h3>
          <div class="form-group">
              <label for="name">Họ tên</label>
              <input type="text"
              v-model="student.name"
              class="form-control"
              id="name" required/>
          </div>
          <div class="form-group">
              <label for="score">Điểm</label>
              <input type="number" v-model="student.score" id="score" class="form-control" required/>
          </div>
          <div class="form-group">
              <label for="dob">Ngày sinh</label>
              <input type="date"  v-model="student.dob" id="dob" class="form-control" required/>
          </div>
          <button type="submit" class="btn btn-primary mt-2">{{ isEditing ? 'Cập nhật' : 'Thêm' }}</button>
      </form>
     </div>
     <div class="col-6">
      <h3 class="mb-4">Danh Sách Học sinh</h3>
      <table class="table table-hover">
          <thead>
              <tr>
                  <th>Họ và tên</th>
                  <th>Điểm</th>
                  <th>Ngày sinh</th>
                  <th></th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(stu,index) in students" :key="index">
                  <td>{{ stu.name }}</td>
                  <td>{{ stu.score }}</td>
                  <td>{{ stu.dob }}</td>
                  <td>
                      <button class="btn btn-warning" @click="editStudent(index)">Sửa</button>
                  </td>
                  <td>
                      <button class="btn btn-danger" @click="deleteStudent(index)">Xóa</button>
                  </td>
              </tr>
          </tbody>
      </table>
     </div>
  </div>
  
  </template>
  
  <script>
  export default {
      name:"Lab6Bai4",
  }
  </script>
  <script setup>
      import {ref} from 'vue'
  
      const students = ref([
          {name:'Nguyễn Chí Hùng',score:9.0, dob:'2002-02-12'},
          {name:'Trương Mỹ Linh', score:8.0,dob:'2001-03-15'}
      ])
  
      const student = ref({
          name: '',
          score:null,
          dob: ''
      })
  
      let isEditing=ref(false)
      let editingIndex = ref(null)
  
      function submitForm(){
          if (isEditing.value){
  //cập nhật thông tin, {..stu.value} sẽ tạo 1 bản sao
              students.value[editingIndex.value]={...student.value}
              isEditing.value=false
              editingIndex.value=null
          }
          else {
              //thêm hs mới
              students.value.push({...student.value})
          }
          resetForm()
      }
  
      function editStudent(index){
          student.value={...students.value[index]}
          isEditing.value=true
          editingIndex.value=index
      }
  
      function deleteStudent(index){
          students.value.splice(index,1)
      }
  
      function resetForm(){
          student.value={
              name:'',
          score:null,
          dob:''
          }
      }
  </script>
  
  <style scoped>
    .container{
        background-color: rgb(243, 243, 243);
    }
    form{
        background-color: white;
    }
  
  </style>