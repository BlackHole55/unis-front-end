import axios from "axios";

const state = {
    universities: [],
    searchedUniversities: [],
};

const getters = {
    getUniversities: (state) => state.universities,
    getSearchedUniversities: (state) => state.searchedUniversities,
    // getFileredUniversities: (state) => state.fetchUniversities,
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
            alert(error);
            console.log(error);
        }
    },
    // async setSearch({ commit }, search) {
    //     try {
    //         commit("SET_SEARCH", )
    //     }
    // }
    async search({ commit }, search){
        try {
            const searchedUniversities = await axios.post(
                "http://localhost:8000/api/v1/universities/search", search, {
                    headers: {
                        'Accept': 'application/json',
                    }
                }
            ).then(response => (this.searchedUniversities = response));
            commit("SET_UNIVERSITIES", searchedUniversities.data);
        }
        catch (error) {
            alert(error);
            console.log(error);
        }
    }
};

const mutations = {
    SET_UNIVERSITIES(state, universities) {
        state.universities = universities;
        state.searchedUniversities = universities;
    },
    // SET_SEARCHED_UNIVERSITIES(state, data) {
    //     state.searchedUniversities = data;
    // }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }