<template>
<div class="dashboard">
  <MyTimes v-if="user" />
  <Login v-else />
</div>
</template>


<script>
import MyTimes from '@/components/MyTimes.vue';
import Login from '@/components/Login.vue';
import axios from 'axios';
export default {
  name: 'dashboard',
  components: {
    MyTimes,
    Login,
  },
  async created() {
    try {
      let response = await axios.get('/api/user');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>


<style scoped>
.dashboard {
  padding-top: 10px;
}
</style>
