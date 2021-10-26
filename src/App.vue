<template>
  <Editor />
</template>

<script>
import Editor from "./components/Editor.vue";
export default {
  name: "App",
  components: {
    Editor,
  },
};
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
