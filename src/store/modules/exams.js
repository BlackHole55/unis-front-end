import axios from "axios";

const state = {
    errors: [],
    messages: [],
    exams: [],
    exam: [],
};

const getters = {
    getErrors: (state) => state.errors,
    getMessages: (state) => state.messages,
    getExams: (state) => state.exams,
    getExam: (state) => state.exam
};

const actions = {
    async fetchExams({ commit }) {
        try {
            const exams = await axios.get(
                "exams"
            ).then(response => (this.exams = response));
            commit("SET_EXAMS", exams.data);
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
            const exams = await axios.get(
                pageUrl
            ).then(response => (this.exams = response));
            commit("SET_EXAMS", exams.data);
        }
        catch (error) {
            if(error.response != undefined) {
                commit("SET_ERRORS", error);
                console.log(error);
            }
        }
    },
    async fetchExam({ commit }, id) {
        const url = "exams/" + id.value;
        try {
            const exam = await axios.get(
                url
            ).then(response => (this.exam = response));
            commit("SET_EXAM", exam.data);
        }
        catch (error) {
            if(error.response != undefined) {
                commit("SET_ERRORS", error);
                console.log(error);
            }
        }
    },
    async postExam({ commit }, {name, description, link_to_website}) {
        const url = "exams";
        try {
            const exam = await axios.post(
                url, {name, description, link_to_website}
            ).then(response => (this.exam = response));
            commit("SET_MESSAGES", exam.data);
        }
        catch (error) {
            if(error.response != undefined) {
                commit("SET_MESSAGES", error);
                console.log(error);
            }
        }
    },
    async updateExam({ commit }, {id, name, description, link_to_website}) {
        const url = "exams/" + id.value;
        try {
            const exam = await axios.patch(
                url, {name, description, link_to_website}
            ).then(response => (this.exam = response));
            commit("SET_MESSAGES", exam.data);
        }
        catch (error) {
            if(error.response != undefined) {
                commit("SET_MESSAGES", error);
                console.log(error);
            }
        }
    },
    async deleteExam({ commit }, id) {
        const url = "exams/" + id;
        try {
            const exam = await axios.delete(
                url
            ).then(response => (this.exam = response));
            commit("SET_MESSAGES", exam.data);
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
            const exams = await axios.post(
                "exams/search", search,
            ).then(response => (this.exams = response));
            commit("SET_EXAMS", exams.data);
            console.log(exams.data);
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
    SET_ERRORS(state, error) {
        state.errors = error;
    },
    SET_MESSAGES(state, messages) {
        state.messages = messages;
    },
    SET_EXAMS(state, exams) {
        state.exams = exams;
    },
    SET_EXAM(state, exam) {
        state.exam = exam;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}