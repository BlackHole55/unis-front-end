<template>
    <div class="container pt-3">
        <div class="row">
            <div class="col"></div>
            <div class="col-10">
                <form @submit.prevent="updateSpeciality">
                    <input type="text" class="form-control form-control-lg text-center h5 fw-bold" id="name" name="name" placeholder="Enter name" :value="getSpeciality?.speciality?.name">
                    <textarea type="text" class="form-control mt-3" id="description" name="description" placeholder="Enter description" :value="getSpeciality?.speciality?.description"></textarea>
                    <div class="text-end pt-3">
                        <button class="btn" id="btn" type="submit">Update</button>
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

        const getSpeciality = computed(() => store.getters["specialties/getSpeciality"]);
        // const getErrors = computed(() => store.getters['universities/getUniversity']);

        console.log(getSpeciality);

        onMounted(() => {
            store.dispatch("specialties/fetchSpeciality", id);
        });

        function updateSpeciality(event) {
            const {name, description} = Object.fromEntries(new FormData(event.target));
            this.name = name;
            this.description = description;

            const updateForm = {
                name: this.name,
                description: this.description,
            };

            store.dispatch("specialties/updateSpeciality", {
                name: this.name,
                description: this.description,
                id: id
            });
            
            return updateForm;
        }


        return {
            getSpeciality,
            id,
            updateSpeciality,
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