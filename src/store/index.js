import { createStore } from "vuex"
import VuexPersist from "vuex-persist"

import universities from "./modules/universities"
import admin from "./modules/admin"

const vuexSessionStorage = new VuexPersist({
    key: 'vuex',
    storage: window.sessionStorage,
    modules: ['admin'],
});

export default createStore({
    modules: {
        universities,
        admin
    },
    plugins: [vuexSessionStorage.plugin],
});