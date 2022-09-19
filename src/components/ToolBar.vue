<template>
  <div class="grid grid-cols-2">
    <div class="bg-black flex justify-start px-3 py-2 shadow-2xl">
      <button
        class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
        type="button"
        @click="InsertBold()"
      >
        <b>B</b>
      </button>

      <button
        class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
        type="button"
        @click="InsertItalic()"
      >
        <i>I</i>
      </button>

      <button
        class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
        type="button"
        @click="InsertStrikethrough()"
      >
        <s>abc</s>
      </button>
    </div>

    <div class="bg-black flex justify-end px-3 py-2 shadow-2xl">
      <button
        class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
        type="button"
        @click="InsertCheckList()"
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
            d="M5 13l4 4L19 7"
          />
        </svg>
      </button>

      <button
        class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
        type="button"
        @click="InsertLink()"
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
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      </button>

      <button
        class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
        type="button"
        @click="InsertImage()"
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
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>

      <button
        class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
        type="button"
        @click="InsertTable()"
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
            d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToolBar",
  components: {},
  data() {
    return {
      source: "",
    };
  },
  methods: {
    InsertTable() {
      this.$emit(
        "insert",
        "\n" +
          "| Column 1 | Column 2 | Column 3 |\n" +
          "| -------- | -------- | -------- |\n" +
          "| Text     | Text     | Text     |\n"
      );
    },
    InsertImage() {
      this.$emit("insert", "\n" + "![alt](https://)");
    },
    InsertLink() {
      this.$emit("insert", "\n" + "[](https://)");
    },
    InsertCheckList() {
      this.$emit("insert", "\n" + "- [ ] ");
    },
    InsertBold() {
      this.$emit("insert", "\n" + "****");
    },
    InsertItalic() {
      this.$emit("insert", "\n" + "**");
    },
    InsertStrikethrough() {
      this.$emit("insert", "\n" + "~~~~");
    },
  },
};
</script>
