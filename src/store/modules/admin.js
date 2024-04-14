import axios from "axios";
import router from "@/router/index.js";

const state = {
    errors: [],
    currentAdmin: [],
    token: '',
    isLogeed: false,
};

const getters = {
    getCurrentAdmin: (state) => state.currentAdmin,
    getToken: (state) => state.token,
    getErrors: (state) => state.errors,
    isLogged: (state) => state.isLogeed,
};

const actions = {
    async login({ commit }, { name, password }){
        try {
            const admin = await axios.post(
                "auth/admins/signin", { name, password }
            ).then(response => (this.admin = response));

            axios.defaults.headers.common['Authorization'] = `Bearer ${admin.data.token}`;
            router.push({ name: 'AdminMain' });

            commit("SET_ADMIN", admin.data.user);
            commit("SET_TOKEN", admin.data.token);
            commit("SET_ISLOGGED", true);
        }
        catch(error) {
            if(error.response != undefined) {
                commit("SET_ERRORS", error);
            }
        }
    },
    async logOut({ commit }){
        try {
            await axios.post(
                "auth/admins/signout"
            );

            axios.defaults.headers.common['Authorization'] = `Bearer`;
            router.push({ name: 'MainApp' });
            commit("SET_ADMIN", null);
            commit("SET_TOKEN", null);
            commit("SET_ISLOGGED", false);
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
    SET_ISLOGGED(state, bool) {
        state.isLogeed = bool;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}