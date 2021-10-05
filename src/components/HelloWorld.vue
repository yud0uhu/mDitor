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
    <div class="grid gap-1 grid-cols-2">
      <div class="editor">
        <textarea
          v-model="source"
          class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          cols="50"
          rows="10"
          placeholder="# Enter some head line here ."
        >
        </textarea>
      </div>

      <div class="preview">
        <Markdown :source="source" :plugins="plugins" />
      </div>
    </div>
  </div>
</template>

<script>
// remote moduleはElectron 10.0.0からデフォルトで無効化された模様
const { dialog } = require("electron");
const fs = require("fs");

import Markdown from "vue3-markdown-it";
import MarkdownItStrikethroughAlt from "markdown-it-strikethrough-alt";

export default {
  name: "HelloWorld",
  components: {
    Markdown,
  },
  data() {
    return {
      source: "",
      plugins: [
        {
          plugin: MarkdownItStrikethroughAlt,
        },
      ],
    };
  },
  methods: {
    open() {
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
    save() {
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
