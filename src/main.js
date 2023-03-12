import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import MainComponent from "./components/main/MainComponent.vue";
import ResponseDisplayComponent from "./components/main/ResponseDisplayComponent.vue";

import NavBar from "./components/commons/NavBar.vue";
import LoginComponent from "./components/login/LoginComponent.vue";
import RegisterComponent from "./components/register/RegisterComponent.vue";
import HistoryComponent from "./components/history/HistoryComponent.vue";
import InformationComponent from "./components/information/InformationComponent.vue"


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: MainComponent,
    },
    {
      path: "/login",
      component: LoginComponent,
    },
    {
      path: "/register",
      component: RegisterComponent,
    },
    {
      path: "/history",
      component: HistoryComponent,
    },
    {
      path: "/information",
      component: InformationComponent
    }
  ],
});

const app = createApp(App);
app.use(router);

app.component("nav-bar", NavBar);
app.component("response-display-component", ResponseDisplayComponent)

app.mount("#app");
