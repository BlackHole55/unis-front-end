<template>
    <div class="container pt-3">
        <div class="row">
            <div class="col"></div>
            <div class="col-10">
                <div class="text-center h5 fw-bold">{{ getUniversity?.university?.name }}</div>
                <div class="text-end">{{ getUniversity?.university?.city }}, {{ getUniversity?.university?.address }}</div>
                <div class="pt-3">&emsp;{{ getUniversity?.university?.description }}</div>
                <div class="text-end pt-2">
                    <a class="btn" id="btn" :href="getUniversity?.university?.link_to_website" target="_blank">Веб-сайтқа сілтеме</a>
                </div>
            </div>
            <div class="col"></div>
        </div>
        <div class="row">
            <div class="col"></div>
            <div class="col-10">
                <h5 class="pt-3 fw-bold" v-if="getUniversity?.university?.dorms?.[0]">Жатақханалар</h5>
                <div class="mt-3" v-for="dorm in getUniversity?.university?.dorms" :key="dorm.id">
                    <div class="card p-2">
                        <div>{{ dorm.city }}, {{ dorm.address }}</div>
                        <div class="py-2">&emsp;{{ dorm.description }}</div>
                        <div class="card-footer text-end pt-2" v-if="dorm.price_tenge">Бағасы: {{ dorm.price_tenge }} KZT</div>
                    </div>
                </div>
            </div>
            <div class="col"></div>
        </div>
        <div class="row">
            <div class="col"></div>
            <div class="col-10">
                <h5 class="pt-3 fw-bold" v-if="getUniversity?.university?.specialties?.[0]">Мамандықтар</h5>
                <div v-for="specialty in getUniversity?.university?.specialties" :key="specialty.id"> 
                    <div class="card p-2 mt-3">
                        <div>{{ specialty.name }}</div>
                        <div class="py-2">&emsp;{{ specialty.description }}</div>
                        <div v-for="specialityUniversity in getUniversity?.specialityUniversity" :key="specialityUniversity.id">
                            <div v-if="specialityUniversity.specialty_id === specialty.id">
                                <div class="card-footer text-end pt-2" v-if="specialityUniversity.price_per_year_tenge">Бағасы: {{ specialityUniversity.price_per_year_tenge }} KZT</div>
                                <div class="card-footer" v-if="specialityUniversity.exams[0]"></div>
                            </div>
                            <div v-for="exam in specialityUniversity.exams" :key="exam.id">
                                <div v-if="specialityUniversity.specialty_id === specialty.id">
                                    <div>{{ exam.name }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col"></div>
        </div>
    </div>
    <!-- <h1>{{ getUniversity?.university?.name }}</h1>
    <div>{{ getUniversity?.university?.dorms[0].city }}</div> -->
    
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
    setup() {
        const store = useStore();

        const route = useRoute();

        const id = computed(() => route.params.id);

        const getUniversity = computed(() => store.getters["universities/getUniversity"]);

        console.log(getUniversity);

        onMounted(() => {
            store.dispatch("universities/fetchUniversity", id);
        });

        return {
            getUniversity,
            id
        }
    },
}
</script>

<style scoped>
#btn {
  background-color: #008080;
  color: #fffdd0;
}
#btn:hover {
  background-color: #fffdd0;
  color: #008080;
  border-color: #008080;
  /* #006874 */
}

.card {
  background-color: #fffdd0;
  border-color: #008080;
}
.card-footer {
  border-color: #008080;
}
</style>