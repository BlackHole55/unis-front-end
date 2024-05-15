<template>
    <div class="container pt-3">
      <h1 class="text-center">Dorms</h1>
      <div class="row">
        <div class="col"></div>
        <div class="col-8">
          <form class="form-inline" @submit.prevent="searchDorms">
            <div class="input-group">
              <input class="form-control" id="search" name="search" v-model="search" type="search" placeholder="Search" aria-label="Search" style="background-color: #008080">
              <button class="btn btn-outline-dark" id="searchBtn" type="submit">Search</button>
            </div>
          </form>
        </div>
        <div class="col"></div>
      </div>
      <div v-for="dorm in getDorms?.dorms?.data" :key="dorm.id">
          <div class="row">
            <div class="col"></div>
            <div class="col-8 mt-3">
              <div class="card">
                <div class="card-body">
                  <div v-for="university in getSearchedUniversities?.universities" :key="university.id">
                    <div v-if="university.id == dorm.university_id">
                        <div class="card-title d-inline me-3 fw-bold">{{ university.name }}</div>
                    </div>
                  </div>
                  <!-- <div class="card-title d-inline me-3 fw-bold"><a :href="'universities/' + dorm.id">{{ university.name }}</a></div>  -->
                  <div class="text-muted">{{ dorm.city }}, {{ dorm.address}}</div>
                  <div class="border" id="brdr"></div>
                  <div class="card-text pb-2  ">{{ dorm.description }}</div>
                  <div class="card-footer d-flex">
                    <button class="btn btn-outline-danger me-auto" @click="deleteDorm(dorm.id)">Delete</button>
                    <a class="btn me-3" id="btn" :href="'/admin/dorms/' + dorm.id + '/update'">Edit</a>
                    <div class="card-text pt-2">{{ dorm.price_tenge }}₸</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col"></div>
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
  
      const getDorms = computed(() => store.getters["dorms/getDorms"]);
      const getSearchedUniversities = computed(() => store.getters["universities/getSearchedUniversities"]);
      
      onMounted(() => {
        store.dispatch("dorms/fetchDorms");
        store.dispatch("universities/fetchUniversities");
      });
    
      console.log(getSearchedUniversities);

      function searchDorms() {
        // store.dispatch("universities/search", {
        //   search: search.value,
        // });
        console.log(search.value);
      }

      function deleteDorm(dormId) {
        store.dispatch("dorms/deleteDorm", dormId);

        store.dispatch("dorms/fetchDorms");
      }
  
      return {
        search,
        getDorms,
        getSearchedUniversities,
        searchDorms,
        deleteDorm,
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
  