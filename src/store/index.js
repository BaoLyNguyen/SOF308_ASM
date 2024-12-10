import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: null, // Thông tin người dùng
    isAdmin: false, // Xác định quyền admin
  },
  mutations: {
    setUser(state, user) {
        console.log('User set in Vuex:', user);
        console.log('All properties of user:', user);
      
        // Nếu user được lồng trong một object, lấy ra đúng dữ liệu
        const actualUser = user?.user || user; // Kiểm tra nếu user có cấp lồng
        console.log('Actual user object:', actualUser);
        console.log('Role value in actualUser:', actualUser?.role);
      
        // Cập nhật state.user và isAdmin
        state.user = actualUser;
        state.isAdmin = actualUser?.role === true; // Xác định quyền admin
        console.log('isAdmin set to:', state.isAdmin);
      },
      
    logout(state) {
      state.user = null;
      state.isAdmin = false;
      localStorage.removeItem('user'); // Xóa thông tin user trong localStorage
    },
  },
  actions: {
    login({ commit }, { userName, pass }) {
      // Kiểm tra nếu đã có user trong localStorage
      const storedUser = JSON.parse(localStorage.getItem('user'));
      console.log('User from localStorage:', storedUser);

      if (storedUser) {
        // Kiểm tra nếu user có thông tin hợp lệ
        if (storedUser.userName === userName && storedUser.pass === pass) {
          commit('setUser', storedUser); // Nếu có, cập nhật trạng thái ngay
          return Promise.resolve(storedUser); // Trả về user đã lưu
        } else {
          return Promise.reject(new Error("Thông tin người dùng không hợp lệ"));
        }
      }

      // Gửi yêu cầu đăng nhập nếu không có storedUser
      return axios
        .post('http://localhost:8082/Backend_new/BackEnd/user/login', {
          userName: userName,
          pass: pass,
        })
        .then((response) => {
          console.log('Response data:', response.data);
          if (response.data) {
            const user = response.data; // API trả về thông tin user
            localStorage.setItem('user', JSON.stringify(user)); // Lưu vào localStorage
            console.log('User stored in localStorage:', JSON.parse(localStorage.getItem('user')));
            console.log('User before commit to Vuex:', user);
            commit('setUser', user); // Cập nhật Vuex store
            return response;
          } else {
            throw new Error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
          }
        })
        .catch((error) => {
          console.error('Login failed:', error.response?.data || error.message);
          throw error; // Quăng lỗi để xử lý bên ngoài
        });
    },
    logout({ commit }) {
      commit('logout');  // Gọi mutation logout để xóa thông tin người dùng
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null;
    },
    isAdmin(state) {
      console.log('Checking isAdmin getter:', state.isAdmin);  // Kiểm tra giá trị của isAdmin
      return state.isAdmin;  // Lấy giá trị từ state.isAdmin
    },
  },
});
