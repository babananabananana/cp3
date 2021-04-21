<template>
  <div id="app">
    <div id="nav">
    <div id="brand">
      <router-link to="/">
        <img src="/images/button1.png">
      </router-link>
    </div>
      <h1><router-link to="/" id = "logo" style = "color:#000;">Button Masher</router-link></h1>
      <nav>
      <router-link to="/dashboard">Dash<i class="fas fa-user"></i></router-link> |
      <router-link to="/">Home</router-link> |
      <router-link to="/game">Game</router-link> |
      <router-link to="/dashboard"><a @click="logout">Logout</a></router-link>
      </nav>
    </div>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios';
export default {

methods:  {
async logout() {
  try {
    await axios.delete("/api/user");
    this.$root.$data.user = null;
  } catch (error) {
    this.$root.$data.user = null;
  }
},
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}


#nav a.router-link-exact-active {
  color: #42b983;
}
#logo{
  text-decoration: none;
  padding: 5px;
  border: 2px solid #000;
}

#brand {
  grid-area: brand;
  display: flex;
  justify-content: center;
}
#brand img {
  height: 200px;
}

</style>
