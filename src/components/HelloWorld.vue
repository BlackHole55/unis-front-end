<template>
  <div class="main">
    <h1>{{ msg }}</h1>
    <h1>Made by Getters</h1>
    <div v-for="universities in getUniversities" :key="universities.id">
      <div v-for="university in universities" :key="university.id">
        id: {{ university.id }}<br> name: {{ university.name }} location: {{ university.location }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const msg = ref("Welcome to my Vuex Store");
const getUniversities = computed(() => {
  return store.getters.getUniversities;
});
onMounted(() => {
  store.dispatch("fetchUniversities");
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
