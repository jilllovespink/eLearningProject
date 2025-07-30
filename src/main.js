import { createApp } from "vue";
import { createPinia } from "pinia";
// import { makeServer } from "@/mocks/server";
import router from "./router";
import App from "./App.vue";
// import "@/mocks/server";

import "./style.css";
// if (process.env.NODE_ENV === "development") {
//   makeServer();
// }

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
