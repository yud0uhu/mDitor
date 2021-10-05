<template>
  <div style="height:100%;display:flex; flex-direction: column;">
    <div style="display:flex">
      <button @click="open">File Open</button>
      <button>File Save</button>
    </div>
    <div style="width:100%;flex-grow: 1;">
      <textarea
        style="width:100%;height:100%;box-sizing: border-box;"
        v-model="text"
      >
      </textarea>
    </div>
  </div>
</template>

<script>
const { dialog } = require("electron").remote;
const fs = require("fs");

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data: function() {
    return {
      text: "",
    };
  },
  methods: {
    save: function() {
      const options = {
        title: "File Opne",
        filters: [{ name: "Documents", extentions: ["txt"] }],
      };
      const result = dialog.showSaveDialogSync(options);
      if (result) {
        fs.writeFileSync(result, this.text);
      }
    },
    open: function() {
      const options = {
        title: "File Open",
        filters: [
          {
            name: "Documents",
            multiSelections: false,
            extentions: ["txt", "*"],
          },
        ],
      };
      const result = dialog.showOpenDialogSync(options);
      if (result.length) {
        this.text = fs.readFileSync(result[0]);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
