import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import store from './store/index.js'

import NavBar from './components/NavBar.vue'
import ModelCard from './components/ModelCard.vue'
import Loader from './components/Loader.vue'
import DisplayAnalysisCard from './components/DisplayAnalysisCard.vue'

const app = createApp(App)

app.use(router)
app.use(store)

app.component('nav-bar', NavBar)
app.component('model-card', ModelCard)
app.component('loader', Loader)
app.component('display-analysis-card', DisplayAnalysisCard)

app.mount('#app')
