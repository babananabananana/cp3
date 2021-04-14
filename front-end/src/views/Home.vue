<template>
  <div id="home">
  <div id = "description">
    <p>Button Masher is an incredibly innovative and new concept.
    You press start game and you mash the button as fast as you can.
    That's it. Good luck!</p>
  </div>
  <h2>LEADERBOARD</h2>
  <p style="font-style: italic;">Get in the top 10 to be put on the Leaderboard.</p>
  <ol>
    <li v-for="user in topUsers" :key="user.id">
      {{user.name}}: {{user.time/1000}} sec 
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
    users: [],
    }
  },
  created() {
    this.getScores();
  },
  computed:{
    sortUsers() {
    return this.users.slice(0).sort(function(a,b){
      return parseInt(a.time) - parseInt(b.time);
    });
    },
    topUsers() {
      return this.sortUsers.slice([0], [10]);
    }
  },
  methods:  {
  async getScores(){
    try{
      const response = await axios.get("/api/user");
      this.users = response.data;
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
