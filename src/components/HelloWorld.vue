<template>
  <div style="height:100%;display:flex; flex-direction: column;">
    <div style="display:flex">
      <button
        @click="open"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4"
      >
        File Open
      </button>
      <button
        @click="save"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4"
      >
        File Save
      </button>
    </div>
    <!-- <div style="width:100%;flex-grow: 1;"> -->
    <div class="editor">
      <textarea
        style="width:100%;height:100%;box-sizing: border-box;"
        v-model="source"
        class="Inter"
      >
      </textarea>
    </div>

    <div class="preview">
      <Markdown :source="source" :plugins="plugins" />
    </div>
  </div>
</template>

<script>
// remote moduleはElectron 10.0.0からデフォルトで無効化された模様
const { dialog } = require("electron");
const fs = require("fs");

import Markdown from "vue3-markdown-it";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    Markdown,
  },
  data: function() {
    return {
      source: "",
    };
  },
  methods: {
    open: function() {
      const options = {
        title: "File Open",
        filters: [
          {
            name: "Documents",
            multiSelections: false,
            extensions: ["txt", "*"],
          },
        ],
      };
      const result = dialog.showOpenDialogSync(options);
      if (result.length) {
        this.text = fs.readFileSync(result[0]);
      }
    },
    save: function() {
      const options = {
        title: "File Save",
        filters: [{ name: "Documents", extensions: ["txt"] }],
      };
      const result = dialog.showSaveDialogSync(options);
      if (result) {
        fs.writeFileSync(result, this.text);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
