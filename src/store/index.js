import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

import authModule from './modules/auth/index.js'

const vuexSessionStorage = new VuexPersistence({
    key: 'vuex',
    storage: window.sessionStorage
})


const store = createStore({
    modules: {
        auth: authModule,
    },
    plugins: [vuexSessionStorage.plugin]
})

export default store;