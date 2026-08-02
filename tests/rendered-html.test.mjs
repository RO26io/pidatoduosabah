import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("configures Vinext with Nitro for Vercel", async () => {
  const [viteConfig, packageJson, vercelConfig] = await Promise.all([
    readFile(new URL("vite.config.ts", root), "utf8"),
    readFile(new URL("package.json", root), "utf8"),
    readFile(new URL("vercel.json", root), "utf8"),
  ]);

  assert.match(viteConfig, /vinext\(\)/);
  assert.match(viteConfig, /nitro\(\)/);
  assert.match(viteConfig, /tailwindcss\(\)/);
  assert.equal(JSON.parse(packageJson).scripts.build, "vite build");
  assert.equal(JSON.parse(vercelConfig).outputDirectory, ".output");
});

test("produces the Nitro server and Pidato Duo assets", async () => {
  await Promise.all([
    access(new URL(".output/server/index.mjs", root)),
    access(new URL(".output/nitro.json", root)),
    access(new URL(".output/public/logo-pidato-duo.jpg", root)),
  ]);

  const [page, layout] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
  ]);

  assert.match(page, /Suara berganding/);
  assert.match(layout, /Pidato Duo Sabah 2026/);
});
