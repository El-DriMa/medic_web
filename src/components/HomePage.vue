<template>
  <div>
    <div class="header">
      <h2 class="listOfUsersHeader">List of users</h2>
      <button class="button button" @click="logout">Log out</button>
    </div>
    <button @click="showModal = true" class="button">Add User</button>
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-content">
        <h2 class="h2Color">Add new user</h2>
        <form @submit.prevent="addUser">
          <div class="input">
            <input v-model="newUser.name" placeholder="Enter name" required type="text" />
          </div>
          <div class="input">
            <input v-model="newUser.passwordHash" placeholder="Enter password" required type="password"/>
          </div>
          <div class="input">
            <input v-model="newUser.username" placeholder="Enter username" required type="text"/>
          </div>
          <div class="input">
            <input v-model="newUser.orders" type="number" min="0" max="10" placeholder="Select order numbers (1-10)" required />
          </div>
          <div class="input">
            <input v-model="newUser.imageURL" placeholder="Image URL" required type="text"/>
          </div>
          <div class="input">
            <input v-model="newUser.dateOfBirth" type="date" placeholder="Enter date of birth" required />
          </div>
          <div class="button2">
            <button type="submit" class="button2">Add User</button>
          </div>
        </form>
      </div>
    </div>
    <table class="user-table">
      <thead>
        <tr>
          <th class="id-column">ID</th>
          <th>Name</th>
          <th>Username</th>
          <th>Last Login</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td @click="openDetailsModal(item)" class="id-column">{{ item.id }}</td>
          <td @click="openDetailsModal(item)">{{ item.name }}</td>
          <td @click="openDetailsModal(item)">{{ item.userName }}</td>
          <td @click="openDetailsModal(item)">{{ new Date(item.lastLoginDate).toLocaleDateString() }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="showDetailsModal" class="modal-overlay" @click.self="showDetailsModal = false">
      <div class="modal-content">
        <div v-if="selectedUser">
          <div class="input">
            <label class="input-label" for="id">User ID:</label>
            <div class="input-field">
              <input v-model="selectedUser.id" readonly type="text" />
            </div>
          </div>
          <div class="input">
            <label class="input-label" for="name">Name:</label>
            <div class="input-field">
              <input v-model="selectedUser.name" required type="text" />
            </div>
          </div>
          <div class="input">
            <label class="input-label" for="username">Username:</label>
            <div class="input-field">
              <input v-model="selectedUser.username" required type="text" />
            </div>
          </div>
          <div class="input">
            <label class="input-label" for="orders">Orders:</label>
            <div class="input-field">
              <input v-model="selectedUser.orders" type="number" min="0" max="10" required />
            </div>
          </div>
          <div class="input">
            <label class="input-label" for="lastLoginDate">Last login date:</label>
            <div class="input-field">
              <input :value="new Date(selectedUser.lastLoginDate).toLocaleDateString()" type="text" readonly />
            </div>
          </div>
          <div class="input">
            <label class="input-label" for="imageUrl">Image URL:</label>
            <div class="input-field">
              <input v-model="selectedUser.imageURL" placeholder="Image URL" required type="text" />
            </div>
          </div>
          <div class="input">
            <label class="input-label" for="status">Status:</label>
            <div class="input-field">
              <input v-model="selectedUser.status" placeholder="Status (Active,Inactive,Blocked)" required type="text" />
            </div>
          </div>
          <div class="input">
            <label class="input-label" for="dateOfBirth">Date of birth:</label>
            <div class="input-field">
              <input v-model="selectedUser.dateOfBirth" type="datetime-local" />
            </div>
          </div>
          <div class="userDetailsButtons">
            <button type="submit" class="button3" @click="updateUser(selectedUser)">Save changes</button>
            <button type="submit" class="button3" @click="blockUser(selectedUser.id)">Block user</button>
          </div>
          <div class="close-button-container">
          <button @click="showDetailsModal = false" class="button3">Close</button></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default {
  name: 'HomePage',
  props: {
    msg: String
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  data(){
    return {
      showModal:false,
      showDetailsModal:false,
      data:[],
      newUser: {
        name: '',
        username: '',
        passwordHash:'',
        orders: '',
        imageUrl: '',
        dateOfBirth: ''
      },
      selectedUser: null
    };
  },

 
  async mounted() {
    await this.fetchData();
    this.disableBackNavigation();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('https://mediclab-hgeqa9e0aagjgce5.northeurope-01.azurewebsites.net/api/users');
        this.data = response.data;
      } catch (error) {
        console.error('Error fetching data', error);
      }
    },
    async addUser() {
      try {
      const response = await axios.post('https://mediclab-hgeqa9e0aagjgce5.northeurope-01.azurewebsites.net/api/register', this.newUser);
      this.data.push(response.data);
      this.newUser = {
        name: '',
        username: '',
        passwordHash:'',
        orders: '',
        imageUrl: '',
        dateOfBirth: ''
      };
      Swal.fire({
          icon: 'success', 
          title: 'User added Successfully',
          text: 'You have successfully added new user!',
          timer: 5000
        });
      this.showModal=false;
      this.fetchData();
    } catch (error) {
      console.error('Error adding user', error.response ? error.response.data : error.message);
    }
    },
    async getUserDetails(id){
      try {
        const response=await axios.get(`https://mediclab-hgeqa9e0aagjgce5.northeurope-01.azurewebsites.net/api/users/details/${id}`);
        this.selectedUser=response.data;
      } catch (error) {
        console.log('Error fetching user data');
      }
    },
    async updateUser(user) {
      try {
        const response = await axios.put(`https://mediclab-hgeqa9e0aagjgce5.northeurope-01.azurewebsites.net/api/users/update/${user.id}`, user, {
        headers: {
        'Content-Type': 'application/json'
        }
       });
        this.selectedUser = response.data;
        Swal.fire({
        icon: 'success',
        title: 'User updated Successfully',
        text: 'You have successfully updated the user!',
        timer: 5000
          });
          this.showDetailsModal=false;
        this.fetchData();
        } catch (error) {
      console.error('Error updating user:', error.response ? error.response.data : error.message);
      }
    },
    async blockUser(id){
        await axios.post(`https://mediclab-hgeqa9e0aagjgce5.northeurope-01.azurewebsites.net/api/users/block/${id}`);
        this.getUserDetails(id);
    },
    async logout(){
      this.router.push('/'); 
    },
    openDetailsModal(user) {
      this.getUserDetails(user.id);
      this.showDetailsModal = true;
    },
    
    disableBackNavigation() {
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  }
  }
}
</script>


