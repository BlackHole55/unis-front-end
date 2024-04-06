import axios from "axios";
import router from "@/router/index.js";

const state = {
    errors: [],
    currentAdmin: [],
    token: [],
};

const getters = {
    getCurrentAdmin: (state) => state.currentAdmin,
    getErrors: (state) => state.errors,
};

const actions = {
    async login({ commit }, { name, password }){
        try {
            const admin = await axios.post(
                "auth/admins/signin", { name, password }
            ).then(response => (this.admin = response));
            console.log(admin.data.user);
            // localStorage.setItem('token', admin.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${admin.data.token}`;
            router.push({ name: 'AdminMain' });
            commit("SET_ADMIN", admin.data.user);
            commit("SET_TOKEN", admin.data.token);
        }
        catch(error) {
            if(error.response != undefined) {
                commit("SET_ERRORS", error);
            }
        }
    }
};

const mutations = {
    SET_ADMIN(state, admin) {
        state.currentAdmin = admin;
    },
    SET_TOKEN(state, token) {
        state.token = token;
    },
    SET_ERRORS(state, error) {
        state.errors = error;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}