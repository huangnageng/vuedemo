<template>
  <div id="app">
    <loading v-if="showLoading"></loading>
    <router-view />
  </div>
</template>

<script>
import loading from '@/components/loading'
export default {
  name: 'App',
  computed: {
    showLoading () {
      return this.$store.state.showLoading;
    }
  },
  components: {
    loading
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