<style>

.listOfUsersHeader{
  color: #5b13b9;
  text-align: left;
  margin-left: 1.2%;
}

body {
  font-family: Arial, sans-serif;
}

.h2Color{
  color: #5b13b9;
}

.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

form {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.input {
  display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.input-label {
    flex: 0 0 20%;
    font-weight: bold;
    margin-right: 10px;
    text-align: left;
} 
.input-field {
    flex: 1;
  }

.input i {
  margin-right: 10px;
  color: #888;
}

input[type="text"],
input[type="password"],
input[type="number"],
input[type="date"],
input[type="datetime-local"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="text"]:focus,
input[type="password"]:focus,
input[type="number"]:focus,
input[type="date"]:focus,
input[type="datetime-local"]:focus {
  border-color: #007bff;
}

.button {
  display: flex;
  justify-content: center;
}

.userDetailsButtons {
  display: flex;
  gap: 0.2px; 
  width: 100%;
}


.button button {
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
  position:absolute;
}

.button button:hover {
  background-color: #0056b3;
}

.button2{
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color:  #5b13b9;;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.button3 {
  flex: 1;
  text-align: center;
  padding: 10px 20px; 
  border: none;
  border-radius: 4px;
  background-color: #5b13b9;
  color: white;
  font-size: 16px;
  cursor: pointer;
  box-sizing: border-box;
  margin: 3px;
}

.close-button-container {
  display: flex;
  justify-content: center;
  width: 100%;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
  position: relative;
  height: 70%;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.user-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  background: #fff;
}

.user-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.user-info {
  font-size: 14px;
}

form {
  margin-bottom: 20px;
}

.form-content{
  max-width: 600px;
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
  position: absolute;
  right: 1%;
}

.button:hover {
  background: #5b13b9; 
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 60px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.user-table th, .user-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.user-table .id-column {
  width: 10%;
}

.user-table th:not(.id-column), .user-table td:not(.id-column) {
  width: 30%; 
}

.user-table th {
  background-color: #f4f4f4;
  color: #5b13b9;
}

.user-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.user-table tr:hover {
  background-color: #f1f1f1;
}

</style>
