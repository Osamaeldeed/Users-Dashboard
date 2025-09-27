<template>
  <Navbar v-if="!this.$route.meta.hideNavbar" />
  <router-view></router-view>
</template>

<script>
import Navbar from './components/Pages/Navbar.vue';

export default {
  name: "App",
  data() {
    return {};
  },

  components: {
    Navbar
  }
}
  
</script>

<style scoped>

</style>