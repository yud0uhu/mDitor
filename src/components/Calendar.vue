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
    const CLIENT_ID = process.env.VUE_APP_CLIENT_ID;
    const YOUR_CLIENT_SECRET = process.env.VUE_APP_YOUR_CLIENT_SECRET;
    const YOUR_REDIRECT_URL = process.env.VUE_APP_YOUR_YOUR_REDIRECT_URL;
    const DISCOVERY_DOCS = [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
    ];
    const calendarID = "primary";
    // const AuthUrl = "https://accounts.google.com/o/oauth2/auth";

    const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
    function handleClientLoad() {
      gapi.load("client:auth2", initClient);
    }
    function initClient() {
      console.log("わん");
      gapi.client
        .init({
          apiKey: YOUR_CLIENT_SECRET,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
          // auth_uri: AuthUrl,
          redirect_uri: YOUR_REDIRECT_URL,
        })
        .then(
          function() {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

            // Handle the initial sign-in state.
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          },
          function(error: any) {
            console.log("サインインエラー", error);
            appendPre(JSON.stringify(error, null, 2));
          }
        );
    }

    function updateSigninStatus(isSignedIn: boolean) {
      if (isSignedIn) {
        listUpcomingEvents();
      }
    }

    function handleAuthClick() {
      gapi.auth2.getAuthInstance().signIn();
    }

    function handleSignoutClick() {
      gapi.auth2.getAuthInstance().signOut();
    }

    function appendPre(message: any) {
      const pre = document.getElementById("content");
      if (pre == null) throw new Error("It is null");
      const textContent = document.createTextNode(message + "\n");
      pre.appendChild(textContent);
    }

    function listUpcomingEvents() {
      gapi.client.calendar.events
        .list({
          calendarId: calendarID,
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 10,
          orderBy: "startTime",
        })
        .then(function(response: any) {
          const events = response.result.items;
          appendPre("Upcoming events:");

          if (events.length > 0) {
            for (let i = 0; i < events.length; i++) {
              const event = events[i];
              let when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
              appendPre(event.summary + " (" + when + ")");
            }
          } else {
            appendPre("No upcoming events found.");
          }
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
      handleAuthClick,
      handleClientLoad,
      handleSignoutClick,
    };
  },
});
</script>
