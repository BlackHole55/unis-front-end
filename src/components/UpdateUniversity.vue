<template>
    <div class="container pt-3">
        <div class="row">
            <div class="col"></div>
            <div class="col-10">
                <form @submit.prevent="updateUniversity">
                    <input type="text" class="form-control form-control-lg text-center h5 fw-bold" id="name" name="name" placeholder="Enter name" :value="getUniversity?.university?.name">
                    <div class="d-flex flex-row">
                        <label for="city" class="fw-bold pt-2 pe-1">City</label>
                        <input type="text" class="form-control text-end" id="city" name="city" placeholder="Enter city" :value="getUniversity?.university?.city">
                        <label for="city" class="fw-bold pt-2 ps-2 pe-1">Address</label>
                        <input type="text" class="form-control text-end" id="address" name="address" placeholder="Enter address" :value="getUniversity?.university?.address">
                    </div>
                    <textarea type="text" class="form-control mt-3" id="description" name="description" placeholder="Enter description" :value="getUniversity?.university?.description"></textarea>
                    <div class="d-flex flex-row">
                        <label for="link-to-website" class="fw-bold pt-4 me-1">Link</label>
                        <input type="url" class="form-control mt-3" id="link-to-website" name="link_to_website" placeholder="Enter link to website" :value="getUniversity?.university?.link_to_website">
                    </div>
                    <div class="text-end pt-3">
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
        <div class="row">
            <div class="col"></div>
            <div class="col-10">
                <h5 class="pt-3 fw-bold">Add/Edit Специальности</h5>
                <form @submit.prevent="addSpeciality">
                    <div class="d-flex flex-row">
                        <label for="specId" class="fw-bold pt-2 me-1" id="speciality-id-label">Speciality ID</label>
                        <input type="number" class="form-control text-end" id="specId" name="specId" placeholder="Enter speciality id">
                    </div>
                    <div class="d-flex flex-row pt-3">
                        <label for="price" class="fw-bold pt-2 me-1" id="speciality-price-label">Price / year</label>
                        <input type="number" class="form-control text-end" id="price" name="price" placeholder="Enter price">
                    </div>
                    <div class="text-end pt-3">
                        <button class="btn" id="btn" type="submit">Add</button> 
                    </div>
                </form>
                <h5 class="pt-3 fw-bold">Add Экзамены</h5>
                <form @submit.prevent="addExam">
                    <div class="d-flex flex-row">
                        <label for="specialityUniversityId" class="fw-bold pt-2 me-1" id="speciality-university-id-label">ID</label>
                        <input type="number" class="form-control text-end" id="specialityUniversityId" name="specialityUniversityId" placeholder="Enter ID">
                    </div>
                    <div class="d-flex flex-row pt-3">
                        <label for="examId" class="fw-bold pt-2 me-1" id="exam-id-label">Exam ID</label>
                        <input type="number" class="form-control text-end" id="examId" name="examId" placeholder="Enter exam id">
                    </div>
                    <div class="text-end pt-3">
                        <button class="btn" id="btn" type="submit">Add</button> 
                    </div>
                </form>
                <h5 class="pt-3 fw-bold">Специальности</h5>
                <div v-for="specialty in getUniversity?.university?.specialties" :key="specialty.id"> 
                    <div class="card p-2 mt-3">
                        <div>{{ specialty.name }}</div>
                        <div class="py-2">&emsp;{{ specialty.description }}</div>
                        <div v-for="specialityUniversity in getUniversity?.specialityUniversity" :key="specialityUniversity.id">
                            <div v-if="specialityUniversity.specialty_id === specialty.id">
                                <div>ID: {{ specialityUniversity.id }}</div>
                                <div class="card-footer d-flex justify-content-between pt-2">
                                    <a class="btn btn-outline-danger me-3" @click="removeSpeciality(specialityUniversity.specialty_id)">Delete</a>
                                    <div class="pt-2">Стоимость: {{ specialityUniversity.price_per_year_tenge }} KZT</div>
                                </div>
                            </div>
                            <div v-for="exam in specialityUniversity.exams" :key="exam.id">
                                <div v-if="specialityUniversity.specialty_id === specialty.id">
                                    <div v-if=" exam.pivot.speciality_university_id === specialityUniversity.id">
                                        <div class="card p-2 d-flex flex-row justify-content-between">
                                            <div class="pt-2">{{ exam.name }}</div>
                                            <button class="btn btn-outline-danger me-3" @click="removeExam(exam.pivot)">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col"></div>
        </div>
    </div>
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

        console.log(getUniversity);

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

        function addSpeciality(event) {
            const {specId, price} = Object.fromEntries(new FormData(event.target));

            this.specId = specId;
            this.price = price;

            store.dispatch("universities/addSpeciality", {
                speciality: this.specId,
                price: this.price,
                id: id
            });

            store.dispatch("universities/fetchUniversity", id);
        }

        function removeSpeciality(specId) {
            console.log(specId);


            store.dispatch("universities/removeSpeciality", {
                speciality: specId,
                id: id
            });

            store.dispatch("universities/fetchUniversity", id);
        }

        function addExam(event) {
            const {specialityUniversityId, examId} = Object.fromEntries(new FormData(event.target));

            this.specialityUniversityId = specialityUniversityId;
            this.examId = examId;

            store.dispatch("specialityUniversity/addExam", {
                exam: this.examId,
                id: this.specialityUniversityId,
            });

            store.dispatch("universities/fetchUniversity", id);
        }

        function removeExam(pivot) {
            console.log(pivot);
            store.dispatch("specialityUniversity/removeExam", {
                exam: pivot.exam_id,
                id: pivot.speciality_university_id,
            });

            store.dispatch("universities/fetchUniversity", id);
        }

        onMounted(() => {
            store.dispatch("universities/fetchUniversity", id);
        });

        return {
            getUniversity,
            id,
            updateUniversity,
            addSpeciality,
            removeSpeciality,
            addExam,
            removeExam
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
#speciality-id-label {
    width: 7rem;
}
#speciality-price-label {
    width: 7rem;
}
#exam-id-label {
    width: 7rem;
}
#speciality-university-id-label {
    width: 7rem;
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