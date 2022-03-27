import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
const pathResolve = dir => {
  return resolve(__dirname, ".", dir);
};
const alias = {
  "/@": pathResolve("./src"),
  "/@comp": pathResolve("./src/components"),
  "/@views": pathResolve("./src/views"),
  "/@utils": pathResolve("./src/utils"),
  // "/@static": pathResolve("./src/static"),
  "/@api": pathResolve("./src/api")
};
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  resolve: {
    alias
  },
  plugins: [vue()]
});
