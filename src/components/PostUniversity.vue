<template>
    <div class="container pt-3">
        <h1 class="text-center">Post Universtity</h1>
        <div class="d-flex justify-content-center">
            <form class="w-50 border p-3" @submit.prevent="postUniversity">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Enter name"  v-model="form.name" style="background-color: #008080">
                </div>
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
                    <label for="link-to-website">Link to University's Website</label>
                    <input type="url" class="form-control" id="link-to-website" placeholder="Enter link"  v-model="form.link_to_website" style="background-color: #008080">
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

    export default {
        setup() {
            const form = reactive({
                name: '',
                city: '',
                address: '',
                description: '',
                link_to_website: ''
            });

            const store = useStore();

            const getErrors = computed(() => store.getters["universities/getErrors"]);

            function postUniversity(){
                console.log(form);
                store.dispatch("universities/postUniversity", {
                    name: form.name,
                    city: form.city,
                    address: form.address,
                    description: form.description,
                    link_to_website: form.link_to_website,
                });
                console.log(getErrors);
            }

            
            console.log(getErrors);

            return {
                postUniversity,
                form,
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
#link-to-website {
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