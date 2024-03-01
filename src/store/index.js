import { createStore } from "vuex"

import universities from "./modules/universities"

export default createStore({
    modules: {
        universities,
    },
})