<template>
    <div class="container pt-3">
        <h1 class="text-center">Post Dorm</h1>
        <div class="d-flex justify-content-center">
            <form class="w-50 border p-3" @submit.prevent="postDorm">
                <div class="form-group pt-2">
                    <label for="city">City</label>
                    <input type="text" class="form-control" id="city" placeholder="Enter city"  v-model="form.city" style="background-color: #008080">
                </div>
                <div class="form-group pt-2">
                    <label for="address">Address</label>
                    <input type="text" class="form-control" id="address" placeholder="Enter address"  v-model="form.address" style="background-color: #008080">
                </div>
                <div class="form-group pt-2">
                    <label for="description">Description</label>
                    <textarea type="text" class="form-control" id="description" placeholder="Enter description"  v-model="form.description" style="background-color: #008080"></textarea>
                </div>
                <div class="form-group pt-2">
                    <label for="price">Price</label>
                    <input type="number" class="form-control" id="price" placeholder="Enter price"  v-model="form.price" style="background-color: #008080">
                </div>
                <div class="alert alert-danger mt-2" v-if="getErrors?.response?.data?.message">{{ getErrors?.response?.data?.message }}</div>
                <button type="submit" id="loginBtn" class="btn  mt-2">Post</button>
            </form>
        </div> 
    </div>
</template>

<script>
    import { reactive, computed } from "vue";
    import { useStore } from "vuex";
    import { useRoute } from "vue-router";
    import router from "@/router/index.js";

    export default {
        setup() {
            const form = reactive({
                city: '',
                address: '',
                description: '',
                price: ''
            });

            const store = useStore();

            const route = useRoute();

            const id = computed(() => route.params.id);

            const getErrors = computed(() => store.getters["universities/getErrors"]);

            function postDorm(){
                store.dispatch("dorms/postDorm", {
                    id: id,
                    city: form.city,
                    address: form.address,
                    description: form.description,
                    price_tenge: form.price,
                });

                router.push({ name: 'UpdateUniversity', params: { id: id.value } });
            }

            return {
                postDorm,
                form,
                id,
                getErrors
            }
        }
    }
</script>

<style scoped>
/* Class works incorrect. Temporarily using ids */
#name {
    color: #fffdd0;
}
#city {
    color: #fffdd0;
}
#address {
    color: #fffdd0;
}
#description {
    color: #fffdd0;
}
#price {
    color: #fffdd0;
}

#loginBtn{
    border-color: #008080;
    color: #008080;
}
#loginBtn:hover{
    background-color: #008080;
    color: #fffdd0;
}
.container {
  border: 1;
}
</style>