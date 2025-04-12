// import path from "path"
// import tailwindcss from "@tailwindcss/vite"
// import react from "@vitejs/plugin-react"
// import { defineConfig } from "vite"

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })

import path from "path";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwind(),
    nodePolyfills({
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      buffer: "buffer",
      stream: "stream-browserify",
      crypto: "crypto-browserify",
      util: "util",
      assert: "assert",
    },
  },
  optimizeDeps: {
    include: ["buffer", "process", "stream"],
  },
});
