<template>
    <div class="container pt-3">
        <h1 class="text-center">Мамандықты жариялау</h1>
        <div class="d-flex justify-content-center">
            <form class="w-50 border p-3" @submit.prevent="postSpeciality">
                <div class="form-group">
                    <label for="name">Аты</label>
                    <input type="text" class="form-control" id="name" placeholder="Enter name"  v-model="specialityForm.name" style="background-color: #008080">
                </div>
                <div class="form-group pt-2">
                    <label for="description">Сипаттама</label>
                    <textarea type="text" class="form-control" id="description" placeholder="Enter description"  v-model="specialityForm.description" style="background-color: #008080"></textarea>
                </div>
                <div class="alert alert-danger mt-2" v-if="getMessages?.response?.data?.message">{{ getMessages?.response?.data?.message }}</div>
                <div class="alert alert-success mt-2" v-if="getMessages?.success">{{ getMessages?.success }}</div>
                <button type="submit" id="loginBtn" class="btn  mt-2">Жариялау</button>
            </form>
        </div> 
    </div>
</template>

<script>
    import { reactive, computed } from "vue";
    import { useStore } from "vuex";
    import { useRoute } from "vue-router";
    // import router from "@/router/index.js";

    export default {
        setup() {
            const specialityForm = reactive({
                name: '',
                description: '',
            });

            const store = useStore();

            const route = useRoute();

            const id = computed(() => route.params.id);

            const getMessages = computed(() => store.getters["specialties/getMessages"]);

            function postSpeciality(){
                store.dispatch("specialties/postSpeciality", {
                    id: id,
                    name: specialityForm.name,
                    description: specialityForm.description,
                });

                // router.push({ name: 'AdminSpecialties' });
            }

            return {
                postSpeciality,
                specialityForm,
                getMessages
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