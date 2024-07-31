<template>
    <div class="container">
    <input type="checkbox" id="flip">
    <div class="cover">
      <div class="front">
        <img src="@/assets/Medic.png" alt="">
        </div>
    </div>
    <div class="forms">
        <div class="form-content">
          <div class="login-form">
            <div class="title">Login</div>
          <form @submit.prevent="login">
            <div class="input-boxes">
              <div class="input-box">
                <i class="fas fa-envelope"></i>
                <input type="text" v-model="username" placeholder="Enter your username" required>
              </div>
              <div class="input-box">
                <i class="fas fa-lock"></i>
                <input type="password" v-model="password" placeholder="Enter your password" required>
              </div>
              <div @click="forgotPasswordAlert" class="text"><a href="#">Forgot password?</a></div>
              <div class="button input-box">
                <button type="submit" class="button">Submit</button>
              </div>
            </div>
        </form>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default{
    name:'HandleLogin',
    data(){
        return{
            username:'',
            password:'',
        };
    },
    setup(){
        const router=useRouter();
        return { router };
    },
    methods: {
    async submitLoginForm() {
      await this.login();
    },
    async login() {
      try {
        const response = await axios.post('https://mediclab-hgeqa9e0aagjgce5.northeurope-01.azurewebsites.net/api/login', {
          username: this.username,
          password: this.password,
        });
        console.log("Login successful", response.data);
        Swal.fire({
        icon: 'success', 
        title: 'Login Successful',
        text: 'You have successfully logged in!',
        timer: 5000
        });
        this.router.push('/home-page'); 
      } catch (error) {
        console.log("Error logging in", error);
        Swal.fire({
        icon: 'error',
        title: 'Login Unsuccessful',
        text: 'There was an issue with your login attempt. Please verify your credentials and try again.',
        timer: 5000
        });
      }
    },
    forgotPasswordAlert(){alert("Too bad it is not implemented :)");}
}
};


</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
body {
  min-height: 100vh;
  display: flex;
  background: #7d2ae8;
  padding: 30px;
}
.container {
  position: relative;
  align-items: center;
  max-width: 850px;
  width: 100%;
  background: #fff;
  padding: 40px 30px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 10%;
  margin-bottom: 10%;
}
.container .cover {
  position: absolute;
  top: 0;
  left: 50%;
  height: 100%;
  width: 50%;
  z-index: 98;
  transition: all 1s ease;
  transform-origin: left;
  transform-style: preserve-3d;
}
.container #flip:checked ~ .cover {
  transform: rotateY(-180deg);
}
.container .cover .front {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.container .cover img {
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: 10;
}
.container .forms {
  height: 100%;
  width: 100%;
  background: #fff;
}
.container .form-content {
  .form-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  }
}
.form-content .login-form {
  width: calc(100% / 2 - 25px);
}
.forms .form-content .title {
  font-size: 24px;
  font-weight: 500;
  color: #333;
}
.forms .form-content .title:before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 25px;
  background: #7d2ae8;
}
.forms .form-content .input-boxes {
  margin-top: 30px;
}
.forms .form-content .input-box {
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  margin: 10px 0;
  position: relative;
}
.form-content .input-box input {
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  padding: 0 30px;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 2px solid rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}
.form-content .input-box input:focus,
.form-content .input-box input:valid {
  border-color: #7d2ae8;
}
.form-content .input-box i {
  position: absolute;
  color: #7d2ae8;
  font-size: 17px;
}
.forms .form-content .text {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}
.forms .form-content .text a {
  text-decoration: none;
}
.forms .form-content .text a:hover {
  text-decoration: underline;
}
.forms .form-content .button input {
  color: #fff;
  background: #7d2ae8;
  border-radius: 6px;
  padding: 0;
  cursor: pointer;
  transition: all 0.4s ease;
}
.button {
  display: flex; 
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #7d2ae8;
  border-radius: 6px;
  padding: 10px 20px; 
  cursor: pointer;
  border: none;
  font-size: 16px; 
  transition: all 0.4s ease;
}

.button:hover {
  background: #5b13b9; /* Promeni boju pri hover efektu */
}
.forms .form-content .button input:hover {
  background: #5b13b9;
}
.forms .form-content label {
  color: #5b13b9;
  cursor: pointer;
}
.forms .form-content label:hover {
  text-decoration: underline;
}
.container #flip {
  display: none;
}
@media (max-width: 730px) {
  .container .cover {
    display: none;
  }
  .form-content .login-form {
    width: 100%;
  }
  .container #flip:checked ~ .forms .login-form {
    display: none;
  }
}
</style>