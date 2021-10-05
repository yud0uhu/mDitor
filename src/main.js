import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import Markdown from "vue3-markdown-it";
import "highlight.js/styles/monokai.css";

const app = createApp();

app.use(Markdown);

createApp(App).mount("#app");
