import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import Umoni from "../../../../packages/core";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Umoni, {
  dsn: "aaa.com",
  appId: "123",
});

app.mount("#app");
