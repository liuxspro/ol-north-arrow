import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    assetsDir: "assets",
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "NorthArrow",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["ol", "ol/control/Control.js"], // 确保外部化处理那些你不想打包进库的依赖
    },
  },
});
