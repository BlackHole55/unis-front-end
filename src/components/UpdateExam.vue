<template>
    <div class="container pt-3">
        <div class="row">
            <div class="col"></div>
            <div class="col-10">
                <form @submit.prevent="updateExam">
                    <input type="text" class="form-control form-control-lg text-center h5 fw-bold" id="name" name="name" placeholder="Enter name" :value="getExam?.exam?.name">
                    <textarea type="text" class="form-control mt-3" id="description" name="description" placeholder="Enter description" :value="getExam?.exam?.description"></textarea>
                    <div class="d-flex flex-row">
                        <label for="link-to-website" class="fw-bold pt-4 me-1">Сілтеме</label>
                        <input type="url" class="form-control mt-3" id="link-to-website" name="link_to_website" placeholder="Enter link to website" :value="getExam?.exam?.link_to_website">
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

        const getExam = computed(() => store.getters["exams/getExam"]);
        const getMessages = computed(() => store.getters["exams/getMessages"]);

        onMounted(() => {
            store.dispatch("exams/fetchExam", id);
        });

        function updateExam(event) {
            const {name, description, link_to_website} = Object.fromEntries(new FormData(event.target));
            this.name = name;
            this.description = description;
            this.link_to_website = link_to_website;

            const updateForm = {
                name: this.name,
                description: this.description,
                link_to_website: this.link_to_website,
            };

            store.dispatch("exams/updateExam", {
                name: this.name,
                description: this.description,
                link_to_website: this.link_to_website,
                id: id
            });

            store.dispatch("exams/fetchExam", id);
            
            return updateForm;
        }


        return {
            getExam,
            id,
            updateExam,
            getMessages,
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