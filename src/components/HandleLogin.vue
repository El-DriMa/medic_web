<template>
  <div class="page-container">
    <div class="header">
      <h1>Welcome to Medic Lab</h1>
      <p>Experience seamless healthcare management with us.</p>
    </div>
    <div class="login-container">
      <div class="title">Admin Login</div>
      <form @submit.prevent="login">
        <div class="input-box">
          <input type="text" v-model="username" placeholder="Username" required>
        </div>
        <div class="input-box">
          <input type="password" v-model="password" placeholder="Password" required>
        </div>
        <div @click="forgotPasswordAlert" class="text">
          <a href="#">Forgot password?</a>
        </div>
        <div class="button-container">
          <button type="submit" class="button2">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default {
  name: 'HandleLogin',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
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
    forgotPasswordAlert() {
      alert("Too bad it is not implemented :)");
    }
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

form {
  background-color: #f9f9f9; 
  padding: 20px;
  border-radius: 8px; 
  border: 1px solid #ddd; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}


body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e0e0e0;
  padding: 20px;
}

.page-container {
  width: 100%;
  max-width: 600px;
  margin: auto;
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  margin-top: 5%;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  display:block;
}

.header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #333;
}

.header p {
  font-size: 18px;
  color: #666;
}

.login-container {
  max-width: 500px;
  margin: 0 auto;
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
}

.input-box {
  margin-bottom: 20px;
}

.text {
  font-size: 14px;
  text-align: center;
  margin-bottom: 20px;
}

.text a {
  text-decoration: none;
  color: #007bff;
}

.text a:hover {
  text-decoration: underline;
}

.button-container {
  text-align: center;
}

.button2 {
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  background-color: #5b13b9;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  width:100%;
}



</style>
