<template>
  <div id="app">
    <loading v-show="showLoading"></loading>
    <router-view />
    <tip v-show="showTip"></tip>
  </div>
</template>

<script>
import loading from '@/components/loading'
import tip from '@/components/tip'

export default {
  name: 'App',
  computed: {
    showLoading () {
      return this.$store.state.showLoading;
    },
    showTip () {
      return this.$store.state.tip.show;
    }
  },
  components: {
    loading,
    tip
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
