import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(() => {
  const metaEnv: any = {
    VITE_BASE_URL: process.env.VITE_BASE_URL
  };

  const define: { [key: string]: string } = {};
  for (const key in metaEnv) {
    if (Object.prototype.hasOwnProperty.call(metaEnv, key)) {
      const data = metaEnv[key];
      define[`process.env.${key}`] = JSON.stringify(data);
    }
  }

  return {
    plugins: [react()],
    define,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "/src"),
      },
    },
  }
});
