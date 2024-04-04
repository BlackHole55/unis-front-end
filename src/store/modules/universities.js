import axios from "axios";

const state = {
    searchedUniversities: [],
    university: [],
};

const getters = {
    getSearchedUniversities: (state) => state.searchedUniversities,
    getUniversity: (state) => state.university,
};

const actions = {
    async fetchUniversities({ commit }) {
        try {
            const universities = await axios.get(
                "http://localhost:8000/api/v1/universities"
            ).then(response => (this.universities = response));
            commit("SET_UNIVERSITIES", universities.data);
        }
        catch (error) {
            console.log(error);
        }
    },

    async search({ commit }, search){
        try {
            const searchedUniversities = await axios.post(
                "universities/search", search,
            ).then(response => (this.searchedUniversities = response));
            commit("SET_UNIVERSITIES", searchedUniversities.data);
        }
        catch (error) {
            console.log(error);
        }
    },

    async fetchUniversity({ commit }, id){
        const url = "universities/" + id.value;
        try {
            const university = await axios.get(
                url
            ).then(response => (this.university = response));
            commit("SET_UNIVERSITY", university.data);
        }
        catch (error) {
            console.log(error);
        }
    },
};

const mutations = {
    SET_UNIVERSITIES(state, universities) {
        state.searchedUniversities = universities;
    },
    SET_UNIVERSITY(state, university) {
        state.university = university;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }