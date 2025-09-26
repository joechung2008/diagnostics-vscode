import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: [
      ".vscode-test/**/*", // Exclude VSCode test runtime
      "dist/**/*",
      "node_modules/**/*",
      "out/**/*",
      "src/test/**/*", // Exclude VSCode integration tests
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      exclude: [
        ".vscode-test.mjs",
        ".vscode-test/**/*",
        "**/*.d.ts",
        "*.{js,mjs}",
        "dist/**/*",
        "node_modules/**/*",
        "out/**/*",
        "src/diagnostics.ts", // Type definitions only
        "src/test/**/*",
        "src/adapters/**/*", // VS Code-dependent adapters (integration tested)
        "src/extension.ts", // Main extension entry point
        "src/lib/**/*", // Legacy files (will be removed)
        "src/commands/**/*", // Legacy files (will be removed)
      ],
    },
  },
});
