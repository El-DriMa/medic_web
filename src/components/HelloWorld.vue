<template>
 <div>
  <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Username</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.userName }}</td>
          <td>{{ item.name }}</td>
        </tr>
      </tbody>
    </table>
 </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      data:[]
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
