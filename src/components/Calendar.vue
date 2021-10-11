<template>
  <div>
    <p>Google Calendar API Quickstart</p>
    <p id="content">p</p>
    <button @click="handleClientLoad()">Init Button</button>
  </div>
</template>
<script lang="ts">
// import { defineComponent, onMounted } from '@vue/composition-api'
import { defineComponent, onMounted } from "vue";
/// <reference path="../../node_modules/@types/gapi/index.d.ts" />

// eslint-disable-next-line @typescript-eslint/no-namespace
declare const gapi: any;
export default defineComponent({
  setup() {
    const CLIENT_ID = "";
    const YOUR_CLIENT_SECRET = "";
    // const YOUR_REDIRECT_URL = "http://localhost";

    function handleClientLoad() {
      gapi.load("client:auth2", initClient);
    }
    function initClient() {
      console.log("わん");
      gapi.client.init({
        apiKey: YOUR_CLIENT_SECRET,
        clientId: CLIENT_ID,
        // discoveryDocs: DISCOVERY_DOCS,
        // scope: SCOPES,
      });
    }
    onMounted(() => {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";

      // scriptタグを動的にDOMに挿入する
      document.head.appendChild(script);
      console.log("オラオラ");
    });
    return {
      handleClientLoad,
    };
  },
});
</script>
