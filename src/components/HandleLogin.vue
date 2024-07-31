<template>
<div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="submitLoginForm">
            <div class="input-group">
                <label for="username">Username</label>
                <input type="username" id="username" name="username" v-model="username" required>
            </div>
            <div class="input-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" v-model="password" required>
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import { useRouter } from 'vue-router';

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
        this.router.push('/hello-world'); 
      } catch (error) {
        console.log("Error logging in", error);
      }
    },
}
};


</script>

<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
  margin: 0;
  font-family: Arial, sans-serif;
}

.login-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
  width: 100%;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

</style>