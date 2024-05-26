<template>
  <AppHeader style="z-index: 1;"></AppHeader>
  <main>
    <RouterView style="padding-bottom: 5rem;"></RouterView>
  </main>
  <AppFooter></AppFooter>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
  position: relative;
  min-height: 100vh;
}
</style>
