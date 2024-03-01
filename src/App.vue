<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <AppHeader style="z-index: 1;"></AppHeader>
  <main>
    <RouterView></RouterView>
  </main>
</template>

<script>
// import MainApp from './components/MainApp.vue'
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'App',
  components: {
    // MainApp,
    AppHeader
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
