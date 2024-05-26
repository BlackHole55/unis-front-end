<template>
  <div class="container pt-3">
    <h1 class="text-center">Университеттер</h1>
    <div class="row">
      <div class="col"></div>
      <div class="col-lg-8">
        <form class="form-inline" @submit.prevent="submit">
          <div class="input-group">
            <input class="form-control" id="search" name="search" v-model="search" type="search" placeholder="Енгізіңіз: университет атауы, қала, мекенжай, сипаттама, мамандық" aria-label="Search" style="background-color: #008080">
            <button class="btn btn-outline-dark z-0" id="searchBtn" type="submit">Іздеу</button>
          </div>
        </form>
      </div>
      <div class="col"></div>
    </div>
    <div v-for="university in getSearchedUniversities?.universities?.data" :key="university.id">
      <!-- <div v-for="university in universities" :key="university.id"> -->
        <div class="row">
          <div class="col"></div>
          <div class="col-lg-8 mt-3">
            <div class="card">
              <div class="card-body">
                <div class="card-title d-inline me-3 fw-bold"><a :href="'universities/' + university.id">{{ university.name }}</a></div> 
                <div class="text-muted">{{ university.city }}, {{ university.address}}</div>
                <div class="border" id="brdr"></div>
                <div class="card-text pb-2  ">{{ university.description }}</div>
                <div class="card-footer text-end" v-if="university.link_to_website">
                  <a class="btn" id="btn" :href="university.link_to_website" target="_blank">Веб-сайтқа сілтеме</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col"></div>    
        </div>
      <!-- </div> -->
    </div>
    <div class="row mt-3">
      <div class="col"></div>
      <div class="col-lg-8">
        <div class="d-flex justify-content-between">
          <button class="btn w-25" id="btn" @click="moveToPage(getSearchedUniversities?.universities?.prev_page_url)">Алдыңғы</button>
          <div class="pt-2" id="currentPage"><strong>{{ getSearchedUniversities?.universities?.current_page }} - {{ getSearchedUniversities?.universities?.last_page }}</strong></div>
          <button class="btn w-25" id="btn" @click="moveToPage(getSearchedUniversities?.universities?.next_page_url)">Келесі</button>
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

    const getSearchedUniversities = computed(() => store.getters["universities/getSearchedUniversities"]);
    
    onMounted(() => {
      store.dispatch("universities/fetchUniversities");
    });

    function submit() {
      store.dispatch("universities/search", {
        search: search.value,
      });
    }

    function moveToPage(pageUrl) {
      store.dispatch("universities/moveToPage", pageUrl);
      window.scrollTo(0,0)
    }

    return {
      search,
      getSearchedUniversities,
      submit,
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
