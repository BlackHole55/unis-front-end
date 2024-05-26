<template>
    <div class="container pt-3">
        <div class="row">
            <div class="col"></div>
            <div class="col-10">
                <form @submit.prevent="updateUniversity">
                    <input type="text" class="form-control form-control-lg text-center h5 fw-bold" id="name" name="name" placeholder="Enter name" :value="getUniversity?.university?.name">
                    <div class="d-flex flex-row">
                        <label for="city" class="fw-bold pt-2 pe-1">Қала</label>
                        <input type="text" class="form-control text-end" id="city" name="city" placeholder="Enter city" :value="getUniversity?.university?.city">
                        <label for="city" class="fw-bold pt-2 ps-2 pe-1">Мекенжай</label>
                        <input type="text" class="form-control text-end" id="address" name="address" placeholder="Enter address" :value="getUniversity?.university?.address">
                    </div>
                    <textarea type="text" class="form-control mt-3" id="description" name="description" placeholder="Enter description" :value="getUniversity?.university?.description"></textarea>
                    <div class="d-flex flex-row">
                        <label for="link-to-website" class="fw-bold pt-4 me-1">Сілтеме</label>
                        <input type="url" class="form-control mt-3" id="link-to-website" name="link_to_website" placeholder="Enter link to website" :value="getUniversity?.university?.link_to_website">
                    </div>
                    <div class="alert alert-danger mt-2" v-if="getMessages?.response?.data?.message">{{ getMessages?.response?.data?.message }}</div>
                    <div class="alert alert-success mt-2" v-if="getMessages?.success">{{ getMessages?.success }}</div>
                    <div class="text-end pt-3">
                        <button class="btn" id="btn" type="submit">Жаңарту</button>
                    </div>
                </form>
            </div>
            <div class="col"></div>
        </div>
        <div class="row">
            <div class="col"></div>
            <div class="col-10">
                <h5 class="pt-3 fw-bold">Жатақханалар</h5>
                <a class="btn w-100" id="btn" :href="'/admin/university/' + id + '/dorms/post'">Жаңа жатақхананы жариялау</a>
                <div class="mt-3" v-for="dorm in getUniversity?.university?.dorms" :key="dorm.id">
                    <div class="card p-2">
                        <div>{{ dorm.city }}, {{ dorm.address }}</div>
                        <div class="py-2">&emsp;{{ dorm.description }}</div>
                        <div class="card-footer d-flex">
                            <button class="btn btn-outline-danger me-auto" @click="deleteDorm(dorm.id)">Жою</button>
                            <a class="btn me-3" id="btn" :href="'/admin/dorms/' + dorm.id + '/update'">Өңдеу</a>
                            <div class="card-text pt-2" v-if="dorm.price_tenge">{{ dorm.price_tenge }} KZT</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col"></div>
        </div>
        <div class="row">
            <div class="col"></div>
            <div class="col-10">
                <h5 class="pt-3 fw-bold">Мамандықтарды Қосу/Өңдеу</h5>
                <form @submit.prevent="addSpeciality">
                    <div class="d-flex flex-row">
                        <label for="specId" class="fw-bold pt-2 me-1" id="speciality-id-label">Мамандық ID</label>
                        <input type="number" class="form-control text-end" id="specId" name="specId" placeholder="Enter speciality id">
                    </div>
                    <div class="d-flex flex-row pt-3">
                        <label for="price" class="fw-bold pt-2 me-1" id="speciality-price-label">Баға / жыл</label>
                        <input type="number" class="form-control text-end" id="price" name="price" placeholder="Enter price">
                    </div>
                    <div class="text-end pt-3">
                        <button class="btn" id="btn" type="submit">Қосу/Өңдеу</button> 
                    </div>
                </form>
                <h5 class="pt-3 fw-bold">Емтиханды Қосу</h5>
                <form @submit.prevent="addExam">
                    <div class="d-flex flex-row">
                        <label for="specialityUniversityId" class="fw-bold pt-2 me-1" id="speciality-university-id-label">ID</label>
                        <input type="number" class="form-control text-end" id="specialityUniversityId" name="specialityUniversityId" placeholder="Enter ID">
                    </div>
                    <div class="d-flex flex-row pt-3">
                        <label for="examId" class="fw-bold pt-2 me-1" id="exam-id-label">Емтихан ID</label>
                        <input type="number" class="form-control text-end" id="examId" name="examId" placeholder="Enter exam id">
                    </div>
                    <div class="text-end pt-3">
                        <button class="btn" id="btn" type="submit">Қосу</button> 
                    </div>
                </form>
                <h5 class="pt-3 fw-bold" v-if="getUniversity?.university?.specialties?.[0]">Мамандықтар</h5>
                <div v-for="specialty in getUniversity?.university?.specialties" :key="specialty.id"> 
                    <div class="card p-2 mt-3">
                        <div>{{ specialty.name }}</div>
                        <div class="py-2">&emsp;{{ specialty.description }}</div>
                        <div v-for="specialityUniversity in getUniversity?.specialityUniversity" :key="specialityUniversity.id">
                            <div v-if="specialityUniversity.specialty_id === specialty.id">
                                <div>ID: {{ specialityUniversity.id }}</div>
                                <div class="card-footer d-flex justify-content-between pt-2">
                                    <a class="btn btn-outline-danger me-3" @click="removeSpeciality(specialityUniversity.specialty_id)">Жою</a>
                                    <div class="pt-2" v-if="specialityUniversity.price_per_year_tenge">Бағасы: {{ specialityUniversity.price_per_year_tenge }} KZT</div>
                                </div>
                            </div>
                            <div v-for="exam in specialityUniversity.exams" :key="exam.id">
                                <div v-if="specialityUniversity.specialty_id === specialty.id">
                                    <div v-if=" exam.pivot.speciality_university_id === specialityUniversity.id">
                                        <div class="card p-2 mt-2 d-flex flex-row justify-content-between">
                                            <div class="pt-2">{{ exam.name }}</div>
                                            <button class="btn btn-outline-danger me-3" @click="removeExam(exam.pivot)">Жою</button>
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
        const getMessages = computed(() => store.getters["universities/getMessages"]);
        
        onMounted(() => {
            store.dispatch("universities/fetchUniversity", id);
        });

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
            
            store.dispatch("universities/fetchUniversity", id);

            return updateForm;
        }

        function deleteDorm(dormId) {
            store.dispatch("dorms/deleteDorm", dormId);

            store.dispatch("universities/fetchUniversity", id);
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

        return {
            getUniversity,
            id,
            updateUniversity,
            deleteDorm,
            addSpeciality,
            removeSpeciality,
            addExam,
            removeExam,
            getMessages
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