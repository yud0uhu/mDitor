<template>
  <Calender />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Calender from "./components/Calendar.vue";

@Options({
  components: {
    Calender,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
body {
  height: 100vh;
  margin: 0px;
  padding: 0px;
}
</style>
