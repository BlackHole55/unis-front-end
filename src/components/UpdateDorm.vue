<template>
    <div class="container pt-3">
        <div class="row">
            <div class="col"></div>
            <div class="col-10">
                <form @submit.prevent="updateDorm">
                    <div class="d-flex flex-row">
                        <label for="city" class="fw-bold pt-2 pe-1">City</label>
                        <input type="text" class="form-control text-end" id="city" name="city" placeholder="Enter city" :value="getDorm?.dorm?.city">
                        <label for="city" class="fw-bold pt-2 ps-2 pe-1">Address</label>
                        <input type="text" class="form-control text-end" id="address" name="address" placeholder="Enter address" :value="getDorm?.dorm?.address">
                    </div>
                    <textarea type="text" class="form-control mt-3" id="description" name="description" placeholder="Enter description" :value="getDorm?.dorm?.description"></textarea>
                    <div class="d-flex flex-row">
                        <label for="price" class="fw-bold pt-4 me-1">Link</label>
                        <input type="number" class="form-control mt-3" id="price" name="price" placeholder="Enter price" :value="getDorm?.dorm?.price_tenge">
                    </div>
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

        const getDorm = computed(() => store.getters["dorms/getDorm"]);
        // const getErrors = computed(() => store.getters['universities/getUniversity']);

        console.log(getDorm);

        onMounted(() => {
            store.dispatch("dorms/fetchDorm", id);
        });

        function updateDorm(event) {
            const {city, address, description, price} = Object.fromEntries(new FormData(event.target));
            this.city = city;
            this.address = address;
            this.description = description;
            this.price_tenge = price;

            const updateForm = {
                city: this.city,
                address: this.address,
                description: this.description,
                price_tenge: this.price_tenge
            };

            store.dispatch("dorms/updateDorm", {
                name: this.name,
                city: this.city,
                address: this.address,
                description: this.description,
                price_tenge: this.price_tenge,
                id: id
            });
            
            return updateForm;
        }

        function deleteDorm(dormId) {
            store.dispatch("dorms/deleteDorm", dormId);

            store.dispatch("universities/fetchUniversity", id);
        }

        return {
            getDorm,
            id,
            updateDorm,
            deleteDorm,
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