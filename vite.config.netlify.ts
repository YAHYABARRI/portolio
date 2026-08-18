import { nitro } from "nitro/vite";
import vinext from "vinext";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      tailwindcss: fileURLToPath(
        new URL("./node_modules/tailwindcss/index.css", import.meta.url),
      ),
    },
  },
  plugins: [vinext(), nitro()],
});
