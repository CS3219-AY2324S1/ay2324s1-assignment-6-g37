import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import Svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), Svgr()],
    server: {
      proxy: {
        // must use IPv4 "127.0.0.1"
        // the firebase emulator only recognises IPv4
        // if you use "localhost", vite will automatically convert it to IPv6 "::1"
        "/peerprep-1c8b3/us-central1":
          env.VITE_SYNC_QUESTION_SERVICE_URL ?? "http://127.0.0.1:5001",

        "/api": env.VITE_AUTH_SERVICE_URL ?? "http://localhost:8080",
      },
    },
  };
});
