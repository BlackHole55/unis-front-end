import { createStore } from 'vuex'
import axios from "axios"

export default createStore({
    state: {
        universities: [],
    },
    getters: {
        getUniversities: (state) => state.universities,
    },
    actions: {
        async fetchUniversities({ commit }) {
            try {
                const universities = await axios.get(
                    "http://localhost:8000/api/v1/universities"
                ).then(response => (this.universities = response));
                commit("SET_UNIVERSITIES", universities.data);
            }
            catch (error) {
                alert(error);
                console.log(error);
            }
        },
    },
    mutations: {
        SET_UNIVERSITIES(state, data) {
            state.universities = data;
        },
    },
})