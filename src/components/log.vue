<template>
  <div class="page-wrapper">
    <div class="main-bg">
      <div class="login-container text-c animated flipInX">
        <div>
          <h1 class="logo-badge text-whitesmoke">
            <span class="fa fa-user-circle"></span>
          </h1>
        </div>
        <h3 class="text-whitesmoke">Sign In Online Entertainment</h3>
        <p class="text-whitesmoke">Sign In</p>
        <div class="container-content">
          <p class="text-danger">{{ error }}</p>
          <form class="margin-t" @submit.prevent="submitLogin">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Username"
                v-model="username"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                placeholder="*****"
                v-model="password"
                required
              />
            </div>
            <button type="submit" class="form-button button-l margin-b">
              Sign In
            </button>
          </form>
          <a class="text-darkyellow" @click="showForgotPassword = true">
            <small>Forgot your password?</small>
          </a>
          <p class="text-whitesmoke text-center">
            <small>Do not have an account?</small>
          </p>
          <a class="text-darkyellow" @click="showSignUp = true">
            <small>Sign Up</small>
          </a>
        </div>
      </div>

      <!-- Modal Sign Up -->
      <div v-if="showSignUp" class="modal fade show">
        <div class="modal-dialog-centered modal-dialog">
          <div class="container-content modal-content">
            <div class="modal-header">
              <button type="button" class="close" @click="showSignUp = false">
                &times;
              </button>
              <h4 class="text-whitesmoke" align="center">Sign Up</h4>
            </div>
            <form @submit.prevent="submitSignUp">
              <div class="modal-body">
                <div class="form-content">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="User Name *"
                          v-model="signupUsername"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="password"
                          class="form-control"
                          placeholder="Password *"
                          v-model="signupPassword"
                          required
                        />
                      </div>
                    </div>
                    /-strong/-heart:>:o:-((:-h
                    <div class="col-md-6">
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Full Name *"
                          v-model="signupFullname"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control"
                          placeholder="Email *"
                          v-model="signupEmail"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" class="form-button button-l margin-b">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Modal Forgot Password -->
      <div v-if="showForgotPassword" class="modal fade show">
        <div class="modal-dialog-centered modal-dialog modal-sm">
          <div class="container-content modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="close"
                @click="showForgotPassword = false"
              >
                &times;
              </button>
              <h4 class="text-whitesmoke" align="center">Forgot Password</h4>
            </div>
            <form @submit.prevent="submitForgotPassword">
              <div class="modal-body">
                <div class="form-content">
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="User Name *"
                      v-model="forgotUsername"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Email *"
                      v-model="forgotEmail"
                      required
                    />
                  </div>
                  <button type="submit" class="form-button button-l margin-b">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      signupUsername: "",
      signupPassword: "",
      signupFullname: "",
      signupEmail: "",
      forgotUsername: "",
      forgotEmail: "",
      error: "",
      showSignUp: false,
      showForgotPassword: false,
    };
  },
  methods: {
    submitLogin() { console.log("Logging in:", this.username, this.password);
    },
    submitSignUp() {
      console.log(
        "Signing up:",
        this.signupUsername,
        this.signupPassword,
        this.signupFullname,
        this.signupEmail
      );
      this.showSignUp = false;
    },
    submitForgotPassword() {
      console.log(
        "Forgot Password for:",
        this.forgotUsername,
        this.forgotEmail
      );
      this.showForgotPassword = false;
    },
  },
  name: "loginPage",
};
</script>
<style scoped>
.page-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full height of the screen */
  background-color: #222; /* Dark background */
  margin: 0; /* Remove default margin */
}

.main-bg {
  background-color: #424242;
  background: linear-gradient(#424242, #212121);
  width: 100%;
  max-width: 400px; /* Restrict the width of the form */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Light shadow */
  text-align: center;
  color: white;
  box-sizing: border-box; /* Ensure padding is included in the width calculation */
}

/* Modal styling */
.modal.fade.show {
  display: block;
  background: rgba(0, 0, 0, 0.5); /* Background dimming effect */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-dialog {
  max-width: 400px;
  width: 100%;
}

.modal-content {
  background-color: rgba(58, 58, 58, 0.85);
  color: whitesmoke;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ffeb3b;
}

/* Input styling */
.form-control {
  width: 100%;
  background-color: #5f5f5f;
  border: 1px solid #424242;
  color: #e6e6e6;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 15px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Button styling */
.form-button {
  background-color: #7a6f3b;
  color: #ffffff;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-button:hover {
  background-color: #a89050;
}

/* Modal Header */
h4.text-whitesmoke {
  color: whitesmoke;
  border-bottom: 1px solid #ffeb3b;
  padding-bottom: 10px;
  margin-bottom: 20px;
  text-align: center;
}
</style>
<style scoped>
.page-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full height of the screen */
  background-color: #222; /* Dark background */
  margin: 0; /* Remove default margin */
}

.main-bg {
  background-color: #424242;
  background: linear-gradient(#424242, #212121);
  width: 100%;
  max-width: 400px; /* Restrict the width of the form */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Light shadow */
  text-align: center;
  color: white;
  box-sizing: border-box; /* Ensure padding is included in the width calculation */
}

/* Modal styling */
.modal.fade.show { display: block;
  background: rgba(0, 0, 0, 0.5); /* Background dimming effect */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-dialog {
  max-width: 400px;
  width: 100%;
}

.modal-content {
  background-color: rgba(58, 58, 58, 0.85);
  color: whitesmoke;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ffeb3b;
}

/* Input styling */
.form-control {
  width: 100%;
  background-color: #5f5f5f;
  border: 1px solid #424242;
  color: #e6e6e6;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 15px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Button styling */
.form-button {
  background-color: #7a6f3b;
  color: #ffffff;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-button:hover {
  background-color: #a89050;
}

/* Modal Header */
h4.text-whitesmoke {
  color: whitesmoke;
  border-bottom: 1px solid #ffeb3b;
  padding-bottom: 10px;
  margin-bottom: 20px;
  text-align: center;
}
</style>
