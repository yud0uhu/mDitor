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
          class="bg-gray-900 text-white w-full px-3 py-2 border focus:outline-none shadow-md h-screen"
          cols="50"
          rows="10"
          placeholder="# Enter some head line here ."
        >
        </textarea>
      </div>

      <div class="preview">
        <Markdown
          :source="source"
          :plugins="pluguin"
          class="w-full px-3 py-2
        border focus:outline-none shadow-md h-screen"
        />
      </div>
    </div>
  </div>
</template>

<script>
// レンダラプロセスからNode.jsで動くメインプロセス側の処理を呼び出したい(OSネイティブのAPIを使いたい)場合、remoteで呼び出す必要がある
// セキュリティの問題から、remote moduleはElectron 10.0.0からデフォルトで無効化された
const { dialog } = require("electron").remote;

const fs = require("fs");

import Markdown from "vue3-markdown-it";
import HighLightJs from "highlight.js/styles/dracula.css";
import MarkdownItStrikethroughAlt from "markdown-it-strikethrough-alt";

export default {
  name: "Editor",
  components: {
    Markdown,
  },
  data() {
    return {
      source: "",
      plugins: [
        {
          plugin: MarkdownItStrikethroughAlt,
          HighLightJs,
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
            extensions: ["*"],
          },
        ],
      };
      const result = dialog.showOpenDialogSync(options);
      // Returns String[] | undefined
      if (result != undefined) {
        this.text = fs.readFileSync(result[0]);
      }
    },
    save() {
      const options = {
        title: "File Save",
        filters: [
          { name: "Documents", multiSelections: false, extensions: ["*"] },
        ],
      };
      const result = dialog.showSaveDialogSync(options);
      // Returns String[] | undefined
      if (result != undefined) {
        this.text = fs.readFileSync(result[0]);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
