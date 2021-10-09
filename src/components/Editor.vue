<template>
  <div style="height:100%;display:flex; flex-direction: column;">
    <nav class="bg-gray-100">
      <div class="flex flex-row-reverse space-x-reverse">
        <button
          @click="open"
          data-hotkey="Control o"
          class="font-body shadow-md inline-flex items-center justify-center px-5 py-3 border border-transparent text-base rounded-md text-white bg-green-500 hover:bg-green-600"
        >
          file open
        </button>
        <button
          @click="save"
          data-hotkey="Control s"
          class="font-body shadow-md inline-flex items-center justify-center px-5 py-3 border border-transparent text-base rounded-md text-green-500 bg-white hover:bg-green-50"
        >
          file save
        </button>
      </div>
    </nav>

    <div class="grid gap-1 grid-cols-2">
      <div class="editor">
        <textarea
          :source="source"
          class="font-body shadow-inner bg-gray-900 text-white w-full px-3 py-2 border focus:outline-none shadow-2xl h-screen"
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
          class="font-body shadow-inner w-full px-3 py-2
        border focus:outline-none shadow-2xl h-screen"
        />
      </div>
    </div>
  </div>
</template>

<script>
// レンダラプロセスからNode.jsで動くメインプロセス側の処理を呼び出したい(OSネイティブのAPIを使いたい)場合、remoteで呼び出す必要がある
// セキュリティの問題から、remote moduleはElectron 10.0.0からデフォルトで無効化された
// https://www.npmjs.com/package/@electron/remote 為替ライブラリ？nodeIntegrationのみtrueの状態で検証したい。
const { dialog } = require("electron").remote;

const fs = require("fs");

import Markdown from "vue3-markdown-it";
import HighLightJs from "highlight.js/styles/dracula.css";
import MarkdownItStrikethroughAlt from "markdown-it-strikethrough-alt";

const Store = require("electron-store");
const store = new Store({});

// const store = new Store({
//   cwd: app.getPath(process.cwd()),
//   name: "config",
//   fileExtention: "json",
// });

import { install } from "@github/hotkey";

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
  mounted: function() {
    for (const el of document.querySelectorAll("[data-hotkey]")) {
      install(el);
    }
  },
};

// store.set({
//   foo: {
//     bar: {
//       foobar: source,
//     },
//   },
// });

console.log(store.get("foo.bar.foobar"));
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
