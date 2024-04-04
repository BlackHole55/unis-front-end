import { createStore } from "vuex"

import universities from "./modules/universities"
import admin from "./modules/admin"

export default createStore({
    modules: {
        universities,
        admin
    },
})