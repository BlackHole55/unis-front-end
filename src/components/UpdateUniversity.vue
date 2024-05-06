<template>
    <div class="container pt-3">
        <div class="row">
            <div class="col"></div>
            <div class="col-10">
                <form @submit.prevent="updateUniversity">
                    <input type="text" class="form-control form-control-lg text-center h5 fw-bold" id="name" name="name" :placeholder="getUniversity?.university?.name" :value="getUniversity?.university?.name">
                    <div class="d-flex flex-row">
                        <label for="city" class="fw-bold pt-2 pe-1">City</label>
                        <input type="text" class="form-control text-end" id="city" name="city" :placeholder="getUniversity?.university?.city" :value="getUniversity?.university?.city">
                        <label for="city" class="fw-bold pt-2 ps-2 pe-1">Address</label>
                        <input type="text" class="form-control text-end" id="address" name="address" :placeholder="getUniversity?.university?.address" :value="getUniversity?.university?.address">
                    </div>
                    <textarea type="text" class="form-control mt-3" id="description" name="description" :placeholder="getUniversity?.university?.description" :value="getUniversity?.university?.description"></textarea>
                    <div class="d-flex flex-row">
                        <label for="link-to-website" class="fw-bold pt-4 me-1">Link</label>
                        <input type="url" class="form-control mt-3" id="link-to-website" name="link_to_website" :placeholder="getUniversity?.university?.link_to_website" :value="getUniversity?.university?.link_to_website">
                    </div>
                    <div class="text-end pt-2">
                        <button class="btn" id="btn" type="submit">Update</button>
                    </div>
                </form>
                <!-- <div class="text-end">{{ getUniversity?.university?.city }}, {{ getUniversity?.university?.address }}</div> -->
                <!-- <div class="pt-3">&emsp;{{ getUniversity?.university?.description }}</div> -->
                <!-- <div class="text-end pt-2">
                    <a class="btn" id="btn" :href="getUniversity?.university?.link_to_website" target="_blank">More info</a>
                </div> -->
            </div>
            <div class="col"></div>
        </div>
        <!-- <div class="row">
            <div class="col"></div>
            <div class="col-10">
                <h5 class="pt-3 fw-bold">Общежитие</h5>
                <div v-for="dorm in getUniversity?.university?.dorms" :key="dorm.id">
                    <div class="card p-2">
                        <div>{{ dorm.address }}</div>
                        <div class="py-2">&emsp;{{ dorm.description }}</div>
                        <div class="card-footer text-end pt-2">Стоимость: {{ dorm.price_tenge }} KZT</div>
                    </div>
                </div>
            </div>
            <div class="col"></div>
        </div> -->
        <div class="row">
            <div class="col"></div>
            <div class="col-10">
                <h5 class="pt-3 fw-bold">Специальности</h5>
                <div v-for="specialty in getUniversity?.university?.specialties" :key="specialty.id"> 
                    <div class="card p-2 mt-3">
                        <div>{{ specialty.name }}</div>
                        <div class="py-2">&emsp;{{ specialty.description }}</div>
                        <div v-for="specialityUniversity in getUniversity?.specialityUniversity" :key="specialityUniversity.id">
                            <div v-if="specialityUniversity.specialty_id === specialty.id">
                                <div class="card-footer text-end pt-2">Стоимость: {{ specialityUniversity.price_per_year_tenge }} KZT</div>
                            </div>
                            <div v-for="exam in specialityUniversity.exams" :key="exam.id">
                                <div v-if=" exam.pivot.speciality_university_id === specialty.id">
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
        // const getErrors = computed(() => store.getters['universities/getUniversity']);

        function updateUniversity(event) {
            const {name, city, address, description, link_to_website} = Object.fromEntries(new FormData(event.target));
            this.name = name;
            this.city = city;
            this.address = address;
            this.description = description;
            this.link_to_website = link_to_website;

            const updateForm = {
                name: this.name,
                city: this.city,
                address: this.address,
                description: this.description,
                link_to_website: this.link_to_website
            };

            store.dispatch("universities/updateUniversity", {
                name: this.name,
                city: this.city,
                address: this.address,
                description: this.description,
                link_to_website: this.link_to_website,
                id: id
            });
            
            return updateForm;
        }

        onMounted(() => {
            store.dispatch("universities/fetchUniversity", id);
        });

        return {
            getUniversity,
            id,
            updateUniversity
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

.form-control {
    background-color: #fffdd0
}

input {
    border-color: #008080;
}
textarea {
    border-color: #008080;
}
</style>