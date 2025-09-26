import esbuild from "esbuild";
import fs from "fs";

fs.rmSync("out/test", { recursive: true, force: true });

await esbuild.build({
  entryPoints: ["src/test/**/*.cts"],
  format: "cjs",
  logLevel: "silent",
  outdir: "out/test",
  outExtension: {
    ".js": ".cjs",
  },
  platform: "node",
  sourcemap: true,
});
