<template>
  <div id="home">
  <h2>LEADERBOARD</h2>
  <p style="font-style: italic;">Get in the top 10 to be put on the Leaderboard.</p>
  <ol>
    <li v-for="time in topTimes" :key="time.id">
    {{time.name}}: {{time.time / 1000}} sec
    </li>
    </ol>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return{
    user: "",
    times: [],
    }
  },
  created() {
    this.getScores();
    this.getUser();
  },
  computed:{
    sortTimes() {
    return this.times.slice(0).sort(function(a,b){
      return parseInt(a.time) - parseInt(b.time);
    });
    },
    topTimes() {
      return this.sortTimes.slice([0], [10]);
    }
  },
  methods:  {
  formatTimeDate(date){
    return date.substr(5,5);
  },
  async getUser() {
    try {
      let response = await axios.get('/api/user');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  async getScores(){
    try{
      const response = await axios.get("/api/time/all");
      this.times = response.data;
    } catch(error) {
      console.log(error);
    }
  }
  }
    }
  </script>

  <style scoped>

  #id {
    width: 50%;
  }

  #home ol {
    margin: auto;
    width: 50%;
    font-size: 30px;
    justify-content: center;
    border:1px solid #222;
    padding:3px;
  }
  #home li {
    padding: 4px;
    border:1px solid #AAA;
    background-color:#CCC;
  }

  </style>
