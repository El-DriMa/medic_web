<template>
  <div>
    <button @click="showModal = true">Add User</button>
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
  <div class="modal-content">
    <form @submit.prevent="addUser">
      <input v-model="newUser.name" placeholder="Name" required />
      <input v-model="newUser.userName" placeholder="Username" required />
      <input v-model="newUser.passwordHash" placeholder="Password" required />
      <input v-model="newUser.orders" type="number" placeholder="Orders" required />
      <input v-model="newUser.imageUrl" placeholder="Image URL" />
      <input v-model="newUser.dateOfBirth" type="date" placeholder="Date of Birth" required />
      <button type="submit">Add User</button>
    </form>
    </div>
    </div>

    <div class="user-grid">
      <div v-for="item in data" :key="item.id" class="user-card">
        <div class="user-info">
          <h3>{{ item.name }}</h3>
          <p><strong>ID:</strong> {{ item.id }}</p>
          <p><strong>Username:</strong> {{ item.userName }}</p>
          <p><strong>Last Login:</strong> {{ item.lastLoginDate }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'HomePage',
  props: {
    msg: String
  },
  data(){
    return {
      showModal:false,
      data:[],
      newUser: {
        name: '',
        userName: '',
        passwordHash:'',
        orders: '',
        imageUrl: '',
        dateOfBirth: ''
      }
    };
  },

 
  async mounted() {
    await this.fetchData();
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
        userName: '',
        passwordHash:'',
        orders: '',
        imageUrl: '',
        dateOfBirth: ''
      };
      this.showModal=false;
      this.fetchData();
    } catch (error) {
      console.error('Error adding user', error);
    }
    }
  }
}
</script>


<style scoped>
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

</style>
