import axios from "axios";

const state = {
    specialties: [],
    speciality: [],
    errors: [],
    messages: [],
};

const getters = {
    getSpecialties: (state) => state.specialties,
    getSpeciality: (state) => state.speciality,
    getErrors: (state) => state.errors,
    getMessages: (state) => state.messages,
};

const actions = {
    async fetchSpecialties({ commit }) {
        try {
            const specialties = await axios.get(
                "specialties"
            ).then(response => (this.specialties = response));
            commit("SET_SPECIALTIES", specialties.data);
        }
        catch (error) {
            if(error.response != undefined) {
                commit("SET_ERRORS", error);
                console.log(error);
            }
        }
    },
    async moveToPage({ commit }, pageUrl) {
        try {
            const specialities = await axios.get(
                pageUrl
            ).then(response => (this.specialities = response));
            commit("SET_SPECIALTIES", specialities.data);
        }
        catch (error) {
            if(error.response != undefined) {
                commit("SET_ERRORS", error);
                console.log(error);
            }
        }
    },
    async fetchSpeciality({ commit }, id) {
        const url = "specialties/" + id.value;
        try {
            const speciality = await axios.get(
                url
            ).then(response => (this.speciality = response));
            commit("SET_SPECIALITY", speciality.data);
        }
        catch (error) {
            if(error.response != undefined) {
                commit("SET_ERRORS", error);
                console.log(error);
            }
        }
    },
    async postSpeciality({ commit }, {name, description}) {
        console.log(name, description);
        try {
            const speciality = await axios.post(
                "specialties", { name, description }
            ).then(response => (this.speciality = response));
            commit("SET_MESSAGES", speciality.data);
        }
        catch (error) {
            if(error.response != undefined) {
                commit("SET_MESSAGES", error);
                console.log(error);
            }
        }
    },
    async updateSpeciality({ commit }, {name, description, id}) {
        const url = "specialties/" + id.value;
        try {
            const speciality = await axios.patch(
                url, {name, description}
            ).then(response => (this.speciality = response));
            commit("SET_MESSAGES", speciality.data);
        }
        catch (error) {
            if(error.response != undefined) {
                commit("SET_MESSAGES", error);
                console.log(error);
            }
        }
    },
    async deleteSpeciality({ commit }, id) {
        const url = "specialties/" + id;
        try {
            const speciality = await axios.delete(
                url
            ).then(response => (this.speciality = response));
            commit("SET_MESSAGES", speciality.data);
        }
        catch (error) {
            if(error.response != undefined) {
                commit("SET_ERRORS", error);
                console.log(error);
            }
        }
    },
    async search({ commit }, search){
        try {
            const specialties = await axios.post(
                "specialties/search", search,
            ).then(response => (this.specialties = response));
            commit("SET_SPECIALTIES", specialties.data);
            console.log(specialties.data);
        }
        catch (error) {
            if(error.response != undefined) {
                commit("SET_ERRORS", error);
                console.log(error);
            }
        }
    },
};

const mutations = {
    SET_SPECIALTIES(state, specialties){
        state.specialties =specialties;
    },
    SET_SPECIALITY(state, speciality){
        state.speciality = speciality;
    },
    SET_ERRORS(state, errors){
        state.errors = errors;
    },
    SET_MESSAGES(state, messages){
        state.messages = messages;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}