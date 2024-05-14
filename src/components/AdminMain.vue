<template>
  <div class="container pt-3">
    <h1 class="text-center">Hi, {{ getCurrentAdmin?.name }}</h1>
    <div class="row">
      <div class="col"></div>
      <div class="col-8">
        <form class="form-inline" @submit.prevent="searchUnivesiry">
          <div class="input-group">
            <input class="form-control" id="search" name="search" v-model="search" type="search" placeholder="Search" aria-label="Search" style="background-color: #008080">
            <button class="btn btn-outline-dark" id="searchBtn" type="submit">Search</button>
          </div>
        </form>
        <RouterLink to="universities/post"><a class="btn mt-3 w-100" id="btn">Post new university</a></RouterLink>
      </div>
      <div class="col"></div>
    </div>
    <div v-for="universities in getSearchedUniversities" :key="universities.id">
      <div v-for="university in universities" :key="university.id">
        <div class="row">
          <div class="col"></div>
          <div class="col-8 mt-3">
            <div class="card">
              <div class="card-body">
                <div class="card-title d-inline fw-bold"><a :href="'universities/' + university.id + '/update'">{{ university.name }}</a></div> 
                <div class="text-muted">{{ university.city }}, {{ university.address}}</div>
                <div class="border" id="brdr"></div>
                <div class="card-text pb-2">{{ university.description }}</div>
                <div class="card-footer d-flex">
                  <button class="btn btn-outline-danger me-auto" @click="deleteUniversity(university.id)">Delete</button>
                  <a class="btn me-3" id="btn" :href="'universities/' + university.id + '/update'">Edit</a>
                  <a class="btn" id="btn" :href="university.link_to_website" target="_blank">Go to website</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col"></div>    
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const search = ref('');

    const store = useStore();

    const getSearchedUniversities = computed(() => store.getters["universities/getSearchedUniversities"]);

    const getCurrentAdmin = computed(() => store.getters["admin/getCurrentAdmin"]);
    
    onMounted(() => {
      store.dispatch("universities/fetchUniversities");
    });

    function searchUnivesiry() {
      store.dispatch("universities/search", {
        search: search.value,
      });
    }

    function deleteUniversity(universityId) {
      store.dispatch("universities/deleteUniversity", universityId);

      store.dispatch("universities/fetchUniversities");
    }

    return {
      search,
      getSearchedUniversities,
      getCurrentAdmin,
      searchUnivesiry,
      deleteUniversity,
    }
  }
}
</script>

<style scoped>
#searchBtn{
    border-color: #008080;
    color: #008080;
}
#searchBtn:hover{
    background-color: #008080;
    color: #fffdd0;
}
#search {
  color: #fffdd0;
}

#btn {
  background-color: #008080;
  color: #fffdd0;
}
#btn:hover {
  background-color: #fffdd0;
  color: #008080;
  border-color: #008080;
}

.card {
  background-color: #fffdd0;
  border-color: #008080;
}
.card-footer {
  border-color: #008080;
}

/* h1 {
  text-align: center;
} */
</style>
