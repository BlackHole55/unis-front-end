import axios from "axios";

const state = {
    dorms: [],
    dorm: [],
    errors: [],
    messages: [],
};

const getters = {
    getDorms: (state) => state.dorms,
    getDorm: (state) => state.dorm,
    getErrors: (state) => state.errors,
    getMessages: (state) => state.messages,
};

const actions = {
    async fetchDorms({ commit }) {
        try {
            const dorms = await axios.get(
                "dorms"
            ).then(response => (this.dorms = response));
            commit("SET_DORMS", dorms.data);
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
            const dorms = await axios.get(
                pageUrl
            ).then(response => (this.dorms = response));
            commit("SET_DORMS", dorms.data);
        }
        catch (error) {
            if(error.response != undefined) {
                commit("SET_ERRORS", error);
                console.log(error);
            }
        }
    },
    async fetchDorm({ commit }, id) {
        const url = "dorms/" + id.value;
        try {
            const dorm = await axios.get(
                url
            ).then(response => (this.dorm = response));
            commit("SET_DORM", dorm.data);
        }
        catch (error) {
            if(error.response != undefined) {
                commit("SET_ERRORS", error);
                console.log(error);
            }
        }
    },
    async postDorm({ commit }, {id, city, address, description, price_tenge}) {
        const url = "universities/" + id.value + "/dorms";
        try {
            const dorm = await axios.post(
                url, {city, address, description, price_tenge}
            ).then(response => (this.dorm = response));
            commit("SET_DORM", dorm.data);
        }
        catch (error) {
            if(error.response != undefined) {
                commit("SET_ERRORS", error);
                console.log(error);
            }
        }
    },
    async updateDorm({ commit }, {id, city, address, description, price_tenge}) {
        const url = "universities/dorms/" + id.value;
        try {
            const dorm = await axios.patch(
                url, {city, address, description, price_tenge}
            ).then(response => (this.dorm = response));
            commit("SET_MESSAGES", dorm.data);
        }
        catch (error) {
            if(error.response != undefined) {
                commit("SET_MESSAGES", error);
                console.log(error);
            }
        }
    },
    async deleteDorm({ commit }, id) {
        const url = "universities/dorms/" + id;
        try {
            const dorm = await axios.delete(
                url
            ).then(response => (this.dorm = response));
            commit("SET_MESSAGES", dorm.data);
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
            const dorms = await axios.post(
                "dorms/search", search,
            ).then(response => (this.dorms = response));
            commit("SET_DORMS", dorms.data);
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
    SET_DORMS(state, dorms){
        state.dorms = dorms;
    },
    SET_DORM(state, dorm){
        state.dorm = dorm;
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