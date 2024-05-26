<template>
    <div class="container pt-3">
      <div class="row">
        <div class="col"></div>
        <div class="col-lg-8">
          <h1 class="text-center">Кіру</h1>
          <div class="d-flex justify-content-center">
            <form class="w-75 border p-3" @submit.prevent="login">
              <div class="form-group">
                <label for="name">Аты</label>
                <input type="text" class="form-control" id="name" aria-label="name" placeholder="Enter name"  v-model="form.name" style="background-color: #008080">
              </div>
              <div class="form-group pt-2">
                <label for="password">Құпия сөз</label>
                <input type="password" class="form-control" id="password" placeholder="Password"  v-model="form.password" style="background-color: #008080">
              </div>
              <button type="submit" id="loginBtn" class="btn  mt-2">Кіру</button>
              <div class="alert alert-danger mt-2" v-if="getErrors?.response?.data?.message">{{ getErrors?.response?.data?.message }}</div>
            </form>
          </div>
        </div>
        <div class="col"></div>
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
      password: ''
    });

    const store = useStore();

    function login() {
      store.dispatch("admin/login", {
        name: form.name,
        password: form.password
      });
    }

    const getCurrentAdmin = computed(() => store.getters["admin/getCurrentAdmin"]);
    const getErrors = computed(() => store.getters["admin/getErrors"]);

    const getToken = computed(() => store.getters["admin/getToken"]);

    return {
        login,
        form,
        getCurrentAdmin,
        getErrors,
        getToken,
    }
  }
}
</script>

<style scoped>
#name {
  color: #fffdd0;
}
#password {
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