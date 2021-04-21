<template>
  <div id="home">
  <button> <a @click="logout">logout</a></button>
  <div id = "description">
    <p>Button Masher is an incredibly innovative and new concept.
    You press start game and you mash the button as fast as you can.
    That's it. Good luck!</p>
  </div>
  <h2>PERSONAL BEST TIMES</h2>
  <p style="font-style: italic;">Get in the top 10 to be put on the Leaderboard.</p>
  <ol>
    <li v-for="time in topTimes" :key="time.id">
    {{formatTimeDate(time.created)}}: {{time.time / 1000}} sec
    <button @click="deleteScore(time)" class="delete">X</button>
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
  async logout() {
    try {
      await axios.delete("/api/user");
      this.$root.$data.user = null;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  async getScores(){
    try{
      const response = await axios.get("/api/time");
      this.times = response.data;
    } catch(error) {
      console.log(error);
    }
  },
  async deleteScore(score){
    try{
      await axios.delete('api/time/'+score._id);
      this.getScores();
    }catch(error){
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
.menu h2 {
  font-size: 14px;
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
