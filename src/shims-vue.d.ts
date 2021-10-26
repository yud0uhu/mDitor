/* eslint-disable */
declare module 'vue3-markdown-it';
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
