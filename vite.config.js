import path from "path";
import { viteStaticCopy as copy } from "vite-plugin-static-copy";

const alias = {
  "@assets": path.resolve(__dirname, "./assets"),
  "@app.types": path.resolve(__dirname, "./src/types"),
  "@utils": path.resolve(__dirname, "./src/utils"),
  "@models": path.resolve(__dirname, "./src/models"),
  "@ui": path.resolve(__dirname, "./src/ui"),
};

const plugins = [
  copy({
    targets: [
      { src: "./manifests/*", dest: "./" },
      { src: "./assets/icons/*", dest: "./static" },
    ],
  }),
];

export default {
  plugins,
  resolve: { alias },
};
