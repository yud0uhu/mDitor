<template>
  <div style="height:100%;display:flex; flex-direction: column;">
    <div style="display:flex">
      <button @click="open">File Open</button>
      <button @click="save">File Save</button>
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
// remote moduleはElectron 10.0.0からデフォルトで無効化された模様
const { dialog } = require("electron");
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
