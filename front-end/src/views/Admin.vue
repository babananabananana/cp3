<template>
  <div id="admin">
  <h1>Admin Page</h1>
  <div class="heading">
    <h2>Remove a Score</h2>
  </div>
  <ol>
    <li v-for="user in topUsers" :key="user.id">
      {{user.name}}: {{user.time/1000}} sec
      <button @click="deleteScore(user)" class="delete">X</button>
    </li>
  </ol>
  </div>
</template>




<script>
import axios from 'axios';
export default {
  name:"Admin",
  data(){
    return{
      users:[],
    }
  },
  created() {
    this.getScores();
  },
  computed: {
    sortUsers() {
      this.getScores();
      return this.users.slice(0).sort(function(a,b){
      return parseInt(a.time) - parseInt(b.time);
      });
    },
    topUsers() {
      return this.sortUsers.slice([0], [10]);
    },
  },
  methods: {
    async getScores(){
      try{
        const response = await axios.get("/api/user");
        this.users = response.data;
        } catch(error) {
        console.log(error);
      }
      },
    async deleteScore(score){
      try{
        await axios.delete('api/items/'+score._id);
        this.getItems();
      }catch(error){
        console.log(error);
      }
    }
  }
  }

  </script>

  <style scoped>

  .heading {
    justify-content:center;
    margin:auto;
  }

  .heading h2 {
    margin-top: 8px;
    margin-left: 10px;
  }

  .add,
  .edit {
    display: flex;
  }

  .circle {
    border-radius: 50%;
    width: 18px;
    height: 18px;
    padding: 8px;
    background: #333;
    color: #fff;
    text-align: center
  }

  #admin ol {
    margin: auto;
    width: 50%;
    font-size: 30px;
    justify-content: center;
    border:1px solid #222;
    padding:3px;
  }
  #admin li {
    padding: 4px;
    border:1px solid #AAA;
    background-color:#CCC;
  }

  button {
    font-family: 'Arvo';
    font-size: 1em;
    border: none;
    background-color: #bbb;
    padding: 5px 10px;
  }

  button:focus {
    outline: none;
  }

  button.selected {
    border-bottom: 2px solid #000;
  }
  .delete {
    display: none;
    margin-left: auto;
  }
  li:hover .delete {
    display: inline-block;
  }

  </style>
