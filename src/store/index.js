import { createStore } from "vuex"
import VuexPersist from "vuex-persist"

import universities from "./modules/universities"
import admin from "./modules/admin"
import specialityUniversity from "./modules/specialityUniversity";

const vuexSessionStorage = new VuexPersist({
    key: 'vuex',
    storage: window.sessionStorage,
    modules: ['admin'],
});

export default createStore({
    modules: {
        universities,
        admin,
        specialityUniversity
    },
    plugins: [vuexSessionStorage.plugin],
});