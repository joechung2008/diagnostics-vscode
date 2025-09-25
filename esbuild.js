import esbuild from "esbuild";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const production = process.argv.includes("--production");
const watch = process.argv.includes("--watch");

/**
 * @type {import('esbuild').Plugin}
 */
const esbuildProblemMatcherPlugin = {
  name: "esbuild-problem-matcher",

  setup(build) {
    build.onStart(() => {
      console.log("[watch] build started");
    });
    build.onEnd((result) => {
      result.errors.forEach(({ text, location }) => {
        console.error(`✘ [ERROR] ${text}`);
        console.error(
          `    ${location.file}:${location.line}:${location.column}:`
        );
      });
      console.log("[watch] build finished");
    });
  },
};

async function buildTailwindCSS() {
  console.log("[tailwind] Building Tailwind CSS...");
  try {
    await execAsync(
      "npx @tailwindcss/cli -i ./src/styles/tailwind.css -o ./dist/tailwind.css --config ./tailwind.config.js"
    );
    console.log("[tailwind] Tailwind CSS build completed.");
  } catch (error) {
    console.error("[tailwind] Failed to build Tailwind CSS:", error);
    process.exit(1);
  }
}

async function main() {
  await buildTailwindCSS();

  const ctx = await esbuild.context({
    entryPoints: ["src/extension.ts"],
    bundle: true,
    format: "esm", // Changed from 'cjs' to 'esm' to align with ES module syntax
    minify: production,
    sourcemap: !production,
    sourcesContent: false,
    platform: "node",
    outfile: "dist/extension.js",
    external: ["vscode"],
    logLevel: "silent",
    plugins: [esbuildProblemMatcherPlugin],
  });
  if (watch) {
    await ctx.watch();
  } else {
    await ctx.rebuild();
    await ctx.dispose();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
