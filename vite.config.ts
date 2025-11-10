import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

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
        "@": path.resolve(__dirname, "./src"),
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/setupTests.ts"],
      css: true,
      coverage: {
        reporter: ["text", "lcov"],
        include: ["src/**/*.{ts,tsx}"],
        exclude: ["src/main.tsx", "src/vite-env.d.ts"],
      },
      server: {
        deps: {
          inline: ["antd"],
        },
      },
      alias: [{ find: "@", replacement: path.resolve(__dirname, "./src") }],
      restoreMocks: true,
      clearMocks: true,
      mockReset: true,
      deps: {
        fallbackCJS: true,
      },
      exclude: [...configDefaults.exclude, "e2e/**"],
    },
  }
});
