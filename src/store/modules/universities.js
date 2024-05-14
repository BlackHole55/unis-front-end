import axios from "axios";

const state = {
    searchedUniversities: [],
    university: [],
    errors: [],
    universitySpeciality: [],
    messages: [],
};

const getters = {
    getSearchedUniversities: (state) => state.searchedUniversities,
    getUniversity: (state) => state.university,
    getErrors: (state) => state.errors,
    getUniversitySpeciality: (state) => state.universitySpeciality,
    getMessages: (state) => state.messages,
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

    async postUniversity({ commit }, {name, city, address, description, link_to_website}){
        try {
            const university = await axios.post(
                "universities", {name, city, address, description, link_to_website}
            ).then(response => (this.university = response));
            commit("SET_UNIVERSITY", university.data);
        }
        catch (error) {
            if(error.response != undefined) {
                commit("SET_ERRORS", error);
            }
        }
    },

    async updateUniversity({ commit }, {name, city, address, description, link_to_website, id}){
        const url = "universities/" + id.value;
        try {
            const university = await axios.patch(
                url, {name, city, address, description, link_to_website}
            ).then(response => (this.university = response));
            commit("SET_UNIVERSITY", university.data);
        }
        catch (error) {
            if(error.response != undefined) {
                commit("SET_ERRORS", error);
                console.log(error);
            }
        }
    },

    async deleteUniversity({ commit }, id) {
        const url = "universities/" + id;
        try {
            const university = await axios.delete(
                url
            ).then(response => (this.university = response));
            commit("SET_MESSAGES", university);
        }
        catch (error) {
            if(error.response != undefined) {
                commit("SET_ERRORS", error);
                console.log(error);
            }
        }
    },

    async addSpeciality({ commit }, {speciality, price, id}){
        const url = "universities/" + id.value + "/specialties";
        try {
            const universitySpeciality = await axios.post(
                url, {speciality, price}
            ).then(response => (this.universitySpeciality = response));
            commit("SET_UNIVERSITY_SPECIALITY", universitySpeciality);
        }
        catch (error) {
            if(error.response != undefined) {
                commit("SET_ERRORS", error);
                console.log(error);
            }
        }
    },

    async removeSpeciality({ commit }, {speciality, id}){
        const url = "universities/" + id.value + "/specialties";
        console.log(speciality);
        console.log(id.value);
        try {
            const universitySpeciality = await axios.delete(
                url, { data: {speciality: speciality } }
            ).then(response => (this.universitySpeciality = response));
            commit("SET_UNIVERSITY_SPECIALITY", universitySpeciality);
        }
        catch (error) {
            if(error.response != undefined) {
                commit("SET_ERRORS", error);
                console.log(error);
            }
        }
    }
};

const mutations = {
    SET_UNIVERSITIES(state, universities) {
        state.searchedUniversities = universities;
    },
    SET_UNIVERSITY(state, university) {
        state.university = university;
    },
    SET_ERRORS(state, error) {
        state.errors = error;
    },
    SET_UNIVERSITY_SPECIALITY(state, universitySpeciality) {
        state.universitySpeciality = universitySpeciality;
    },
    SET_MESSAGES(state, messages) {
        state.messages = messages;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }