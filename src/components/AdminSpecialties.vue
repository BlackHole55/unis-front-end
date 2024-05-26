<template>
    <div class="container pt-3">
      <h1 class="text-center">Мамандықтар</h1>
      <div class="row">
        <div class="col"></div>
        <div class="col-lg-8">
          <form class="form-inline" @submit.prevent="searchSpecialties">
            <div class="input-group">
              <input class="form-control" id="search" name="search" v-model="search" type="search" placeholder="Search" aria-label="Search" style="background-color: #008080">
              <button class="btn btn-outline-dark z-0" id="searchBtn" type="submit">Search</button>
            </div>
          </form>
        </div>
        <div class="col"></div>
      </div>
      <div class="row">
        <div class="col"></div>
        <div class="col-lg-8">
            <RouterLink to="specialties/post"><a class="btn mt-3 w-100" id="btn">Жаңа мамандықты жариялау</a></RouterLink>
        </div>
        <div class="col"></div>
      </div>
      <div v-for="speciality in getSpecialties?.specialties?.data" :key="speciality.id">
          <div class="row">
            <div class="col"></div>
            <div class="col-lg-8 mt-3">
              <div class="card">
                <div class="card-body">
                  <div class="card-title d-inline me-3 fw-bold">{{ speciality.name }}</div>
                  <div class="text-muted">ID: {{ speciality.id }}</div>
                  <div class="border" id="brdr"></div>
                  <div class="card-text  pb-2  ">{{ speciality.description }}</div>
                  <div class="card-footer d-flex">
                    <button class="btn btn-outline-danger me-auto" @click="deleteSpeciality(speciality.id)">Жою</button>
                    <a class="btn me-3" id="btn" :href="'specialties/' + speciality.id + '/update'">Өңдеу</a>
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
            <button class="btn w-25" id="btn" @click="moveToPage(getSpecialties?.specialties?.prev_page_url)">Алдыңғы</button>
            <div class="pt-2" id="currentPage"><strong>{{ getSpecialties?.specialties?.current_page }} - {{ getSpecialties?.specialties?.last_page }}</strong></div>
            <button class="btn w-25" id="btn" @click="moveToPage(getSpecialties?.specialties?.next_page_url)">Келесі</button>
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
  
      const getSpecialties = computed(() => store.getters["specialties/getSpecialties"]);
    //   const getSearchedUniversities = computed(() => store.getters["universities/getSearchedUniversities"]);
      
      console.log(getSpecialties);    

      onMounted(() => {
        store.dispatch("specialties/fetchSpecialties");
      });

      function deleteSpeciality(specialityId) {
        store.dispatch("specialties/deleteSpeciality", specialityId);

        store.dispatch("specialties/fetchSpecialties");
      }

      function searchSpecialties() {
        store.dispatch("specialties/search", {
          search: search.value,
        });
      }

      function moveToPage(pageUrl) {
        store.dispatch("specialties/moveToPage", pageUrl);
        window.scrollTo(0,0)
      }
  
      return {
        search,
        getSpecialties,
        deleteSpeciality,
        searchSpecialties,
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
  