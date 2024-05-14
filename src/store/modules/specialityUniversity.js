import axios from "axios";

const state = {
    errors: [],
    exams: [],
    exam: [],
    message: [],
};

const getters = {
    getErrors: (state) => state.errors,
    getExam: (state) => state.exam,
    getExams: (state) => state.exams,
    getMessage: (state) => state.message
};

const actions = {
    async addExam({ commit }, { exam, id}) {
        const url = "universities/speciality-university/" + id + "/exams";
        try {
            const specialityExams = await axios.post(
                url, {exam}
            ).then(response => (this.specialityExams = response));
            commit("SET_MESSAGE", specialityExams.data);
        }
        catch (error) {
            if(error.response != undefined) {
                commit("SET_ERRORS", error);
                console.log(error);
            }
        }
    },

    async removeExam({ commit }, { exam, id}) {
        const url = "universities/speciality-university/" + id + "/exams";
        try {
            const specialityExams = await axios.delete(
                url, { data: {exam: exam } }
            ).then(response => (this.specialityExams = response));
            commit("SET_MESSAGE", specialityExams.data);
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
    SET_ERRORS(state, errors) {
        state.errors = errors;
    },
    SET_EXAM(state, exam) {
        state.exam = exam;
    },
    SET_EXAMS(state, exams) {
        state.exams = exams;
    },
    SET_MESSAGE(state, message) {
        state.message = message;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};