<template>
    <div class="container pt-3">
      <h1 class="text-center">Жатақханалар</h1>
      <div class="row">
        <div class="col"></div>
        <div class="col-lg-8">
          <form class="form-inline" @submit.prevent="searchDorms">
            <div class="input-group">
              <input class="form-control" id="search" name="search" v-model="search" type="search" placeholder="Енгізіңіз: университет атауы, қала, мекенжай, сипаттама, максималды баға" aria-label="Search" style="background-color: #008080">
              <button class="btn btn-outline-dark z-0" id="searchBtn" type="submit">Іздеу</button>
            </div>
          </form>
        </div>
        <div class="col"></div>
      </div>
      <div v-for="dorm in getDorms?.dorms?.data" :key="dorm.id">
          <div class="row">
            <div class="col"></div>
            <div class="col-lg-8 mt-3">
              <div class="card">
                <div class="card-body">
                  <div v-for="university in getSearchedUniversities?.universities?.data" :key="university.id">
                    <div v-if="university.id == dorm.university_id">
                        <div class="card-title d-inline me-3 fw-bold">{{ university.name }}</div>
                    </div>
                  </div>
                  <div class="text-muted">{{ dorm.city }}, {{ dorm.address}}</div>
                  <div class="border" id="brdr"></div>
                  <div class="card-text pb-2  ">{{ dorm.description }}</div>
                  <div class="card-footer text-end" v-if="dorm.price_tenge">
                    <div class="card-text">{{ dorm.price_tenge }} KZT</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col"></div>
          </div>
      </div>
      <div class="row mt-3">
        <div class="col"></div>
        <div class="col-lg-8">
          <div class="d-flex justify-content-between">
            <button class="btn w-25" id="btn" @click="moveToPage(getDorms?.dorms?.prev_page_url)">Алдыңғы</button>
            <div class="pt-2" id="currentPage"><strong>{{ getDorms?.dorms?.current_page }} - {{ getDorms?.dorms?.last_page }}</strong></div>
            <button class="btn w-25" id="btn" @click="moveToPage(getDorms?.dorms?.next_page_url)">Келесі</button>
          </div>
        </div>
        <div class="col"></div>
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

      function moveToPage(pageUrl) {
        store.dispatch("dorms/moveToPage", pageUrl);
        window.scrollTo(0,0)
      }

      function searchDorms() {
        store.dispatch("dorms/search", {
          search: search.value,
        });
        console.log(getSearchedUniversities?.value);
      }
  
      return {
        search,
        getDorms,
        searchDorms,
        getSearchedUniversities,
        moveToPage
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
  