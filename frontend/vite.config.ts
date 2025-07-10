import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    proxy: {
      "/users": "http://localhost:3001",
      "/firedistrict": "http://localhost:3001",
      "/cityfirestations": "http://localhost:3001",
      "/firesubstation": "http://localhost:3001",
      "/backend_office": "http://localhost:3001",
    },
  },
});
