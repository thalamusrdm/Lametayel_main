import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const keepLegacyRedirectsLocal = (proxy) => {
  proxy.on("proxyRes", (proxyResponse) => {
    const location = proxyResponse.headers.location;
    if (!location) return;

    proxyResponse.headers.location = location.replace(
      /^https:\/\/insurance\.lametayel\.co\.il/i,
      "",
    );
  });
};

export default defineConfig({
  build: {
    outDir: "dist/client",
    assetsDir: "app-assets",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    proxy: {
      "/legacy": {
        target: "https://insurance.lametayel.co.il",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/legacy/, ""),
        configure: keepLegacyRedirectsLocal,
      },
      "/wizard": {
        target: "https://insurance.lametayel.co.il",
        changeOrigin: true,
        secure: true,
        configure: keepLegacyRedirectsLocal,
      },
      "^/buy/(?!step1(?:$|[?#]))": {
        target: "https://insurance.lametayel.co.il",
        changeOrigin: true,
        secure: true,
        configure: keepLegacyRedirectsLocal,
      },
      "/assets": {
        target: "https://insurance.lametayel.co.il",
        changeOrigin: true,
        secure: true,
      },
      "/system": {
        target: "https://insurance.lametayel.co.il",
        changeOrigin: true,
        secure: true,
      },
    },
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react()],
});
