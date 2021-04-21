<template>
  <div class="about">
  <div id="start" v-if="gameState === 0">
    <img v-on:click="showGame" src="/images/start.png">
  </div>
  <div id = "game" v-if="gameState === 1 || gameState ==2">
    <p style="text-align: center; font-size: 30px;">{{formattedElapsedTime}}</p>
    <p id="fast">{{fastestUser.name}}: {{fastestClicks}}</p>
    <p id="slow">{{slowerUser.name}}: {{slowerClicks}}</p>
    <p id="user">{{myUser.firstName}}: {{userClicks}}</p>
    <img v-on:click.once="startGame" v-on:click="buttonPress" draggable="false" src="/images/button2.png">
  </div>
  <div id = "winState" v-if="gameState ==3">
    <h1> {{myUser.firstName}}, your time is {{totalTime}} seconds!</h1>
    <h2> LEADERBOARD </h2>
    <p style="font-style: italic;">Get in the top 10 to be put on the Leaderboard.</p>
    <ol>
      <li v-for="time in topTimes" :key="time.id">
        {{time.name}}: {{time.time / 1000}} sec
      </li>
    </ol>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Game',
  data() {
    return{
    user:"",
    gameState:0,
    userClicks:"",
    fastestClicks:"",
    slowerClicks:"",
    random: 0,
    elapsedTime:0,
    timer: undefined,
    times: [],
    clickAmt: 10,
    }
  },
  created(){
    this.getScores();
    this.getUser();
  },
  components: {
  },
  computed: {
  myUser() {
    return this.$root.$data.user;
  },
    formattedElapsedTime(){
      const date = new Date(null);
      date.setSeconds(this.elapsedTime /1000)
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(":")+4, 2)
      },
    totalTime() {
      return this.elapsedTime / 1000;
    },
    sortTimes() {
    this.getScores();
    return this.times.slice(0).sort(function(a,b){
      return parseInt(a.time) - parseInt(b.time);
    });
    },
    topTimes() {
      return this.sortTimes.slice([0], [10]);
    },
    fastestUser(){
      if(this.topTimes.length < 1){
        return {
          name: "Bobby",
          time: 2000,
        }
      }
      return this.topTimes[0];
    },
    fastestTime(){
      return this.fastestUser.time
    },
    slowerUser(){
      if(this.topTimes.length < 10){
        return {
          name: "Bobby",
          time: 4000,
        }
      }
      else {return this.topTimes[9];}
    },
    slowerTime(){
      return this.slowerUser.time
    }
  },
  watch: {
  },
  methods:{
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
    startTimer(){
      this.timer = setInterval(() => {
        this.elapsedTime += 10;
      }, 10);
    },
    stopTimer() {
      clearInterval(this.timer);
    },
    resetTimer() {
      this.elapsedTime = 0;
    },
    showGame(){
      this.gameState = 1;
      this.userClicks = "";
      this.fastestClicks = "";
      this.slowerClicks = "";
      if(this.user === "") this.user = "User"
      this.resetTimer();
    },
    startGame() {
      this.gameState = 2;
      this.startTimer();
      setInterval(this.fastestIncrement, this.fastestTime/this.clickAmt);
      setInterval(this.slowerIncrement, this.slowerTime/this.clickAmt);
    },
    buttonPress() {
      this.userClicks +="-";
      this.winGame(this.userClicks, this.user)
    },
    fastestIncrement(){
      if(this.gameState === 2){
      if(this.fastestClicks.length < this.clickAmt){
        this.fastestClicks +="-";
      }
      }
    },
    slowerIncrement(){
    if(this.gameState === 2){
      if(this.slowerClicks.length < this.clickAmt){
      this.slowerClicks +="-";
        }
        }
    },
    winGame(clickString){
      if(clickString.length === this.clickAmt){
        this.stopTimer();
        this.gameState = 3;
      if(this.elapsedTime < this.slowerTime){
        this.addScore();
        }
      }
    },
    async addScore(){
      try{
        await axios.post('/api/time', {
          time: this.elapsedTime,
          name: this.myUser.firstName +" " + this.myUser.lastName
        });
        await this.getScores();
        }catch(error){
          console.log(error);
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
  #game{
    margin:auto;
    width: 800px;
    height: 400px;
    background-color: #DDDDDD;
  }
  #game p{
    text-align:left;
    font-weight:bold;
    font-size:20px;
  }

  #game img {
    height: 50%;
    margin: 20px;
  }
  #winState ol {
    margin: auto;
    width: 50%;
    font-size: 30px;
    justify-content: center;
    border:1px solid #222;
    padding:3px;
  }
  #winState li {
    padding: 4px;
    border:1px solid #AAA;
    background-color:#CCC;
  }
  #winState h2 {
  }
  input {
    display: table-cell;
    font-size: 20px;
    border: 1px solid #aaa;
    width: 200px;
    height: 40px;
  }

</style>
