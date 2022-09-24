<template>
  <div style="height: 100%; display: flex; flex-direction: column">
    <nav class="bg-gray-100">
      <div class="grid grid-cols-2 gap-4">
        <div class="flex justify-start space-x-reverse">
          <button
            @click="editorMode"
            class="border-solid border-2 rounded-md shadow-md text-center px-2 py-2 hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>

          <button
            @click="previewMode"
            class="border-solid border-2 rounded-md shadow-md text-center px-2 py-2 hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
              />
            </svg>
          </button>

          <button
            @click="viewMode"
            class="border-solid border-2 rounded-md shadow-md text-center px-2 py-2 hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />

              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>

          <button
            onclick="window.open('https://calendar.google.com/')"
            class="border-solid border-2 rounded-md shadow-md text-center px-2 py-2 hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>

        <div class="flex justify-end">
          <button
            @click="open"
            data-hotkey="g o"
            class="font-body shadow-md inline-flex items-center justify-center px-5 py-3 border border-transparent text-base rounded-md text-white bg-green-500 hover:bg-green-600"
          >
            file open
          </button>

          <button
            @click="save"
            data-hotkey="g s"
            class="font-body shadow-md inline-flex items-center justify-center px-5 py-3 border border-transparent text-base rounded-md text-green-500 bg-white hover:bg-green-50"
          >
            file save
          </button>
        </div>
      </div>
    </nav>

    <div>
      <div
        class="grid grid-cols-3 gap-4"
        v-show="!isVisibleEditor && !isVisiblePreview && isVisibleView"
      >
        <!-- ツールバー -->
        <div>
          <div v-if="this.source.match('#')">
            <Markdown
              :source="h1"
              :plugins="plugins"
              v-on="h1RegExp(this.source)"
            />
          </div>
          <div v-if="this.source.match('##')">
            <Markdown
              :source="h2"
              :plugins="plugins"
              v-on="h2RegExp(this.source)"
            />
          </div>
          <div v-if="this.source.match('###')">
            <Markdown
              :source="h3"
              :plugins="plugins"
              v-on="h3RegExp(this.source)"
            />
          </div>
        </div>
        <div class="view col-span-2">
          <Markdown
            :source="source"
            :plugins="plugins"
            class="font-body px-3 py-2 focus:outline-none w-full h-screen"
          />
        </div>
      </div>
      <div
        class="grid gap-1 grid-cols-2"
        v-show="isVisibleEditor && isVisiblePreview"
      >
        <div class="editor">
          <ToolBar v-on:insert="source = source + $event" />

          <textarea
            v-model="source"
            class="font-body shadow-inner bg-gray-900 text-white px-3 py-2 focus:outline-none shadow-2xl w-full h-screen"
            cols="50"
            rows="10"
            placeholder="# Enter some head line here ."
          >
          </textarea>
        </div>

        <div class="preview">
          <Markdown
            :source="source"
            :plugins="plugins"
            class="font-body shadow-inner px-3 py-2 border focus:outline-none shadow-2xl w-full h-screen"
          />
        </div>
      </div>
    </div>

    <div class="editor" v-show="!isVisibleEditor && !isVisibleView">
      <textarea
        v-model="source"
        class="font-body shadow-inner bg-gray-900 text-white px-3 py-2 focus:outline-none shadow-2xl w-full h-screen"
        cols="50"
        rows="10"
        placeholder="# Enter some head line here ."
      >
      </textarea>
    </div>

    <div class="preview" v-show="!isVisiblePreview && !isVisibleView">
      <Markdown
        :source="source"
        :plugins="plugins"
        class="font-body shadow-inner px-3 py-2 border focus:outline-none shadow-2xl w-full h-screen"
      />
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
import ToolBar from "../components/ToolBar.vue";

import { install } from "@github/hotkey";

export default {
  name: "Editor",
  components: {
    Markdown,
    ToolBar,
  },
  data() {
    return {
      source: "",
      h1: "",
      h2: "",
      h3: "",
      regexp: "",
      isVisibleEditor: true,
      isVisiblePreview: true,
      isVisibleView: false,
      plugins: [
        {
          plugin: MarkdownItStrikethroughAlt,
          HighLightJs,
        },
      ],
    };
  },
  methods: {
    open: function () {
      const options = {
        title: "File Open",
        filters: [
          {
            name: "Text",
            extensions: ["*"],
          },
        ],
      };
      const result = dialog.showOpenDialogSync(options);
      // Returns String[] | undefined
      if (result != undefined) {
        this.source = fs.readFileSync(result[0], { encoding: "utf8" });
      }
    },
    save: function () {
      const options = {
        title: "File Open",
        filters: [{ name: "Text", extensions: ["*"] }],
      };
      const result = dialog.showSaveDialogSync(options);
      if (result) {
        // 第一引数にfilenameかdescriptorを渡し、第二引数に書き込みたい情報(dataあるいはoptions)を渡す.
        fs.writeFileSync(result, this.source);
      }
    },
    editorMode: function () {
      this.isVisibleEditor = !this.isVisibleEditor;
    },
    previewMode: function () {
      this.isVisiblePreview = !this.isVisiblePreview;
    },
    viewMode: function () {
      this.isVisibleEditor = false;
      this.isVisiblePreview = false;
      this.isVisibleView = !this.isVisibleView;
    },
    h1RegExp: function (h1) {
      this.regex = RegExp("[¥n/  ]");
      this.h1 =
        "# " +
        h1.substring(this.source.indexOf("#")).split(this.regex)[2].toString();
      // console.log(this.m1);
    },
    h2RegExp: function (h2) {
      this.regex = RegExp("[¥n/  ]");
      this.h2 =
        "## " +
        h2.substring(this.source.indexOf("##")).split(this.regex)[1].toString();
    },
    h3RegExp: function (h3) {
      this.regex = RegExp("[¥n/  ]");
      this.h3 =
        "### " +
        h3
          .substring(this.source.indexOf("###"))
          .split(this.regex)[1]
          .toString();
    },
  },
  // mounted は永続されたデータがあればそれを読み込む
  mounted: function () {
    for (const el of document.querySelectorAll("[data-hotkey]")) {
      install(el);
    }
    if (localStorage.source) {
      this.source = localStorage.source;
    }
  },
  watch: {
    source(newSource) {
      localStorage.source = newSource;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped></style>
