<template>
    <div class="container pt-3">
        <h1 class="text-center">Емтиханды жариялау</h1>
        <div class="d-flex justify-content-center">
            <form class="w-50 border p-3" @submit.prevent="postExam">
                <div class="form-group">
                    <label for="name">Аты</label>
                    <input type="text" class="form-control" id="name" placeholder="Enter name"  v-model="examForm.name" style="background-color: #008080">
                </div>
                <div class="form-group pt-2">
                    <label for="description">Сипаттама</label>
                    <textarea type="text" class="form-control" id="description" placeholder="Enter description"  v-model="examForm.description" style="background-color: #008080"></textarea>
                </div>
                <div class="form-group pt-2">
                    <label for="link-to-website">Емтиханның веб-сайтына сілтеме</label>
                    <input type="url" class="form-control" id="link-to-website" placeholder="Enter link"  v-model="examForm.link_to_website" style="background-color: #008080">
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
    // import router from "@/router/index.js";

    export default {
        setup() {
            const examForm = reactive({
                name: '',
                description: '',
                link_to_website: '',
            });

            const store = useStore();

            const getMessages = computed(() => store.getters["exams/getMessages"]);

            function postExam(){
                store.dispatch("exams/postExam", {
                    name: examForm.name,
                    description: examForm.description,
                    link_to_website: examForm.link_to_website
                });

                // router.push({ name: 'AdminSpecialties' });
            }

            return {
                postExam,
                examForm,
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
#link-to-website {
    color: #fffdd0;
}
#description {
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