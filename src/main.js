import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import Markdown from "vue3-markdown-it";

const app = createApp();

app.use(Markdown);

createApp(App).mount("#app");
