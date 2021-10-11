import { createApp } from "vue";
import App from "./App.vue";
import Markdown from "vue3-markdown-it";
import "./index.css";

createApp(App)
  .use(Markdown)
  .mount("#app");
